
// 基础URL
const baseUrl = 'http://127.0.0.1:8088/api';

/**
 * 封装uni.request
 * @param {Object} req - 请求参数
 * @returns {Promise} - 返回Promise对象
 */
const request = (req) => {
	console.log("req",req)
	//使用req封装请求参数？request({url,method: 'GET',data,})，然后使用api进行再次封装调用。√
	
	const token = uni.getStorageSync('token'); // 从本地存储获取token

	// 合并配置
	const config = {
		url: baseUrl + req.url,
		method: req.method || 'GET', //默认GET请求
		header: {
			'Content-Type': 'application/json', // 默认json格式，可以被覆盖吗
			...req.header
		},
		data: req.data || {}, //请求参数
		timeout: req.timeout || 60000 //超时
	};


	if (token) {
		config.header.Authorization = `Bearer ${token}`;// 如果有token，添加到请求头
	} 

	return new Promise((resolve, reject) => {
		uni.request({
			...config,
			success: (res) => { 
				console.log("res",res)

				// HTTP状态码错误
				if (res.statusCode !== 200) {
					uni.showToast({
						title: `请求失败: ${res.statusCode}`,
						icon: 'none',
						duration: 3000
					});
					return reject(new Error(`HTTP错误: ${res.statusCode}`));
				}

				// 接口返回数据
				const responseData = res.data;

				// 业务逻辑错误
				if (responseData.code !== 200) {
					uni.showToast({
						title: `请求失败: ${res.data.message}`,
						icon: 'none',
						duration: 1000
					});
					// 特殊处理：token过期
					if (responseData.code === 401) {
						// 清除无效token
						uni.removeStorageSync('token');
						// 跳转到登录页
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
					return reject(new Error(responseData.message || '接口返回错误'));
				}
				// 请求成功，返回数据,只返回数据？
				resolve(responseData.data);
			},
			fail: (err) => {
				console.log("err",err)
				reject(err);
			}
		});
	});
};

// 简化常用请求方法
const api = {
	get: (url, data = {}, req = {}) => {
		return request({
			url,
			method: 'GET',
			data,
			...req
		});
	},

	post: (url, data = {}, req = {}) => {
		return request({
			url,
			method: 'POST',
			data,
			...req
		});
	},

	put: (url, data = {}, req = {}) => {
		return request({
			url,
			method: 'PUT',
			data,
			...req
		});
	},

	delete: (url, data = {}, req = {}) => {
		return request({
			url,
			method: 'DELETE',
			data,
			...req
		});
	}
};

export default api;