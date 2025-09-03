<template>
	<view class="container">
		<view >添加消费记录</view>

		<form>
		    <view>
		        <text>名称：</text>
		        <input v-model="note" placeholder="请输入消费名称" />
		    </view>
		
		    <view>
		        <text>金额：</text>
		        <input v-model="amount" type="number" placeholder="请输入消费金额" />
		    </view>
		
		    <view>
		        <text>类别：</text>
		        <picker v-model="categoryIndex" :range="categoryOptions" @change="handleCategoryChange">
		            <view>
		                {{ category || '请选择消费类别' }}
		            </view>
		        </picker>
		        <text v-if="submitted && !category">请选择消费类别</text>
		    </view>
		
		    <view>
		        <text>时间：</text>
		        <picker mode="date" v-model="expense_date" start="2000-01-01" end="2100-12-31">
		            <view>
		                {{ expense_date || '请选择消费日期' }}
		            </view>
		        </picker>
		        <text v-if="submitted && !expense_date">请选择消费日期</text>
		    </view>
		
		    <view>
		        <text>备注：</text>
		        <textarea v-model="remark" placeholder="请输入备注（选填）" auto-height />
		    </view>
		
		    <view>
		        <button @click="addExpense">
		            添加消费
		        </button>
		    </view>
		</form>
	</view>
</template>

<script>
	import expenseApi from '../../api/expenseApi';
import timeUtil from '../../utils/timeUtil';

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
			this.expense_date = timeUtil.getDateFormat(new Date())
		},
		methods: {


			addExpense() {
				

				// 准备提交数据
				const postData = {
					note: this.note,
					amount: parseFloat(this.amount),
					remarks: this.remark,
					expense_date: this.expense_date,
					category: this.categoryMap[this.category]
				};
				console.log(postData)


				expenseApi.addExpense(postData)
					.then((responseData) => {
						this.word = responseData;
						console.log("接口返回数据：", responseData);
					})
					.catch((err) => {
						this.word = "请求失败，请重试";
						console.error("请求错误：", err);
					});
			},
			// 处理类别选择变化
			handleCategoryChange(e) {
				const index = e.detail.value;
				this.category = this.categoryOptions[index];
			}
		}
	}
</script>

<style scoped>
	
</style>