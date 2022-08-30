<template>
	<view class="content">
		<view class="storeBox">
			<view class="goodsItem flex">
				<image class="goodImg" :src="goodsInfo.image" mode=""></image>
				<view class="msgBox">
					<view class="goodName">{{goodsInfo.name}}</view>
					<view class="flex_bt">
						<view class="label" v-if="goodsInfo.label">{{goodsInfo.label}}</view>
						<view class="price">¥ {{goodsInfo.price}}元 </view>
					</view>
				</view>
			</view>
		</view>

		<view class="footerBox flex_bt">
			<view class="TotalMoney">
				<text>合计：</text>
				<text class="price red">¥ {{goodsInfo.price}}元 </text>
			</view>
			<view @tap="submit()" class="subBtn">提交订单</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: {}, //商品详情
				goodsId: '',
				type: ''
			}
		},
		onLoad(e) {
			this.goodsId = e.goodsId;
			this.type = e.type;
			this.getInfo();
		},
		methods: {
			submit() {
				if (this.type == 'second') {
					this.$http.post('order/memberApply', {
						id: this.goodsId,
					}).then(res => {
						if (res.code == 1) {
							// this.toast(res.msg);
							setTimeout(() => {
								uni.redirectTo({
									url: '../order/orderPayMoney?orderId=' + res.data.order_id +
										'&is_market=' + 1
								});
							}, 1000)
						} else {
							this.toast(res.msg);
						}
					})

				} else {
					this.$http.post('order/apply', {
						id: this.goodsId,
					}).then(res => {
						if (res.code == 1) {
							// this.toast(res.msg);
							setTimeout(() => {
								uni.redirectTo({
									url: '../order/orderPayMoney?orderId=' + res.data.order_id
								});
							}, 1000)
						} else {
							this.toast(res.msg);
						}
					})
				}
			},
			getInfo() { //商品详情
				if (this.type == 'second') { //二手商品
					this.$http.get('order/memberGoodsDetail', {
						id: this.goodsId
					}).then(res => {
						if (res.code == 1) {
							this.goodsInfo = res.data;
						} else {
							this.toast(res.msg);
						}
					})
				} else {
					this.$http.get('goods/goodsDetail', {
						id: this.goodsId
					}).then(res => {
						if (res.code == 1) {
							this.goodsInfo = res.data;
						} else {
							this.toast(res.msg);
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 30rpx;

		.storeBox {
			background-color: #ffffff;

			.goodsItem {
				margin: 0 30rpx;
				padding: 20rpx 0;

				.goodImg {
					width: 200rpx;
					height: 200rpx;
					margin-right: 20rpx;
				}
			}

			.msgBox {
				flex: 1;

				.goodName {
					color: #000000;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 40rpx;
					overflow: hidden;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					margin-bottom: 40rpx;
				}

			}

			.price {
				color: #DFA35A;
				font-size: 26rpx;
				font-weight: 500;
				font-family: PingFangSC-Medium;

				text {
					font-size: 32rpx;
				}
			}

			.label {
				height: 40rpx;
				line-height: 40rpx;
				font-size: 20rpx;
				padding: 0 15rpx;
				background-color: #8A683A;
				border-radius: 20rpx;
				color: #FFDD9D;
			}
		}

		.footerBox {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 100;
			width: 100%;
			height: 120rpx;
			background-color: #ffffff;
			box-shadow: 0rpx -4rpx 32rpx 0rpx rgba(180, 180, 180, 0.5);

			.TotalMoney {
				margin-left: 30rpx;
				color: #000000;
				font-size: 24rpx;
				font-weight: 500;

				.price {
					color: #000000;
					font-size: 32rpx;
				}
			}

			.subBtn {
				width: 360rpx;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				color: #333333;
				font-size: 32rpx;
				font-weight: 500;
				// background: url(../../static/img/index/button.png) no-repeat;
				background: #00DB7D;
				border-radius: 44rpx;
				background-size: 100%;
				margin-right: 30rpx;
			}
		}

	}
</style>
