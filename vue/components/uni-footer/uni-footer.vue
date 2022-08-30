<template>
	<view class="tabbar_bottom flex" :style="{background: background}">
		<view class="tabbar_item flex_column" v-for="(item, index) in list" :key="index" @tap="switchNav(index, item)">
			<image class="tabbar_img" :src="currentTab == index ? item.selectedIconPath : item.iconPath" mode="">
			</image>
			<view :class="currentTab == index ? 'tabbar_label act' : 'tabbar_label'">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			background: {
				type: String,
				default: ''
			},
			currentTab: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				list: [{
						pagePath: "../index/index",
						iconPath: "../../static/img/footer/index.png",
						selectedIconPath: "../../static/img/footer/indexh.png",
						text: "首页"
					}, {
						pagePath: "../index/secondHand",
						iconPath: "../../static/img/footer/market.png",
						selectedIconPath: "../../static/img/footer/marketh.png",
						text: "寄售"
					}, {
						pagePath: "../manghe/index",
						iconPath: "../../static/img/footer/manghe.png",
						selectedIconPath: "../../static/img/footer/mangheh.png",
						text: "盲盒"
					},
					{
						pagePath: "../my/my",
						iconPath: "../../static/img/footer/my.png",
						selectedIconPath: "../../static/img/footer/myh.png",
						text: "我的"
					}
				],
				rank: null
			}
		},
		methods: {
			switchNav(index, item) {
				if(this.rank==0){
					if(index==1){
						this.toast("市场暂没有开放");
						return;
					}
				}
				if (index != this.currentTab) {
					console.log(item.pagePath)
					uni.redirectTo({
						url: item.pagePath
					})
				}
			}
		},
		mounted() {
			this.rank = uni.getStorageSync('rank');
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar_bottom {
		width: 100%;
		height: 120rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 998;
		// background: rgba(56, 56, 56, 0.32);
		background: #FFFFFF;
		backdrop-filter: blur(13px);
		-webkit-backdrop-filter: blur(13px);

		.tabbar_item {
			flex: 1;
		}

		.tabbar_img {
			width: 42rpx;
			height: 42rpx;
			margin-bottom: 8rpx;
		}

		.tabbar_label {
			color: #000000;
			font-size: 20rpx;

			&.act {
				color: #000000;
			}
		}
	}
</style>
