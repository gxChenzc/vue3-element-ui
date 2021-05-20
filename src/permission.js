import router from '@/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getCookie, TokenKey } from '@/utils/Cookie'
import store from '@/store'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
window.historyCacheRoutes = [] // 定义三个值的数组用于存储路由记录
router.beforeEach((to, from, next) => {
  if (historyCacheRoutes[historyCacheRoutes.length - 1] !== to.path) {
    if (historyCacheRoutes.length < 3) {
      historyCacheRoutes.push(to.path)
    } else {
      historyCacheRoutes.shift()
      historyCacheRoutes.push(to.path)
    }
  }
  NProgress.start()
  store.dispatch('LoadingState', { isLoading: false })
  if (!getCookie(TokenKey)) {
    window.location.href = process.env.VUE_APP_LOGIN_PATH + window.location.href
    return false
  }
  next()
})

router.afterEach((to, from) => {
  store.commit('TOGGLE_LEFTMENU', false)
  NProgress.done() // finish progress bar
})
