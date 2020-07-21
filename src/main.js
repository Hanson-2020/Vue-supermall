import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from './components/common/toast'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload';

//安装toast插件
Vue.use(Toast)
//解决移动端300ms延迟 
fastClick.attach(document.body)
//使用懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  Toast,
  render: h => h(App)
}).$mount('#app')
