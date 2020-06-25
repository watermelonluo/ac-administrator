import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [   
    {
      path: '/',
      name: 'main',
      redirect: '/networkStatus',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Main,
      children: [
        {
          path: '/networkStatus',
          name: 'networkStatus',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/NetworkStatus.vue')
        },
        
        {
          path: '/networkConfig',
          name: 'networkConfig',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/NetworkConfig.vue')
        },       
        {
          path: '/remoteManage',
          name: 'remoteManage',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/RemoteManage.vue')
        },
        {
          path: '/speedLimit',
          name: 'speedLimit',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/SpeedLimit.vue')
        },        
        {
          path: '/wifiAuthStatus',
          name: 'wifiAuthStatus',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/WifiAuthStatus.vue')
        },
        {
          path: '/wifiAuthConfig',
          name: 'wifiAuthConfig',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/WifiAuthConfig.vue')
        },
        {
          path: '/systemConfig',
          name: 'systemConfig',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/SystemConfig.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    }
  ]
})
