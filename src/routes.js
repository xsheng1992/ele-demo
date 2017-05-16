import Vue from 'vue'
import VueRouter from 'vue-router'
import List from './pages/list.vue'
import Seller from './layout/seller.vue'

Vue.use(VueRouter);

export default new VueRouter ({
  mode: 'history',
  routes: [
    {path: '/', component: List},
    {path: '/seller', component: Seller},
    {path: '*', redirect: '/'}
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})