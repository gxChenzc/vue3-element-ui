// 此mixin生效需在route里同时设置meta属性 keepAlive: true和canKeep: true
/**
 * {
      path: '/xx',
      name: 'xxx',
      meta: {
        keepAlive: true,
        canKeep: false,
      },
   },
 */
const PageCahceMixin = {
  beforeRouteEnter(to, from, next) {
    if (from.path === historyCacheRoutes[1]) {
      to.meta.canKeep = true
    } else {
      to.meta.canKeep = false
    }
    next()
  },
  activated() {
    if (!this.$route.meta.canKeep) {
      this.initPageData && this.initPageData()
    }
  }
}

export default PageCahceMixin
