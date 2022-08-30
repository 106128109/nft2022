<template>
	<view class=" plr-30">
		<image :src="img" mode="aspectFill" class="img"></image>
		<view class="white size-28">
	       <u-parse :content="con"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:'',
				con:''
			}
		},
		onLoad(options) {
			if(options.con){
				var data=JSON.parse(options.con)
				uni.setNavigationBarTitle({
					title:data.title
				})
				this.img=data.image
				this.con=data.content
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.img{
		width: 100%;
		height: 360rpx;
		margin: 20rpx auto;
		border-radius: 30rpx;
	}
</style>
