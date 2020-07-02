import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'

//引入cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

//引入axios
Vue.config.productionTip = false



//引入fonrawesome
import 'font-awesome/css/font-awesome.min.css' 
//引入时间戳格式化全局过滤器
import moment from 'moment'
//定义全局过滤器
Vue.filter('dataFormat',function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
