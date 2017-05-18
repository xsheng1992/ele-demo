<template>
  <transition name="slide">
    <div class="goods-page">
      <div class="type-list">
        <div id="typeWrapper" class="wrapper">
          <div class="scroller">
            <ul>
              <li v-for="(item, index) of typeList" @click="scrollTo(index)" :class="{active: typeIndex === index}">
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
                    <div class="cart-box">
                      <div class="price">
                        <span class="red small">¥</span><span class="red"> {{foods.price}}</span>
                        <span class="gray" v-if="foods.oldPrice">¥ {{foods.oldPrice}}</span>
                      </div>
                      <div class="count">
                        <span v-if="hasGood(foods.name)">
                          <button class="btn-remove" @click="removeItem(foods.name)">
                            <svg class="sicon-remove"><use xlink:href="#sicon-remove_circle_outline"></use></svg>
                          </button>
                          <span class="good-count">{{hasGood(foods.name)}}</span>
                        </span>
                        <button class="btn-add" @click="addItem(foods)">
                          <svg class="sicon-add"><use xlink:href="#sicon-add_circle"></use></svg>
                        </button>
                      </div>
                    </div>
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

let goodsScroller = ''

export default {
  data(){
    return {
      typeIndex: 0,
      typeHeight: []
    }
  },
  computed: {
    ...mapGetters({
      'typeList': 'getTypeList',
      'goods': 'getGoods',
      'cart': 'getCartInfo'
    }),
    computedTop() {
      console.log(event)
      return this.scrollTop;
    }
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
    },
    scrollTo(index) {
      let element = document.querySelector('#col'+index);
      goodsScroller.scrollToElement(element, 500);
    },
    getIndex(number, array) {
      //找出目前可视的商品类别
      for(let i=0, l=array.length; i<l; i++) {
        if(!array[i+1]) return i;
        if(number>=array[i] && number<array[i+1]) return i;
      }
    },
    setTypeIndex(height) {
      height = Math.abs(height)+1;
      this.typeIndex = this.getIndex(height, this.typeHeight);
    },
    addItem(food) {
      this.$store.commit(types.ADD_GOOD, {
        name: food.name,
        price: food.price,
        count: 1
      });
    },
    removeItem(name) {
      this.$store.commit(types.REMOVE_GOOD, name);
    },
    hasGood(name) {
      let good = this.cart.find(item=>item.name === name);
      return good?good.count:false;
    }
  },
  mounted() {
    let vm = this;
    //延时等待dom渲染完成
    setTimeout(function(){
      new IScroll('#typeWrapper', {mouseWheel: true});
      goodsScroller = new IScroll('#goodsWrapper', {mouseWheel: true});

      //获取各类别的高度 
      let typelist = document.querySelector(".goods-list .scroller").childNodes
      vm.typeHeight = Array.prototype.slice.call(typelist,0).map(item=>item.offsetTop);
      
      //监听滚动事件
      vm.setTypeIndex(goodsScroller.y);
      goodsScroller.on('scrollEnd', function(){
        vm.setTypeIndex(this.y);
      });
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
    .type-list ul { padding-bottom: 20px;}
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
        font-weight: 200;
        line-height: 28px;
        color: rgb(7,17,27);
        vertical-align: middle;
        border-top: 1px solid rgba(7,17,27,.1);
        cursor: pointer;
      }
      .type-list ul>li:first-child>.cell { border-top: none;}
        .type-list ul>li>.cell .icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          position: relative;
          top: 2px;
          margin-right: 3px;
        }
    .type-list ul>li.active { background-color: #fff;}
      .type-list ul>li.active>.cell { font-weight: normal}
      .type-list ul>li.active>.cell,  .type-list ul>li.active+li>.cell{ border-top: none;}

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
          margin-bottom: 14px;
        }
        .food-text>p {
          font-size: 20px;
          line-height: 20px;
          color: rgb(98,103,107);
          margin-bottom: 14px;
        }
        .food-text>p.description {
          line-height: 24px;
          max-height: 48px;
          overflow: hidden;
          color: rgb(147,153,159);
        }
          .food-text>p span+span { margin-left: 20px;}
        .cart-box {
          display: flex;
        }
          .cart-box .price {
            width: 40%;
            flex-shrink: 0;
          }
            .cart-box .price span.red {
              display: inline-block;
              font-size: 28px;
              line-height: 48px;
              color: rgb(240,20,20);
            }
            .cart-box .price span.gray {
              display: inline-block;
              font-size: 20px;
              line-height: 20px;
              color: rgb(147,153,159);
              margin-left: 16px;
              text-decoration: line-through;
              vertical-align: super;
            }
            .cart-box .price span.small {
              font-size: 20px;
            }
          .cart-box .count {
            width: 60%;
            text-align: right;
          } 
            .cart-box .count .good-count {
              display: inline-block;
              width: 48px;
              text-align: center;
              font-size: 22px;
              line-height: 48px;
              color: rgb(147,153,159);
              vertical-align: middle;
            }
            .cart-box .count .btn-add,
            .cart-box .count .btn-remove {
              display: inline-block;
              width: 48px;
              height: 48px;
              border: none;
              outline: none;
              background-color: transparent;
              padding: 0;
              vertical-align: middle;
            }
              .cart-box .count .btn-add>.sicon-add,
              .cart-box .count .btn-remove>.sicon-remove {
                width: 48px;
                height: 48px;
                fill: #00a0dc;
              }
</style>
