<template>
	<view class="content">
		<view class="tabBox">
			<view @tap="reload('1')" :class="showType == '1' ? 'tab act' : 'tab'">
				<text>可使用</text>
				<view class="line"></view>
			</view>
			<view @tap="reload('2')" :class="showType == '2' ? 'tab act' : 'tab'">
				<text>已使用</text>
				<view class="line"></view>
			</view>
			<view @tap="reload('3')" :class="showType == '3' ? 'tab act' : 'tab'">
				<text>已失效</text>
				<view class="line"></view>
			</view>
		</view>

		<view class="cousponList">
			<view :class="item.status == 1 ? 'cousponItem flexBox' : 'cousponItem cousponItem1 flexBox'" v-for="(item, index) in CouponList" :key="index">
				<view class="price" >¥{{item.money}}</view>
				<view class="center">
					<view class="name">{{item.name}}</view>
					<view class="des">{{item.desc}}</view>
					<view class="time">有效期至:{{item.end_time}}</view>
				</view>
				<view class="right" v-if="item.status == 1" @tap="goDetail(item)">查 看 券 码 </view>
				<view class="right text1" v-if="item.status == 2" >已 使 用</view>
				<view class="right text2" v-if="item.status == 3" >已 失 效</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showType: '1',
				CouponList: [],
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载
			}
		},
		onLoad() {
		},
		onShow() {
			this.Reset();
		},
		methods: {
			goDetail(a){
				uni.setStorageSync('Coupon', a);
				uni.navigateTo({
					url:'couponDetail'
				})
			},
			Reset(){
				this.CouponList = [];
				this.getList(this.showType)
			},
			reload(n) {
				if (this.showType != n) {
					this.showType = n;
					this.Reset();
				}
			},
			getList(a){
				let data = {
					status: a
				}
				this.$http.post('coupon/usersCoupon', data).then(res => {
					if (res.code == 1) {
						this.CouponList = res.data;
					}
				})
			}

		}
	}
</script>
<style>
	page {
		background-color: #23272C;
	}
</style>
<style lang="scss" scoped>
	.content {
		.tabBox {
			width: 100%;
			height: 88rpx;
			display: flex;
			// background: #23272C;
			position: fixed;
			top: var(--window-top);
			left: 0;
			z-index: 10;

			.tab {
				width: 33.3%;
				position: relative;
				font-size: 26rpx;
				color: #aaaaaa;
				height: 88rpx;
				line-height: 88rpx;
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
					font-weight: 500;
					color: #00D18B;

					.line {
						display: block;
					}
				}
			}
		}

		.cousponList {
			padding: 130rpx 30rpx ;
			.cousponItem {
				height: 180rpx;
				background: url(../../static/img/my/coupon2.png) no-repeat;
				background-size: 100% 100%;
				margin-bottom: 20rpx;
				.price {
					width: 180rpx;
					text-align: center;
					color: #AE3523;
					font-size: 48rpx;
					font-weight: 500;
				}
				.right{
					color: #AE3523;
					font-size: 26rpx;
					font-weight: 500;
					writing-mode: vertical-rl;
					padding: 0 30rpx;
				}
			}
			.cousponItem1{
				background: url(../../static/img/my/coupon1.png) no-repeat;
				background-size: 100%;
				.price{
					color: #FFFFFF;
				}
				.text1{
					color: #F0BA55;
				}
				.text2{
					color: #AAAAAA;
				}
			}
			.center{
				flex: 1;
				margin-left: 20rpx;
				.name{
					color: #AE3523;
					font-size: 28rpx;
					font-weight: 500;
					margin-bottom: 10rpx;
				}
				.des{
					color: #777777;
					font-size: 24rpx;
					font-weight: 500;
				}
				.time{
					color: #777777;
					font-size: 24rpx;
					font-weight: 500;
				}
			}
			
			
		}

	}
</style>
