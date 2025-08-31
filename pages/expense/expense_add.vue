<template>
	<view class="container">
		<view class="page-title">添加消费记录</view>

		<form class="expense-form">
			<view class="form-group">
				<text class="form-label">名称：</text>
				<input v-model="note" placeholder="请输入消费名称" class="form-input"
					:class="{ 'invalid': submitted && !note }" />
				<text class="error-message" v-if="submitted && !note">请输入消费名称</text>
			</view>

			<view class="form-group">
				<text class="form-label">金额：</text>
				<input v-model="amount" type="number" placeholder="请输入消费金额" class="form-input"
					:class="{ 'invalid': submitted && (!amount || amount <= 0) }" />
				<text class="error-message" v-if="submitted && !amount">请输入消费金额</text>
				<text class="error-message" v-if="submitted && amount <= 0">金额必须大于0</text>
			</view>

			<view class="form-group">
				<text class="form-label">类别：</text>
				<picker v-model="categoryIndex" :range="categoryOptions" 
					class="form-picker"
					:class="{ 'invalid': submitted && !category }"
					@change="handleCategoryChange" 
					>
					<view class="picker-view">
						{{ category || '请选择消费类别' }}
					</view>
				</picker>
				<text class="error-message" v-if="submitted && !category">请选择消费类别</text>
			</view>

			<view class="form-group">
				<text class="form-label">时间：</text>
				<picker mode="date" v-model="expense_date" start="2000-01-01" end="2100-12-31" class="form-picker"
					:class="{ 'invalid': submitted && !expense_date }">
					<view class="picker-view">
						{{ expense_date || '请选择消费日期' }}
					</view>
				</picker>
				<text class="error-message" v-if="submitted && !expense_date">请选择消费日期</text>
			</view>

			<view class="form-group">
				<text class="form-label">备注：</text>
				<textarea v-model="remark" placeholder="请输入备注（选填）" class="form-textarea" auto-height />
			</view>

			<view class="form-actions">
				<button type="primary" @click="addExpense" :loading="isLoading" :disabled="isLoading"
					class="submit-btn">
					添加消费
				</button>
				<button type="default" @click="resetForm" class="reset-btn" :disabled="isLoading">
					重置
				</button>
			</view>
		</form>

		<!-- 提示消息 -->
		<view class="toast" :class="{ 
				'success': toast.type === 'success', 
				'error': toast.type === 'error',
				'show': toast.show 
			}">
			{{ toast.message }}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 表单数据
				note: "",
				amount: "",
				remark: "",
				expense_date: "",
				category: "",
				categoryIndex: 0, // 保存选中的索引
				categoryOptions: ['餐饮', '交通', '购物', '娱乐', '住房', '其他'], // 类别选项数组


				// 状态管理
				isLoading: false,
				submitted: false,

				// 提示消息
				toast: {
					show: false,
					message: "",
					type: "" // success, error
				},

				// 类别映射（与后端对应）
				categoryMap: {
					'餐饮': 1,
					'交通': 2,
					'购物': 3,
					'娱乐': 4,
					'住房': 5,
					'其他': 6
				}
			}
		},
		onLoad() {
			// 初始化默认日期为今天
			const today = new Date();
			const year = today.getFullYear();
			const month = String(today.getMonth() + 1).padStart(2, '0');
			const day = String(today.getDate()).padStart(2, '0');
			this.expense_date = `${year}-${month}-${day}`;
		},
		methods: {
			/**
			 * 验证表单数据
			 * @returns {Boolean} 是否验证通过
			 */
			validateForm() {
				this.submitted = true;

				// 基本验证
				if (!this.note) return false;
				if (!this.amount || this.amount <= 0) return false;
				if (!this.category) return false;
				if (!this.expense_date) return false;

				return true;
			},

			/**
			 * 添加消费记录
			 */
			addExpense() {
				// 表单验证
				if (!this.validateForm()) {
					this.showToast('请完善表单信息', 'error');
					return;
				}

				// 准备提交数据
				const postData = {
					note: this.note,
					amount: parseFloat(this.amount),
					remarks: this.remark,
					expense_date: this.expense_date,
					category: this.categoryMap[this.category]
				};

				// 显示加载状态
				this.isLoading = true;

				// 发送请求
				const url = "http://127.0.0.1:8080/api/expenses/";
				// 实际项目中建议从存储中获取token，而不是硬编码
				const token =
					"1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IjEiLCJpc3MiOiJEYXlDb3N0IiwiZXhwIjoxNzU3NTE2MjEzLCJuYmYiOjE3NTY2NTIyMTMsImlhdCI6MTc1NjY1MjIxM30.GmCf-dm3zjQiJd4K8vNiMpo_c_63FCz5M7sJ-eUqHbE";

				uni.request({
					url: url,
					method: "POST",
					header: {
						"Authorization": "Bearer " + token,
						"Content-Type": "application/json"
					},
					data: postData,
					success: (res) => {
						if (res.data.code === 200) {
							this.showToast('添加成功！', 'success');
							this.resetForm();

							// 可以在这里添加延迟后返回上一页的逻辑
							// setTimeout(() => {
							// 	uni.navigateBack();
							// }, 1500);
						} else {
							this.showToast(`添加失败：${res.data?.message || res.errMsg}`, 'error');
						}
					},
					fail: (err) => {
						this.showToast(`请求错误：${err.errMsg}`, 'error');
					},
					complete: () => {
						// 隐藏加载状态
						this.isLoading = false;
					}
				});
			},
			// 处理类别选择变化
			handleCategoryChange(e) {
				const index = e.detail.value;
				this.category = this.categoryOptions[index];
			},

			/**
			 * 重置表单
			 */
			resetForm() {
				this.note = "";
				this.amount = "";
				this.remark = "";
				// 保留日期和类别，可根据需求调整
				// this.expense_date = "";
				// this.category = "";
				this.submitted = false;
			},

			/**
			 * 显示提示消息
			 * @param {String} message 消息内容
			 * @param {String} type 消息类型 success/error
			 */
			showToast(message, type) {
				this.toast = {
					show: true,
					message: message,
					type: type
				};

				// 3秒后自动隐藏
				setTimeout(() => {
					this.toast.show = false;
				}, 3000);
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 24rpx;
		background-color: #f5f5f5;
		min-height: 100vh;
	}

	.page-title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		margin: 30rpx 0 50rpx;
		color: #333;
	}

	.expense-form {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 30rpx 24rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 30rpx;
	}

	.form-label {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 10rpx;
	}

	.form-input,
	.form-picker .picker-view {
		height: 80rpx;
		line-height: 80rpx;
		border: 2rpx solid #eee;
		border-radius: 8rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
	}

	.form-picker {
		height: 80rpx;
	}

	.form-textarea {
		min-height: 120rpx;
		border: 2rpx solid #eee;
		border-radius: 8rpx;
		padding: 20rpx;
		font-size: 28rpx;
		line-height: 1.5;
	}

	.form-actions {
		display: flex;
		gap: 20rpx;
		margin-top: 50rpx;
	}

	.submit-btn,
	.reset-btn {
		flex: 1;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 30rpx;
		border-radius: 8rpx;
	}

	.error-message {
		font-size: 24rpx;
		color: #ff4d4f;
		margin-top: 8rpx;
		line-height: 1.4;
	}

	.invalid {
		border-color: #ff4d4f !important;
	}

	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 20rpx 30rpx;
		border-radius: 8rpx;
		color: #fff;
		font-size: 28rpx;
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
		z-index: 9999;
	}

	.toast.show {
		opacity: 1;
	}

	.toast.success {
		background-color: #52c41a;
	}

	.toast.error {
		background-color: #ff4d4f;
	}
</style>