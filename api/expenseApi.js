import request from '../utils/request';

// 消费相关API
export const expenseApi = {
    // 添加消费记录
    addExpense: (data) => {
        return request.post('/expenses/', data);
    },

    // 获取消费记录列表
    getExpenseList: (params) => {
        return request.get('/expenses/', params);
    },

    // 获取单个消费记录详情
    getExpenseDetail: (id) => {
        return request.get(`/expenses/${id}`);
    },

    // 更新消费记录
    updateExpense: (id, data) => {
        return request.put(`/expenses/${id}`, data);
    },

    // 删除消费记录
    deleteExpense: (id) => {
        return request.delete(`/expenses/${id}`);
    }
};

export default expenseApi;
