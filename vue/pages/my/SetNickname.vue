<template>
	<view class="content">
		<view class="iptBox flexBox">
			<input v-model="name" type="text"   placeholder="请输入昵称" class="ipt" placeholder-class="iptP" />
			<image @tap="clear()" :class="( name ) ? 'clear' : 'clear noclear'" src="../../static/img/my/clear.png" mode=""></image>
		</view>
		
		<view @tap="submit" class="subBtn">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				head_image: ''
			}
		},
		onLoad(e) {
			this.getMemInfo()
		},
		onNavigationBarButtonTap() { //点击了按钮
			this.submit()
		},
		methods: {
			clear(){
				this.name = '';
			},
			submit(){
				if (!this.name) {
					this.toast('请输入昵称');
					return;
				}
				const data = {
					nick_name: this.name,
					head_image: this.head_image
				};
				this.$http.post('user/editUserInfo', data).then(res => {
					if (res.code == 1) {
						this.toast(res.msg);
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						}, 1000)
					} else {
						this.toast(res.msg)
					}
				})
			},
			getMemInfo() {
				this.$http.get('user/userInfo').then(res => {
					if (res.code == 1) {
						this.name = res.data.nick_name;
						this.head_image = res.data.head_image
					}
				})
			},
			
		}
	}
</script>


<style lang="scss" scoped>
	.content{
		margin: 30rpx;
		background: #fff;
		box-shadow: 0px 0px 15rpx 6rpx rgba(52, 52, 52, 0.1);
		border-radius: 10rpx;
		.iptBox {
			margin: 0 30rpx;
			height: 108rpx;
			line-height: 108rpx;
			color: #aaaaaa;
			.ipt {
				flex: 1;
				height: 100%;
				font-size: 32rpx;
				font-weight: 500;
				color: #aaaaaa;
			}
			.iptP{
				color: #aaaaaa;
			}
			.clear{
				width: 44rpx;
				height: 44rpx;
			}
			.noclear{
				display: none;
			}

		}
		.subBtn {
			width: 690rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			border-radius: 50rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: 500;
			background:#00DB7D;
			box-shadow: 0px 8px 40px 0px rgba(174, 53, 35, 0.4);
			position: absolute;
			bottom: 300rpx;
			left: 30rpx;
		}
	}
</style>
