<template>
	<!-- #ifdef H5 -->
	<h5-nav></h5-nav>
	<!-- #endif -->
	<view>
		login
	</view>
</template>

<script>
	// #ifdef H5
	import h5Nav from "@/components/h5-nav/h5-nav.vue";
	// #endif
	export default {
		// #ifdef H5
		  components: { h5Nav }, 
		 // #endif
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
