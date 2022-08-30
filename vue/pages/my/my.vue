<template>
	<view class="content container">

		<view class="status_bar flexBox">
		</view>
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
					<view class="rz">
						<image class="rz-img" src="../../static/img/my/rz.png" mode=""></image>
						{{member.name?'已认证':'未认证'}}
					</view>
				</view>
				<view class="setupImg size-28 flex white minbold ptb-20 pl-20">
					<image src="../../static/img/my/my-sz.png" @tap="go('mySet')" mode=""></image>
				</view>
			</view>
			<view class="flex plr-30 flex-list">
				<view class="text-center width30percent" @tap="go('../order/orderList')">
					<image class="my-img" src="../../static/img/my/my-dd.png" mode=""></image>
					<view class="white size-24">订单</view>
				</view>
				<view class="text-center width30percent" @tap="go('Withdrawal')">
					<image class="my-img" src="../../static/img/my/my-tx.png" mode=""></image>
					<view class="white size-24">提现</view>
				</view>
				<view class="text-center width30percent" @tap="go('topUp')">
					<image class="my-img" src="../../static/img/my/my-cz.png" mode=""></image>
					<view class="white size-24">充值</view>
				</view>
				<view class="text-center width30percent" @tap="go('/pages/hecheng/hechenglist')">
					<image class="my-img" src="../../static/img/my/my-hc.png" mode=""></image>
					<view class="white size-24">合成</view>
				</view>
				<view class="text-center width30percent" @tap="go('record')">
					<image class="my-img" src="../../static/img/my/my-zzjl.png" mode=""></image>
					<view class="white size-24">转赠记录</view>
				</view>
				<view class="text-center width30percent" @tap="go('team')">
					<image class="my-img" src="../../static/img/my/my-td.png" mode=""></image>
					<view class="white size-24">我的团队</view>
				</view>
				<view class="text-center width30percent" @tap="go('share')">
					<image class="my-img" src="../../static/img/my/my-yq.png" mode=""></image>
					<view class="white size-24">邀请好友</view>
				</view>
				<view class="text-center width30percent" @tap="go('/pages/my/service')">
					<image class="my-img" src="../../static/img/my/my-kf.png" mode=""></image>
					<view class="white size-24">客服</view>
				</view>
			</view>
		</view>

		<!-- 订单优惠券入口 -->
		<view class="Box">
			<view class="tabBox flexBox plr-30 pb-30">
				<view @tap="reload('1')" :class="showType == '1' ? 'tab act' : 'tab'">
					<text>我的藏品</text>
					<view class="line"></view>
				</view>
				<view class="tab" @tap="reload('2')" :class="showType == '2' ? 'tab act' : 'tab'" v-if="rank==1">
					<text>我的售卖</text>
					<view class="line"></view>
				</view>
				<view class="tab" @tap="reload('3')" :class="showType == '3' ? 'tab act' : 'tab'">
					<text>我的盲盒</text>
					<view class="line"></view>
				</view>
			</view>
		</view>
		<view class="goodsList">
			<view class="listItem" v-for="(item, index) in goodsList" :key="index" v-if="showType==3">
				<view class="goodsList">
					<image class="goodImg" :src="item.goods_image" mode=""></image>
					<view class="msgBox">
						<view class="goodName">
							<view class="manghe_flag">盲盒</view>
							<view class="">{{item.goods_name}}</view>
						</view>
						<view class="flex_bt">
							<view class="time">总数:<text class="no_open">{{item.no_open}}</text>/<text
									class="total">{{item.total}}</text></view>
						</view>
					</view>
					<view class="gotoMangheBtn" @tap="gotoMangheDetail(item)">立即开启</view>
				</view>
			</view>
			<view class="" style="width: 100%;" v-if="goodsList.length&&showType==3">
				<uni-load-more :status="status"></uni-load-more>
			</view>
			<view class="goodsItem" v-for="(item, index) in collectionList" :key="index" @tap="goDetail(item.id)"
				v-if="showType==1||showType==2">
				<image class="goodsImg" :src="item.goods_image" mode="aspectFill"></image>
				<view class="goodsinfo" style="padding-left: 0;">
					<view class="goodsName">{{item.goods_name}}</view>
				</view>
				<view class="goodsinfo" style="padding: 0;">
					<view class="goodsName" style="font-size: 24rpx;">编号:{{item.mycp_number}}</view>
				</view>
			</view>
		</view>
		<uni-footer currentTab="3"></uni-footer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				status: 'more',
				pagesize: 15,
				page: 1,

				accountList: {},
				collectionList: [],
				member: {},
				countInfo: {},
				flag: true,
				showType: '1',
				backgroundColor: '',
				rank: null
			}
		},
		onShow() {
			this.getMemInfo();
		},
		onLoad() {
			this.rank = uni.getStorageSync('rank');
			// this.getMemInfo();
		},
		onReachBottom() {
			if (this.showType == 3) {
				this.status = "loading";
				this.page++;
				this.getmhList();
			}
		},
		methods: {
			reload(n) {
				if (this.showType != n) {
					this.showType = n;
					this.goodsList = [];
					this.collectionList = [];
					if (n == 3) {
						this.status = 'more';
						this.page = 1;
						this.getmhList();
						return;
					}
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
			gotoMangheDetail(item) {
				this.go('/pages/manghe/openMangheDetail?goodsId=' + item.goods_id);
			},
			getmhList() {
				let data = {
					typeStatus: this.status,
					page: this.page,
					pagesize: this.pagesize
				}
				this.$http.post('manghe/mangheList', data).then(res => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						if (res.data.data.length == 0) {
							this.flag = true;
							this.status = 'noMore'
						} else {
							this.goodsList = this.goodsList.concat(res.data.data);
							if (res.data.data.length < this.pagesize) {
								this.flag = true;
								this.status = 'noMore'
							}
						}
					} else {
						this.flag = true;
						this.status = 'noMore'
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
						this.getList();
						this.getAccount();
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.mcolor1 {
		color: #000000;
	}

	.content {
		padding-bottom: 140rpx;
		position: relative;

		.status_bar {
			padding-top: var(--status-bar-height);
		}

		.tBox {
			padding-top: calc(var(--status-bar-height) + 40rpx);
			padding-bottom: 30rpx;
			background-color: #1B1B1B;

			.memInfo {
				color: #fff;
				margin: 20rpx 0;

				.imgBox {
					width: 109rpx;
					height: 107rpx;
					border-radius: 50%;
					margin-left: 30rpx;

					.headIcon {
						width: 107rpx;
						height: 107rpx;
						box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.3);
						border-radius: 50%;
						border: 4rpx solid #FFFFFF;
					}
				}

				.msgBox {
					flex: 1;
					margin-left: 30rpx;

					.name {
						// color: #333333;
						color: #fff;
						font-size: 30rpx;
						margin-bottom: 10rpx;
					}

					.tel {
						margin-top: 20rpx;
						color: #888888;
						font-size: 24rpx;
					}

					.rz {
						margin-top: 20rpx;
						width: 130rpx;
						height: 36rpx;
						border: 1rpx solid #FFFFFF;
						border-radius: 10rpx;
						color: #FFFFFF;
						font-size: 20rpx;
						text-align: center;
						line-height: 36rpx;

						.rz-img {
							width: 19rpx;
							height: 21rpx;
							margin-right: 10rpx;
						}

					}
				}

				.setupImg {
					font-size: 28rpx;
					width: 100rpx;
					height: 80rpx;
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

			.flex-list {
				margin-top: 60rpx;
				flex-wrap: wrap;

				.width30percent {
					width: 25%;

					.my-img {
						display: block;
						width: 48rpx;
						height: 52rpx;
						margin: 0 auto;
						margin-bottom: 10rpx;
					}

					margin-bottom:30rpx;
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

			.share {
				height: 184rpx;
				width: 100%;
			}

			.tabBox {
				height: 100rpx;
				line-height: 100rpx;

				.tab {
					margin-right: 50rpx;
					position: relative;
					font-size: 30rpx;
					color: #666666;

					.line {
						position: absolute;
						left: calc(50% - 20rpx);
						bottom: 0rpx;
						width: 40rpx;
						height: 16rpx;
						background-image: url(../../static/img/line.png);
						background-repeat: no-repeat;
						background-size: 40rpx 16rpx;
						display: none;
					}

					&.act {
						font-size: 30rpx;
						font-weight: 600;
						color: #000000;

						.line {
							display: block;
						}
					}
				}
			}

			.list {
				margin-top: 30rpx;
				width: calc(100% - 60rpx);
				padding: 0 30rpx;

				.list-list {
					margin-top: 30rpx;
					width: 100%;
					height: 60rpx;
					display: flex;
					align-items: center;

					.list-img {
						width: 46rpx;
						height: 46rpx;
					}

					.list-title {
						width: calc(100% - 100rpx);
						margin-left: 20rpx;
						font-size: 26rpx;
						font-weight: bold;
						color: #000;
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
				border-radius: 20rpx;
				margin-bottom: 20rpx;

				.goodsImg {
					width: 335rpx;
					height: 335rpx;
					border-radius: 20rpx;
				}

				.goodsinfo {
					padding: 20rpx;

					.goodsName {
						font-size: 26rpx;
						font-weight: 500;
						// color: #333333;
						color: #000;
						overflow: hidden;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}

				.label {
					height: 40rpx;
					line-height: 40rpx;
					background: #EDDFC0;
					border-radius: 6rpx;
					font-size: 22rpx;
					padding: 0 16rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.labelwrapper {
					height: 40rpx;
					line-height: 40rpx;
					background: #59699A;
					border-radius: 6rpx;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					padding-right: 16rpx;
					margin: 0 16rpx;
					display: flex;
				}
			}

			.listItem {
				width: 100%;
				border-radius: 10rpx;
				margin-bottom: 30rpx;
				padding: 0 30rpx;
				background-color: #1B1A1A;

				.goodsList {
					padding: 30rpx 0;
					display: flex;
					align-items: center;

					.goodImg {
						width: 160rpx;
						height: 160rpx;
						margin-right: 20rpx;
					}

					.msgBox {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-around;

						.goodName {
							font-size: 28rpx;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 40rpx;
							margin-bottom: 20rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							display: flex;
							justify-content: flex-start;

							.manghe_flag {
								width: 60rpx;
								height: 32rpx;
								line-height: 32rpx;
								text-align: center;
								padding: 2rpx 4rpx;
								background: #00DB7D;
								margin-right: 10rpx;
								border-radius: 4rpx;
								color: #333;
								font-size: 24rpx;
							}
						}

						.time {
							color: #AAAAAA;
							font-size: 24rpx;
							text-align: right;
							padding: 15rpx 0rpx;
						}

						.no_open {
							margin-left: 20rpx;
							color: red;
						}

						.total {
							margin-left: 0rpx;
						}
					}

					.gotoMangheBtn {
						width: 150rpx;
						height: 50rpx;
						background: #00DB7D;
						border-radius: 30rpx;
						line-height: 50rpx;
						padding: 4rpx 10rpx;
						color: #333;
						text-align: center;
						font-size: 26rpx;
						font-weight: bold;
					}
				}


				.handBox {
					height: 108rpx;
					font-size: 28rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					border-top: 2rpx solid #666262;

					.Btn {
						width: 140rpx;
						height: 56rpx;
						line-height: 56rpx;
						text-align: center;
						border-radius: 28rpx;
						font-weight: 500;
						font-family: PingFangSC-Medium;
						font-size: 28rpx;
						border: 2rpx solid #777777;
						color: #777777;
						margin-left: 20rpx;
					}

					.payBtn {
						border: 2rpx solid #4BAE45;
						color: #4BAE45;
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
