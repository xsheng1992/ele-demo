import Data from '../api/data.js'

export default {
  getData({commit, dispatch}, {id}) {
  	let shop = Data.find((obj)=>{
  		return obj.seller.id === id;
  	});
  	dispatch('setSellerData', {sellerData: shop.seller});
  }
}
