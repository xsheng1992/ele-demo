import * as types from '../mutation-types'

const state = {
	cart: [],
	showDetail: false
}

const getters = {
	getCartState() {
    return state.cart.length?state.cart:false;
  },
  getCartPrice() {
    if(!state.cart.length) return 0;
    if(state.cart.length === 1) return state.cart[0].price*state.cart[0].count;
    return state.cart.reduce((x,y)=>{
      let xp = typeof(x) === 'object' ? x.price * x.count : x;
      let yp = y.price * y.count;
      return xp + yp;
    });
  },
  getAllCount() {
    if(!state.cart.length) return 0;
    if(state.cart.length === 1) return state.cart[0].count;
    return state.cart.reduce((x,y)=>{
      let xp = typeof(x) === 'object' ? x.count : x;
      let yp = y.count;
      return xp + yp;
    });
  },
  getCartDetailState() {
  	return state.showDetail;
  }
}

// mutations
const mutations = {
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
    if(good.count>1) {
      good.count--;
    } else {
      let index = state.cart.findIndex(item=>item.name === name);
      state.cart.splice(index,1);
    }
    if(state.cart.length===0) state.showDetail = false;
  },
  [types.SHOW_CDETAIL] (state, data) {
    state.showDetail = true
  },
  [types.HIDE_CDETAIL] (state, data) {
    state.showDetail = false
  },
  [types.CLEAR_CART] (state, data) {
    state.cart = [];
    state.showDetail = false;
  }
}

export default {
	state,
  getters,
  mutations
}
