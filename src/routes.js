import Vue from 'vue'
import VueRouter from 'vue-router'
import List from './pages/list.vue'
import Seller from './pages/seller.vue'
import Goods from './components/seller/goods.vue'
import foodDetail from './components/seller/foodDetail.vue'
import shopDetail from './components/seller/shopDetail.vue'
import shopRate from './components/seller/shopRate.vue'

Vue.use(VueRouter);

export default new VueRouter ({
  mode: 'history',
  routes: [
    {path: '/', component: List},
    {
      path: '/seller', 
      component: Seller,
      children: [
        {path: '', redirect: 'goods'},
        {
          path: 'goods', 
          component: Goods,
          children: [
            {path: 'detail', component: foodDetail}
          ]
        },
        {path: 'rate', component: shopRate},
        {path: 'shop', component: shopDetail}
      ]
    },
    {path: '*', redirect: '/'}
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})