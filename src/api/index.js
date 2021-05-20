const API = {}
API.projectApi = {
  baseUrl: process.env.VUE_APP_BASE_API,
  // demo
  apis: {
    list: 'module/findAll',
    test: {
      a: 'a/list',
      b: 'b/list',
      c: {
        c: 'c/a/list'
      }
    }
  }
}

API.structureApi = {
  baseUrl: process.env.VUE_APP_STRUCTURE_API,
  apis: {
    /**
     * @codes 字符串数组，人员编号或组织编号
     */
    findOrgNamesByCodes: '/org/dept/findOrgNamesByCodes',
    /**
     * @companyCode
     */
    findDeptTree: '/org/dept/findDeptTree',
    /**
     * @type 类型，user:只查人，position:只查职位，dept:只查子部门，user;dept:查询人员和子部门
     * @deptCode 组织编码
     * @keyword 关键字查询
     */
    findChildren: '/org/dept/findChildren'
  }
}

const APIs = {}

/**
 * @date 2020-1-7 08:34:17
 * @author laisf
 * @param {*} apis 存储的对象(一开始是空的)
 * @param {*} root root级为baseUrl级
 * @param {*} api 每个api对象
 * @param {*} key 父级的key
 */
const generateApi = function(apis, root, api, key) {
  // 当api是一个对象时，循环对象每个属性，然后迭代循环，直至api不是对象(不是对象就表示可以直接赋值)
  if (api instanceof Object) {
    apis[key] = apis[key] || {}
    for (const _key in api) {
      if (api.hasOwnProperty(_key)) {
        const _api = api[_key]
        generateApi(apis[key], root, _api, _key)
      }
    }
  } else {
    // 当api不是一个对象时，直接给对应key赋值
    apis[key] = root.baseUrl + api
  }
}
for (const key in API) {
  if (API.hasOwnProperty(key)) {
    for (const k in API[key]) {
      if (API[key].hasOwnProperty(k) && k !== 'baseUrl') {
        generateApi(APIs, API[key], API[key][k], key)
      }
    }
  }
}
console.log(APIs)

export default APIs
