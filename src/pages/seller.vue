<template>
  <div class="container">
    <div class="flexbox" :class="{blur: detailPage}">
      <seller-header></seller-header>
      <div class="content">
        <ul class="content-nav">
          <li :class="{active: location === '/seller/goods'}"><router-link to="/seller/goods">商品</router-link></li>
          <li :class="{active: location === '/seller/rate'}"><router-link to="/seller/rate">评价</router-link></li>
          <li :class="{active: location === '/seller/shop'}"><router-link to="/seller/shop">商家</router-link></li>
        </ul>
        <router-view></router-view>
      </div>
      <seller-cart></seller-cart>
    </div>
    <seller-infopage></seller-infopage>
    <cart-detail v-if="cartDetail"></cart-detail>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import header from '../components/seller/header.vue';
import infopage from '../components/seller/infopage.vue';
import cart from '../components/seller/cart.vue';
import cartdetail from '../components/seller/cartdetail.vue';

export default {
  data(){
    return {
      location: '/seller/goods'
    }
  },
  components: {
    "seller-header": header,
    "seller-infopage": infopage,
    "seller-cart": cart,
    "cart-detail": cartdetail
  },
  computed: {
    ...mapGetters({
      detailPage: 'getSellerInfoState',
      cartDetail: 'getCartDetailState'
    })
  },
  watch: {
    '$route'(to,from) {
      this.location = this.$route.path
    }
  },
  created() {
    this.location = this.$route.path;
    this.$store.dispatch('getData', {id: '0001'});
  }
}
</script>

<style scoped>
.flexbox {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
    /*切换列表*/
    .content-nav {
      width: 100%;
      height: 80px;
      border-bottom: 2px solid rgba(7,17,27,.1);
      list-style: none;
      display: flex;
      flex-shrink: 0;
    }
    .content-nav>li {
      width: 100%;
    }
      .content-nav>li>a {
        display: block;
        text-decoration: none;
        outline: none;
        font-size: 28px;
        line-height: 80px;
        text-align: center;
        color: rgb(77,85,93);
      }
      .content-nav>li.active>a { color: rgb(240,20,20);}
</style>

