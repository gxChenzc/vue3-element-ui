import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout'
import RouterViewBox from './views/router-view-box' // 用于有子路由的route，做一个转发子路由组件的作用

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          meta: {
            icon: 'el-icon-s-home',
            title: '首页',
            noChildren: true
          },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
        },
        {
          path: '/about',
          name: 'about',
          meta: {
            icon: 'el-icon-question',
            title: '关于'
          },
          component: RouterViewBox,
          children: [
            {
              path: '/about/1',
              name: 'about1',
              meta: {
                title: '关于1'
              },
              component: RouterViewBox,
              children: [
                {
                  path: '/about/1-1',
                  name: 'about1-1',
                  meta: {
                    title: '关于1-1',
                    noChildren: true
                  },
                  component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
                }
              ]
            }
          ]
        },
        {
          path: '/about11',
          name: 'about11',
          meta: {
            icon: 'el-icon-info',
            title: '关于11'
          },
          component: RouterViewBox,
          children: [
            {
              path: '/about/111',
              name: 'about111',
              meta: {
                title: '关于111',
                noChildren: true
              },
              component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
            }
          ]
        },
        {
          path: '/403',
          name: '403',
          meta: {
            title: '抱歉,您没有当前页面权限'
          },
          hidden: true,
          component: () => import(/* webpackChunkName: "403" */ './views/403.vue')
        }
      ]
    }
  ]
})
