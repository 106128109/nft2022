<template>
	<view class="content">
		<view class="goodsInfo">
			<view class="goodsItem flex">
				<image class="goodImg" :src="goodsInfo.goods_image" mode=""></image>
				<view class="msgBox">
					<view class="goodName">{{goodsInfo.goods_name}}</view>
					<view class="price"><text class="size-26">¥ </text>{{goodsInfo.price}}元 </view>
				</view>
			</view>
			<view class="orderNumber" style="border-bottom: 1rpx solid #ffffff;">订单号：<text
					class="black">{{goodsInfo.order_num}}</text></view>
			<view class="orderNumber">下单时间：<text class="black">{{goodsInfo.create_time}}</text></view>
		</view>


		<view class="Payment">支付方式</view>
		<view class="input_box">
			<radio-group @change="payTypeChange">
				<label class="item" v-for="(pay,index) in payList" :key="index">
					<!-- <image :src="pay.ImgUrl" mode=""></image> -->
					<text class="black">{{pay.PayName}}</text>
					<radio style="transform:scale(0.7)" :value="pay.PayType" :checked="payType == pay.PayType"
						color="#00DB7D" />
				</label>
			</radio-group>
		</view>

		<view @tap="submit" class="subBtn">确认支付</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 
				// #ifdef APP-PLUS
				{
					ImgUrl: '../../static/img/order/zhifubao.png',
					PayName: '支付宝',
					PayType: '2'
				},
				{
					ImgUrl: '../../static/img/order/weixinzhifu.png',
					PayName: '微信',
					PayType: '6'
				},
				// #endif
				
				// #ifdef H5
				{
					ImgUrl: '../../static/img/order/zhifubao.png',
					PayName: '支付宝',
					PayType: '4'
				},
				{
					ImgUrl: '../../static/img/order/weixinzhifu.png',
					PayName: '微信',
					PayType: '5'
				}
				// #endif
				
				// #ifdef MP
				{
					ImgUrl: '../../static/img/order/weixinzhifu.png',
					PayName: '微信',
					PayType: '6'
				}
				// #endif
				 */
				payList: [{
						ImgUrl: '../../static/img/order/zhifubao.png',
						PayName: '余额',
						PayType: '1'
					},

				],
				goodsInfo: {},
				payType: "",
				orderOID: "", //订单号
				is_market: 0
			};
		},
		onLoad(e) {
			if (e.orderId) {
				this.orderOID = e.orderId;
				this.getOrder();
			}
			if (e.is_market) {
				this.is_market = e.is_market;
			}
		},
		methods: {
			payTypeChange(e) {
				console.log(e.target.value);
				this.payType = e.target.value;
			},
			getOrder(a) {
				this.$http.post('order/orderDetail', {
					id: this.orderOID
				}).then(res => {
					if (res.code == 1) {
						this.goodsInfo = res.data
					}
				})
			},
			weixinPay(orderInfo) {
				// #ifdef MP-WEIXIN
				uni.requestPayment({ //微信小程序支付测试成功
					provider: 'wxpay',
					timeStamp: orderInfo.timeStamp,
					nonceStr: orderInfo.nonceStr,
					package: orderInfo.package,
					paySign: orderInfo.paySign,
					signType: 'MD5',
					success: (res) => {
						this.toast('支付成功');
						uni.$emit('init')
						setTimeout(() => {
							uni.redirectTo({
								url: './orderList'
							});
						}, 800)
					},
					fail: (err) => {
						this.toast('支付失败');
						console.log('fail1:' + JSON.stringify(err));
					}
				});
				// #endif
				// #ifdef APP-PLUS
				uni.requestPayment({
					"provider": "wxpay",
					"orderInfo": {
						"appid": orderInfo.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
						"noncestr": orderInfo.noncestr, // 随机字符串
						"package": orderInfo.package, // 固定值
						"partnerid": orderInfo.partnerid, // 微信支付商户号
						"prepayid": orderInfo.prepayid, // 统一下单订单号 
						"timestamp": orderInfo.timestamp, // 时间戳（单位：秒）
						"sign": orderInfo.sign // 签名，这里用的 MD5 签名
					},
					success: (res) => {
						this.toast('支付成功');
						uni.$emit('init')
						setTimeout(() => {
							uni.redirectTo({
								url: './orderList'
							});
						}, 800)
					},
					fail: (e) => {
						this.toast('支付失败');
						console.log('fail2:' + JSON.stringify(e));
					}
				})
				// #endif
			},
			aliPay(a) {
				// #ifdef APP-PLUS
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: a,
					success: (e) => {
						this.toast('支付成功');
						uni.$emit('init')
						setTimeout(() => {
							uni.redirectTo({
								url: './orderList'
							});
						}, 800)
					},
					fail: (e) => {
						console.log("fail", e);
						this.toast('支付失败');
					}
				})
				// #endif
			},
			submit() {
				if (!this.payType) {
					this.toast("请选择支付方式");
					return;
				}
				// #ifdef MP-WEIXIN
				if (uni.getStorageSync("wx_auth") != 1) {
					this.toast("未授权");
					wx.getUserProfile({
						desc: '获取用户基本信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
						success: (res) => {
							uni.login({
								success: (res) => {
									if (res.errMsg == "login:ok") {
										this.$http.post('user/wxSmallAuth', {
											code: res.code
										}).then(res => {
											uni.setStorageSync('wx_auth', 1)
											this.pay()
										})
									} else {
										uni.showToast({
											title: '授权用户信息失败',
											icon: "none"
										})
									}
								}
							})
						},
						fail: () => {
							uni.showToast({
								title: '授权用户信息失败',
								icon: "none"
							})
						}
					})
				} else {
					this.pay()
				}
				// #endif

				// #ifndef MP-WEIXIN
				this.pay()
				// #endif
			},
			pay() {
				let data = {
					order_id: this.orderOID,
					pay_type: this.payType
				}
				if (this.is_market == 1) {
					data.is_market = this.is_market;
				}
				this.$http.post('order/pay', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						if (this.payType == 1) { // 余额支付
							uni.$emit('init')
							setTimeout(() => {
								uni.redirectTo({
									url: '../order/orderList'
								});
							}, 1000)
						} else if (this.payType == 2) { //支付宝 app
							this.aliPay(res.data.pay);
						} else if (this.payType == 4) { //支付宝 h5
							const div = document.createElement('div')
							div.innerHTML = res.data.pay;
							document.body.appendChild(div)
							document.forms['alipay_submit'].submit();
						} else if (this.payType == 3 || this.payType == 6) { //微信支付
							this.weixinPay(res.data.pay);
						} else if (this.payType == 5) {
							window.location.href = res.data.pay;
						}
					} else {
						this.toast(res.msg);
					}
				})

			},
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 30rpx 0;

		.goodsInfo {
			padding: 50rpx 28rpx 20rpx;

			.orderNumber {
				height: 92rpx;
				line-height: 92rpx;
				color: #333333;
				font-size: 26rpx;
				font-weight: 500;
				background: #F0F0F0;
				border-radius: 10rpx;
				padding: 0 28rpx;
				display: flex;
				justify-content: space-between;
			}
		}

		.goodsItem {
			padding-bottom: 30rpx;

			.goodImg {
				width: 200rpx;
				height: 200rpx;
				margin-right: 20rpx;
				border-radius: 20rpx;
			}

			.msgBox {
				flex: 1;
				font-size: 26rpx;
				font-weight: 500;

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

				.price {
					color: #DFA35A;
					font-size: 32rpx;
					margin-bottom: 20rpx;
				}

			}
		}

		.Payment {
			font-size: 30rpx;
			font-weight: 500;
			color: #000000;
			line-height: 60rpx;
			padding-left: 30rpx;
			margin: 42rpx 0 20rpx;
		}

		.input_box {
			margin: 0 30rpx;
			color: #C4C6C6;

			.item {
				display: block;
				margin-top: 10rpx;
				// box-shadow: 0px 0px 9rpx 1rpx rgba(61, 61, 61, 0.1);
				border-radius: 20rpx;
				background-color: #F0F0F0;
				height: 36rpx;
				padding: 18rpx 38rpx;
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #333333;

				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 20rpx;
				}

				.rememberIcon {
					width: 30rpx;
					height: 30rpx;
				}

				text {
					flex: 1;
					font-size: 26rpx;
					font-weight: 500;
					color: #000000;
				}
			}
		}

		.subBtn {
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #333333;
			font-size: 30rpx;
			font-weight: 500;
			background: #00DB7D;
			margin: 100rpx auto;
		}
	}
</style>
