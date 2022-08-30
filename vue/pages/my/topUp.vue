<template>
	<view class="content  container">
		<view class="WithdrawalWarp">
			<view class="WithdrawalBox flex_bt">
				<view class="left">
					<view class="label">当前余额 (元)</view>
					<view class="price">¥ <text>{{account}}</text></view>
				</view>
				<view class="record" @tap="go('topUpRecord')">充值记录</view>
			</view>
		</view>

		<view class="listItem listItem1">
			<view class="topic flexBox">
				<view class="line"></view>
				<view class="label">充值方式</view>
			</view>
			<view class="input_box">
				<radio-group @change="payTypeChange">
					<label class="item" v-for="(pay,index) in payList" :key="index">
						<radio style="transform:scale(0.7)" :value="pay.PayType" :checked="payType == pay.PayType"
						       color="#00DB7D" />
						<text>{{pay.name}}</text>
						<image v-if="pay.id == '2'" src="../../static/img/my/weixin.png" mode=""></image>
						<image v-if="pay.id == '1'" src="../../static/img/my/zhifubao.png" mode=""></image>
					</label>
				</radio-group>
			</view>
		</view>

		<view class="listItem">
			<view class="topic flexBox">
				<view class="line"></view>
				<view class="label">充值金额</view>
			</view>
			<view class="tabBox">
				<view @tap="show('10')" :class="number == '10' ? 'tab act' : 'tab'">充值10元</view>
				<view @tap="show('15')" :class="number == '15' ? 'tab act' : 'tab'">充值15元</view>
				<view @tap="show('50')" :class="number == '50' ? 'tab act' : 'tab'">充值50元</view>
				<view @tap="show('100')" :class="number == '100' ? 'tab act' : 'tab'">充值100元</view>
				<view @tap="show('500')" :class="number == '500' ? 'tab act' : 'tab'">充值500元</view>
			</view>
		</view>
		<view class="listItem2 flexBox">
			<view class="label">¥</view>
			<input class="inp" type="number" v-model="money" :placeholder="'最低充值金额为'+min+'元'"
				placeholder-class="inpclass" />
		</view>
		<!-- <view class="listItem3 flex_bt">
			<view class="">可提现金额 ¥{{account}}</view>
			<view class="all" @tap="money = account">全部提现</view>
		</view> -->

		<view @tap="submit" class="subBtn">立即充值</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '', //余额
				min: '', //最小
				number: '',
				money: '',
				payType: '',
				payList: [
					/* {
						id: 1,
						name: '支付宝'
					},
					{
						id: 2,
						name: '微信'
					} */
					
					// #ifdef APP-PLUS
					{
						id: 1,
						ImgUrl: '../../static/img/order/zhifubao.png',
						name: '支付宝',
						PayType: '2'
					},
					{
						id: 2,
						ImgUrl: '../../static/img/order/weixinzhifu.png',
						name: '微信',
						PayType: '6'
					},
					// #endif
					// #ifdef H5
					{
						id: 1,
						ImgUrl: '../../static/img/order/zhifubao.png',
						name: '支付宝',
						PayType: '4'
					},
					{
						id: 2,
						ImgUrl: '../../static/img/order/weixinzhifu.png',
						name: '微信',
						PayType: '5'
					}
					// #endif
				],
			}
		},
		onLoad(e) {
			this.getAccount();
		},
		watch: {
			"money": function(newVal, oldVal) {
				if (newVal) {
					this.number = newVal;
				}
			}
		},
		methods: {
			submit() {
				if (!this.payType) {
					this.toast("请选择充值方式");
					return;
				}
				if (!this.money) {
					this.toast("请输入充值金额");
					return;
				}
				let data = {
					account: this.money,
					type: this.payType
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
				this.$http.post('order/toUp', {
					pay_type: this.payType,
					money:this.money
				}).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						if (this.payType == 1) { // 余额支付
							uni.$emit('init')
							setTimeout(() => {
								uni.redirectTo({
									url: '../my/my'
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
			payTypeChange(e) {
				this.payType = e.target.value;
			},
			show(a) {
				this.number = a;
				this.money = a;
			},
			getAccount() {
				this.$http.get('draw/configDraw').then(res => {
					if (res.code == 1) {
						this.min = res.data.min
					} else {
						this.toast(res.msg);
					}
				})
				this.$http.get('account/account').then(res => {
					if (res.code == 1) {
						this.account = res.data[1].account;
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		padding-bottom: 60rpx;

		.WithdrawalWarp {
			padding: 30rpx 0 40rpx;

			.WithdrawalBox {
				width: 690rpx;
				height: 240rpx;
				border-radius: 20rpx;
				background: url(../../static/img/my/Withdrawal.png) no-repeat;
				background-size: 100%;
				margin: 0 auto;

				.left {
					margin-left: 40rpx;
					color: #2B2A2A;
					font-size: 28rpx;
				}

				.price {
					color: #2B2A2A;
					font-size: 40rpx;
					margin-top: 30rpx;

					text {
						font-size: 60rpx;
						margin-left: 10rpx;
					}
				}

				.record {
					width: 170rpx;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					color: #333;
					font-size: 28rpx;
					background: linear-gradient(270deg, rgba(240, 186, 85, 0.7) 0%, #F0BA55 100%);
					border-radius: 44rpx 0rpx 0rpx 44rpx;
				}
			}
		}

		.listItem1 {
			margin-bottom: 20rpx;
		}

		.listItem2 {
			padding: 0 30rpx;
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 2rpx solid #383B3F;
			font-size: 32rpx;
			color: #aaaaaa;

			.inpclass {
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #A6AFAE;
			}

			.inp {
				flex: 1;
				font-size: 28rpx;
				color: #000;
				margin-left: 20rpx;
			}
		}

		.listItem3 {
			padding: 0 30rpx;
			height: 88rpx;
			line-height: 88rpx;
			color: #aaaaaa;
			font-size: 24rpx;

			.all {
				color: #00DB7D;
				font-size: 28rpx;
			}
		}

		.listItem {
			padding: 0 30rpx;

			.topic {
				height: 88rpx;
				color: #000;
				font-size: 32rpx;

				.line {
					width: 8rpx;
					height: 28rpx;
					background-color: #00DB7D;
					border-radius: 4rpx;
					margin-right: 16rpx;
				}
			}

			.tabBox {
				display: flex;
				flex-wrap: wrap;

				.tab {
					width: 216rpx;
					height: 76rpx;
					line-height: 76rpx;
					text-align: center;
					border-radius: 12rpx;
					border: 2rpx solid #424242;
					color: #666;
					font-size: 28rpx;
					margin: 0 10rpx 20rpx 0;
				}

				.act {
					background: url(../../static/img/my/active.png) no-repeat;
					color: #00DB7D;
					border-radius: 12rpx;
					border-style: none;
					// border: 2rpx solid #00DB7D;
					background-size: 100% 100%;
				}
			}

			.input_box {
				.item {
					display: block;
					height: 100rpx;
					display: flex;
					align-items: center;
					color: aaaaaa;

					image {
						width: 44rpx;
						height: 44rpx;
						margin-left: 20rpx;
					}

					text {
						flex: 1;
						color: #666;
						font-size: 28rpx;
					}
				}
			}
		}

		.subBtn {
			width: 600rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #333333;
			font-size: 32rpx;
			font-weight: 500;
			margin: 60upx auto 0;
			background: #00DB7D;
			box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(174, 53, 35, 0.4);
		}
	}
</style>
