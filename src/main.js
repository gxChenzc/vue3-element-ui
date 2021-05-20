import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import Plugins from '@/plugins'
import '@/permission'

Plugins(Vue)

Vue.use(Element, { size: 'mini', zIndex: 3000 })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')