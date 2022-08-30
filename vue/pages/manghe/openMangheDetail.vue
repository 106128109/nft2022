<template>
	<view class="container">
		<view class="content">
			<view class="bigbox">
				<view class="Box">
					<view class="rotateBox" :style="'background-image: url('+info.image+');background-size: 100% 100%'">
						<image class="image" src="../../static/img/index/bj3.png"></image>
					</view>
				</view>
			</view>


			<view class="type1">
				<view class="msgBox">
					<view class="goodsName">{{info.name}}</view>
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
					<view class="price">剩余盲盒个数:<text class="no_open">{{info.no_open}}</text></view>
					<view class="subBtn " v-if="info.no_open" @tap="openManghe()">立即开启</view>
					<view class="subBtn subnrn1" v-else>已开完</view>
				</view>
			</view>
			<uni-popup ref="popup" class="win_popup" type="center" :mask-click="false" :animation="false">
				<view class="popup-content">
					<view class="close" @tap="closeManghe"></view>
					<view class="manghe_content">
						<image class="image" :src="winInfo.goods_image"></image>
						<view class="desc" v-if="winInfo.is_win">{{winInfo.goods_name}}</view>
						<view v-else class="no_win">再接再厉!</view>
						<view class="view_btn" @tap="gotoMangheDetail" v-if="winInfo.is_win">查看详情</view>
					</view>
				</view>
			</uni-popup>
		</view>
		<view class="mask" v-if="is_mask"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId: '',
				info: {},
				fullscreen: true,
				winInfo: {},
				isWin: false,
				is_mask: false
			}
		},
		onLoad(e) {
			this.isWin = false;
			this.goodsId = e.goodsId;
			this.getData();
			const that = this
			uni.$on('init', () => {
				this.getData();
			})
		},
		onShow() {
			this.info = {};
			this.isWin = false;
			this.is_mask = false;
			this.getData();
		},
		methods: {
			openManghe() {
				this.is_mask = true;
				this.$http.post('manghe/openManghe', {
					goodsId: this.goodsId
				}).then(res => {
					if (res.code == 1) {
						this.getData();
						this.winInfo = res.data;
						this.$refs.popup.open('center')
					} else {
						this.toast(res.msg);
					}
				}).catch((res) => {
					this.is_mask = false;
				})
			},
			closeManghe() {
				this.$refs.popup.close()
				this.is_mask = false;
			},
			gotoMangheDetail() {
				this.$refs.popup.close();
				this.go('goodsMangheDetail?goodsId=' + this.winInfo.combination_goods_id + "&type=open");
			},
			getData() {
				this.$http.get('manghe/goodsMangheDetail', {
					id: this.goodsId
				}).then(res => {
					if (res.code == 1) {
						this.info = res.data;
					}
				})
			}
		}
	}
</script>
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
	.container {
		height: 100%;
		width: 100%;
		position: relative;
	}

	.mask {
		height: 100%;
		width: 100%;
		background-color: #00000066;
		position: absolute;
		opacity: 1;
		top: 0;
	}

	.content {
		padding-bottom: 200rpx;

		.popup-content {
			width: 570rpx;
			height: 570rpx;
			background-image: url(../../static/img/manghe/bg.png);
			background-size: 100% auto;
			background-repeat: no-repeat;
			position: relative;
			top: -100rpx;

			.close {
				width: 50rpx;
				height: 50rpx;
				background-image: url(../../static/img/manghe/close.png);
				background-size: 100% auto;
				background-repeat: no-repeat;
				position: absolute;
				right: 0rpx;
				top: -40rpx;
			}

			.manghe_content {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.image {
					width: 60%;
					height: 280rpx;
					margin-top: 100rpx;

				}

				.no_win {
					font-size: 32rpx;
					color: #fff;
					padding: 80rpx 0rpx 20rpx 20rpx;
				}

				.desc {
					color: #fff;
					font-size: 28rpx;
					padding: 20rpx 0rpx;
				}

				.view_btn {
					border-radius: 20px;
					background-color: #00D18B;
					width: 320rpx;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					color: #333;
				}
			}
		}

		.bigbox {
			background: url(../../static/img/index/bg.jpg) no-repeat left top;
			background-size: 100%;
			background-color: #000;
		}

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
			perspective: 1000;
			-webkit-perspective: 1000;

			.videoBox {
				width: 630rpx;
				height: 473rpx;

				video {
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

		.type1 {
			width: 100%;
			// position: absolute;
			// bottom: 150rpx;
		}

		.msgBox {
			background-color: #FFFFFF;
			/* background-color: #23272C; */
			padding: 30rpx;

			.goodsName {
				// color: #333333;
				color: #000;
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
				color: #000;
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
			/* background-color: #23272C; */
			color: #000;

			.item {
				font-size: 32rpx;
				font-weight: 500;
				color: #000;
				margin-bottom: 10rpx;
			}

			.desinfo {
				font-size: 26rpx;
			}
		}

		.footerBox {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 2;
			width: 100%;
			height: 120rpx;
			background-color: #FFFFFF;
			// background-color: rgba(0, 0, 0, 0.7);
			box-shadow: 0rpx -4rpx 32rpx 0rpx rgba(180, 180, 180, 0.5);

			.price {
				// color: #AE3523;
				color: #000;
				font-size: 32rpx;
				margin-left: 30rpx;

				.no_open {
					color: red;
					margin-left: 30rpx;
				}
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
				color: #fff;
				font-weight: 500;
				// background: url(../../static/img/index/button.png) no-repeat;
				background: #00DB7D;
				border-radius: 44rpx;
				margin-right: 30rpx;
			}

			.subnrn1 {
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
