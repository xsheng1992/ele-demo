<template>
	<div class="shopRate">
		<div id="shopRateWrapper" class="wrapper">
			<div class="scroller">
				<!--头部-->
				<div class="header">
					<div class="left">
						<p class="score">{{seller.score}}</p>
						<p class="text1">综合评分</p>
						<p class="text2">高于周边商家{{seller.rankRate}}%</p>
					</div>
					<div class="right">
						<p>
							<span class="tit">服务态度</span>
							<rank-star type="small" :score="seller.serviceScore"></rank-star>
							<span class="sc">{{seller.serviceScore}}</span>
						</p>
						<p>
							<span class="tit">商品质量</span>
							<rank-star type="small" :score="seller.foodScore"></rank-star>
							<span class="sc">{{seller.foodScore}}</span>
						</p>
						<p>
							<span class="tit">送达时间</span>
							<span class="gray">{{seller.deliveryTime}}分钟</span>
						</p>
					</div>
				</div>
				<!--公告与活动-->
				<seller-rate pageType="seller"></seller-rate>

			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import rankstar from './part/rankstar.vue'
import rate from './part/rate.vue'

export default {
	components: {
		'rank-star': rankstar,
		'seller-rate': rate
	},
  computed: {
    ...mapGetters({
      seller: 'getSellerInfo'
    })
  },
  mounted() {
  	setTimeout(function(){
  		new IScroll('#shopRateWrapper', {mouseWheel: true, tap: true, click: true});
  	}, 100);
  }
}
</script>

<style scoped>
.shopRate {
	position: relative;
	height: 100%;
	background-color: #f3f5f7;
	display: flex;
}
	.header { 
		border-bottom: 1px solid rgba(7,17,27,.1);
		background-color: #fff;
		padding: 36px 0;
		margin-bottom: 32px;
		display: flex;
	}
		.header .left {
			width: 275px;
			flex-shrink: 0;
			text-align: center;
		}
			.header .left>.score {
				font-size: 48px;
				line-height: 56px;
				color: rgb(255,153,0);
				margin-bottom: 12px;
			}
			.header .left>.text1 {
				font-size: 24px;
				line-height: 24px;
				color: rgb(7,17,27);
				margin-bottom: 16px;
			}
			.header .left>.text2 {
				font-size: 20px;
				line-height: 20px;
				color: #93999f;
				margin-bottom: 12px;
			}
		.header .right {
			width: 100%;
			border-left: 1px solid rgba(7,17,27,.1);
			padding: 0 38px;
		}
			.header .right>p {
				font-size: 0;
				color: rgb(7,17,27);
			}
			.header .right>p+p { margin-top: 16px;}
			.header .right>p>span { 
				font-size: 24px;
				line-height: 36px;
				color: rgb(7,17,27);
				display: inline-block;
				vertical-align: middle;
			}
			.header .right>p>.tit { margin-right: 18px;}
			.header .right>p>.sc { 
				margin-left: 18px;
				color: rgb(255,153,0);
			}
			.header .right>p>.gray { color: rgb(147,153,159);}
		
</style>
