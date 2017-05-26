<template>
	<transition name="slide">
  	<div class="foodDetail">
  		<div class="container">
  			<div id="foodDetailWrapper" class="wrapper">
  				<div class="scroller">
  					<div class="header">
  						<div class="header-img" :style="{backgroundImage: 'url('+food.image+')'}"></div>
  						<div class="header-text">
  							<h1>{{food.name}}</h1>
  							<p class="info"><span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
  							<counter :foodData="food" :foodDetail="true"></counter>
  						</div>
				      <button class="backbtn" @click="$router.push('/seller/goods')">
				        <svg class="icon-back"><use xlink:href="#sicon-arrow_lift"></use></svg>
				      </button>
  					</div>
  					<div class="foodinfo">
  						<h1>商品介绍</h1>
  						<p>{{food.info || food.name}}</p>
  					</div>
  					<food-rate pageType="food" @changeType="onChangeType"></food-rate>
  				</div>
  			</div>
  		</div>
  	</div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import counter from './part/counter.vue'
import rate from './part/rate.vue'
import {
	creatScroller,
	scrollerRefesh
} from '../../util/iscrollfunc.js'

let foodScroller = null;

export default {
	components: {
		'counter': counter,
		'food-rate': rate
	},
  computed: {
    ...mapGetters({
      food: 'getFoodDetail'
    })
  },
  methods: {
  	onChangeType() {
  		scrollerRefesh(foodScroller);
  	}
  },
  mounted() {
  	creatScroller('#foodDetailWrapper', {
  		mouseWheel: true, 
  		click: true
  	}).then(value=>{
  		foodScroller = value;
  	});
  },
  beforeDestroy() {
  	foodScroller.destroy();
		foodScroller = null;
  }
}
</script>

<style scoped>
.foodDetail {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #f3f5f7;
	z-index: 20;
	padding-bottom: 96px;
}
	.header { 
		border-bottom: 1px solid rgba(7,17,27,.1);
		background-color: #fff;
		margin-bottom: 32px;
	}
		.header-img {
			background-position: center;
			background-size: cover;
			height: 750px;
		}
		.header-text { padding: 36px;}
			.header-text>h1 {
				font-size: 28px;
				line-height: 28px;
				margin-bottom: 16px;
				color: rgb(7,17,27);
			}
			.header-text>.info {
				font-size: 20px;
				line-height: 20px;
				color: rgb(147,153,159);
				margin-bottom: 36px;
			}
			.header-text>.info span+span { margin-left: 24px;}

    .backbtn {
      width: 60px;
      height: 60px;
      background-color: rgba(255,255,255,.8);
      padding: 0;
      text-align: center;
      border: none;
      border-radius: 50%;
      position: absolute;
      top: 20px;
      left: 20px;
    }
      .icon-back {
      	display: inline-block;
        width: 28px;
        height: 28px;
        fill: rgb(7,17,27);
      }

	.foodinfo {
		padding: 36px;
		border-top: 1px solid rgba(7,17,27,.1);
		border-bottom: 1px solid rgba(7,17,27,.1);
		background-color: #fff;
		margin-bottom: 32px;
	}
		.foodinfo>h1 {
			font-size: 28px;
			line-height: 28px;
			font-weight: normal;
			color: rgb(7,17,27);
			margin-bottom: 12px;
		}
		.foodinfo>p {
			font-size: 24px;
			line-height: 48px;
			color: rgb(77,85,93);
			padding: 0 16px;
			text-align: justify;
		}
	

/*slide左侧进入*/
.slide-enter-active, .slide-leave-active {
	-webkit-transition: left .5s ease;
	   -moz-transition: left .5s ease;
	  			transition: left .5s ease;
	left: 0;
}
.slide-enter, .slide-leave-active {
	left: 100%;
}
</style>
