<template>
  <div class="cart-bar">
    <button class="btn-cart">
      <svg class="sicon-cart"><use xlink:href="#sicon-shopping_cart"></use></svg>
    </button>
    <div class="cart-price">
      <span class="price" :class="{active: cartState}">¥ {{getPrice}}</span><span class="fee">另需配送费¥{{seller.deliveryPrice}}元</span>
    </div>
    <div class="cart-account">
      <button class="btn-account" v-if="!cartState">¥ {{seller.minPrice}}起送</button>
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
      cartState: 'getCartState',
      getPrice: 'getCartPrice'
    })
  },
  methods: {
    getIconType(type) {
      switch(type) {
        case 0: return 'icon icon-0';
        case 1: return 'icon icon-1';
        case 2: return 'icon icon-2';
        case 3: return 'icon icon-3';
        case 4: return 'icon icon-4';
      }
    },
    settleAccount() {
      alert("finfish");
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
}
  .btn-cart {
    width: 112px;
    height: 112px;
    border: 12px solid #131d26;
    border-radius: 50%;
    outline: none;
    position: absolute;
    top: -20px;
    left: 24px;
    background-color: #2b343c;
  }
    .btn-cart>.sicon-cart {
      width: 40px;
      height: 40px;
      fill: #80858a;
    }
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
  .cart-account {
    width: 210px;
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

