import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import m_seller from './modules/seller.js'
import m_cart from './modules/cart.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	actions,
  modules: {
    seller: m_seller,
    cart: m_cart
  },
  strict: debug
})
