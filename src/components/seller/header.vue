<template>
  <header ref="sellerHeader">
    <div class="inner-box">
      <img :src="seller.avatar" class="head-bg blur">
      <div class="title-box">
        <img :src="seller.avatar" class="shop-icon">
        <h1 class="shop-name"><i class="icon"></i>{{seller.name}}</h1>
        <p class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
        <p class="supports"><i :class="getIconType(seller.supports[0].type)"></i>{{seller.supports[0].description}}</p>
        <button class="shop-details" @click="showDetail">
          {{seller.supports.length}}个 
          <svg class="sicon-arrow-right"><use xlink:href="#sicon-keyboard_arrow_right"></use></svg>
        </button>
        <p class="bulletin" @click="showDetail">
          {{seller.bulletin}}
          <svg class="sicon-arrow-right"><use xlink:href="#sicon-keyboard_arrow_right"></use></svg>
        </p>
      </div>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import * as types from '../../store/mutation-types'

export default {
  computed: {
    ...mapGetters({
      seller: 'getSellerInfo'
    })
  },
  methods: {
    getIconType(type) {
      return type>=0?'icon icon-'+type:'';
    },
    showDetail() {
      this.$store.commit(types.SHOW_FDETAIL);
    }
  }
}
</script>

<style scoped>
/*段落不换行*/
p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
}

.inner-box {
  position: relative;
  overflow: hidden;
}
  /*头部背景*/
  .head-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
  }
  .title-box {
    position: relative;
    z-index: 1;
    height: 268px;
    background-size: 100%;
    background-color: rgba(7,17,27,.5);
    padding: 48px 48px 36px;
  }
    /*商店图片*/
    .shop-icon {
      width: 128px;
      height: 128px;
      border-radius: 4px;
      margin-right: 32px;
      float: left;
    }
    /*商店名称*/
    .shop-name {
      font-size: 32px;
      height: 36px;
      line-height: 36px;
      font-weight: bold;
      color: #fff;
      margin-top: 4px;
      margin-bottom: 16px;
    }
      .shop-name>.icon {
        display: inline-block;
        width: 60px;
        height: 36px;
        background: url(../../assets/images/icons/brand@2x.png) no-repeat;
        background-size: auto 100%;
        vertical-align: middle;
        position: relative;
        top: -3px;
        margin-right: 12px;
      }
    /*商店配送信息*/
    .description {
      font-size: 24px;
      line-height: 24px;
      font-weight: 200;
      margin-bottom: 20px;
    }
    /*商店优惠信息*/
    .supports {
      font-size: 20px;
      font-weight: 200;
      line-height: 24px;
      height: 24px;
    }
      .supports>.icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        vertical-align: middle;
        position: relative;
        top: -3px;
      }
    /*商店更多优惠按钮*/
    .shop-details {
      height: 48px;
      line-height: 24px;
      border: none;
      border-radius: 24px;
      outline: none;
      padding: 12px 16px;
      font-size: 20px;
      color: #fff;
      background-color: rgba(0,0,0,.2);
      position: absolute;
      right: 24px;
      top: 140px;
    }
      .shop-details>.sicon-arrow-right {
        display: inline-block;
        fill: #fff;
        width: 14px;
        height: 14px;
        position: relative;
        margin-left: 5px;
      }
    /*商店公告*/
    .bulletin {
      height: 56px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: rgba(7,17,27,.2);
      padding-left: 76px;
      padding-right: 64px;
      line-height: 56px;
      font-size: 20px;
      font-weight: 200;
    }
    .bulletin:before {
      content: '';
      display: block;
      width: 44px;
      height: 24px;
      background: url(../../assets/images/icons/bulletin@2x.png) no-repeat center;
      position: absolute;
      top: 16px;
      left: 24px;
    }
      .bulletin>.sicon-arrow-right {
        fill: #fff;
        width: 18px;
        height: 18px;
        position: absolute;
        right: 24px;
        top: 19px;
      }
</style>

