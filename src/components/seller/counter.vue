<template>
  <div class="counter">
    <div class="price">
      <span class="red small">¥</span><span class="red"> {{foodData.price}}</span>
      <span class="gray" v-if="foodData.oldPrice">¥ {{foodData.oldPrice}}</span>
    </div>
    <div class="count">
      <span v-if="hasGood(foodData.name)">
        <button class="btn-remove" @click="removeItem(foodData.name)">
          <svg class="sicon-remove"><use xlink:href="#sicon-remove_circle_outline"></use></svg>
        </button>
        <span class="good-count">{{hasGood(foodData.name)}}</span>
      </span>
      <button class="btn-add" @click="addItem(foodData)">
        <svg class="sicon-add"><use xlink:href="#sicon-add_circle"></use></svg>
      </button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import * as types from '../../store/mutation-types'

export default {
  props: ['foodData'],
  computed: {
    ...mapGetters({
      cart: 'getCartState'
    })
  },
  methods: {
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
      let good = false;
      if(this.cart) {
        good = this.cart.find(item=>item.name === name);
      }
      return good?good.count:false;
    }
  }
}
</script>

<style scoped>
.counter {
  display: flex;
}
  .price {
    width: 100%;
  }
    .price span.red {
      display: inline-block;
      font-size: 28px;
      line-height: 28px;
      padding: 10px 0;
      color: rgb(240,20,20);
      vertical-align: middle;
    }
    .price span.gray {
      display: inline-block;
      font-size: 20px;
      line-height: 20px;
      padding-bottom: 6px;
      color: rgb(147,153,159);
      margin-left: 16px;
      text-decoration: line-through;
      vertical-align: middle;
    }
    .price span.small {
      font-size: 20px;
    }
  .count {
    width: 150px;
    text-align: right;
    flex-shrink: 0;
    font-size: 0;
  } 
    .count .good-count {
      display: inline-block;
      width: 48px;
      text-align: center;
      font-size: 22px;
      line-height: 48px;
      color: rgb(147,153,159);
      vertical-align: middle;
    }
    .count .btn-add,
    .count .btn-remove {
      display: inline-block;
      width: 48px;
      height: 48px;
      border: none;
      outline: none;
      background-color: transparent;
      padding: 0;
      vertical-align: middle;
    }
      .count .btn-add>.sicon-add,
      .count .btn-remove>.sicon-remove {
        width: 48px;
        height: 48px;
        fill: #00a0dc;
      }
</style>
