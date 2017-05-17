import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import Index from './index.vue'
import store from './store/index.js'
import svgSprite from './assets/images/sprite.js'

Vue.use(VueRouter);
const router = routes;

new Vue({
  router,
  store,
  render: h => h(Index)
}).$mount("#app");

document.body.insertAdjacentHTML("afterBegin", '<div style="display:none;">' + svgSprite + '</div>');
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, true);
