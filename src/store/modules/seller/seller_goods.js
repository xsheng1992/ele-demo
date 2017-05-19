import * as types from '../../mutation-types'

const state = {
  goods: {}
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
