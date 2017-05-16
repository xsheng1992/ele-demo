import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import seller from './modules/seller.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	actions,
  modules: {
    seller: seller
  },
  strict: debug
})
