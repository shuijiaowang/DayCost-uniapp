<template>
  <view style="padding:24rpx;">
    <view style="margin-bottom:16rpx;">
      <text>金额：</text>
      <input v-model="amount" type="number" placeholder="请输入消费金额" />
    </view>
    <view style="margin-bottom:16rpx;">
      <text>备注：</text>
      <input v-model="remark" placeholder="请输入备注" />
    </view>
    <button type="primary" @click="addExpense">添加消费</button>
    <view v-if="msg" style="margin-top:24rpx; color:green;">{{ msg }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      amount: "",
      remark: "",
      msg: ""
    }
  },
  methods: {
    addExpense() {
      // 简单校验
      // if (!this.amount) {
      //   this.msg = "请输入金额";
      //   return;
      // }
      // 请求参数
      const url = "http://192.168.0.105:8080/api/expenses/"; // <-- 填写你的接口地址
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IjEiLCJpc3MiOiJEYXlDb3N0IiwiZXhwIjoxNzU2NTcwNzAxLCJuYmYiOjE3NTY0ODQzMDEsImlhdCI6MTc1NjQ4NDMwMX0.p9YeK-GPmyZQn6Jn6KIsalTf3iVK5FmDlqba1E_4AU8"; // <-- 手动填写token
      uni.request({
        url: url,
        method: "POST",
        header: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        },
        data: {
          "note": "牛肉睡觉",
            "amount": 5.8,
            "remarks": "[晚餐,拼好饭,自取]，还可以，没有饺子汤",
            "expense_date": "2025-8-30",
            "category": 1
        },
        success: (res) => {
          if (res.statusCode === 200) {
            this.msg = "添加成功！";
            this.amount = "";
            this.remark = "";
          } else {
            this.msg = "添加失败：" + (res.data?.msg || res.errMsg);
          }
        },
        fail: (err) => {
          this.msg = "请求错误：" + err.errMsg;
        }
      });
    }
  }
}
</script>

<style>
/* 可根据需求自定义样式 */
</style>