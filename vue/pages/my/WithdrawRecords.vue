<template>
	<view class="content">
		<view class="tabBox">
			<view @tap="reload('-1')" :class="showType == '-1' ? 'tab act' : 'tab'">
				<text>全部</text>
				<view class="line"></view>
			</view>
			<view @tap="reload('0')" :class="showType == '0' ? 'tab act' : 'tab'">
				<text>待审核</text>
				<view class="line"></view>
			</view>
			<view @tap="reload('1')" :class="showType == '1' ? 'tab act' : 'tab'">
				<text>已通过</text>
				<view class="line"></view>
			</view>
			<view @tap="reload('2')" :class="showType == '2' ? 'tab act' : 'tab'">
				<text>已拒绝</text>
				<view class="line"></view>
			</view>
		</view>
		<view class="item ptb-22 bb flex flex-between" v-for="(item,index) in recordsList" :key="index">
			<view>
				<view class="size-32 black mb-10">{{item.type=='1'?'银行卡':item.type=='2'?'支付宝':'微信'}}提现</view>
				<view class="colorc6 size-28">{{item.create_time}}</view>
			</view>
			<view>
				<view class="size-32 black mb-10">-{{item.account}}</view>
				<view class="colorc6 size-28 textend" v-if="item.status == '0'">审核中</view>
				<view class="mcolor1 size-28 textend" v-if="item.status == '1'">已通过</view>
				<view class="colorc6 size-28 textend" v-if="item.status == '2'">已拒绝</view>
			</view>
			<!-- <view v-if="item.type == '1'" class="">提现类型：<text>银行卡</text></view>
			<view v-if="item.type == '2'" class="">提现类型：<text>支付宝</text></view>
			<view v-if="item.type == '3'" class="">提现类型：<text>微信</text></view>
			<view class="">提现时间：<text>{{item.create_time}}</text></view>
			<view class="">提现金额：<text>{{item.account}}</text> </view>
			<view class="">实际到账：<text>{{item.reality_account}}</text></view>
			<view v-if="item.status == '0'">提现状态：<text style="color: #AE3523;">待审核</text></view>
			<view v-if="item.status == '1'">提现状态：<text style="color: #4BAE45;">已通过</text></view>
			<view v-if="item.status == '2'">提现状态：<text style="color: #FF6A1D;">已拒绝</text></view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordsList: [],
				showType: '-1',
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载
			}
		},
		onLoad(e) {
			this.getData(this.showType);
		},
		onReachBottom(){
			// if (!this.flag) {
			// 	this.status = "loading";
			// 	this.page++;
			// 	this.getData(this.showType)
			// }
		},
		methods: {
			reload(n){
				if(this.showType != n){
					this.showType = n;
					// this.flag = false;
					// this.page = 1;
					this.recordsList = [];
					this.getData(this.showType)
				}
			},
			getData(a){
				let data = {
					status: a
				} 
				if(data.status == '-1'){
					data.status = ''
				}
				this.$http.post('draw/drawRecordList', data).then(res => {
					if (res.code == 1) {
						this.recordsList = res.data;
					} else {
						this.toast(res.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 0 30rpx;
		.tabBox {
			width: 100%;
			height: 100rpx;
			display: flex;
			.tab {
				flex: 1;
				position: relative;
				font-size: 30rpx;
				color: #000;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				font-family: PingFangSC-Regular;
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
					font-size: 30rpx;
					font-weight: 600;
					color: #000;
					.line {
						display: block;
					}
				}
			}
		}
		.listItem{
			line-height: 60rpx;
			color: #000;
			font-size: 28rpx;
			font-weight: 500;
			border-bottom: 2rpx solid #383B3F;
			text{
				color: #aaaaaa;
			}
			
		}
		.colorc6{
			color:#A6AFAE;
		}
	}

</style>
