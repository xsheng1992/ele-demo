<template>
  <transition-group tag="div" v-if="cartDetail" name="fade" class="shopcartbox">
    <div class="mask" @click="hideDetail" key="mask"></div>
    <div class="cart-page" key="cart">
      <div class="title">
        <span class="left">购物车</span>
        <span class="right" @click="clear">清空</span>
      </div>
      <div class="list" :style="setHeight">
        <div id="cartListWrapper" class="wrapper">
          <div class="scroller">
            <ul class="cart-list">
              <li v-for="item in cart">
                <div class="name">{{item.name}}</div>
                <div class="counterbox">
                  <counter :foodData="item" @countChange="onCountChange"></counter>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import * as types from '../../store/mutation-types'
import counter from './part/counter.vue'
import {
  creatScroller,
  scrollerRefesh
} from '../../util/iscrollfunc.js'

let cartScroller = null;

export default {
  components: {
    'counter': counter
  },
  computed: {
    ...mapGetters({
      cart: 'getCartState',
      cartDetail: 'getCartDetailState'
    }),
    setHeight() {
      let len = this.cart.length;
      return {height: ((len>5?5:len)*96+20)+'px'};
    }
  },
  methods: {
    clear() {
      this.$store.commit(types.CLEAR_CART);
    },
    hideDetail() {
      this.$store.commit(types.HIDE_CDETAIL);
    },
    onCountChange() {
      scrollerRefesh(cartScroller);
    }
  },
  mounted() {
    /*插入元素后绑定iscroll*/
    creatScroller('#cartListWrapper', {
      mouseWheel: true, 
      tap: true,
      click: true
    }).then(value=>{
      cartScroller = value;
    });
  },
  beforeDestroy() {
    cartScroller.destroy();
    cartScroller = null;
  }
}
</script>

<style scoped>
/*背景*/
.shopcartbox {
  position: relative;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 50;
  background-color: rgba(0,0,0,.4);
}
.cart-page {
  width: 100%;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding-bottom: 96px;
  z-index: 60;
}
  .title {
    width: 100%;
    height: 80px;
    padding-left: 36px;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,.1);
    display: flex;
    flex-shrink: 0;
  }
    .title>.left {
      width: 100%;
      font-size: 28px;
      font-weight: 200;
      line-height: 80px;
      color: rgb(7,17,27);
    }
    .title>.right {
      width: 112px;
      flex-shrink: 0;
      padding: 0 36px;
      font-size: 20px;
      line-height: 80px;
      color: rgb(0,160,200);
      text-align: center;
      cursor: pointer;
    }

  .list { 
    position: relative;
    height: 100%;
    min-height: 96px;
    overflow: hidden;
  }
    .cart-list {
      list-style: none;
      padding: 0 36px 20px;
    }
    .cart-list>li {
      height: 96px;
      line-height: 96px;
      display: flex;
    }
    .cart-list>li+li {
      border-top: 1px solid rgba(7,17,27,.1);
    }
      .cart-list>li>.name { 
        width: 100%;
        font-size: 28px;
        color: rgb(7,17,27);
      }
      .cart-list>li>.counterbox {
        width: 220px;
        flex-shrink: 0;
      }


/*slide动画*/
.slide-enter-active, .slide-leave-active {
  -webkit-transition: all 1s ease;
     -moz-transition: all 1s ease;
          transition: all 1s ease;

  bottom: 0;
}
.slide-enter, .slide-leave-active {
  bottom: -596px;
}
/*fade动画*/
.fade-enter-active, .fade-leave-active {
  -webkit-transition: opacity 1s ease;
     -moz-transition: opacity 1s ease;
          transition: opacity 1s ease;

  opacity: 0.4;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
