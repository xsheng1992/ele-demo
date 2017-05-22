<template>
  <div class="rate-box">
    <div class="title">
      <h1>商品评价</h1>
      <ul class="btns">
        <li :class="{active: rateType===-1}" @click="rateType=-1">
          全部 <span class="small">{{rate.length}}</span>
        </li>
        <li :class="{active: rateType===0}" @click="rateType=0">
          推荐 <span class="small">{{rate.filter(item=>item.rateType===0).length}}</span>
        </li>
        <li :class="{active: rateType===1}" @click="rateType=1">
          吐槽 <span class="small">{{rate.filter(item=>item.rateType===1).length}}</span>
        </li>
      </ul>
      <div class="text-rate">
        <span @click="hasText = !hasText">
          <svg class="icon-check" :class="{active: hasText}"><use xlink:href="#sicon-check_circle"></use></svg>
          <span class="icon-text">只看有内容的评价</span>
        </span>
      </div>
    </div>

    <div class="rates">
      <ul v-if="pageType === 'food'">
        <li v-for="item in rateFilter">
          <p class="time-user">
            <span>
              {{new Date(item.rateTime).toLocaleString()}}
            </span>
            <span style="text-align: right">
              {{item.username}}
              <i class="icon-user" :style="{backgroundImage: 'url('+item.avatar+')'}"></i>
            </span>
          </p>
          <p class="user-rate">
            <svg class="icon-thumb-bad" v-if="item.rateType"><use xlink:href="#sicon-thumb_down"></use></svg>
            <svg class="icon-thumb-good" v-else=""><use xlink:href="#sicon-thumb_up"></use></svg>
            <span v-if="item.text">{{item.text}}</span>
            <span v-else="" class="gray">该用户未填写评论内容</span>
          </p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import * as types from '../../../store/mutation-types'

export default {
  data() {
    return {
      rate: [],
      rateType: -1,
      hasText: false
    }
  },
  props: ['pageType'],
  computed: {
    ...mapGetters({
      foodRate: 'getFoodRate'
    }),
    rateFilter() {
      let rateList = this.hasText ? this.rate.filter(item=>item.text!=="") : this.rate;
      return (this.rateType === -1) ? rateList : rateList.filter(item=>item.rateType===this.rateType);
    }
  },
  created() {
    if(!this.foodRate) this.$router.push('/seller/goods');
    this.rate = this.pageType === 'food' ? this.foodRate : this.foodRate;
  }
}
</script>

<style scoped>
.rate-box {
  border-top: 1px solid rgba(7,17,27,.1);
  border-bottom: 1px solid rgba(7,17,27,.1);
  background-color: #fff;
}
  .rate-box>.title {
    padding: 36px 36px 0;
    border-bottom: 1px solid rgba(7,17,27,.1);
    position: relative;
  }
    .rate-box>.title>h1 {
      font-size: 28px;
      line-height: 28px;
      margin-bottom: 36px;
      color: rgb(7,17,27);
    }
    .rate-box>.title>.btns {
      list-style: none;
      font-size: 0;
      margin-bottom: 36px;
    }
      .rate-box>.title>.btns>li {
        display: inline-block;
        padding: 0 24px;
        font-size: 24px;
        line-height: 56px;
        height: 56px;
        color: rgb(77,85,93);
        border-radius: 2px;
        background-color: #ccecf8;
      }
      .rate-box>.title>.btns>li+li { margin-left: 16px;}
        .rate-box>.title>.btns>li .small {
          font-size: 16px;
          vertical-align: baseline;
        }
      .rate-box>.title>.btns>li.active { 
        background-color: #00a0dc;
        color: #fff;
      }
      .rate-box>.title>.btns>li:last-child { background-color: #e9ebec;}
      .rate-box>.title>.btns>li:last-child.active { background-color: #93999f;}

    .rate-box>.title>.text-rate {
      padding: 24px 0;
      border-top: 1px solid rgba(7,17,27,.1);
    }
      .rate-box>.title>.text-rate>span {
        display: inline-block;
        height: 48px;
        line-height: 48px;
        font-size: 24px;
        color: rgb(147,153,159);
      }
        .rate-box>.title>.text-rate>span .icon-check {
          display: inline-block;
          width: 40px;
          height: 40px;
          vertical-align: middle;
          fill: #b7bbbf;
        }
        .rate-box>.title>.text-rate>span .icon-check.active { fill: #00c850;}
        .rate-box>.title>.text-rate>span .icon-text {
          display: inline-block;
          vertical-align: middle;
        }

  .rate-box>.rates {
    padding: 0 36px;
  }
    .rate-box>.rates>ul {
      list-style: none;
    }
    .rate-box>.rates>ul>li {
      padding: 32px 0;
      border-bottom: 1px solid rgba(7,17,27,.1);
    }
    .rate-box>.rates>ul>li:last-child { border-bottom: none;}
      .time-user {
        display: flex;
        font-size: 20px;
        height: 24px;
        line-height: 24px;
        color: rgb(147,153,159);
        margin-bottom: 12px;
      }
        .time-user>span { width: 50%;}
        .time-user .icon-user {
          display: inline-block;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-size: 100%;
          background-position: center;
          vertical-align: bottom;
          margin-left: 10px;
        }
      .user-rate {
        line-height: 32px;
        height: 32px;
        font-size: 24px;
        color: rgb(7,17,27);
      }
        .user-rate span {
          display: inline-block;
          vertical-align: middle;
        }
        .user-rate .gray { 
          color: rgb(147,153,159);
          font-size: 20px;
          font-weight: 200;
        }
      .icon-thumb-bad,
      .icon-thumb-good {
        display: inline-block;
        width: 24px;
        height: 24px;
        fill: #b7bbbf;
        vertical-align: middle;
      }
      .icon-thumb-good { fill: #00a0dc;}
</style>
