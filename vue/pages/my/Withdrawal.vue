<template>
	<view class="content  container">
		<view class="WithdrawalWarp">
			<view class="WithdrawalBox flex_bt">
				<view class="left">
					<view class="label">当前余额 (元)</view>
					<view class="price">¥ <text>{{account}}</text></view>
				</view>
				<view class="record" @tap="go('WithdrawRecords')">提现记录</view>
			</view>
		</view>

		<view class="listItem listItem1">
			<view class="topic flexBox">
				<view class="line"></view>
				<view class="label">提现方式</view>
			</view>
			<view class="input_box">
				<radio-group @change="payTypeChange">
					<label class="item" v-for="(pay,index) in payList" :key="index">
						<radio style="transform:scale(0.7)" :value="pay.id.toString()" :checked="payType == pay.id"
							color="#00DB7D" />
						<text>{{pay.name}}</text>
						<image v-if="pay.id == '3'" src="../../static/img/my/weixin.png" mode=""></image>
						<image v-if="pay.id == '2'" src="../../static/img/my/zhifubao.png" mode=""></image>
					</label>
				</radio-group>
			</view>
		</view>

		<view class="listItem">
			<view class="topic flexBox">
				<view class="line"></view>
				<view class="label">提现金额<text style="color:#00DB7D;font-size:28rpx;margin-left: 20rpx;">(按{{txRate}}%收取手续费)</text></view>
			</view>
			<!-- <view class="tabBox">
				<view @tap="show('10')" :class="number == '10' ? 'tab act' : 'tab'">提现10元</view>
				<view @tap="show('15')" :class="number == '15' ? 'tab act' : 'tab'">提现15元</view>
				<view @tap="show('50')" :class="number == '50' ? 'tab act' : 'tab'">提现50元</view>
				<view @tap="show('100')" :class="number == '100' ? 'tab act' : 'tab'">提现100元</view>
				<view @tap="show('500')" :class="number == '500' ? 'tab act' : 'tab'">提现500元</view>
			</view> -->
		</view>
		<view class="listItem2 flexBox">
			<view class="label">¥</view>
			<input class="inp" type="number" v-model="money" 
			:placeholder="'最低提现金额为'+min+'元'"  placeholder-class="inpclass" />
		</view>
		<view class="listItem3 flex_bt">
			<view class="">可提现金额 ¥{{account}}</view>
			<view class="all" @tap="money = account">全部提现</view>
		</view>

		<view @tap="submit" class="subBtn">立即提现</view>
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
				payList: [{
					id: 1,
					name: '银行卡'
				}, {
					id: 2,
					name: '支付宝'
				}, {
					id: 3,
					name: '微信'
				}],
				txRate: ""
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
					this.toast("请选择提现方式");
					return;
				}
				if (!this.money) {
					this.toast("请输入提现金额");
					return;
				}
				let data = {
					account: this.money,
					type: this.payType
				}
				this.$http.post('draw/draw', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						setTimeout(() => {
							uni.redirectTo({
								url:'WithdrawRecords'
							})
						}, 1000)
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
						this.txRate = res.data.rate
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
					color:#2B2A2A;
					font-size: 28rpx;
				}

				.price {
					color:#2B2A2A;
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
			.inpclass{
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
					border: 1rpx solid #C9C9C9;
					color: #A6AFAE;
					font-size: 28rpx;
					margin: 0 10rpx 20rpx 0;
				}

				.act {
					background: url(../../static/img/my/active.png) no-repeat;
					color: #00DB7D;
					border-radius: 12rpx;
					// border: 2rpx solid #00DB7D;
					background-size: 100%  100%;
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
						color: #aaaaaa;
						font-size: 28rpx;
					}
				}
			}
		}

		.subBtn {
			margin: 30rpx 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #333333;
			font-size: 28rpx;
			font-weight: 500;
			background: #00DB7D;
			box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(174, 53, 35, 0.4);
		}
	}
</style>
