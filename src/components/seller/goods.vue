<template>
  <transition name="slide">
    <div class="goods-page">
      <div class="type-list">
        <div id="typeWrapper" class="wrapper">
          <div class="scroller">
            <ul>
              <li v-for="(item, index) of typeList" @click="scrollTo(index)" :class="{active: typeIndex === index}">
                <div class="cell">
                  <i :class="item.type>=0?'icon icon2-'+item.type:''"></i>{{item.name}}
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
                    <counter :foodData="foods"></counter>
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
import counter from './counter.vue'

let goodsScroller = ''

export default {
  data(){
    return {
      typeIndex: 0,
      typeHeight: []
    }
  },
  components: {
    'counter': counter
  },
  computed: {
    ...mapGetters({
      typeList: 'getTypeList',
      goods: 'getGoods',
      cart: 'getCartState'
    })
  },
  methods: {
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
      new IScroll('#typeWrapper', {mouseWheel: true, click: true});
      goodsScroller = new IScroll('#goodsWrapper', {mouseWheel: true, click: true});

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
</style>
