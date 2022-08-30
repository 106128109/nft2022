<template>
	<view>
		<view class="nav">
			<view class="nav-list" :class="active==0?'nav-active':''" @tap="tab(0)">
				受赠
			</view>
			<view class="nav-list" :class="active==1?'nav-active':''" @tap="tab(1)">
				转赠
			</view>
		</view>
		<view class="list" v-for="(item,index) in list" :key="index">
			<view class="list-top">
				<image class="list-img" :src="item.image" mode=""></image>
				<view class="list-con">
					<view class="list-con-top">
						<view class="list-title">
							{{item.title}}
						</view>
						<view class="list-type">
							<!-- 注册赠送 -->
							{{active==0?'受赠':'转赠'}}
						</view>
					</view>
					<view class="list-bh">
						藏品编号：{{item.order_num}}
					</view>
					<view class="list-bh">
						{{active==0?'受赠于':'转赠于'}}:{{item.zzr_phone}}
					</view>
				</view>
			</view>
			<view class="list-text">
				<view class="list-text-left">
					交易时间
				</view>
				<view class="list-text-right">
					{{item.transfer_create_time}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				list: []
			}
		},
		onLoad() {
			this.getlist();
		},
		methods: {
			tab(id) {
				this.active = id;
				this.getlist();
			},
			async getlist() {
				try {
					let res = await this.$http.get("order/getGoodsTransfer", {
						transfer_type: this.active
					});
					if (res.code == 1) {
						this.list = res.data;
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		padding: 20rpx 30rpx;
		width: calc(100% - 60rpx);
		display: flex;
		justify-content: space-around;

		.nav-list {
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #666666;
			position: relative;
		}

		.nav-active.nav-list::after {
			content: "";
			display: block;
			width: 51rpx;
			height: 5rpx;
			background: #024EFF;
			border-radius: 3rpx;
			position: absolute;
			bottom: -10rpx;
			left: 0;
			right: 0;
			margin-left: auto;
			margin-right: auto;
		}

		.nav-active {
			color: #024EFF;
		}
	}

	.list {
		margin: 0 30rpx;
		margin-top: 30rpx;
		width: calc(100% - 100rpx);
		padding: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 15rpx 6rpx rgba(52, 52, 52, 0.1);

		.list-top {
			width: 100%;
			height: 198rpx;
			display: flex;

			.list-img {
				width: 198rpx;
				height: 198rpx;
				border-radius: 10rpx;
			}

			.list-con {
				width: calc(100% - 218rpx);
				height: 100%;
				padding-left: 20rpx;

				.list-con-top {
					width: 100%;
					display: flex;
					align-items: center;

					.list-title {
						width: calc(100% - 100rpx);
						height: 40rpx;
						font-size: 30rpx;
						font-family: Microsoft YaHei;
						font-weight: bold;
						color: #000000;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.list-type {
						width: 100rpx;
						height: 24rpx;
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: bold;
						color: #024EFF;
						white-space: nowrap;
					}
				}

				.list-bh {
					margin-top: 26rpx;
					width: 100%;
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					color: #666666;
					word-break: break-all;
				}
			}
		}

		.list-text {
			margin-top: 30rpx;
			width: 100%;
			display: flex;

			.list-text-left {
				width: 140rpx;
				height: 40rpx;
				font-size: 26rpx;
				font-family: Microsoft YaHei;
				color: #666666;
				line-height: 40rpx;
			}

			.list-text-right {
				width: calc(100% - 40rpx);
				height: 40rpx;
				font-size: 26rpx;
				font-family: Microsoft YaHei;
				color: #666666;
				line-height: 40rpx;
				text-align: right;
			}
		}
	}
</style>
