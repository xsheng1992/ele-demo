import * as types from '../../mutation-types'

const state = {
  ratings: {}
}

// getters
const getters = {
  getRatings() {
    return state.ratings;
  }
}

// actions
const actions = {
  setRatesData({commit}, {ratesData}) {
    return commit(types.SET_RATINGS, ratesData);
  }
}

// mutations
const mutations = {
  [types.SET_RATINGS] (state, data) {
    state.ratings = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
