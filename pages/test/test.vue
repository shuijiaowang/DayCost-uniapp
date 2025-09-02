<template>
	<view>
		<text>{{word}}</text>
		<button @click="test">点击测试</button>
		<button @click="testWithDelay">测试延迟响应</button>
		<button @click="testTimeout">测试超时</button>
	</view>
</template>

<script>
	import testApi from '../../api/test/';
	export default {
		data() {
			return {
				word: ""
			}
		},
		methods: {
			// 原始测试方法
			test() {
				testApi.test2()
					.then((responseData) => {
						this.word = responseData;
						console.log("接口返回数据：", responseData);
					})
					.catch((err) => {
						this.word = "请求失败，请重试";
						console.error("请求错误：", err);
					});
			}

		}

	}
</script>