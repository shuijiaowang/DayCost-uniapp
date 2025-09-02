import request from '../utils/request';

// 消费相关API
export const testApi = {
    

    // 获取消费记录列表
    test: () => {
        return request.get('/user/test');
    },
	// 获取消费记录列表
	test2: () => {
	    return request.get('/expenses/test');
	},

   
};

export default testApi;
