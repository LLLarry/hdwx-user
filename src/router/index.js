import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import authentication from './authentication'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/chargeicon',
    name: 'charge-icon',
    component: () =>
      import(
        /* webpackChunkName: "charge-icon" */ '../views/charge/icon/index.vue'
      )
  },
  {
    path: '/wisdom',
    name: 'wisdom',
    component: () =>
      import(
        /* webpackChunkName: "wisdom" */ '../views/charge/wisdom/index.vue'
      )
  },
  {
    path: '/wisdomport',
    name: 'wisdom-port',
    component: () =>
      import(
        /* webpackChunkName: "wisdom-port" */ '../views/charge/wisdom-port/index.vue'
      )
  },
  {
    path: '/wisdomv3',
    name: 'wisdom-v3',
    component: () =>
      import(
        /* webpackChunkName: "wisdom-v3" */ '../views/charge/wisdom-v3/index.vue'
      )
  },
  {
    path: '/wisdomv3test',
    name: 'wisdom-v3-test',
    component: () =>
      import(
        /* webpackChunkName: "wisdom-v3-test" */ '../views/charge/wisdom-v3-test/index.vue'
      )
  },
  {
    path: '/wisdomv3test01',
    name: 'wisdom-v3-test01',
    component: () =>
      import(
        /* webpackChunkName: "wisdom-v3-test01" */ '../views/charge/wisdom-v3-test01/index.vue'
      )
  },
  {
    path: '/wisdomv3port',
    name: 'wisdom-v3-port',
    component: () =>
      import(
        /* webpackChunkName: "wisdom-v3-port" */ '../views/charge/wisdom-v3-port/index.vue'
      )
  },
  {
    path: '/wisdomv3porttest01',
    name: 'wisdom-v3-port-test01',
    component: () =>
      import(
        /* webpackChunkName: "wisdom-v3-port-test01" */ '../views/charge/wisdom-v3-port-test01/index.vue'
      )
  },
  {
    path: '/offline',
    name: 'offline-recharge',
    component: () =>
      import(
        /* webpackChunkName: "offline-recharge" */ '../views/charge/offline-recharge/index.vue'
      )
  },

  {
    path: '/testoffline',
    name: 'testoffline',
    component: () =>
      import(
        /* webpackChunkName: "testoffline" */ '../views/virtual/testoffline/index.vue'
      ),
    meta: {
      title: '测试离线充值机'
    }
  }
  // 支付测试
  // {
  //   path: '/paytest',
  //   name: 'paytest',
  //   component: () => import(/* webpackChunkName: "paytest" */ '../views/About.vue')
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: '/userwx',
  routes,
  scrollBehavior(to, from) {
    return { x: 0, y: 0 }
  }
})

// 授权
authentication(router)

export default router
