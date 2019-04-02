import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/bootstrap.css'
import './assets/css/index.css'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
  router,
}).$mount('#app')
