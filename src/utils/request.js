import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
// import store from '@/store'
import { getCookie, TokenKey } from '@/utils/Cookie'

// axios.defaults.withCredentials = true
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    config.headers[TokenKey] = getCookie(TokenKey)
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success) {
      return Promise.resolve(response.data)
    } else {
      return response.data
    }
  },
  error => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const { status, data = {} } = error.response
    let msg = data.msg
    if (status === 401) {
      window.location.href = process.env.VUE_APP_LOGIN_PATH + window.location.href
    } else if (status === 403) {
      // Message({ type: 'warning', message: msg || '抱歉，您无权限访问该页面' })
      router.replace('/403')
    } else if (status === 503) {
      Message({ type: 'error', message: '应用未启动，请联系运维人员' })
    } else {
      Message({ type: 'error', message: `接口异常,请联系开发人员` })
    }
  }
)

export default service
