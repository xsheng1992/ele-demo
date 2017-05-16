import * as types from '../../mutation-types'

const state = {
  seller_info: {}
}

// getters
const getters = {
  getSellerInfo: state => {
    return state.seller_info
  }
}

// actions
const actions = {
  
}

// mutations
const mutations = {
  [types.SET_SELLER] (state, data) {
    state.seller_info = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
