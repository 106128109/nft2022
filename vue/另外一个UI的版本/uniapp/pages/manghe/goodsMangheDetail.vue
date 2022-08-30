<template>
	<view class="content">
		
		<view class="Box">
			<view class="rotateBox"  :style="'background-image: url('+info.image+');background-size: 100% 100%'">
				<image class="image" src="../../static/img/index/bj3.png"></image>
			</view>
		</view>
		<view class="Box1">
			<image class="img" src="../../static/img/index/b1.png" mode=""></image>
			<view class="center">
				<view class="goodsName">{{info.name}}</view>
				<!-- <view class="flexBox LimitBox">
					<view class="Limit">限量</view>
					<view class="stock">{{info.surplus}}份</view>
				</view> -->
			</view>
			<image class="img" src="../../static/img/index/b2.png" mode=""></image>
		</view>

		<view class="type1">
			<view class="msgBox">
				<!-- <view class="goodsName">{{info.name}}</view> -->
				<view class="flex_bt">
					<view class="priceBox">当前价: <text>¥{{info.price}}</text> </view>
					<view class="category_name">{{info.goods_category_name}} </view>
				</view>
				<!-- <view class="describe">{{info.title}}</view> -->
			</view>
			<view class="descBox" v-if="info.content">
				<view class="item">盲盒介绍</view>
				<view class="desinfo" v-html="util.checkImg(info.content)"></view>
			</view>
			<view class="footerBox flex_bt">
				<view class="price">¥{{info.price}}</view>
				<view class="subBtn " @tap="pay()" v-if="flag">立即购买</view>
				<view class="subBtn subnrn1"    v-else @click="toast1()">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId: '',
				banner: {},
				info: {},
				goodsList: [],
				buy_content: '',
				fullscreen:true,
				flag: false,
				text:''
			}
		},
		onLoad(e) {
			this.goodsId = e.goodsId;
			this.getData();
			const that=this
			uni.$on('init', () => {
				this.getData();
			})
		},
		methods: {
			pay() {
				this.go('/pages/index/orderMakeSure?goodsId=' + this.goodsId);
			},
			toast1(){
				this.toast(this.text);
			},
			getData() {
				this.$http.get('manghe/goodsMangheDetail', {
					id: this.goodsId
				}).then(res => {
					if (res.code == 1) {
						this.banner = res.data.images;
						this.info = res.data;
						if(this.info.status == 1)
						{
							this.flag = true;
							this.text= "";
						}
						else if(this.info.status == 2)
						{
							this.flag = false;
							this.text= "未开始";
						}
						else{
							this.flag = false;
							this.text= "已过期";
						}
					}
					else{
						this.flag = false;
						this.text= "其他";
					}
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #23272C;
	}
</style>
<style lang="scss" scoped>
	@keyframes myfirst {
		0% {
			transform: rotatey(0deg)
		}

		25% {
			transform: rotatey(90deg)
		}

		50% {
			transform: rotatey(180deg)
		}

		75% {
			transform: rotatey(270deg)
		}

		100% {
			transform: rotatey(360deg)
		}
	}

	// @keyframes myfirst1
	// {
	// 	0%   { transform: rotatey(0deg)}
	// 	25%   { transform: rotatey(30deg)}
	// 	50%   { transform: rotatey(0deg)}
	// 	75%   { transform: rotatey(-30deg)}
	// 	100% { transform: rotatey(0deg)}
	// }

	.content {
		padding-bottom: 200rpx;

		.Box {
			width: 100%;
			height: 680rpx;
			padding-bottom: 50rpx;
			background: url(../../static/img/index/bj1.png) no-repeat left top;
			background-size: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			
			.videoBox{
				width: 630rpx;
				height: 473rpx;
				video{
					width: 100%;
					height: 100%;
				}
			}

			.rotateBox {
				width: 540rpx;
				height: 540rpx;
				animation: myfirst 10s linear 150ms 100;

				.image {
					width: 540rpx;
					height: 540rpx;
				}
			}
		}

		.Box1 {
			width: 100%;
			height: 360rpx;
			margin-top: -100rpx;
			padding-bottom: 30rpx;
			background: url(../../static/img/index/bj2.png) no-repeat top center;
			background-size: 620rpx;
			display: flex;
			justify-content: center;
			align-items: flex-end;

			.img {
				width: 84rpx;
				height: 152rpx;
				margin: 0 15rpx;
			}

			.center {
				max-width: 500rpx;
				height: 152rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.goodsName {
					color: #FFFFFF;
					font-size: 30rpx;
					text-align: center;
					overflow: hidden;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.LimitBox {
					// width: 200rpx;
					height: 40rpx;
					line-height: 40rpx;
					background: #4C464A;
					border-radius: 6rpx;
					font-size: 24rpx;
					text-align: center;

					.Limit {
						min-width: 60rpx;
						padding: 0 10rpx;
						border-radius: 6rpx;
						color: #010101;
						background-color: #F1E2BC;
					}

					.stock {
						min-width: 80rpx;
						padding: 0 10rpx;
						color: #F1E2BC;
					}
				}
			}
		}

		.banner {
			width: 100%;
			height: 500rpx;
			background-color: #23272C;

			.uni-swiper-wrapper {
				z-index: 10;
			}

			image {
				width: 100%;
				height: 500rpx;
			}
		}

		.msgBox {
			// background-color: #FFFFFF;
			background-color: #23272C;
			padding: 30rpx;

			.goodsName {
				// color: #333333;
				color: #FFFFFF;
				font-size: 36rpx;
				font-weight: 500;
				margin-bottom: 20rpx;
			}

			.category_name {
				height: 40rpx;
				line-height: 40rpx;
				font-size: 22rpx;
				padding: 0 15rpx;
				background: #F1E2BC;
				border-radius: 6rpx;
				color: #1E1817;
				margin-right: 20rpx;
			}

			.number {
				height: 40rpx;
				line-height: 40rpx;
				padding: 0 15rpx;
				border-radius: 20rpx;
				background-color: #FFDD9D;
				color: #8A683A;
				font-size: 20rpx;
				font-weight: 500;
			}

			.describe {
				color: #777777;
				font-size: 26rpx;
				line-height: 38rpx;
				font-weight: 500;
				margin-top: 20rpx;
			}

			.priceBox {
				// color: #AE3523;
				color: #FFFFFF;
				font-size: 24rpx;
				font-weight: 500;

				text {
					font-weight: 500;
					font-size: 36rpx;
					margin-left: 10rpx;
				}
			}

			.rule {
				// background: #F4F4F4;
				background: #383B3F;
				border-radius: 20rpx;
				padding: 20rpx;
				color: #777777;
				font-size: 24rpx;
				line-height: 34rpx;
				margin-top: 20rpx;

				.rule1 {
					color: #8A683A;
					margin-bottom: 10rpx;
				}
			}
		}

		.descBox {
			padding: 20rpx 30rpx;
			background-color: #23272C;
			color: #AAAAAA;

			.item {
				font-size: 26rpx;
				font-weight: 500;
				color: #FFFFFF;
				margin-bottom: 10rpx;
			}
		}

		.type1 .goodsinfo {
			padding: 0 30rpx;
			// background-color: #FFFFFF;
			background-color: #23272C;
			margin: 20rpx 0;

			.iptBox {
				padding: 20rpx 0;

				.label {
					width: 20%;
					font-size: 24rpx;
					color: rgba(255, 255, 255, 0.35);
				}

				.center {
					width: 75%;
					color: #AAAAAA;
					font-size: 24rpx;
					word-break: break-word;
					// line-height: 44rpx;
					display: flow-root;
					// position: relative;
					// display: f;
				}

				.copy {
					width: 44rpx;
					height: 44rpx;
					display: inline-block;
					// position: absolute;
					
				}
			}

			// .iptBox1 {
			// 	.center {
			// 		color: #333333;
			// 		font-weight: 500;
			// 	}
			// }
		}

		.footerBox {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 100;
			width: 100%;
			height: 120rpx;
			// background-color: #FFFFFF;
			background-color: rgba(0, 0, 0, 0.7);
			// box-shadow: 0rpx -4rpx 32rpx 0rpx rgba(180, 180, 180, 0.5);

			.price {
				// color: #AE3523;
				color: #FFFFFF;
				font-size: 40rpx;
				margin-left: 30rpx;
			}

			.count {
				color: #777777;
				font-size: 28rpx;
				margin-left: 30rpx;
			}

			.subBtn {
				width: 360rpx;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				font-weight: 500;
				// background: url(../../static/img/index/button.png) no-repeat;
				background: #00DB7D;
				border-radius: 44rpx;
				margin-right: 30rpx;
			}
			.subnrn1{
				background: #8c8c8c;
			}
		}

		.type2 .goodsList {
			// background-color: #FFFFFF;
			background-color: #23272C;
			padding: 0 28rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.goodsItem {
				width: 335rpx;
				margin-bottom: 20rpx;
				// background: #FFFFFF;
				background: #383B3F;
				border-radius: 12rpx;
				position: relative;

				.goodsImg {
					width: 100%;
					height: 300rpx;
					border-radius: 20rpx;
				}

				.mask {
					width: 100%;
					height: 300rpx;
					border-radius: 20rpx;
					background: rgba(0, 0, 0, 0.2);
					position: absolute;
					left: 0;
					top: 0;

					.maskImg {
						width: 170rpx;
						height: 170rpx;
					}
				}

				.goodsinfo {
					padding: 20rpx;

					.goodsName {
						font-size: 32rpx;
						font-weight: 500;
						// color: #333333;
						color: #FFFFFF;
						overflow: hidden;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						margin-bottom: 10rpx;
					}

					.coupon {
						width: 48rpx;
						height: 48rpx;
					}

					.price {
						// color: #AE3523;
						color: #FFFFFF;
						font-size: 26rpx;
						margin-right: 10rpx;

						text {
							font-size: 34rpx;
						}
					}

					.count {
						flex: 1;
						color: #777777;
						font-size: 24rpx;
						text-align: right;
					}
				}
			}
		}

	}
</style>
