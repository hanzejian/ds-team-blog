import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from "./utils/common"
// import ElementUI from 'element-ui'
import './utils/element'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


// Vue.use(ElementUI, {
//   size: 'small'
// })
Vue.config.productionTip = false
Vue.prototype.$common = common

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
