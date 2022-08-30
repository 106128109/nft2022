<template>
	<view class="">
		<view class="detail">
			<view class="detail-list">
				<view class="detail-title">
					我的团队
				</view>
				<view class="detail-num">
					{{teamNum}}<text style="font-size: 30rpx;">人</text>
				</view>
			</view>
			<view class="detail-list">
				<view class="detail-title">
					已认证人数
				</view>
				<view class="detail-num">
					{{rzNum}}<text style="font-size: 30rpx;">人</text>
				</view>
			</view>
			<!-- <view class="detail-list">
				<view class="detail-title">
					当前活动邀请人
				</view>
				<view class="detail-num">
					69<text style="font-size: 30rpx;">人</text>
				</view>
			</view> -->
		</view>
		<view class="nav">
			<view :class="curNav==navIndex?'nav-list nav-active':'nav-list'" v-for="(navItem,navIndex) in navList" @click="getCurNav(navIndex)">
				{{navItem}}
			</view>
			<!-- <view class="nav-list">
				团队成员
			</view> -->
		</view>
		<view class="" v-if="curNav==0">
			<view class="list-title" >
				<view class="list-title-mc">
					排名
				</view>
				<view class="list-title-name">
					用户昵称
				</view>
				<view class="list-title-rs">
					直推实名
				</view>
				<view class="list-title-rs">
					直推人数
				</view>
			</view>
			<view class="lists" v-for="(user, userIndex) in userList">
				<view class="lists-title-mc">
					{{userIndex+1}}
				</view>
				<view class="lists-title-name">
					{{user.nick_name}}
				</view>
				<view class="lists-title-rs">
					{{user.auth_count}}人
				</view>
				<view class="lists-title-rs">
					{{user.all_person_count}}人
				</view>
			</view>
		</view>
		<view class="" v-if="curNav==1">
			<view class="list-title" v-if="team.length>0">
				<view class="list-title-mc">
					头像
				</view>
				<view class="list-title-name">
					手机号
				</view>
				<view class="list-title-rs">
					时间
				</view>
			</view>
			<view class="lists" v-for="(item,index) in team" :key="index">
				<image :src="item.head_image" mode="aspectFill" class="userimg"></image>
				<view class="lists-title-name">{{item.phone}}</view>
				<view class="lists-title-time">{{item.create_time}}</view>
			</view>
			<view class="no-data mt-20" v-if="team.length==0">
				没有更多数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamNum: "",
				rzNum: "",
				navList: ['排行榜', '团队成员'],
				curNav: 0,
				page: 1,
				pageSize: 10,
				userList: [],
				team:[],
				userCount: 0
			}
		},
		onLoad() {
			this.getPeopleNum()
			this.getRank()
		},
		onReachBottom() {
			if (this.curNav == 0) {
				if (this.userList.length < this.userCount) {
					this.page++;
					this.getRank();
				}
			}
		},
		methods: {
			getPeopleNum() {
				this.$http.get('user/tdusers').then(res => {
					this.rzNum = res.rzrs;
					this.teamNum = res.wdtd;
				})
			},
			getCurNav(navIndex) {
				this.curNav = navIndex;
				this.page = 1;
				if (this.curNav == 0) {
					this.getRank()
				} else {
					this.getTeam()
				}
				
			},
			getRank() {
				let data = {
					page: this.page,
					pagesize: this.pageSize
				}
				this.$http.post('user/Ranking', data).then(res => {
					if (this.userList.length < res.count) {
						this.userCount = res.count
						this.userList = this.userList.concat(res.data)
					}
					
				})
			},
			getTeam() {
				this.$http.get('user/team').then(res => {
					if (res.code == 1) {
						this.team=res.data
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #F0F0F0;
	}

	.detail {
		padding: 20rpx 30rpx;
		width: calc(100% - 60rpx);
		display: flex;
		justify-content: space-around;
		background-color: #ffffff;

		.detail-list {
	
			.detail-title {
				font-size: 30rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #000000;
			}

			.detail-num {
				margin-top: 20rpx;
				font-size: 36rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #024EFF;
				text-align: center;
			}
		}
	}

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
			width: 50rpx;
			height: 3rpx;
			background: #024EFF;
			border-radius: 2rpx;
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

	.list-title {
		margin: 0 30rpx;
		margin-top: 50rpx;
		width: calc(100% - 60rpx);
		
		display: flex;

		.list-title-mc {
			width: 80rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #666666;
			text-align: center;
		}

		.list-title-name {
			width: calc(100% - 220rpx);
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #666666;
			text-align: center;
		}

		.list-title-rs {
			width: 200rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #666666;
			text-align: right;
		}
		
	}

	.lists {
		margin: 0 30rpx;
		margin-top: 30rpx;
		width: calc(100% - 100rpx);
		height: 99rpx;
		padding: 0 20rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		align-items: center;

		.lists-title-mc {
			width: 80rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #333333;
		}

		.lists-title-name {
			width: calc(100% - 230rpx);
			padding-left: 10rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #333333;
		}

		.lists-title-rs {
			width: 200rpx;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #333333;
			text-align: right;
		}
		
		.lists-title-time{
			font-size: 24rpx;
			text-align: right;
		}
		.userimg{
			width: 50rpx;
			height: 50rpx;
			margin-right: 20rpx;
			border-radius: 50%;
		}
	}
	.no-data{
		display: flex;
		flex-direction: row;
		height: 40rpx;
		align-items: center;
		justify-content: center;
		color:#777777;
		font-size: 30rpx;
	}
</style>
