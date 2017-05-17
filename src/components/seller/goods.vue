<template>
  <transition name="slide">
    <div class="goods-page">
      <div class="type-list">
        <div id="typeWrapper" class="wrapper">
          <div class="scroller">
            <ul>
              <li v-for="(item, index) of typeList">
                <div class="cell">
                  <i :class="getIconType(item.type)"></i>{{item.name}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="goods-list">
        <div id="goodsWrapper" class="wrapper">
          <div class="scroller">
            <div v-for="(type, index) of goods" :id="'col'+index">
              <p class="type-title">{{type.name}}</p>
              <ul class="type-foods">
                <li v-for="foods of type.foods">
                  <div class="food-icon">
                    <img :src="foods.icon">
                  </div>
                  <div class="food-text">
                    <h3>{{foods.name}}</h3>
                    <p v-if="foods.description" class="description">{{foods.description}}</p>
                    <p>
                      <span v-if="foods.sellCount">月售{{foods.sellCount}}份</span>
                      <span v-if="foods.rating">好评率{{foods.rating}}%</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import * as types from '../../store/mutation-types'

export default {
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters({
      'typeList': 'getTypeList',
      'goods': 'getGoods'
    })
  },
  methods: {
    getIconType(type) {
      switch(type) {
        case 0: return 'icon icon2-0';
        case 1: return 'icon icon2-1';
        case 2: return 'icon icon2-2';
        case 3: return 'icon icon2-3';
        case 4: return 'icon icon2-4';
        default: return '';
      }
    }
  },
  mounted() {
    //延时等待dom渲染完成
    setTimeout(function(){
      new IScroll('#typeWrapper');
      new IScroll('#goodsWrapper');
    }, 100);
  }
}
</script>

<style scoped>
.goods-page {
  height: 100%;
  overflow: hidden;
  display: flex;
}
  /*左边类别列表*/
  .type-list {
    width: 160px;
    background-color: #f3f5f7;
    flex-shrink: 0;
    position: relative;
  }
    .type-list ul>li {
      display: table;
      width: 100%;
      height: 108px;
      padding: 0 24px;
    }
      .type-list ul>li>.cell {
        display: table-cell;
        width: 100%;
        height: 100%;
        font-size: 24px;
        line-height: 28px;
        color: rgb(7,17,27);
        vertical-align: middle;
        border-bottom: 1px solid rgba(7,17,27,.1);
        cursor: pointer;
      }
      .type-list ul>li:last-child>.cell { border-bottom: none;}
        .type-list ul>li>.cell .icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          position: relative;
          top: 2px;
          margin-right: 3px;
        }

  /*右边商品列表*/
  .goods-list {
    width: 100%;
    overflow-y: auto;
    position: relative;
  }
    .type-title {
      height: 52px;
      background-color: #f3f5f7;
      line-height: 52px;
      font-size: 24px;
      color: rgb(147,153,159);
      padding-left: 22px;
      border-left: 6px solid #d9dde1;
    }
    .type-foods {
      list-style: none;
      padding: 36px;
      font-size: 0;
    }
      .type-foods>li {
        padding: 36px 0;
        border-bottom: 1px solid rgba(7,17,27,.1);
        display: flex;
      }
      .type-foods>li:first-child { padding-top: 0;}
      .type-foods>li:last-child {
        padding-bottom: 0;
        border-bottom: none;
      }
        .food-icon { 
          width: 134px;
          flex-shrink: 0;
        }
        .food-text { width: 100%;}
        .food-text>h3 {
          font-size: 28px;
          line-height: 28px;
          height: 28px;
          color: rgb(7,17,27);
          font-weight: normal;
          margin-top: 4px;
          margin-bottom: 16px;
        }
        .food-text>p {
          font-size: 20px;
          line-height: 20px;
          color: rgb(98,103,107);
          margin-bottom: 16px;
        }
        .food-text>p.description {
          line-height: 24px;
          max-height: 48px;
          overflow: hidden;
          color: rgb(147,153,159);
        }
          .food-text>p span+span { margin-left: 20px;}
</style>
