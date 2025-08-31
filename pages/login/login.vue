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

			// 登录处理（使用原生uni.request）
			const handleLogin = async () => {
				isLoading.value = true;
				responseResult.value = ''; // 清空之前的结果
				
				try {
					// 原生请求包装为Promise，方便使用await
					const res = await new Promise((resolve, reject) => {
						uni.request({
							url: 'http://127.0.0.1:8080/api/user/login',
							method: 'POST',
							header: {
								'Content-Type': 'application/json'
							},
							data: {
								username: username.value.trim(),
								password: password.value.trim()
							},
							success: (response) => {
								resolve(response.data);
							},
							fail: (err) => {
								reject(err);
							}
						});
					});

					// 显示响应结果
					responseResult.value = JSON.stringify(res, null, 2);

				} catch (err) {
					// 错误处理
					responseResult.value = `请求失败: ${JSON.stringify(err, null, 2)}`;
				} finally {
					isLoading.value = false;
				}
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
	/* 移除所有样式 */
</style>
