<template>
	<view class="content container">
		<!-- <view class="status_bar flexBox">
			<view class="leftTit">
				<image class="logo" src="../../static/img/logo.png" mode="aspectFill"></image>
			</view>
			<view class="ruzhu" @tap="gotoRuzhu">创作者入住</view>
		</view> -->
		<swiper class="banner" indicator-dots="true" circular="true" autoplay="true" interval="3000" duration="800"
			indicator-color="#FFFFFF" indicator-active-color="#00D18B">
			<!-- next-margin="190rpx" -->
			<swiper-item v-for="(item, index) in banner" :key="index" @tap="next1(item)">
				<view style="padding: 0 30rpx;">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				
				<!-- <view class="info">
					<view class="name">{{item.name}}</view>
					<view class="title">{{item.title}}</view>
				</view> -->
			</swiper-item>
		</swiper>
		<!-- 图标导航 -->
		<!-- <view>
			<view v-for="(item, index) in CategoryList" :key="index"  @tap="reload(item.id)" style="width: 25%;float: left;text-align: center;">
				<image :src="baseurl+item.image" style="width:100rpx;height: 100rpx;"></image>
				<view style="color: #FFFFFF;">{{item.name}}</view>
			</view>
		</view> -->
		
		<xzw-notice  :list="noticeList" theKey="title" @goItem="detail" :showMore="false"/>
		
		<!-- 图标导航 -->
		
		<!-- 三个筛选 -->
		<view :class="[scrollTopt>230?'fixedbotto':'','tabBox']">
			<view @tap="tab('0')" :class="showType == '0' ? 'tab act' : 'tab'">
				<text>{{name ? name:'全部系列'}}</text>
				<view class="line"></view>
			</view>
			<view @tap="tab('1')" :class="showType == '1' ? 'tab act' : 'tab'">
				<text>发售日历</text>
				<view class="line"></view>
			</view>
			<view @tap="tab('2')" :class="showType == '2' ? 'tab act' : 'tab'">
				<text>内容精选</text>
				<view class="line"></view>
			</view>
		</view>
		<view class="listBox" v-if="showType=='0'">
			<view class="listItem" v-for="(item,index) in shopList" :key="index" @tap="next(item)">
				<view class="mask">
					<view class="state" v-if="item.status == 1 &&  item.surplus > 0">{{item.end_time}} 结束</view>
					<view class="state state1" v-if="item.status == 1 &&   (item.surplus < 0 || item.surplus == 0)">
						<image src="../../static/img/index/time.png" mode="" class="time"></image>
						已售罄
					</view>
					<view class="state" v-if="item.status == 2 ">{{item.start_time}} 开售</view>
					<view class="state state1" v-if="item.status == 3 && (item.surplus < 0 || item.surplus == 0)">
						<image src="../../static/img/index/time.png" mode="" class="time"></image>
						已售罄
					</view>
					<view class="state state1" v-if="item.status == 3 && item.surplus > 0 ">
						<image src="../../static/img/index/time.png" mode="" class="time"></image>
						已结束
					</view>
					<view class="center flex_column">
						<!-- <image :src="item.image" mode="aspectFill"></image> -->
					</view>
				</view>
				<image class="goodsImg" :src="item.image" mode=""></image>
				<view class="goodsinfo">
					<view class="goodName">{{item.name}}</view>
					<view class="flexBox">
						<view class="label">{{item.goods_category_name}}</view>
						<view class="flexBox LimitBox">
							<view class="Limit">限量</view>
							<view class="stock">{{item.surplus}}份</view>
						</view>
						<view class="price">¥{{item.price}}</view>
					</view>
					<!-- <view class="flexBox bottom">
						<image class="company_image" :src="item.company_image" mode=""></image>
						<view class="good">{{item.company_name}}</view>
					</view> -->
				</view>
			</view>
		</view>
		<view class="plr-30" v-if="showType=='1'">
			<view class="con bg1 ptb-24 plr-24">
				<view v-for="(item,index) in shopList" :key="index">
					<view class="title flex">
						<image src="../../static/img/data.png" mode="" class="width36 height34"></image>
						<view class="size-26 white ml-12">{{item.time}}</view>
					</view>
					<view v-for="(itm,idex) in item.data" :key="idex">
						<view class="size-24 white mt-16 mb-20">{{itm.time}}</view>
						<view v-for="(itm2,idx) in itm.data" :key="idx">
							<view class="conlist mb-30 flex" v-for="(itm3,idx3) in itm2.goods" :key="idx3">
								<image :src="itm3.image" mode="aspectFill" class="conimg"></image>
								<view class="conright ptb-20">
									<view class="white size-28 mb-12">{{itm3.name}}</view>
									<view class="flex">
										<view class="label">{{itm3.goods_category_name}}</view>
										<view class="labelwrapper">
											<view class="label ">限量</view>
											<text class="ml-16">{{itm3.stock}}份</text>
										</view>
									</view>
									<view class="size-36 white mt-16">
										<text class="size-26">¥</text>
										{{itm3.price}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="showType=='2'">
			<view class="list plr-30 mb-58 mt-20" v-for="(item,index) in shopList" :key="index" @click="detail(item)">
				<image :src="item.image" mode="aspectFill" class="twoimg"></image>
				<view class="size-30 white mb-12 mt-20">{{item.title}}</view>
				<view class="size-26 white">
					<!-- <u-parse :content="item.content"></u-parse>
					 -->
					 {{item.desc}}
				</view>
			</view>
		</view>
		<view class="navBox">
			<view class="tab1 flex_ct" v-for="(item, index) in CategoryList" :key="index" v-if="block"
				@tap="reload(item.id,item.name)">
				{{item.name}}
			</view>
			<view class="tab flex_column" @tap="reload(0)">
				<image src="../../static/img/index/a3.png" mode=""></image>
				<view class="">全部</view>
			</view>
		</view>
		<uni-load-more :status="status" v-if="shopList.length" style="margin-bottom: 30rpx;"></uni-load-more>
		<uni-footer currentTab="0"></uni-footer>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				baseurl:'http://app.xh8896.com',
				banner: [],
				shopList: [],
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载\
				CategoryList: [],
				block: false,
				gid: '0',
				showType: '0',
				scrollTopt:0,
				name: '数字藏品',
				noticeList: []
			}
		},
		onLoad(e) {
			this.getBanner()
			this.shopList = [];
			this.getList();
			this.getCategoryList();
			const that=this
			uni.$on('init', () => {
				if(that.showType == '0'){
					that.flag = false;
					that.page = 1;
					that.shopList = [];
					that.getList();
				}
			})
			this.notice()
		},
		onPageScroll(e) {
			//根据scrollTop值超过某个临界点，设置不同的css样式
			this.scrollTopt = e.scrollTop;
			if(this.scrollTopt>220){
				
			}
			// console.log(e.scrollTop)
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
			this.getCategoryList();
			this.flag = false;
			this.page = 1;
			this.shopList = [];
			this.getList();
			this.notice()
		},
		methods: {
			notice() {
				this.$http.get('index/noticeList',{}).then(res=> {
					this.noticeList = res.data
				})
			},
			goItem(e) {
				console.log(e)
			},
			gotoRuzhu(){
				let url = "https://www.wenjuan.com/s/UZBZJv81GIY/";
				// #ifdef MP || APP-PLUS
				this.go('ruzhu?url=' + url)
				// #endif
				// #ifdef H5
				location.href = url;
				// #endif
			},
			next1(a) {
				if (a.url) {
					// #ifdef MP || APP-PLUS
					this.go('webView?ss=' + a.url)
					// #endif
					// #ifdef H5
					location.href = a.url;
					// #endif
				} else {
					this.go('secondHand')
				}
			},
			tab(n) {
				if (this.showType != n) {
					this.showType = n;
					this.flag = false;
					this.page = 1;
					this.shopList = [];
					this.getList();
				}
			},
			reload(a, lei) {
				var that = this
				if(!a && this.block) {
					console.log(23)
					// that.$set(that,'name','全部')
					// debugger
					// that.name = '全部'
				}
				
				if (!a) {
					this.block = !this.block
				}
				if (this.gid != a) {
					this.gid = a;
					this.name = lei
					this.shopList = [];
					this.getList();
				}

			},
			detail(con){
				this.go('txtdetail?con=' + JSON.stringify(con))
			},
			next(a) {
				var text=''
				// if (a.status == 1 && (a.surplus < 0 || a.surplus == 0)) {
				// 	this.toast('已售罄');
				// 	return
				// }
				// if (a.status == 2) {
				// 	this.toast('未开始');
				// 	return
				// }
				// if (a.status == 3 && (a.surplus < 0 || a.surplus == 0)) {
				// 	this.toast('已售罄');
				// 	return
				// }
				// if (a.status == 3 && a.surplus > 0) {
				// 	this.toast('已结束');
				// 	return
				// }
				
				var flag='false'
				if (a.status == 1 && (a.surplus < 0 || a.surplus == 0)) {
					text='已售罄'
					flag='true'
				}
				if (a.status == 2) {
					text='未开始'
					flag='true'
				}
				if (a.status == 3 && (a.surplus < 0 || a.surplus == 0)) {
					text='已售罄'
					flag='true'
				}
				if (a.status == 3 && a.surplus > 0) {
					text='已结束'
					flag='true'
				}
				this.go('goodsDetail?goodsId=' + a.id+'&flag='+flag+'&text='+text)
			},
			getCategoryList() {
				this.$http.get('goods/goodsCategoryList').then(res => {
					if (res.code == 1) {
						this.CategoryList = res.data;
					}
				})
			},
			getList() {
				if (this.showType != '0') {
					this.$http.get(this.showType == '2' ? 'index/noticeList' : 'index/calendar', {
						page: this.page,
						pagesize: this.pagesize
					}).then(res => {
						if (res.code == 1) {
							console.log(res)
							if (res.data.length == 0) {
								this.flag = true;
								this.status = 'noMore'
							} else {
								this.shopList = this.shopList.concat(res.data);
								if (res.data.length < this.pagesize) {
									this.flag = true;
									this.status = 'noMore'
								}
							}
						} else {
							this.flag = true;
							this.status = 'noMore'
						}
					})
					return false
				}
				this.$http.get('goods/goodsList', {
					goods_category_id: this.gid,
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
				this.$http.get('index/bannerList', {
					type: '1'
				}).then(res => {
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
		width: 16rpx;
		height: 16rpx;
		background: #00D18B;
		border-radius: 6rpx;
	}
	.content {
		padding-bottom: 100rpx;

		.twoimg {  
			// height: 400rpx;
			height: 300rpx;
			width: 100%;
			border-radius: 20rpx;
		}

		.navBox {
			position: fixed;
			bottom: 350rpx;
			right: 50rpx;
			z-index: 100;

			.tab {
				width: 120rpx;
				height: 120rpx;
				background: rgba(0, 0, 0, 0.8);
				border-radius: 60rpx;
				color: #FFFFFF;
				font-size: 22rpx;
				position: fixed;
				bottom: 200rpx;
				right: 30rpx;

				image {
					width: 50rpx;
					height: 50rpx;
					margin-bottom: 6rpx;
				}
			}

			.tab1 {
				width: 100rpx;
				height: 100rpx;
				background: rgba(0, 0, 0, 0.8);
				border-radius: 50%;
				color: #FFFFFF;
				font-size: 22rpx;
				margin-top: 10rpx;
			}
		}

		.status_bar {
			width: 100%;
			font-weight: 500;
			text-align: center;
			height: 120rpx;
			line-height: 120rpx;
			display: flex;
			justify-content: space-between;
			color: #333333;
			// position: fixed;
			// left: 0;
			// top: 0;
			// z-index: 100;
			// background: #23272C;
			// background-color: #FFFFFF;
			padding-top: var(--status-bar-height);
			.ruzhu{
				padding-right: 30rpx;
				color: #fff;
			}
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
			padding:0 0 30rpx 0;
			// padding-top: calc(var(--status-bar-height) + 130rpx);
			width: 100%;
			height: 320rpx;
			

			uni-swiper-item {
				// background: linear-gradient(136deg, #2B2B2E 0%, #0A0A0A 100%);
				border-radius: 30rpx;
			}

			.uni-swiper-wrapper {
				z-index: 10;
				// background: #0A0A0A;
			}

			image {
				width: 100%;
				height: 320rpx;
				border-radius: 30rpx;
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
		.tabBox {
			width: 100%;
			padding-top: 12rpx;
			display: flex;
			
			.tab {
				width: 33%;
				position: relative;
				font-size: 30rpx;
				color: #fff;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;

				.line {
					position: absolute;
					left: calc(50% - 25rpx);
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
					font-weight: 500;
					color: #00D18B;

					.line {
						display: block;
					}
				}
			}
		}
		.fixedbotto{
			display: flex;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			background: #021C1B;
			z-index: 99;
			padding-bottom: 10rpx;
		}
		.listBox {
			margin: 20rpx 30rpx;

			.listItem {
				background-color: #2C2D2F;
				border-radius: 50rpx;
				margin-bottom: 35rpx;
				position: relative;

				.mask {
					width: 690rpx;
					// height: 690rpx;
					border-radius: 30rpx;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 10;

					.state {
						display: inline-block;
						padding: 0 18rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						color: #fff;
						font-size: 24rpx;
						border-radius: 22rpx;
						background: linear-gradient(90deg, #00D18B 0%, #00D18B 100%);
						margin-top: 30rpx;
						margin-left: 28rpx;
					}

					.state1 {
						color: rgba(255, 255, 255, 0.6);
						background: #010004;
						border-radius: 22rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						display: flex;
						max-width: 150rpx;
						box-sizing: border-box;

						.time {
							height: 26rpx;
							width: 26rpx;
							margin-right: 8rpx;
							margin: auto 8rpx auto 0;
						}
					}

					.center {
						// width: 442rpx;
						// height: 340rpx;
						// background: url(../../static/img/index/bj.png) no-repeat left top;
						// background-size: 100%;
						// margin: 100rpx auto;

						// image {
						// 	width: 284rpx;
						// 	height: 284rpx;
						// 	border-radius: 12rpx;
						// }
					}
				}

				.goodsImg {
					width: 690rpx;
					height: 690rpx;
					border-radius: 50rpx;
					// -webkit-filter: blur(4px);
					// filter: blur(4px);
				}

				.goodsinfo {
					padding: 15rpx 24rpx 30rpx 24rpx;

					.goodName {
						color: #FFFFFF;
						font-size: 30rpx;
						margin-bottom: 15rpx;
						font-weight: bold;
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

	.conlist {
		height: 200rpx;
		background: url(../../static/img/index/bg1.png) no-repeat;
		background-size: 100% auto;
		border-radius: 30rpx;

		.conimg {
			width: 200rpx;
			height: 200rpx;
			border-radius: 30rpx;
		}

		.conright {
			margin-left: 24rpx;
			flex: 1;

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
				background: #3A3A3A;
				border-radius: 6rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				padding: 0 16rpx;
				display: flex;
			}
		}
	}
</style>
