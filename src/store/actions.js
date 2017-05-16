import Data from '../api/data.js'

export default {
  getData({dispatch}, {id}) {
  	let shop = Data.find((obj)=>{
  		return obj.seller.id === id;
  	});
  	dispatch('setSellerData', {sellerData: shop.seller});
  	dispatch('setGoodsData', {goodsData: shop.goods});
  }
}
