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
