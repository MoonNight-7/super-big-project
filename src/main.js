import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/font/font.css'
import ElementUI from 'element-ui';
import axios from 'axios'
import qs from 'qs'
import '@/assets/theme/index.css';
// import loadPage from "@/assets/js/lodePage.js";

// Vue.use(loadPage)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.qs = qs;
Vue.prototype.$host = 'http://192.168.3.21:18080'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

