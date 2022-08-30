<template>
	<view class="content container">
		<!-- <image class="bjImg" src="" mode=""></image> -->
		
		<!-- <view class="status_bar flexBox">
			<view class="tit">我的</view>
			<view class="rightNameBtn" @tap="go('couponCheck')">验券</view>
		</view> -->
		<view class="tBox">
			<!-- #ifdef APP-PLUS -->
			<!-- #endif -->

			<view class="memInfo flexBox">
				<view class="imgBox">
					<image class="headIcon" :src="member.head_image" mode="aspectFill"></image>
				</view>
				<view class="msgBox">
					<view class="name">{{member.nick_name}}</view>
					<!-- <view class="tel">{{member.phone}}</view> -->
				</view>
				<!-- <view class="setupImg size-28 flex white minbold ptb-20 pl-20"  @tap="go('myInfo')">个人信息
					<image src="../../static/img/right.png" mode="" class="width44 height44"></image>
				</view> -->
				
				<view class="setupImg size-28 flex white minbold ptb-20 pl-20"  @tap="go('myInfo')">
					<image src="../../static/img/right.png" mode="" class="width44 height44" style="margin-left: 40rpx;"></image>
				</view>
			</view>
			  
			
			<view class="flex flex-between plr-50">
				<view class="pt-20 text-center" @tap="mysales(1)">
					<view class="size-44 mcolor1 mb-8">{{countInfo.buy_count}}</view>
					<view class="colora size-26">我的藏品</view>
				</view>
				<view class="pt-20 text-center" @tap="mysales(2)"> 
					<view class="size-44 mcolor1 mb-8">{{countInfo.sale_count}}</view>
					<view class="colora size-26">我的售卖</view>
				</view>
				<view class="pt-20 text-center" v-for="(item, index) in accountList" :key="index">
					<view v-if="item.name=='余额'" @tap="go('Withdrawal')">
						<view class="size-44 mcolor1 mb-8">{{item.account}}</view>
						<view class="colora size-26" v-if="item.name=='余额'">我的余额</view>
					</view>
					
				</view>
			</view>
		</view>
		<!-- 邀请入口 -->
		<view class="Box" style="padding: 0;margin: 0;background: none;margin-top: 30rpx;">
		   <view class="plr-30" @tap="go('share')">
		   	<image src="../../static/img/my/share1.png" mode="aspectFill" class="share"></image>
		   </view>
		</view>
		
		
		<!-- 订单优惠券入口 -->
		<view class="Box" style="margin-top: 26rpx;">
			<view style="color: #fff;padding-left: 21px;font-weight: bold;">推荐功能</view>
			<view class="flex  flex-list" style="padding-top: 30rpx;">
				<view class="pt-20 text-center width30percent" @tap="go('../order/orderList')">
					<image class="width64 height64" src="../../static/img/my/icon0.png" mode="aspectFill"></image>
					<view class="white  size-24" style="margin-bottom: 20rpx;">我的订单</view>
				</view>
				<!-- <view class="pt-20 text-center" @tap="go('couponList')">
					<image class="width64 height64" src="../../static/img/my/icon1.png" mode="aspectFill"></image>
					<view class="white mt-16 size-24">优惠券</view>
				</view> -->
				<view class="pt-20 text-center width30percent" @tap="go('Withdrawal')">
					<image class="width64 height64" src="../../static/img/my/icon2.png" mode="aspectFill"></image>
					<view class="white  size-24" style="margin-bottom: 20rpx;">提现中心</view>
				</view>
				<view class="pt-20 text-center width30percent" @tap="go('authentication')">
					<image class="width64 height64" src="../../static/img/my/a6.png" mode="aspectFill"></image>
					<view class="white  size-24" style="margin-bottom: 20rpx;">实名认证</view>
				</view>
				<view class="pt-20 text-center width30percent" @tap="go('myTeam')">
					<image class="width64 height64" src="../../static/img/my/a5.png" mode="aspectFill"></image>
					<view class="white  size-24" style="margin-bottom: 20rpx;">我的团队</view>
				</view>
				<view class="pt-20 text-center width30percent" @tap="go('mySet')">
					<image class="width64 height64" src="../../static/img/my/icon3.png" mode="aspectFill"></image>
					<view class="white  size-24" style="margin-bottom: 20rpx;">设置中心</view>
				</view>
				<view class="pt-20 text-center width30percent" @tap="go('money')">
					<image class="width64 height64" src="../../static/img/my/a7.png" mode="aspectFill"></image>
					<view class="white  size-24" style="margin-bottom: 20rpx;">钱包地址</view>
				</view>
				<view class="pt-20 text-center width30percent" @tap="go('/pages/hecheng/hechangDetail')">
					<image class="width64 height64" src="../../static/img/my/icon5.png" mode="aspectFill"></image>
					<view class="white  size-24" style="margin-bottom: 20rpx;">合成管理</view>
				</view>
				
				<view class="pt-20 text-center width30percent" @tap="go('/pages/manghe/manghelist')">
					<image class="width64 height64" src="../../static/img/my/icon4.png" mode="aspectFill"></image>
					<view class="white  size-24" style="margin-bottom: 20rpx;">我的盲盒</view>
				</view>
				<!-- <view class="pt-20 text-center width30percent"  @tap="gotoRuzhu">
					<image class="width64 height64" src="../../static/img/my/ruzhu.png" mode="aspectFill"></image>
					<view class="white  size-24" style="margin-bottom: 20rpx;">入驻</view>
				</view>
				<view class="pt-20 text-center width30percent">
					<image class="width64 height64" src="../../static/img/my/icon6.png" mode="aspectFill"></image>
					<view class="white  size-24" style="margin-bottom: 20rpx;">客服</view>
				</view> -->
			</view>
			
			<!-- <view class="tabBox flexBox plr-30 pb-30">
				<view @tap="reload('1')" :class="showType == '1' ? 'tab act' : 'tab'">
					<text>我的艺术品</text>
					<view class="line"></view>
				</view>
				<view class="tab" @tap="reload('2')" :class="showType == '2' ? 'tab act' : 'tab'">
					<text>我的售卖</text>
					<view class="line"></view>
				</view>
			</view> -->
		</view>
		
		

	<!-- 	<view class="goodsList">
			<view class="goodsItem" v-for="(item, index) in collectionList" :key="index" @tap="goDetail(item.id)">
				<image class="goodsImg" :src="item.goods_image" mode="aspectFill"></image>
				<view class="goodsinfo">
					<view class="goodsName">{{item.goods_name}}</view>
				</view>
			</view>
		</view> -->

		<uni-footer  currentTab="3"></uni-footer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accountList: {},
				collectionList: {},
				member: {},
				countInfo: {},
				flag: true,
				showType: '1',
				backgroundColor: '',
			}
		},
		onShow() {
			this.getMemInfo();
		},
		onLoad() {
			// this.getMemInfo();
		},
		methods: {
			gotoRuzhu(){
				let url = "https://www.wenjuan.com/s/UZBZJv81GIY/";
				// #ifdef MP || APP-PLUS  
				this.go('/pages/index/ruzhu?url=' + url)
				// #endif
				// #ifdef H5
				location.href = url;
				// #endif
			},
			reload(n) {
				if (this.showType != n) {
					this.showType = n;
					this.getList();
				}
			},
			goDetail(a) {
				if (this.showType == 1) {
					uni.navigateTo({
						url: '../user/myArtDetail?goodsId=' + a
					})
				} else if (this.showType == 2) {
					uni.navigateTo({
						url: '../user/mySaleDetail?goodsId=' + a
					})
				}
			},
			getList() {
				let data = {
					status: this.showType
				}
				this.$http.post('order/collectionList', data).then(res => {
					if (res.code == 1) {
						this.collectionList = res.data;
					}
				})
			},
			getAccount() {
				this.$http.get('account/account').then(res => {
					if (res.code == 1) {
						this.accountList = res.data;
					}
				})
				this.$http.get('order/collectionCount').then(res => {
					if (res.code == 1) {
						this.countInfo = res.data;
					}
				})
			},
			getMemInfo() {
				this.$http.get('user/userInfo').then(res => {
					if (res.code == 1) {
						this.member = res.data;
						uni.setStorageSync('phone', res.data.phone);
						uni.setStorageSync('wx_auth', res.data.wx_small_auth);
						uni.setStorageSync('name', res.data.wx_small_auth);
						this.getList();
						this.getAccount();
					}
				})
			},
			mysales(types){
				uni.navigateTo({
					url:"mysales?type="+types
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #1e201f;
	}
</style>
<style lang="scss" scoped>
	.content {
		padding-bottom: 140rpx;
		position: relative;

		.bjImg {
			// width: 100%;
			// height: calc(var(--status-bar-height) + 600rpx);
			// position: absolute;
			// top: 0;
			// left: 0;
			// z-index: -10;
		}

		.status_bar {
			width: 100%;
			font-weight: 500;
			text-align: center;
			position: fixed;
			height: 100rpx;
			line-height: 100rpx;
			background-color: #1e201f;
			color: #333333;
			// position: fixed;
			// left: 0;
			// top: 90rpx;
			z-index: 100;
			/*  #ifdef MP-WEIXIN */
			padding-top: var(--status-bar-height);
			/*  #endif  */
			.leftTit {
				width: 10%;
			}

			.tit {
				flex: 1;
				text-align: center;
				color: #FFFFFF;
				font-size: 32rpx;
			}

			.rightNameBtn {
				width: 10%;
				color: #F4F4F4;
				font-size: 28rpx;
			}
		}

		.tBox {
			// background: url(../../static/img/my/bj.png) no-repeat;
			// background-size: 100%;
			// padding-top: calc(var(--status-bar-height) + 100rpx);
			
			// padding-top: calc(var(--status-bar-height));

			.memInfo {
				color: #333333;
				margin: 40rpx 0;

				.imgBox {
					width: 130rpx;
					height: 130rpx;
					border-radius: 140rpx;
					margin-left: 60rpx;

					.headIcon {
						width: 130rpx;
						height: 130rpx;
						// box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0,0,0,0.3);
						border-radius: 80rpx;
						// border: 4rpx solid #FFFFFF;
					}
				}

				.msgBox {
					flex: 1;
					margin-left: 20rpx;
					// padding-top: 10rpx;

					.name {
						// color: #333333;
						color: #FFFFFF;
						font-size: 38rpx;
						// margin-bottom: 10rpx;
					}

					.tel {
						color: #FFFFFF;
						font-size: 26rpx;
					}
				}

				.setupImg {
					font-size: 28rpx;
					width: 176rpx;
					height: 80rpx;
					border-radius: 44rpx 0rpx 0rpx 44rpx;
					// background: #214136;
					margin: auto 0 auto auto;
					box-sizing: border-box;
					image {
						width: 44rpx;
						height: 44rpx;
					}
				}
			}

			.coinBox {
				margin: 0 30rpx;
				display: flex;

				.coinItem {
					flex: 1;
					text-align: center;

					.number {
						// color: #333333;
						color: #FFFFFF;
						font-size: 44rpx;
						line-height: 60rpx;
						font-weight: 500;
						margin-bottom: 20rpx;
					}

					.num {
						font-size: 28rpx;
						color: #AAAAAA;
					}
				}

			}
		}

		.orderBox {
			width: 690rpx;
			height: 170rpx;
			// background: #FFFFFF;
			background: #383B3F;
			border-radius: 20rpx;
			box-shadow: 0rpx 2rpx 20rpx 0rpx rgba(186, 186, 186, 0.1);
			position: absolute;
			top: -50rpx;
			left: 30rpx;

			.btnItem {
				flex: 1;

				.orderIcon {
					width: 64rpx;
					height: 64rpx;
					margin-bottom: 16rpx;
				}

				.state {
					// color: #333333;
					color: rgba(255, 255, 255, 0.35);
					text-align: center;
					font-size: 28rpx;
					font-weight: 400;
				}
			}

		}

		.Box {
			position: relative;
			background: #FFFFFF;
			background: #23272C;
			margin:0 40rpx;
			border-radius: 30rpx;
			padding: 30rpx 0;
			overflow: hidden;
			.flex-list{
				flex-wrap: wrap;
				.width30percent{
					width: 25%;
				}
			}
			.share{
				height: 184rpx;
				width: 100%;
			}
			.tabBox {
				height: 100rpx;
				line-height: 100rpx;

				.tab {
					margin-right: 50rpx;
					position: relative;
					font-size: 28rpx;
					color: #FFFFFF;

					.line {
						position: absolute;
						left: calc(50% - 20rpx);
						bottom: 0rpx;
						width: 40rpx;
						height: 16rpx;
						background-image:url(../../static/img/line.png) ;
						background-repeat: no-repeat;
						background-size: 40rpx 16rpx;
						display: none;
					}

					&.act {
						font-size: 32rpx;
						font-weight: 500;
						// color: #333333;
						color: #00D18B;
						.line {
							display: block;
						}
					}
				}
			}

		}

		.goodsList {
			padding: 0 30rpx;
			display: flex;
			flex-wrap: wrap;
			
			justify-content: space-between;

			.goodsItem {
				width: 335rpx;
				//background: #FFFFFF;
				//background: #383B3F;
				border-radius: 20rpx;
				margin-bottom: 20rpx;

				.goodsImg {
					width: 284rpx;
					height: 284rpx;
					border-radius: 20rpx;
				}

				.goodsinfo {
					padding: 20rpx;

					.goodsName {
						font-size: 26rpx;
						font-weight: 500;
						// color: #333333;
						color: #FFFFFF;
						overflow: hidden;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
			}
		}
	}

	.model_pack {
		background: #FFFFFF;
		border-radius: 20rpx;
		position: relative;
		width: 500rpx;
		text-align: center;
		padding: 58rpx 0 0;
		box-sizing: border-box;

		.model_close {
			position: absolute;
			right: 30rpx;
			top: 30rpx;

			image {
				width: 24rpx;
				height: 24rpx;
			}
		}

		.model_info {
			padding: 30rpx;
			font-size: 28rpx;

			image {
				width: 460rpx;
				height: 460rpx;
			}

			view {

				margin: 10rpx auto;
			}

			.savebtn {
				width: 80%;
				height: 70rpx;
				line-height: 70rpx;
				margin: 10px auto 0;
				text-align: center;
				border: 2rpx solid #52BBB6;
				border-radius: 6rpx;
				font-size: 28rpx;
				color: #333333;
				background-color: #fff;
			}
		}
	}
</style>
