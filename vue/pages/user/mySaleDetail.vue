<template>
	<view class="content">
		<view class="bigbox">
			<view class="Box">
				<view class="rotateBox" :style="'background-image: url('+info.image+');background-size: 100% 100%'">
					<image class="image" src="../../static/img/index/bj3.png"></image>
				</view>
			</view>
			<view class="Box1">
				<image class="img" src="../../static/img/index/b1.png" mode=""></image>
				<view class="center">
					<view class="goodsName">{{info.name}}</view>
					<view class="flexBox LimitBox">
						<view class="Limit">限量</view>
						<view class="stock">{{info.surplus}}份</view>
					</view>
				</view>
				<image class="img" src="../../static/img/index/b2.png" mode=""></image>
			</view>

		</view>

		<view class="msgBox">
			<!-- <view class="goodsName">{{info.name}}</view> -->
			<view class="priceBox">当前价: <text>¥{{info.price}}</text> </view>
			<view class="describe">{{info.title}}</view>
		</view>
		<view class="goodsinfo">
			<view class="iptBox  flexBox">
				<view class="label">创作者</view>
				<view class="center">{{info.creator}}
					<!-- <image class="copy" src="../../static/img/my/copy.png" mode=""></image> -->
				</view>
			</view>
			<view class="iptBox flexBox">
				<view class="label">拥有者</view>
				<view class="center">
					<text>{{info.owner}}</text>
					<image class="copy" @tap="copy(info.owner)" src="../../static/img/my/copy.png" mode=""></image>
				</view>
			</view>
			<view class="iptBox iptBox1 flexBox">
				<view class="label">铸造平台</view>
				<view class="center">{{info.casting_name}}</view>
			</view>
			<view class="iptBox iptBox1 flexBox">
				<view class="label">铸造时间</view>
				<view class="center">{{info.casting_time}}</view>
			</view>
			<view class="iptBox iptBox1" v-if="info.number">
				<view class="label">藏品编号</view>
				<view class="center">
					{{info.number}}
				</view>
			</view>
			<!-- <view class="iptBox iptBox1 flexBox">
				<view class="label">合约地址</view>
				<view class="center"> {{info.contract_address}}
					<image class="copy"  @tap="copy(info.contract_address)" src="../../static/img/my/copy.png" mode=""></image>
				</view>
			</view> -->
			<!-- <view class="iptBox iptBox1">
				<view class="label">区块链</view>
				<view class="center">
					{{info.blockchain}}
					<image v-if="info.blockchain" class="copy" @tap="copy(info.blockchain)"
						src="../../static/img/my/copy.png" mode=""></image>
				</view>
			</view> -->
		</view>
		<view class="descBox" v-if="info.content">
			<view class="item">藏品介绍</view>
			<view class="desinfo" v-html="util.checkImg(info.content)"></view>
		</view>
		<view class="footerBox flex_bt">
			<view class="subBtn subBtn1" @tap="openSalePopup()">修改信息</view>
			<view class="subBtn" v-if="info.status == 2 && info.is_show == 1" @tap="offSale('0')">下 架</view>
			<view class="subBtn subBtn1" v-if="info.status == 2 && info.is_show == 0" @tap="offSale('1')">上 架</view>
		</view>

		<uni-popup ref="salePopup" type="center" :mask-click="false">
			<view class="specs_boxs">
				<view class="flex">
					<input type="digit" v-model="price" class="ipt" placeholder-class="iptP" placeholder="请输入商品价格" />
				</view>
				<view class="btnBox flex">
					<view class="btn" @tap="closeSalePopup()">取消</view>
					<view class="btn btn1" @tap="modifyPrice()">确定</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId: '',
				banner: {},
				info: {},
				msg: '',
				price: '',
				saleFlag: false
			}
		},
		onLoad(e) {
			this.goodsId = e.goodsId;
			this.getData();
		},
		onShow() {},
		methods: {
			openSalePopup() {
				this.saleFlag = true;
				this.$refs.salePopup.open();
			},
			closeSalePopup() {
				this.price = '';
				this.saleFlag = false;
				this.$refs.salePopup.close();
			},
			modifyPrice() { //修改信息
				if (!this.price) {
					this.toast('请输入商品价格');
					return;
				}
				let data = {
					id: this.goodsId,
					price: this.price
				}
				this.$http.post('order/checkPrice', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						this.closeSalePopup();
						setTimeout(() => {
							this.getData()
						}, 600)
					} else {
						this.toast(res.msg)
					}
				})
			},
			offSale(a) { // 下 架 上 架
				if (this.saleFlag) {
					this.closeSalePopup();
				}
				if (a == '1') {
					this.msg = '确认上架？'
				} else {
					this.msg = '确认下架？'
				}
				this.confirm('提示', this.msg, () => {
					let data = {
						id: this.goodsId,
						is_show: a
					}
					this.$http.post('order/checkShow', data).then(res => {
						if (res.code == 1) {
							this.toast(res.msg);
							setTimeout(() => {
								this.getData()
							}, 600)
						} else {
							this.toast(res.msg)
						}
					})
				})
			},
			getData() {
				this.$http.get('order/collectionDetail', {
					id: this.goodsId
				}).then(res => {
					if (res.code == 1) {
						this.banner = res.data.images;
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

	.content {
		padding-bottom: 200rpx;

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
			margin-top: -120rpx;
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
					height: 40rpx;
					line-height: 40rpx;
					background: #4C464A;
					border-radius: 6rpx;
					font-size: 12px;
					text-align: center;

					.Limit {
						width: 60rpx;
						padding: 0 10rpx;
						border-radius: 6rpx;
						color: #010101;
						background-color: #F1E2BC;
					}

					.stock {
						padding: 0 10rpx;
						color: #F1E2BC;
					}
				}
			}
		}

		.specs_boxs {
			padding: 50rpx 0 10rpx;
			width: 600rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			margin: 0 auto;

			.ipt {
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #333;
				background-color: #F7F7F7;
				padding-left: 30rpx;
				margin: 0 30rpx;
			}

			.iptP {
				color: #777777;
				font-weight: 400;
			}

			.btnBox {
				margin-top: 20rpx;

				.btn {
					flex: 1;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 30rpx;

				}

				.btn1 {
					color: #427AFC;
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
			background-color: #fff;
			padding: 30rpx;

			.goodsName {
				color: #000;
				font-size: 36rpx;
				font-weight: 500;
				margin-bottom: 20rpx;
			}

			.describe {
				color: #AAAAAA;
				font-size: 24rpx;
				line-height: 36rpx;
				font-weight: 500;
				margin-top: 20rpx;
			}

			.priceBox {
				color: #000;
				font-size: 24rpx;
				font-weight: 500;

				text {
					font-weight: 500;
					font-size: 36rpx;
					margin-left: 10rpx;
				}
			}
		}

		.descBox {
			padding: 20rpx 30rpx;
			background-color: #fff;
			color: #aaa;

			.item {
				font-size: 26rpx;
				font-weight: 500;
				color: #000;
				margin-bottom: 10rpx;
			}
		}

		.goodsinfo {
			padding: 0 30rpx;
			background-color: #fff;
			margin: 20rpx 0;

			.iptBox {
				padding: 20rpx 0;
				border-bottom: 1rpx solid #F0F0F0;

				.label {
					width: 20%;
					font-size: 24rpx;
					color: #000;
				}

				.center {
					width: 75%;
					color: #000;
					font-size: 24rpx;
					line-height: 44rpx;
					word-break: break-word;
					display: block;
					position: relative;
				}

				.copy {
					width: 44rpx;
					height: 44rpx;
					position: absolute;
					bottom: 0;
					right: 0;
				}
			}

			.iptBox1 {
				.center {
					color: #000;
					font-weight: 500;
				}
			}
		}

		.footerBox {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 10;
			width: 100%;
			height: 120rpx;
			background-color: #fff;
			box-shadow: 0rpx -4rpx 32rpx 0rpx rgba(180, 180, 180, 0.5);

			.subBtn {
				width: 320rpx;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				color: #fff;
				font-size: 32rpx;
				font-weight: 500;
				background: #00DB7D;
				border-radius: 44rpx;
				margin: 0 30rpx;
			}

			.subBtn1 {
				background: #fff;
				color: #00DB7D;
				border: 2rpx solid #00DB7D;
			}
		}

	}
</style>
