//import * as types from '../mutation-types'
import info from './seller/seller_info.js'
import goods from './seller/seller_goods.js'
import food from './seller/seller_food.js'
import rates from './seller/seller_rates.js'

export default {
  modules: {
    sellerInfo: info,
    sellerGoods: goods,
    sellerFood: food,
    sellerRates: rates
  }
}
