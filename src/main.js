import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/font/font.css'
import ElementUI from 'element-ui';
import axios from 'axios'
import qs from 'qs'
import '@/assets/theme/index.css';

import api from '@/api'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.qs = qs;
Vue.prototype.$host = 'http://192.168.3.21:18080'
Vue.prototype.HOST = "/api"
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

