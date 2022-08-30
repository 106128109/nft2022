<template>
	<view class="container" :style="{'background-image': 'url('+ bg_img +')'}">
		<!-- <view class="img center mb-60"> -->
			<!-- <image src="../../static/img/share/info.png" mode="aspectFill" class="info"></image> -->
			<!-- <view class="info"></view> -->
		<!-- </view> -->
		
			<view class="share-icon" @click="showBtn()">
				<u-icon name="share-square" color="#fff" size="28"></u-icon>
			</view>
		
		
		<view class="erweima">
			<qrcode ref="qrcode" :val="register_url" :size="size" :background="background" :foreground="foreground" :pdground="pdground"
			:icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" @result="qrR" />
		</view>
		<view class="w560" v-if="btnFlag">
			<view class="ptb-16 plr-50 size-28 white bg1" @click="save">请截图保存图片</view>
			<view class="ptb-16 plr-50 size-28 white bg2" @tap="copy(register_url)">复制链接</view>
		</view>
		<!-- <view class="list" v-if="team.length>0">
			<view class="title"></view>
			<view class="con plr-24">
				<view class="flex bb ptb-28 listcon" v-for="(item,index) in team" :key="index">
					<image :src="item.head_image" mode="aspectFill" class="userimg"></image>
					<view class="size-28 white">{{item.phone}}</view>
					<view class="size-28 white autor">{{item.create_time}}</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import qrcode from '../../components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				team:[],
				register_url:'',
				btnFlag: false,
				qr_code_img: '',
				//二维码
				val: '', //二维码内容
				size: 200,
				background: '#ffffff',
				foreground: '#000000',
				pdground: '#000000',
				icon: '',
				iconsize: 50,
				lv: 3,
				onval: true,
				loadMake: true,
				src: '',
				bg_img: ""
			};
		},
		components: {
			qrcode
		},
		onLoad() {
			// this.$http.get('user/team').then(res => {
			// 	if (res.code == 1) {
			// 		this.team=res.data
			// 		console.log(res)
			// 	}
			// })
			this.$http.get('user/share').then(res => {
				if (res.code == 1) {
					this.register_url=res.data.register_url
					this.qr_code_img=res.data.qr_code_img
					this.bg_img=res.data.invite_image
				}
			})
			
		},
		methods: {
			
			creatQrcode() {
				this.$refs.qrcode._makeCode()
			},
			qrR(res) {
				this.src = res
			},
			save() {
				uni.downloadFile({
					url: this.qr_code_img, //仅为示例，并非真实的资源
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: '保存成功'
									})
								}
							});
						}
					}
				});
			
			},
			showBtn() {
				this.btnFlag = true
			},

		},
	};
</script>
<style>
	page{
		background: #fff;
	}
</style>
<style scoped lang="scss">
	.container {
		background: #181818;
		// background-image: url(../../static/img/share/bg.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 100%;
		width: 100%;
		background-attachment: fixed;
		position: relative;
		overflow: hidden;
		// padding-bottom: 100rpx;
		.share-icon{
			position: absolute;
			z-index: 1000;
			top: 14rpx;
			right: 20rpx;
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: rgba(0,0,0,.5);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.info {
			width: 654rpx;
			height: 186rpx;
			margin: 200rpx auto 0;
		}

		.erweima {
			// width: 564rpx;
			// height: 780rpx;
			// background: url(../../static/img/share/11.png) no-repeat;
			// background-size: 564rpx 680rpx;
			// margin: 0 auto 0;
			// padding: 450rpx 180rpx 0;
			// box-sizing: border-box;
			display: flex;
			justify-content: center;
			.tki-qrcode{
				position: absolute!important;
				bottom: 220rpx;
			}
		}

		.list {
			width: 694rpx;
			margin: 60rpx auto 0;

			.title {
				height: 68rpx;
				position: relative;
				width: 100%;

				&::after {
					position: absolute;
					bottom: 0;
					content: '';
					width: 100%;
					height: 30rpx;
					left: 0;
					z-index: 8;
					background: #3C3C3C;
				}

				&::before {
					position: absolute;
					bottom: 0;
					content: '';
					width: 100%;
					height: 68rpx;
					left: 204rpx;
					background: url(../../static/img/share/list.png) no-repeat;
					background-size: 286rpx 68rpx;
					z-index: 9;
				}
			}

			.con {
				padding-top: 30rpx;
				background: #3C3C3C;
				box-sizing: border-box;

				.listcon {
					border-bottom: 2rpx solid #434343;
				}
			}

			.userimg {
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
				border-radius: 50%;
			}
		}

		.w560 {
			width: 100%;
			margin-bottom: 30rpx;
			display: flex;
			justify-content: space-around;
			position:absolute;
			bottom: 60rpx;
		}

		.bg1 {
			background: #A4805C;
			border-radius: 8rpx;
		}

		.bg2 {
			background: #F9C21A;
			border-radius: 8rpx;
		}
	}
</style>
