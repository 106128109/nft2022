<template>
	<view class="content">
		<view class="tBox">
			<view class="msg">设置新密码</view>
			<view class="sMsg">您可以使用设置的密码登录您的{{mobile}}</view>
		</view>
		
		<view class="iptItem">
			<view class="iptBox flexBox" v-if="!flag">
				<input v-model="password"  type="password" placeholder="请输入新密码" class="ipt" placeholder-class="iptP" />
				<image @tap="flag=!flag" class="rightIcon" src="../../static/img/nosee.png" mode=""></image>
			</view>
			<view class="iptBox flexBox" v-if="flag">
				<input v-model="password"  type="text" placeholder="请输入新密码" class="ipt" placeholder-class="iptP" />
				<image @tap="flag=!flag" class="rightIcon" src="../../static/img/see.png" mode=""></image>
			</view>
		</view>
		
		<view class="iptItem">
			<view class="iptBox flexBox" v-if="!flag1">
				<input v-model="password_re"  type="password" placeholder="请确认密码" class="ipt" placeholder-class="iptP" />
				<image @tap="flag1=!flag1" class="rightIcon" src="../../static/img/nosee.png" mode=""></image>
			</view>
			<view class="iptBox flexBox" v-if="flag1">
				<input v-model="password_re"  type="text" placeholder="请确认密码" class="ipt" placeholder-class="iptP" />
				<image @tap="flag1=!flag1" class="rightIcon" src="../../static/img/see.png" mode=""></image>
			</view>
		</view>

		<view @tap="sub" :class="( password && password_re ) ? 'subBtn' : 'subBtn noBtn' " >完 成</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				password:'',
				password_re: '',
				flag:false,
				flag1:false
			}
		},
		onShow() {
		},
		onLoad(e) {
			if (e.mobile) {
				this.mobile = e.mobile;
			}
		},
		methods: {
			sub() {
				if (!this.password) {
					this.toast('请输入新密码');
					return;
				}
				if (!this.password_re) {
					this.toast('请确认密码');
					return;
				}
				if (this.password_re != this.password) {
					this.toast('两次密码输入不一致');
					return;
				}
				const data = {
					phone: this.mobile,
					password: this.password,
					password_re:this.password_re
				};
				this.$http.post('login/forgetPassword', data).then(res => {
					if(res.code == 1){
						this.toast(res.msg);
						setTimeout(() => {
							uni.reLaunch({
								url: './login'
							})
						}, 1000)
					} else{
						this.toast(res.msg)
					}
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 30rpx;
		.tBox{
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

		.iptItem {
			margin-bottom: 40rpx;
			.label {
				color: #000;
				font-size: 26rpx;
				font-weight: 500;
				margin-bottom: 20rpx;
			}
		
			.iptBox {
				padding: 0 30rpx;
				// background: #383B3F;
				height: 112rpx;
				// border-radius: 56rpx;
				font-size: 32rpx;
				border-bottom: 1rpx solid #58584A;
				.rightIcon{
					width: 48rpx;
					height: 48rpx;
					padding: 10rpx;
				}
		
				.ipt {
					flex: 1;
					height: 100%;
					font-size: 32rpx;
					font-weight: 500;
					color: #000;
				}
				.iptP {
					color: #AAAAAA;
					font-size: 32rpx;
					font-weight: 500;
				}
				.codeBtn {
					text-align: center;
					padding: 0 20rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #F0BA55;
				}
			}
		}

		.subBtn {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			background: #FFF1AC;
			border-radius: 50rpx;
			color: #000000;
			font-size: 32rpx;
			margin: 100rpx auto;
			// box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(174, 53, 35, 0.4);
			// &.noBtn {
			// 	background: rgba(174, 53, 35, 0.4);
			// }
		}


	}
</style>
