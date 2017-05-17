<template>
  <div class="container">
    <div class="flexbox" :class="{blur: detailPage}">
      <seller-header></seller-header>
      <div class="content">
        <ul class="content-nav">
          <li><router-link to="/seller/goods">商品</router-link></li>
          <li><router-link to="/">评价</router-link></li>
          <li><router-link to="/">商家</router-link></li>
        </ul>
        <router-view></router-view>
      </div>
      <!--
      <seller-cart></seller-cart>-->
    </div>
    <seller-infopage></seller-infopage>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import header from '../components/seller/header.vue';
import infopage from '../components/seller/infopage.vue';

export default {
  components: {
    "seller-header": header,
    "seller-infopage": infopage
  },
  computed: {
    ...mapGetters({
      detailPage: 'getDetailState'
    })
  },
  created() {
    this.$store.dispatch('getData', {id: '0001'});
  }
}
</script>

<style scoped>
.flexbox {
  display: flex;
  flex-direction: column;
  height: 100%;
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
</style>

