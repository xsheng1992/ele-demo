<template>
  <transition name="slide">
    <div class="thisbg" v-if="detailPage">
      <div class="inner-box">
        <h1>{{seller.name}}</h1>
        <div class="text-center">
          <rank-star></rank-star>
        </div>
        <h2>优惠信息</h2>
        <ul class="supports-list">
          <li v-for="item of seller.supports">
            <i :class="item.type>=0?'icon icon-'+item.type:''"></i>{{item.description}}
          </li>
        </ul>
        <h2>商家公告</h2>
        <p class="bulletin">{{seller.bulletin}}</p>
      </div>
      <button class="close" @click="hideDetail">
        <svg class="sicon-close"><use xlink:href="#sicon-close"></use></svg>
      </button>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import * as types from '../../store/mutation-types'
import rankstar from './rankstar.vue'

export default {
  components: {
    'rank-star': rankstar
  },
  computed: {
    ...mapGetters({
      seller: 'getSellerInfo',
      detailPage: 'getSellerInfoState'
    })
  },
  methods: {
    hideDetail() {
      this.$store.commit(types.HIDE_FDETAIL);
    }
  }
}
</script>

<style scoped>
/*背景*/
.thisbg {
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(7,17,27,.8);
  padding: 128px 72px 130px;
}
  .inner-box {
    position: relative;
    z-index: 11;
    color: #fff;
    height: 100%;
    overflow: hidden;
  }
  /*标题h1*/
  h1 {
    font-size: 32px;
    font-weight: 700;
    line-height: 32px;
    height: 32px;
    text-align: center;
    margin-bottom: 32px;
  }
  .text-center { text-align: center;}
  /*h2标题*/
  h2 {
    font-size: 28px;
    font-weight: 700;
    line-height: 28px;
    height: 28px;
    text-align: center;
    position: relative;
    margin-bottom: 48px;
  }
  h2:before,
  h2:after {
    content: "";
    width: 224px;
    height: 2px;
    background-color: rgba(255,255,255,.2);
    position: absolute;
    top: 13px;
  }
  h2:before { left: 0;}
  h2:after { right: 0;}
  /*优惠信息列表*/
  .supports-list {
    list-style: none;
    padding-left: 24px;
    width: 100%;
    margin-bottom: 56px;
  }
    .supports-list>li {
      height: 32px;
      line-height: 32px;
      font-size: 24px;
      font-weight: 200;
      margin-bottom: 24px;
    }
      .supports-list>li>.icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        background-size: 100%;
        line-height: 32px;
        vertical-align: middle;
        margin-right: 12px;
        position: relative;
        top: -1px;
      }
  /*商家公告*/
  .bulletin {
    padding: 0 24px;
    font-size: 24px;
    font-weight: 200;
    line-height: 48px;
    text-align: justify;
  }
  /*关闭按钮*/
  .close {
    outline: none;
    background-color: transparent;
    position: absolute;
    bottom: 44px;
    left: 50%;
    margin-left: -32px;
    padding: 18px;
    border-radius: 50%;
    border: 1px solid #fff;
  }
    .close>.sicon-close {
      width: 40px;
      height: 40px;
      fill: rgba(255,255,255,.5);
    }

/*slide动画*/
.slide-enter-active, .slide-leave-active {
  -webkit-transition: all .5s ease;
     -moz-transition: all .5s ease;
          transition: all .5s ease;

  top: 0;
}
.slide-enter, .slide-leave-active {
  top: -100%;
}
</style>
