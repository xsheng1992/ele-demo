import * as types from '../mutation-types'
import seller_info from './seller/seller_info.js'

// getters
const getters = {
  checkoutStatus: state => state.checkoutStatus
}

// actions
const actions = {
  setSellerData({commit}, {sellerData}) {
    return commit(types.SET_SELLER, sellerData);
  }
}

// mutations
const mutations = {
  
}

export default {
  modules: {
    sellerInfo: seller_info
  },
  actions
}
