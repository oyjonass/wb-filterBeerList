import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './beerstore/index.js';
require('es6-promise').polyfill();

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  routes: [
      {
          path: '/',
          component: App
      }
  ]
});
Vue.config.productionTip = false;
 
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
});
