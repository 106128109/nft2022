<script>
	export default {
		onLaunch(e) {
		},
		onShow() {
		},
		onHide() {
		}
	}
</script>

<style lang="scss">
	@import "@/common/comm.scss";
	page{
		height: 100%;
		// background-image: url(./static/img/bg.png);
		background-size: 100%  auto;
	}
	.navigator-hover{
		background: none;
	}
	.clearBox{
		overflow: hidden;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.flex{
		display: flex;
	}
	.flexBox{
		display: flex;
		align-items: center;
	}
	.flex_ct{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.flex_bt{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.flex_ar{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.flex_column{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.flexItem{
		flex: 1;
	}
	.tc{
		text-align: center;
	}
	.tr{
		text-align: right;
	}
	
	/* 清除浮动 */
	.clearfix:after {
	 content: ".";
	 display: block;
	 height: 0;
	 clear: both;
	 visibility: hidden;
	}
	.nodata {
			width: 400rpx;
			height: 400rpx;
			margin: 30vh auto 0;
			image {
				height: 100%;
				width: 100%;
			}
		}
	
</style>
