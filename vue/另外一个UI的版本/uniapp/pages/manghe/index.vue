<template>
	<view class="content container">
		<!-- <view class="status_bar flexBox">
			<view class="leftTit">
				<image class="logo" src="../../static/img/logo.png" mode="aspectFill"></image>
			</view>
		</view> -->
		<swiper class="banner" indicator-dots="true" circular="true" autoplay="true" interval="3000" duration="800"
			indicator-color="#FFFFFF" indicator-active-color="#00D18B">
			<swiper-item v-for="(item, index) in banner" :key="index" @tap="goSwiper(item)">
				<view style="padding: 0 30rpx;">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="listBox">
			<view class="listItem" v-for="(item,index) in shopList" :key="index" @tap="gotoDetail(item)">
				<view class="mask">
					<view class="state" style=""></view>
					<view class="center flex_column">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
				</view>
				<view class="goodsImgbox">
					<image class="goodsImg" :src="item.image" mode=""></image>
				</view>
				<view class="goodsinfo">
					<view class="goodName">{{item.name}}</view>
					<view class="flexBox">
						<view class="label">{{item.goods_category_name}}</view>
						<!-- <view class="flexBox LimitBox">
							<view class="Limit">限量</view>
							<view class="stock">{{item.surplus}}份</view>
						</view> -->
						<view class="price">¥{{item.price}}</view>
					</view>
					
				</view>
			</view>
		</view>
		<uni-load-more :status="status" v-if="shopList.length"></uni-load-more>
		<uni-footer currentTab="2"></uni-footer>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				banner: [],
				shopList: [],
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载
				gid: '0',
				showType: '0',
				scrollTopt:0,
			}
		},
		onLoad(e) {
			this.getBanner()
			this.shopList = [];
			this.getList();
			const that=this
			uni.$on('init', () => {
				this.flag = false;
				that.page = 1;
				that.shopList = [];
				that.getList();
			})
		},
		onPageScroll(e) {
			//根据scrollTop值超过某个临界点，设置不同的css样式
			this.scrollTopt = e.scrollTop;
			if(this.scrollTopt>220){
				
			}
		},
		onReachBottom() {
			if (!this.flag) {
				this.status = "loading";
				this.page++;
				this.getList();
			}
		},
		onPullDownRefresh() {
			this.getBanner();
			this.flag = false;
			this.page = 1;
			this.shopList = [];
			this.getList();
		},
		methods: {
			goSwiper(item){
				if (item.url) {
					// #ifdef MP || APP-PLUS
					this.go('webView?ss=' + item.url)
					// #endif
					// #ifdef H5
					location.href = item.url;
					// #endif
				}
			},
			gotoDetail(item) {
				this.go('goodsMangheDetail?goodsId=' + item.id)
			},
			getList() {
				this.$http.get('manghe/goodsMangheList', {
					page: this.page,
					pagesize: this.pagesize
				}).then(res => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						if (res.data.data.length == 0) {
							this.flag = true;
							this.status = 'noMore'
						} else {
							this.shopList = this.shopList.concat(res.data.data);
							console.log(this.shopList )
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
			getBanner() {
				this.$http.get('manghe/bannerList', {}).then(res => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						this.banner = res.data;
					}
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
	/deep/uni-swiper .uni-swiper-wrapper{
		overflow: inherit;
	}
	
	/deep/uni-swiper .uni-swiper-dot{
		width: 16rpx !important;
		height: 16rpx !important;
	}
	
	/deep/uni-swiper .uni-swiper-dots-horizontal {
	    // bottom: -20rpx  !important;
	}
	/deep/uni-swiper .uni-swiper-dot-active{
		width: 30rpx;
		height: 12rpx;
		background: #00D18B;
		border-radius: 6rpx;
	}
	.content {
		padding-bottom: 100rpx;

		.twoimg {
			height: 400rpx;
			width: 100%;
			border-radius: 20rpx;
		}

		.status_bar {
			width: 100%;
			font-weight: 500;
			text-align: center;
			height: 120rpx;
			line-height: 120rpx;
			color: #333333;
			padding-top: var(--status-bar-height);

			.logo {
				width: 60rpx;
				height: 60rpx;
				border-radius: 20rpx;
				margin: 0 20rpx 0 30rpx;
			}

			.leftTit {
				color: #FFFFFF;
				// color: #333333;
				font-size: 32rpx;
				margin: 0 20rpx 0 30rpx;

				.logo {
					width: 280rpx;
					height: 52rpx;
				}
			}
		}

		.banner {
			padding:30rpx 0 30rpx 0;
			// padding-top: calc(var(--status-bar-height) + 130rpx);
			width: 100%;
			height: 320rpx;
			// margin: 0 30rpx;

			uni-swiper-item {
				// background: linear-gradient(136deg, #2B2B2E 0%, #0A0A0A 100%);
				border-radius: 10rpx;
			}

			.uni-swiper-wrapper {
				z-index: 10;  
				// background: #0A0A0A;
			}

			image {
				width: 100%;
				height: 320rpx;
				border-radius: 10rpx;
			}

			.info {
				padding: 20rpx;

				.name {
					color: #FFFFFF;
					font-size: 30rpx;
				}

				.title {
					color: #757679;
					font-size: 22rpx;
				}
			}
		}
		.listBox {
			margin: 20rpx 30rpx;

			.listItem {
				background-color: #2C2D2F;
				border-radius: 44rpx;
				margin-bottom: 35rpx;
				position: relative;

				.mask {
					width: 690rpx;
					height: 690rpx;
					border-radius: 44rpx;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 10;
					.state{
						padding: 0 18rpx;
						height: 40rpx;
						line-height: 40rpx;
						margin-top: 30rpx;
					}
					.center {
						width: 442rpx;
						height: 340rpx;
						background: url(../../static/img/index/bj.png) no-repeat left top;
						background-size: 100%;
						margin: 100rpx auto;

						image {
							width: 284rpx;
							height: 284rpx;
							border-radius: 12rpx;
						}
					}
				}
				
				.goodsImgbox{
					position: relative;
					width: 690rpx;
					height: 690rpx;
					overflow: hidden;
					border-radius: 44rpx;
					.goodsImg {
						width: 690rpx;
						height: 690rpx;
						border-radius: 44rpx;
						-webkit-filter: blur(5px);
						filter: blur(5px);
					}
				}

				

				.goodsinfo {
					padding: 20rpx 30rpx;

					.goodName {
						color: #FFFFFF;
						font-size: 30rpx;
						margin-bottom: 15rpx;
					}

					.label {
						height: 40rpx;
						line-height: 40rpx;
						font-size: 22rpx;
						padding: 0 15rpx;
						background: #F1E2BC;
						border-radius: 6rpx;
						color: #1E1817;
						margin-right: 20rpx;
					}

					.LimitBox {
						height: 40rpx;
						line-height: 40rpx;
						background: #3A3A3A;
						border-radius: 6rpx;
						font-size: 12px;

						.Limit {
							padding: 0 15rpx;
							border-radius: 6rpx;
							color: #010101;
							background-color: #EDDFC0;
						}

						.stock {
							padding: 0 15rpx;
							color: #fff;
						}
					}

					.bottom {
						margin-top: 10rpx;
					}

					.company_image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 10rpx;
					}

					.price {
						color: #FFFFFF;
						// color: #AE3523;
						font-size: 36rpx;
						margin-left: auto;
					}

					.good {
						flex: 1;
						color: rgba(255, 255, 255, 0.35);
						// color: #777777;
						font-size: 24rpx;
						font-weight: 500;
					}
				}
			}
		}
	}
</style>
