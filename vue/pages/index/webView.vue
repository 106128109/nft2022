<template>
	<view class="content">
		<web-view :src="url" :update-title="flag"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				flag: false,
			};
		},
		onLoad(e) {
			this.url = e.ss;
		},
	}
</script>
<style>
	page {
		background-color: #23272C;
	}
</style>
<style lang="scss" scoped>
	.content {
		width: 100%;
	}
</style>
