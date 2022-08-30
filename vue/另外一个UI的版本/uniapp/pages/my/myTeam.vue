<template>
	<view class="">
		<view class="team">
			<text>邀请人数: {{team.length}}</text>
			<text>实名人数: {{num || 0}}</text>
		</view>
		<view class="container">
			<view class="list" v-if="team.length>0">
				<view class="title"></view>
				<view class="con plr-24">
					<view class="flex bb ptb-28 listcon" v-for="(item,index) in team" :key="index">
						<image :src="item.head_image" mode="aspectFill" class="userimg"></image>
						<view class="size-28 white">{{item.phone}}</view>
						<view class="size-28 white autor">{{item.create_time}}</view>
					</view>
				</view>
			</view>  
			<view class="nodata" v-else>
				<image src="/static/img/1024x1024.png" mode=""></image>
			</view>
		</view>
	</view>
	
</template>

<script>
	import qrcode from '../../components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				team:[],
				register_url:'',
				
				qr_code_img: '',
				//二维码
				val: '', //二维码内容
				size: 300,
				background: '#ffffff',
				foreground: '#000000',
				pdground: '#000000',
				icon: '',
				iconsize: 50,
				lv: 3,
				onval: true,
				loadMake: true,
				src: '',
				uuid: '',
				num: ""
			};
		},
		components: {
			qrcode
		},
		onLoad() {
			this.$http.get('user/team').then(res => {
				if (res.code == 1) {
					this.team=res.data
					console.log(res)
				}
			})
			this.$http.get('user/userInfo').then(res => {
				if (res.code == 1) {
					this.num = res.data.team_already_auth
					// this.team=res.data
					// console.log(res)
				}
			})
			
		},
		methods: {
			back() {
				uni.navigateBack({
					
				})
			},
			creatQrcode() {
				this.$refs.qrcode._makeCode()
			},
			qrR(res) {
				this.src = res
			},
			save() {
				console.log(this.qr_code_img)
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

		},
	};
</script>
<style>
	page{
		background: #181818;
	}
</style>
<style scoped lang="scss">
	.team {
		display: flex;
		justify-content: space-around;
		color: #fff;
		margin-top: 16rpx;
	}
	.feltitle {
		width: 90%;
		display: flex;
		justify-content: space-between;
		margin: 70rpx auto 30rpx;
		color: #fff;
		image {
			width: 50rpx;
			height: 50rpx;
			color: #000;
		}
	}
	.container {
		background: #181818;
		
		padding-bottom: 100rpx;
		

		.list {
			width: 694rpx;
			margin: 0 auto ;


			.con {
				padding-top: 30rpx;
				// background: #3C3C3C;
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
			width: 564rpx;
			margin: 30rpx auto 50rpx;
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
