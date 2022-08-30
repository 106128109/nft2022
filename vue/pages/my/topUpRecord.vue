<template>
	<view class="content">
		<view class="item ptb-22 bb" v-for="(item,index) in recordsList" :key="index">
			<view class="list-top">
				<text>{{item.pay_type=='4'?'支付宝':(item.pay_type=='2'?'支付宝':'微信')}}充值</text>
				<text>{{item.money}}</text>
			</view>
			<view class="colorc6 black size-28">
				{{item.create_time | formatDate}}
				<!-- {{item.create_time}} -->
			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordsList: [],
				status: 'more',
				pagesize: 15,
				page: 1,
				flag: false, //上拉加载
				status: 'more',
			}
		},
		onLoad(e) {
			this.getData();
		},
		onReachBottom() {
			this.status = "loading";
			this.page++;
			this.getData()
		},
		filters: {
			formatDate: function(time, type = 0) {
				type = type || 0;
				var timestamp = parseFloat(time) > 0 ? time * 1000 : 0;
				var date = new Date(timestamp);
			
				var month = date.getMonth() + 1;
				var day = date.getDate(),
					hour = date.getHours(),
					min = date.getMinutes(),
					sec = date.getSeconds();
				var ret = {
					"y": date.getFullYear(),
					"m": month,
					"d": day,
					h: hour,
					"i": hour,
					's': sec,
					w: date.getDay(),
					"year": date.getFullYear()
				}
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (day >= 0 && day <= 9) {
					day = "0" + day;
				}
				if (hour >= 0 && hour <= 9) {
					hour = "0" + hour;
				}
				if (min >= 0 && min <= 9) {
					min = "0" + min;
				}
				if (sec >= 0 && sec <= 9) {
					sec = "0" + sec;
				}
				if (type == 3) {
					//简写ymdisw小于10不带0,星期不转化汉字
					ret.month = month;
					ret.day = day;
					ret.hour = hour;
					ret.second = sec;
					var weekday = ["日", "一", "二", "三", "四", "五", "六"];
					ret.weekday = weekday[date.getDay()];
					ret.date = date.getFullYear() + "-" + month + "-" + day;
					ret.time = hour + ":" + min + ":" + sec;
				} else if (type == 4) {
					ret = hour + ":" + min;
				} else if (type == 5) {
					ret = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min;
				} else if (type == 2) {
					ret = hour + ":" + min + ":" + sec;
				} else if (type == 1) {
					ret = date.getFullYear() + "-" + month + "-" + day;
				} else {
					ret = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
				}
				return ret;
			}
		},
		methods: {
			getData(a) {
				let data = {
					status: this.status,
					page: this.page,
					pagesize: this.pagesize
				}
				if (data.status == '-1') {
					data.status = ''
				}
				this.$http.post('order/CzList', data).then(res => {
					uni.stopPullDownRefresh();
					if (res.code == 1) {
						if (res.data.data.length == 0) {
							this.flag = true;
							this.status = 'noMore'
						} else {
							this.recordsList = this.recordsList.concat(res.data.data);
							if (res.data.data.length < this.pagesize) {
								this.flag = true;
								this.status = 'noMore'
							}
						}
					} else {
						this.toast(res.msg);
						this.status = 'noMore'
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		padding: 0 30rpx;
	}

	.list-top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		color: #000;
		margin-bottom: 20rpx;
	}
</style>
