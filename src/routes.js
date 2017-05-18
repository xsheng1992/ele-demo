import Vue from 'vue'
import VueRouter from 'vue-router'
import List from './pages/list.vue'
import Seller from './layout/seller.vue'
import Goods from './components/seller/goods.vue'

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
        {path: 'goods', component: Goods},
        {path: 'rate', component: Goods},
        {path: 'shop', component: Goods}
      ]
    },
    {path: '*', redirect: '/'}
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})