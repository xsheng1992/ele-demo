<template>
	<div class="shopDetail">
		<div id="shopDetailWrapper" class="wrapper">
			<div class="scroller">
				<!--头部-->
				<div class="header">
					<div class="header-top">
						<div class="name">
							<h1>{{seller.name}}</h1>
							<p>
								<rank-star type="small" :score="seller.score"></rank-star>
								<span class="ratecount">({{seller.ratingCount}})</span>
								<span class="sellcount">月售{{seller.sellCount}}单</span>
							</p>
						</div>
						<div class="favo">
							<span @click="favo = !favo">
								<svg class="icon-favo" :class="{on: favo}"><use xlink:href="#sicon-favorite"></use></svg>
								<p :class="{on: favo}">{{favo?'已收藏':'收藏'}}</p>
							</span>
						</div>
					</div>
					<div class="header-bottom">
						<div class="box">
							<p class="small">起送价</p>
							<p class="big">{{seller.minPrice}}<span>元</span></p>
						</div>
						<div class="box">
							<p class="small">商家配送</p>
							<p class="big">{{seller.deliveryPrice}}<span>元</span></p>
						</div>
						<div class="box">
							<p class="small">平均配送时间</p>
							<p class="big">{{seller.deliveryTime}}<span>分钟</span></p>
						</div>
					</div>
				</div>
				<!--公告与活动-->
				<div class="bulletin">
					<h1>公告与活动</h1>
					<p>{{seller.bulletin}}</p>
					<ul>
						<li v-for="item of seller.supports">
	            <i :class="item.type>=0?'icon icon2-'+item.type:''"></i><span>{{item.description}}</span>
	          </li>
					</ul>
				</div>
				<!--商家实景-->
				<div class="shopimg">
					<h1>商家实景</h1>
					<div class="image-list">
						<div id="shopImagesWrapper" class="wrapper">
							<div class="scroller" :style="{width: (seller.pics.length*252-12+72)+'px'}">
								<ul>
									<li v-for="img in seller.pics">
										<img :src="img">
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<!--商家信息-->
				<div class="shopinfos">
					<h1>商家信息</h1>
					<ul>
						<li v-for="info in seller.infos">{{info}}</li>
					</ul>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import rankstar from './part/rankstar.vue'

export default {
	data() {
		return {
			favo: false
		}
	},
	components: {
		'rank-star': rankstar
	},
  computed: {
    ...mapGetters({
      seller: 'getSellerInfo'
    })
  },
  mounted() {
  	setTimeout(function(){
  		new IScroll('#shopDetailWrapper', {mouseWheel: true, tap: true, click: true});
  		new IScroll('#shopImagesWrapper', {scrollX: true, scrollY: false, mouseWheel: true, click: true});
  	}, 100);
  }
}
</script>

<style scoped>
.shopDetail {
	position: relative;
	height: 100%;
	background-color: #f3f5f7;
	display: flex;
}
	.header { 
		border-bottom: 1px solid rgba(7,17,27,.1);
		background-color: #fff;
		padding: 36px;
		margin-bottom: 32px;
	}
	.header-top {
		display: flex;
		border-bottom: 1px solid rgba(7,17,27,.1);
	}
		.header-top .name { width: 100%;}
			h1 {
				font-size: 28px;
				line-height: 28px;
				color: rgb(7,17,27);
				font-weight: normal;
				margin-bottom: 16px;
			}
			.header-top .name>p { 
				font-size: 0;
				margin-bottom: 36px;
			}
				.header-top .name>p>span {
					display: inline-block;
					vertical-align: middle;
					line-height: 36px;
					font-size: 20px;
					color: rgb(77,85,93);
				}
				.header-top .name>p>.ratecount { margin-left: 16px;}
				.header-top .name>p>.sellcount { margin-left: 24px;}

		.header-top .favo {
			width: 60px;
			text-align: right;
			flex-shrink: 0;
			text-align: center;
		}
			.header-top .favo .icon-favo {
				width: 40px;
				height: 40px;
				display: inline-block;
				margin-bottom: 8px;
				fill: #d4d6d9;
			}
			.header-top .favo .icon-favo.on { fill: rgb(240,20,20);}
			.header-top .favo p { 
				font-size: 20px;
				line-height: 20px;
				color: #93999f;
			}
			.header-top .favo p.on { color: #4d555d;}

	.header-bottom {
		padding-top: 36px;
		display: flex;
	}
		.header-bottom>.box {
			width: 100%;
			height: 76px;
			text-align: center;
		}
		.header-bottom>.box+.box { border-left: 1px solid rgba(7,17,27,.1);}
			.header-bottom>.box>p.small {
				font-size: 20px;
				height: 20px;
				line-height: 20px;
				margin-bottom: 8px;
				color: #93999f;
			}
			.header-bottom>.box>p.big {
				font-size: 48px;
				height: 48px;
				line-height: 48px;
				color: rgb(7,17,27);
				font-weight: 200;
			}
				.header-bottom>.box>p.big>span {
					font-size: 20px;
				}
		
	.bulletin {
		padding: 36px;
		background-color: #fff;
		border-top: 1px solid rgba(7,17,27,.1);
		border-bottom: 1px solid rgba(7,17,27,.1);
		margin-bottom: 32px;
	}
		.bulletin>p {
			font-size: 24px;
			font-weight: 200;
			line-height: 48px;
			margin-bottom: 32px;
			color: rgb(240,20,20);
			padding: 0 24px;
			text-align: justify;
		}
		.bulletin>ul { list-style: none;}
			.bulletin>ul>li {
				border-top: 1px solid rgba(7,17,27,.1);
				padding: 32px 24px;
				font-size: 24px;
				font-weight: 200;
				line-height: 32px;
				color: rgb(7,17,27);
			}
			.bulletin>ul>li>i, .bulletin>ul>li>span { 
				display: inline-block;
				vertical-align: middle;
			}
			.bulletin>ul>li>i {
				width: 32px;
				height: 32px;
				margin-right: 12px;
			}

	.shopimg {
		padding: 36px 0;
		background-color: #fff;
		border-top: 1px solid rgba(7,17,27,.1);
		border-bottom: 1px solid rgba(7,17,27,.1);
		margin-bottom: 32px;
	}
		.shopimg>h1 { 
			padding: 0 36px;
			margin-bottom: 24px;
		}
		.shopimg .image-list {
			height: 180px;
			position: relative;
		}
		.shopimg .image-list ul {
			width: 100%;
			height: 180px;
			padding: 0 36px;
			list-style: none;
			font-size: 0;
		}
			.shopimg .image-list ul>li {
				display: inline-block;
				width: 240px;
				height: 180px;
			}
			.shopimg .image-list ul>li+li { margin-left: 12px;}
				.shopimg .image-list ul>li>img {
					width: 100%;
					height: 100%;
				}

	.shopinfos {
		padding: 36px;
		background-color: #fff;
		border-top: 1px solid rgba(7,17,27,.1);
	}
		.shopinfos>ul { list-style: none;}
		.shopinfos>ul>li {
			border-top: 1px solid rgba(7,17,27,.1);
			padding: 32px 24px;
			font-size: 24px;
			font-weight: 200;
			line-height: 32px;
			color: rgb(7,17,27);
			text-align: justify;
		}
</style>
