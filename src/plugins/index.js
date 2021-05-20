import store from '@/store'
import request from '@/utils/request'
import { Message } from 'element-ui'

export default function(_vue) {
  _vue.prototype.$http = {
    get: function(url, params, config = {}) {
      return request.get(url, params, config).catch(err => {
        store.dispatch('LoadingState', { isLoading: false, message: '' })
        Message.error(err.message || err.msg || '请求异常')
      })
    },
    post: function(url, params, config = {}) {
      return request.post(url, params, config).catch(err => {
        store.dispatch('LoadingState', { isLoading: false, message: '' })
        Message.error(err.message || err.msg || '请求异常')
      })
    }
  }
  _vue.prototype.$loadingState = (isLoading = false, message = '') => {
    store.dispatch('LoadingState', { isLoading, message })
  }
  _vue.component('list-header', () => import('@/components/ListHeader'))
  _vue.prototype.$getTableHeight = function(minusPart = 0) {
    return window.innerHeight - minusPart
  }
}
