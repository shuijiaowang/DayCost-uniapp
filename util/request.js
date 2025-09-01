// 基础URL
const baseUrl = 'http://127.0.0.1:8080/api';

/**
 * 封装uni.request
 * @param {Object} options - 请求参数
 * @returns {Promise} - 返回Promise对象
 */
const request = (options) => {
    // 显示加载中
    if (options.showLoading !== false) {
        uni.showLoading({
            title: '加载中...',
            mask: true
        });
    }

    // 从本地存储获取token
    const token = uni.getStorageSync('token');

    // 合并配置
    const config = {
        url: baseUrl + options.url,
        method: options.method || 'GET',  //默认GET请求
        header: {
            'Content-Type': 'application/json', // 默认json格式，可以被覆盖吗？ 是的，可以覆盖
            ...options.header
        },
        data: options.data || {},  //请求参数
        timeout: options.timeout || 60000  //超时
    };

    // 如果有token，添加到请求头
    if (token) {
        config.header.Authorization = `Bearer ${token}`;
    }

    return new Promise((resolve, reject) => {
        uni.request({
            ...config,
            success: (res) => {
                // 隐藏加载中
                if (options.showLoading !== false) {
                    uni.hideLoading();   //可直接调用
                }

                // HTTP状态码错误
                if (res.statusCode < 200 || res.statusCode >= 300) {
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
                    // 特殊处理：token过期
                    if (responseData.code === 401) {
                        // 清除无效token
                        uni.removeStorageSync('token');
                        // 跳转到登录页
                        uni.navigateTo({
                            url: '/pages/login/login'
                        });
                    }

                    // 显示错误信息
                    uni.showToast({
                        title: responseData.message || '操作失败',
                        icon: 'none',
                        duration: 3000
                    });

                    return reject(new Error(responseData.message || '接口返回错误'));
                }

                // 请求成功，返回数据
                resolve(responseData.data);
            },
            fail: (err) => {
                // 隐藏加载中
                if (options.showLoading !== false) {
                    uni.hideLoading();
                }

                // 网络错误处理
                uni.showToast({
                    title: `网络错误: ${err.errMsg}`,
                    icon: 'none',
                    duration: 3000
                });

                reject(err);
            }
        });
    });
};

// 简化常用请求方法
const api = {
    get: (url, data = {}, options = {}) => {
        return request({
            url,
            method: 'GET',
            data,
            ...options
        });
    },

    post: (url, data = {}, options = {}) => {
        return request({
            url,
            method: 'POST',
            data,
            ...options
        });
    },

    put: (url, data = {}, options = {}) => {
        return request({
            url,
            method: 'PUT',
            data,
            ...options
        });
    },

    delete: (url, data = {}, options = {}) => {
        return request({
            url,
            method: 'DELETE',
            data,
            ...options
        });
    }
};

export default api;
