import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/chargeicon',
    name: 'charge-icon',
    component: () => import(/* webpackChunkName: "charge-icon" */ '../views/charge/icon/index.vue')
  },
  {
    path: '/wisdom',
    name: 'wisdom',
    component: () => import(/* webpackChunkName: "wisdom" */ '../views/charge/wisdom/index.vue')
  },
  {
    path: '/wisdomport',
    name: 'wisdom-port',
    component: () => import(/* webpackChunkName: "wisdom-port" */ '../views/charge/wisdom-port/index.vue')
  },
  {
    path: '/wisdomv3',
    name: 'wisdom-v3',
    component: () => import(/* webpackChunkName: "wisdom-v3" */ '../views/charge/wisdom-v3/index.vue')
  },
  {
    path: '/wisdomv3test',
    name: 'wisdom-v3-test',
    component: () => import(/* webpackChunkName: "wisdom-v3-test" */ '../views/charge/wisdom-v3-test/index.vue')
  },
  {
    path: '/wisdomv3test01',
    name: 'wisdom-v3-test01',
    component: () => import(/* webpackChunkName: "wisdom-v3-test01" */ '../views/charge/wisdom-v3-test01/index.vue')
  },
  {
    path: '/wisdomv3port',
    name: 'wisdom-v3-port',
    component: () => import(/* webpackChunkName: "wisdom-v3-port" */ '../views/charge/wisdom-v3-port/index.vue')
  },
  {
    path: '/wisdomv3porttest01',
    name: 'wisdom-v3-port-test01',
    component: () => import(/* webpackChunkName: "wisdom-v3-port-test01" */ '../views/charge/wisdom-v3-port-test01/index.vue')
  },
  {
    path: '/offline',
    name: 'offline-recharge',
    component: () => import(/* webpackChunkName: "offline-recharge" */ '../views/charge/offline-recharge/index.vue')
  },
  // 支付测试
  // {
  //   path: '/paytest',
  //   name: 'paytest',
  //   component: () => import(/* webpackChunkName: "paytest" */ '../views/About.vue')
  // },
  {
    path: '/personalCenter',
    name: 'personal-center',
    component: () => import(/* webpackChunkName: "personal-center" */ '../views/personal-center/index.vue'),
    meta: {
      title: '个人中心',
      tabbar: true
    }
  },
  {
    path: '/personalCenter/walletlist',
    name: 'wallet-list',
    component: () => import(/* webpackChunkName: "wallet-list" */ '../views/personal-center/wallet-list/index.vue'),
    meta: {
      title: '钱包列表'
    }
  },
  {
    path: '/personalCenter/walletdetail/:id',
    name: 'wallet-detail',
    component: () => import(/* webpackChunkName: "wallet-detail" */ '../views/personal-center/wallet-detail/index.vue'),
    meta: {
      title: '钱包详情'
    }
  },
  {
    path: '/personalCenter/icmanage',
    name: 'ic-manage',
    component: () => import(/* webpackChunkName: "ic-manage" */ '../views/personal-center/ic-manage/index.vue'),
    meta: {
      title: 'IC卡管理'
    }
  },
  {
    path: '/personalCenter/nearbydevice',
    name: 'nearby-device',
    component: () => import(/* webpackChunkName: "nearby-device" */ '../views/personal-center/nearby-device/index.vue'),
    meta: {
      title: 'IC卡管理'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/userwx',
  routes,
  scrollBehavior (to, from) {
    return { x: 0, y: 0 }
  }
})

export default router
