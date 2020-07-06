import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from './components/common/toast'
import fastClick from 'fastclick'

//安装toast插件
Vue.use(Toast)
//解决移动端300ms延迟
fastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  Toast,
  render: h => h(App)
}).$mount('#app')
