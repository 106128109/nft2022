<template>
	<view class="content">
		<view class="info" v-html="list">
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				list: '',
				type: ''
			}
		},
		onLoad(e) {
			this.type = e.type;
			if (e.type == 1) {
				uni.setNavigationBarTitle({
					title: '用户协议'
				})
			}
			if (e.type == 2) {
				uni.setNavigationBarTitle({
					title: '隐私条款'
				})
			}
			this.getData(e.type);
		},
		methods: {
			getData(a) {
				this.$http.post('login/config').then(res => {
					if(res.code == 1){
						if(this.type == 1){
							this.list = res.data.users_content
						} else if(this.type == 2){
							this.list = res.data.conceal_content
						}
					} 
				})
			}

		}
	}
</script>
<style lang="scss" scoped>
	.info {
		padding: 30rpx;
		color: #000;
	}
</style>
