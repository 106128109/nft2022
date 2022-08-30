<template>
	<view class="content">
		<view class="tBox">
			<view class="msg">请输入验证码</view>
			<view class="sMsg">验证码已发送至：{{mobile}}</view>
		</view>
			<view class="iptWarp">
				<input class="ipt" v-model="code" type="number" maxlength="6" value="" />
				<view class="box flex">
					<view :class="code.length >= 1 ? 'itemBox act' : 'itemBox ' ">{{code.substring(0,1)}}</view>
					<view :class="code.length >= 2 ? 'itemBox act' : 'itemBox ' ">{{code.substring(1,2)}}</view>
					<view :class="code.length >= 3 ? 'itemBox act' : 'itemBox ' ">{{code.substring(2,3)}}</view>
					<view :class="code.length >= 4 ? 'itemBox act' : 'itemBox ' ">{{code.substring(3,4)}}</view>
					<view :class="code.length >= 5 ? 'itemBox act' : 'itemBox ' ">{{code.substring(4,5)}}</view>
					<view :class="code.length >= 6 ? 'itemBox act' : 'itemBox ' ">{{code.substring(5,6)}}</view>
				</view>
			</view>
		
		<view @tap="sub" :class="( code ) ? 'subBtn' : 'subBtn noBtn' " >下一步</view>
		<view v-if="time > 0" class="findBtn"><text>{{time}}秒</text>后可重新获取验证码</view>
		<view v-else class="findBtn" @tap="getCode">重新发送</view>
		

	</view>
</template>

<script>
	let t;
	export default {
		data() {
			return {
				mobile: '',
				time: '',
				code: '',
			}
		},
		onShow() {
		},
		onLoad(e) {
			this.mobile = e.mobile;
			this.time = e.time;
			t = setInterval(() => {
				if (this.time > 0) {
					this.time--;
				} else {
					clearInterval(t);
				}
			}, 1000)
		},
		methods: {
			getCode(){
				this.$http.post('login/sendCode', {
					phone: this.mobile,
					type: '2'
				}).then(res => {
					if(res.code == 1){
						this.toast(res.msg)
						this.tim = 60;
						a = setInterval(() => {
							if (this.time > 0) {
								this.time--;
							} else {
								clearInterval(a);
							}
						}, 1000)
					} else{
						this.toast(res.msg)
					}
				})
			},
			sub() {
				if (!this.code) {
					this.toast('请输入短信验证码');
					return;
				}
				this.$http.post('login/validateCode', {
					phone: this.mobile,
					code: this.code
				}).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						setTimeout(() => {
							uni.navigateTo({
								url: './findPsd3?code=' + this.code + '&mobile=' + this.mobile
							})
						}, 1000);
					
					} else {
						this.toast(res.msg);
					}
				})
				
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 40rpx;
		.tBox {
			padding-top: 60rpx;
			.msg {
				font-size: 50rpx;
				margin-bottom: 20rpx;
				font-weight: 500;
				color: #000;
			}
			.sMsg {
				font-size: 24rpx;
				margin-bottom: 100rpx;
				color: #000;
			}
		}
		.iptWarp {
			position: relative;
			height: 100rpx;
			text-align: center;
		
			.ipt {
				position: absolute;
				opacity: 0;
				width: 100%;
				height: 100%;
			}
		
			.box {
				.itemBox {
					flex: 1;
					height: 100rpx;
					line-height: 100rpx;
					margin: 0 10rpx;
					border-bottom: 2rpx solid #000;
					color: #000;
					&.act {
						border-bottom: 2rpx solid #AE3523;
					}
				}
			}
		}

		.subBtn {
			width: 630rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			background: #FFF1AC;
			border-radius: 50rpx;
			color: #000000;
			font-size: 32rpx;
			margin: 100rpx auto 0;
			// box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(174, 53, 35, 0.4);
			/* &.noBtn {
				background: rgba(174, 53, 35, 0.4);
			} */
		}

		.findBtn {
			font-size: 24rpx;
			text-align: right;
			color: #000;
			height: 100rpx;
			line-height: 100rpx;
			margin-top: 30rpx;

			text {
				padding: 10rpx;
				color: #AE3523;
			}
		}
	}
</style>
