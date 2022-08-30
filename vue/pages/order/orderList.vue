<template>
	<view class="content container">
		<view class="tabBox">
			<view @tap="reload('0')" :class="showType == '0' ? 'tab act' : 'tab'">
				<text>全部</text>
				<view class="line"></view>
			</view>
			<view @tap="reload('1')" :class="showType == '1' ? 'tab act' : 'tab'">
				<text>待付款</text>
				<view class="line"></view>
			</view>
			<view @tap="reload('2')" :class="showType == '2' ? 'tab act' : 'tab'">
				<text>已付款</text>
				<view class="line"></view>
			</view>
			<view @tap="reload('3')" :class="showType == '3' ? 'tab act' : 'tab'">
				<text>已取消</text>
				<view class="line"></view>
			</view>
		</view>

		<view class="listBox">
			<view class="listItem" @tab="gotoMangheDetail(item)" v-for="(item, index) in goodsList" :key="index">
				<view class="listType flexBox" >
					<image class="shopIcon" src="../../static/img/my/shop.png" mode=""></image>
					<view class="orderNumber">订单号：{{item.order_num}}</view>
					<view class="state1" v-if="item.status == 1">待付款</view>
					<view class="state" v-if="item.status == 2">已付款</view>
					<view class="state" v-if="item.status == 3">已取消</view>
				</view>

				<view class="goodsList">
					<image class="goodImg" :src="item.goods_image" mode=""></image>
					<view class="msgBox">
						<view class="goodName">{{item.goods_name}} 
							<text class="maanghe_status" v-if="item.order_type == 3">盲盒</text>
						</view>
						<view class="flex_bt">
							<view class="price"><text class="size-26">￥</text>{{item.price}}元</view>
							<view class="time">{{item.create_time}}</view>
						</view>
					</view>
				</view>
				
				<view class="handBox clearfix"  v-if="item.status == '1'">
					<view class="Btn" @tap="cancel(item)">取消订单</view>
					<!-- <view class="Btn payBtn" @tap="go('orderPayMoney')">立即支付</view> -->
					<view class="Btn payBtn" @tap="go('orderPayMoney?orderId='+item.id)">立即支付</view>
				</view>
				<!-- <view class="handBox clearfix" v-if="item.status == '2'">
					<view class="Btn" @tap="go('applyRefund?orderId='+item.id+'&total_price='+item.total_price)">申请退款</view>
				</view> -->
				
			</view>
		</view>
		<uni-load-more :status="status" v-if="goodsList.length"></uni-load-more>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showType: '0',
				goodsList: [],
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载
			}
		},
		onShow() {
			this.Reset();
		},
		onLoad(e) {},
		onReachBottom() {
			if (!this.flag) {
				console.log(1)
				this.status = "loading";
				this.page++;
				this.getList(this.showType)
			}
		},
		onPullDownRefresh() {
			this.Reset();
		},
		methods: {
			Reset() {
				this.flag = false;
				this.page = 1;
				this.goodsList = [];
				this.getList(this.showType)
			},
			reload(n) {
				if (this.showType != n) {
					this.showType = n;
					this.Reset();
				}
			},
			//跳转到盲盒详情界面
			gotoMangheDetail(item){
				//已付款 并且是盲盒
				if(item.status == 2 && item.order_type == 3)
				{
					this.go('../manghe/openMangheDetail?goodsId=' + item.goods_id)
				}
			},
			cancel(item) { //取消订单
				this.confirm('提示', '确认取消该订单？', () => {
					this.$http.post('order/cancelOrder', {
						id: item.id,
					}).then(res => {
						if (res.code == 1) {
							this.toast(res.msg);
							this.goodsList = [];
							this.getList(this.showType)
						} else {
							this.toast(res.msg);
						}
					})
				});
			},
			getList(a) {
				let data = {
					status: a,
					page: this.page,
					pagesize: this.pagesize
				}
				this.$http.post('order/orderList', data).then(res => {
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
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		padding-bottom: 120rpx;

		.specs_boxs {
			padding: 50rpx 0 10rpx;
			width: 600rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			margin: 0 auto;

			.ipt {
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 28rpx;
				font-weight: 500;
				font-family: PingFangSC-Medium;
				color: #333;
				background-color: #F8F8F8;
				padding-left: 30rpx;
				margin: 0 30rpx;

			}

			.iptP {
				color: #777777;
				font-weight: 400;
				font-family: PingFangSC-Regular;
			}

			.btnBox {
				margin-top: 20rpx;

				.btn {
					flex: 1;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 30rpx;
					font-family: PingFangSC-Medium;
				}

				.btn1 {
					color: #4BB746;
				}
			}
		}

		.tabBox {
			width: 100%;
			padding-top: 20rpx;
			height: 100rpx;
			background-color: #FFFFFF;
			display: flex;
			position: fixed;
			top: var(--window-top);
			left: 0;
			z-index: 10;
			.tab {
				width: 25%;
				position: relative;
				font-size: 26rpx;
				color: #000000;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				.line {
					position: absolute;
					left: calc(50% - 25rpx);
					bottom: 0rpx;
					width: 40rpx;
					height: 16rpx;
					background-image:url(../../static/img/line.png) ;
					background-repeat: no-repeat;
					background-size: 40rpx 16rpx;
					display: none;
				}

				&.act {
					font-size:26rpx;
					font-weight: 600;
					color: #000000;
					.line {
						display: block;
					}
				}
			}
		}

		.listBox {
			padding: 150rpx 30rpx 0;

			.listItem {
				// background: #383B3F;
				border-radius: 10rpx;
				margin-bottom: 30rpx;
				padding: 0 30rpx;
				.listType {
					font-size: 26rpx;
					font-weight: 500;
					height: 88rpx;
					line-height: 88rpx;
					border-bottom: 2rpx solid #383B3F;
					.shopIcon {
						width: 32rpx;
						height: 32rpx;
						margin-right: 10rpx;
					}
					.orderNumber {
						flex: 1;
						color: #000;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.state1{
						color: #00DB7D;
					}
					.state {
						color: #AAAAAA;
					}
				}

				.goodsList {
					padding: 30rpx 0;
					display: flex;
					.goodImg {
						width: 180rpx;
						height: 180rpx;
						margin-right: 20rpx;
					}
					.msgBox {
						flex: 1;
						.goodName {
							font-size: 28rpx;
							font-weight: 400;
							color: #000000;
							line-height: 40rpx;
							margin-bottom: 20rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						.maanghe_status{
							background-color: #00E072;
							width: 72rpx;
							height: 32rpx;
							border-radius: 16rpx;
							color: #333333;
							line-height: 32rpx;
							font-size: 24rpx;
							color: #FFFFFF;
							text-align: center;
							font-weight: bold;
							padding: 2rpx;
							display: inline-block;
							margin-left: 20rpx;
						}

						.price {
							font-size: 32rpx;
							font-weight: 500;
							color: #000000;

						}
						.time {
							color: #AAAAAA;
							font-size: 24rpx;
							text-align: right;
						}
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

		/* 密码弹框 */
		.iptPopBox {
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background: rgba(0, 0, 0, .8);

			.iptInner {
				width: 657rpx;
				margin: 400rpx auto;
				background: #0B0337;
				border-radius: 20rpx;

				.iptTit {
					height: 98rpx;
					line-height: 98rpx;
					text-align: center;
					color: #A59BDD;
					font-size: 32rpx;
					border-bottom: 2rpx solid #02000A;
				}

				.showmsg {
					color: #A59BDD;
					font-size: 30rpx;
					line-height: 60rpx;
					padding: 40rpx;
					border-bottom: 2rpx solid #02000A;
				}

				.msg {
					padding: 40rpx;
					line-height: 83rpx;
					color: #A59BDD;
					font-size: 30rpx;
					text-align: center;
					border-bottom: 2rpx solid #02000A;
				}

				.iptWarp {
					width: 100%;
					border-bottom: 2rpx solid #02000A;

					.iptBoxInupt {
						width: 604rpx;
						height: 83rpx;
						font-size: 30rpx;
						line-height: 83rpx;
						text-indent: 20rpx;
						color: #A59BDD;
						background: #02000A;
						margin: 40rpx auto;
					}

					.iptBoxIptColor {
						color: #62647A;
					}
				}

				.iptBtns {
					display: flex;

					.iptBoxBtn {
						flex: 1;
						text-align: center;
						height: 98rpx;
						line-height: 98rpx;
						color: #A59BDD;
						font-size: 32rpx;
					}

					.iptBoxBtn:nth-of-type(1) {
						border-right: 2rpx solid #02000A;
					}

					.iptBoxBtn:nth-of-type(2) {
						border-left: 2rpx solid #02000A;
					}
				}
			}
		}
	}

	.pop_box {
		width: 100%;
		padding: 30rpx 0 100rpx;
		color: #333333;
		background-color: #FFFFFF;

		.item {
			margin: 20rpx 30rpx;
			display: block;
			box-shadow: 0px 0px 9rpx 1rpx rgba(61, 61, 61, 0.1);
			border-radius: 20rpx;
			background-color: #FFFFFF;
			margin-bottom: 30rpx;
			height: 80rpx;
			padding: 20rpx 30rpx;
			display: flex;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
			}

			text {
				flex: 1;
				font-size: 30rpx;
				font-weight: 500;
				color: #333333;
			}
		}

		.btns {
			display: flex;
			justify-content: space-around;
			padding-bottom: 10px;

			button {
				width: 260rpx;
				height: 71rpx;
				line-height: 70rpx;
				color: #FFFFFF;
				background: rgba(246, 177, 58, 1);
				border-radius: 35rpx;
			}

			.last {
				background-color: #52BBB6;
			}
		}
	}
</style>
