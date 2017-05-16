import * as types from '../../mutation-types'

const state = {
  seller_info: {},
  showDetail: false
}

// getters
const getters = {
  getSellerInfo() {
    return state.seller_info
  },
  getDetailState() {
    return state.showDetail
  }
}

// actions
const actions = {
  setSellerData({commit}, {sellerData}) {
    return commit(types.SET_SELLER, sellerData);
  }
}

// mutations
const mutations = {
  [types.SET_SELLER] (state, data) {
    state.seller_info = data
  },
  [types.SHOW_DETAIL] (state, data) {
    state.showDetail = true
  },
  [types.HIDE_DETAIL] (state, data) {
    state.showDetail = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
