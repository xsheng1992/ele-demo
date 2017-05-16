<template>
  <header>
    <div class="normalhead">
      <img :src="seller.avatar" class="header-img blur">
      <div class="seller-title">
        <img :src="seller.avatar" class="seller-icon">
        <h1 class="seller-name"><i class="icon"></i>{{seller.name}}</h1>
        <p class="p1">{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
        <p class="p2"><i :class="getIconType(seller.supports[0].type)"></i>{{seller.supports[0].description}}</p>
        <button class="details-btn">
          {{seller.supports.length}}个 
          <svg class="sicon-arrow-right"><use xlink:href="#sicon-keyboard_arrow_right"></use></svg>
        </button>
        <p class="notice">
          {{seller.bulletin}}
          <svg class="sicon-arrow-right"><use xlink:href="#sicon-keyboard_arrow_right"></use></svg>
        </p>
      </div>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'

export default {
  data(){
    return {
      seller: {}
    }
  },
  computed: {
    ...mapGetters([
      'getSellerInfo'
    ])
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
    }
  },
  created() {
    this.seller = this.getSellerInfo;
  }
}
</script>

<style>
  @import url(../../assets/style/header.css);
</style>

