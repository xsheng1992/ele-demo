import * as types from '../../mutation-types'

const state = {
  food: {}
}

// getters
const getters = {
  getFoodDetail() {
    return state.food;
  },
  getFoodRate() {
    return state.food.ratings;
  }
}

// actions
const actions = {
  setFoodsData({commit}, {foodData}) {
    return commit(types.SET_FOOD, foodData);
  }
}

// mutations
const mutations = {
  [types.SET_FOOD] (state, data) {
    state.food = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
