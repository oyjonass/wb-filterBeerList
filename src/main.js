import Vue from 'vue';
import App from './App';
import router from './router/index'
import store from './beerstore/index.js';
require('es6-promise').polyfill();

Vue.config.productionTip = false;
 
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
});
