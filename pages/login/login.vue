<template>
	<!-- #ifdef H5 -->
	<h5-nav></h5-nav>
	<!-- #endif -->
	<view>
		login
	</view>
</template>

<script>
	import { defineComponent } from 'vue';
	// #ifdef H5
	import h5Nav from "@/components/h5-nav/h5-nav.vue";
	// #endif
export default defineComponent({
  // #ifdef H5
  components: { h5Nav },
  // #endif
  setup() {
    // 这里可以用ref等响应式变量
    return {};
  }
});
</script>

<style>

</style>
