<template>
	<view>
		<view>用户登录</view>

		<view>
			<!-- 用户名输入 -->
			<view>
				<input v-model="username" type="text" placeholder="请输入用户名" />
			</view>

			<!-- 密码输入 -->
			<view>
				<input v-model="password" type="password" placeholder="请输入密码" />
			</view>

			<!-- 登录按钮 -->
			<button @click="handleLogin" :loading="isLoading" :disabled="isLoading">
				登录
			</button>
		</view>

		<!-- 响应结果显示区域 -->
		<view v-if="responseResult">
			<view>响应结果:</view>
			<view>{{ responseResult }}</view>
		</view>
	</view>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue';

	export default defineComponent({
		setup() {
			// 表单数据
			const username = ref('');
			const password = ref('');

			// 状态管理
			const isLoading = ref(false);
			const responseResult = ref('');

			// 登录处理（不使用Promise，直接用回调）
			const handleLogin = () => {
				isLoading.value = true;
				responseResult.value = ''; // 清空之前的结果

				uni.request({
					url: 'http://127.0.0.1:8088/api/user/login',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						username: username.value.trim(),
						password: password.value.trim()
					},
					success: (response) => {
						// 处理成功响应
						if (response.data?.data?.token) {
							uni.setStorageSync('token', response.data.data.token);
						}
						// 可以在这里处理响应数据
						// responseResult.value = JSON.stringify(response.data, null, 2);
					},
					fail: (err) => {
						// 处理错误
						responseResult.value = `请求失败: ${JSON.stringify(err, null, 2)}`;
					},
					complete: () => {
						// 无论成功失败都会执行，用于清理加载状态
						isLoading.value = false;
					}
				});
			};

			return {
				username,
				password,
				isLoading,
				responseResult,
				handleLogin
			};
		}
	});
</script>

<style scoped>
	/* 可以添加一些基础样式让界面更美观 */
	view {
		margin: 15rpx 0;
	}
	input {
		border: 1px solid #eee;
		padding: 20rpx;
		border-radius: 8rpx;
	}
	button {
		background-color: #007aff;
		color: white;
		padding: 20rpx;
		border-radius: 8rpx;
		width: 100%;
	}
</style>
