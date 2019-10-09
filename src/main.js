import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './Store/index.js';
require('es6-promise').polyfill();
//var _ = require('lodash');

require('lodash');

//Vue.config.productionTip = false;
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
 
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App, {
    props:
    {
        loadingText: 'Fetching this years wb beers'
    }
  })
});
