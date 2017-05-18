import * as types from '../../mutation-types'

const state = {
  goods: {},
  cart: []
}

// getters
const getters = {
  getTypeList() {
    return state.goods.map((item)=>{
      return {
        name: item.name,
        type: item.type
      }
    });
  },
  getGoods() {
    return state.goods;
  },
  getCartState() {
    return state.cart.length>0;
  },
  getCartPrice() {
    if(!state.cart.length) return 0;
    if(state.cart.length === 1) return state.cart[0].price*state.cart[0].count;
    return state.cart.reduce((x,y)=>{
      let xp = typeof(x) === 'object' ? x.price * x.count : x;
      let yp = y.price * y.count
      return xp + yp;
    });
  },
  getCartInfo() {
    return state.cart;
  }
}

// actions
const actions = {
  setGoodsData({commit}, {goodsData}) {
    return commit(types.SET_GOODS, goodsData);
  }
}

// mutations
const mutations = {
  [types.SET_GOODS] (state, data) {
    state.goods = data
  },
  [types.ADD_GOOD] (state, data) {
    let good = state.cart.find(item=>item.name === data.name);
    if(good) {
      good.count++;
    } else {
      state.cart.push(data);
    }
  },
  [types.REMOVE_GOOD] (state, name) {
    let good = state.cart.find(item=>item.name === name);
    console.log(good.name);
    if(good.count>1) {
      good.count--;
    } else {
      let index = state.cart.findIndex(item=>item.name === name);
      state.cart.splice(index,1);
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
