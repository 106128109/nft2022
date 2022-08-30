<template>
	<view class="content">
		<view class="rule" v-html="composeConfig.rule"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				composeConfig:{}
			}
		},
		onLoad() {
			this.getComposeConfig();
		},
		methods: {
			getComposeConfig() {
				this.$http.post('compose/getComposeConfig').then(res => {
					if(res.code == 1){
						this.composeConfig = res.data;
					} 
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.rule {
	padding: 30rpx;
	color: #000;
}
</style>
