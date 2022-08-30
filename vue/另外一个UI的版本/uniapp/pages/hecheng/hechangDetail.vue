<template>
	<view class="container">
		<view class="hechangContent">
			<view class="hechangrule" @tap="gotoComposeRule">合成规则</view>
			<swiper class="banner" indicator-dots="true" circular="true" :current="current" :autoplay="false" @change="composeChange" interval="3000" duration="800"
				indicator-color="#FFFFFF" indicator-active-color="#00D18B">
				<swiper-item class="listItem" v-for="(item, index) in composeList" :key="index">
					<view class="mask">
						<view class="center flex_column">
							<image :src="item.image" mode="aspectFill"></image>
						</view>
					</view>
					<view class="goodsImgbox">
						<image class="goodsImg" :src="item.image" mode=""></image>
					</view>
					
				</swiper-item>
			</swiper>
		</view>
		<view class="hechengCotent">
			<view class="hechengBtn" @tap="suiPianHecHeng"></view>
			<!-- <view v-else class="no_aount">碎片不足</view> -->
			<view class="shuliang">(<text :class="currentData.total < composeConfig.compose_num?'red':''">{{currentData.total}}</text>/{{composeConfig.compose_num}})</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0, //默认显示第一个滑块
				composeConfig:{}, //合成规则
				composeList:[], //碎片列表
				currentData:{}, //当前选中的碎片
			}
		},
		onLoad() {
			this.current = 0;
			this.currentData = {};
			this.getUserChipsList();
			this.getComposeConfig();
		},
		onShow() {
		},
		methods: {
			getComposeConfig() {
				this.$http.post('compose/getComposeConfig').then(res => {
					if(res.code == 1){
						this.composeConfig = res.data;
					} 
				})
			},
			//碎片切换
			composeChange(event)
			{
				let index = event.detail.current;
				this.current = index;
				if(this.composeList && this.composeList[index])
				{
					this.currentData = this.composeList[index];
				}
			},
			//碎片合成
			suiPianHecHeng()
			{
				if(!this.currentData)
				{
					uni.showToast({title: '碎片不存在!',icon:'error'});
					return;
				}
				if(this.currentData.total < this.composeConfig.compose_num)
				{
					uni.showToast({title: '碎片数量不足!',icon:'error'});
					return;
				}
				this.$http.post('compose/chipCompose',{
					chip_id: this.currentData.id
				}).then(res => {
					if(res.code == 1){
						uni.showToast({title: '合成成功!',icon:'success'});
						this.getUserChipsList();
					}
				})
			},
			//获取用户的碎片列表
			getUserChipsList()
			{
				this.$http.post('compose/getUserChipsList').then(res => {
					if(res.code == 1){
						this.composeList = res.data;
						if(this.composeList && this.composeList[this.current])
						{
							this.currentData = this.composeList[this.current];
						}
						else{
							
							this.current = 0;
							this.currentData = this.composeList[0];
						}
					} 
					else{
						this.current = 0;
						this.composeList = [];
						this.currentData = {};
					}	
				})
			},
			//跳转到合成规则
			gotoComposeRule(){
				this.go('/pages/hecheng/hechenegRule');
			},
		}
	}
</script>
<style>
	page {
		background-color:  #1e201f;
	}
</style>
<style lang="scss" scoped>
.hechangContent{
	position: relative;
}
.hechangrule{
	width: 164rpx;
	height: 56rpx;
	color: #fff;
	font-size: 26rpx;
	line-height: 56rpx;
	text-align: center;
	background: #00D18B;
	border-radius: 100px 0px 0px 100px;
	position: absolute;
	z-index: 5;
	right: 0px;
	top: 32rpx;
}
.banner{
	margin: 20rpx 30rpx;
	height: 700rpx;
	.listItem {
		background-color: #2C2D2F;
		border-radius: 30rpx;
		margin-bottom: 35rpx;
		position: relative;
		.mask {
			width: 690rpx;
			height: 690rpx;
			border-radius: 30rpx;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 10;
			.center {
				width: 442rpx;
				height: 340rpx;
				background: url(../../static/img/index/bj.png) no-repeat left top;
				background-size: 100%;
				margin: 150rpx auto;
	
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
	   }  

		.goodsImg {
			width: 690rpx;
			height: 690rpx;
			border-radius: 30rpx;
			-webkit-filter: blur(4px);
			filter: blur(4px);
		}
	}
}
.hechengCotent{
	text-align: center;
	margin-top: 40rpx;
	.hechengBtn{
		width: 60%;
		background-image: url(../../static/img/hecheng/hecheng.png);
		background-repeat: no-repeat;
		background-size: 100% auto;
		margin: 0 auto;
		height: 120rpx;
		line-height: 120rpx;
	}
	.shuliang{
		margin-top: 20rpx;
		color: #00D585;
		font-size: 30rpx;
		.red{
			color: red;
		}
	}
	.no_aount{
		margin: 0 auto;
		margin-top: 20rpx;
		color: #00D585;
		font-size: 24rpx;
		width: 60%;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 20rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		font-weight: 500;
		background: #8c8c8c;
	}
}

</style>
