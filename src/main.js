import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import './assets/font/FuturaStd-BoldOblique.css'
import './assets/font/tt0144m_.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
