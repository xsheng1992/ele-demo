<template>
  <div class="container">
    <seller-header></seller-header>
    <!--
    <seller-content></seller-content>
    <seller-cart></seller-cart>-->
  </div>
</template>

<script>
import seller_header from '../components/seller/header.vue';

export default {
  components: {
    "seller-header": seller_header
  },
  created() {
    this.$store.dispatch('getData', {id: '0001'});
  }
}
</script>

