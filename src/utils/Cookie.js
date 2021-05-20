export const TokenKey = process.env.VUE_APP_AUTH_KEY // 登录token
export const UserKey = process.env.VUE_APP_USER_INFO_KEY // 登录用户
export const FromUrlKey = 'from_url' // 来源url，用于菜单返回时展开
export const AppsKey = 'apps' // 权限系统列表

/* eslint-disable no-eval, no-useless-escape */
export const CookieKey = {
  TokenKey,
  UserKey,
  FromUrlKey,
  AppsKey
}
const decodeJson = function(value) {
  //数组转成的对象字符串
  var regAryStr = /^\[[\s|\S]*\]$/
  //对象转成的对象字符串
  var regObjStr = /^\{([\"\s|\S]+\"\:\"[\s|\S]*)+\"\}$/
  if (regAryStr.test(value)) {
    return eval('(' + value + ')')
  }
  if (regObjStr.test(value)) {
    return JSON.parse(value)
  }
  return value
}
export function setCookie(key, value, delay) {
  //默认cookie为七天之后过期 3s 4m 5h 7d 秒 分 时 天
  if (delay == undefined) delay = '7d'
  delay = delay.toLowerCase()

  var expireDate = new Date()

  var num = parseInt(delay)
  if (delay.indexOf('d') !== -1) {
    expireDate.setDate(expireDate.getDate() + num)
  } else if (delay.indexOf('h') !== -1) {
    expireDate.setHours(expireDate.getHours() + num)
  } else if (delay.indexOf('m') !== -1) {
    expireDate.setMinutes(expireDate.getMinutes() + num)
  } else if (delay.indexOf('s') !== -1) {
    expireDate.setSeconds(expireDate.getSeconds() + num)
  } else {
    expireDate.setDate(expireDate.getDate() + num)
  }
  if (typeof value == 'object') {
    value = JSON.stringify(value)
  }
  value = escape(value)
  document.cookie = key + '=' + value + ';path=/; domain=hwagain.com;expires=' + expireDate.toGMTString()
  return getCookie(key)
}

// 得到cookie 如果不存在 返回 undefined
export function getCookie(key) {
  var objCookie = {}
  var cookie = document.cookie
  var keyValueList = cookie.split(';')
  for (var index in keyValueList) {
    var keyValue = keyValueList[index].split('=')
    var k = keyValue[0].trim()
    var v = keyValue[1]
    objCookie[k] = v
  }

  if (typeof key == 'undefined') {
    return objCookie
  }
  var result = unescape(objCookie[key])
  return decodeJson(result)
}
// 删除cookie
export function removeCookie(key) {
  //删除所有cookie
  if (typeof key == 'undefined') {
    var cookieList = getCookie()
    for (key in cookieList) {
      removeCookie(key)
    }
    return true
  } else {
    if (getCookie(key) == 'undefined') {
      return false
    } else {
      return setCookie(key, '', '0s')
    }
  }
}
