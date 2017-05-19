<template>
  <div class="cart-bar">
    <div class="cart-bg">
      <button class="btn-cart" :class="{active: cart}" @click="showDetail">
        <svg class="sicon-cart"><use xlink:href="#sicon-shopping_cart"></use></svg>
      </button>
      <span class="count-icon" v-if="cart">{{allCount}}</span>
    </div>
    <div class="cart-price">
      <span class="price" :class="{active: cart}">¥ {{getPrice}}</span><span class="fee">另需配送费¥{{seller.deliveryPrice}}元</span>
    </div>
    <div class="cart-account">
      <button class="btn-account" v-if="!cart">¥ {{seller.minPrice}}起送</button>
      <button class="btn-account" v-else-if="getPrice<seller.minPrice">还差¥{{seller.minPrice-getPrice}}起送</button>
      <button class="btn-account active" v-else="" @click="settleAccount">结算</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import * as types from '../../store/mutation-types'

export default {
  computed: {
    ...mapGetters({
      seller: 'getSellerInfo',
      cart: 'getCartState',
      getPrice: 'getCartPrice',
      allCount: 'getAllCount'
    })
  },
  methods: {
    settleAccount() {
      alert("finfish");
    },
    showDetail() {
      if(this.cart) {
        this.$store.commit(types.SHOW_CDETAIL);
        /*插入元素后绑定iscroll*/
        setTimeout(function(){
          new IScroll('#cartListWrapper', {mouseWheel: true, tap: true, click: true});
        }, 100);
      }
    }
  }
}
</script>

<style scoped>
.cart-bar {
  height: 96px;
  background-color: rgba(7,17,27,.95);
  flex-shrink: 0;
  padding-left: 160px;
  position: relative;
  display: flex;
  z-index: 100;
}
  /*购物车按钮*/
  .cart-bg {
    width: 112px;
    height: 112px;
    padding: 12px;
    border-radius: 50%;
    background-color: #131d26;
    position: absolute;
    top: -20px;
    left: 24px;
  }
    .btn-cart {
      width: 88px;
      height: 88px;
      border: none;
      border-radius: 50%;
      outline: none;
      background-color: #2b343c;
    }
      .btn-cart>.sicon-cart {
        width: 40px;
        height: 40px;
        fill: #80858a;
      }
    .btn-cart.active { background-color: #00a0dc;}
      .btn-cart.active>.sicon-cart { fill: #fff;}
    .count-icon {
      display: block;
      width: 48px;
      height: 32px;
      border-radius: 16px;
      background-color: #f01414;
      position: absolute;
      top: 0;
      right: -5px;
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      text-align: center;
      line-height: 32px;
    }
  /*价格信息*/
  .cart-price {
    width: 100%;
    padding: 24px 0;
  }
    .cart-price .price {
      display: inline-block;
      font-size: 32px;
      font-weight: 700;
      color: rgba(255,255,255,.4);
      line-height: 48px;
      padding-right: 24px;
      vertical-align: middle;
    }
    .cart-price .price.active { color: #fff;}
    .cart-price .fee {
      display: inline-block;
      height: 48px;
      line-height: 48px;
      font-size: 24px;
      font-weight: 200;
      color: rgba(255,255,255,.4);
      vertical-align: middle;
      padding-left: 24px;
      border-left: 2px solid #2b333b;
    }
  /*结账按钮*/
  .cart-account {
    width: 210px;
    height: 100%;
    flex-shrink: 0;
  }
    .btn-account {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      background-color: #2b333b;
      font-size: 24px;
      font-weight: 700;
      color: rgba(255,255,255,.4);
    }
    .btn-account.active {
      color: #fff;
      background-color: #00b43c;
    }

</style>

