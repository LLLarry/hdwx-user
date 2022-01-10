import 'amfe-flexible'
// 监听页面尺寸变化，重置html字体大小
import '@/assets/js/reset-font-size'
// 初始化全局变量
import '@/utils/global'
// 封装vant的辅助函数
import '@/assets/js/vant-helper'
// 封装异常捕获辅助函数
import '@/assets/js/error-helper'
// 引入全局过滤器
import '@/filter'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HdLine from '@/components/hd-line'
import HdTitle from '@/components/hd-title'
import HdIcon from '@/components/hd-icon'
import loadingIndex from '@/components/hd-loading/loadingIndex'
import VueCompositionAPI from '@vue/composition-api'
import VueMeta from 'vue-meta'
import bus from '@/utils/bus'
import qrcode from 'vue-qrcode2'
import {
  Button, Icon, Dialog, Overlay, Loading, Toast, Popup, Switch, Tab, Tabs, CouponCell, CouponList,
  Collapse, CollapseItem, Popover, Field, Tabbar, TabbarItem,
  Image as VanImage, Grid, GridItem, NavBar, Tag, Form, RadioGroup, Radio
} from 'vant'

// 解决 vue当页面应用在ios微信中，使用wxsdk, wx.config报错
window.sessionStorage.setItem('__init_url__', window.location.href)

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})
Vue.use(bus)

Vue.use(loadingIndex)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Dialog)
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Popup)
Vue.use(Switch)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(CouponCell)
Vue.use(CouponList)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Popover)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(NavBar)
Vue.use(Tag)
Vue.use(Form)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)

Vue.config.productionTip = false
Vue.component('hd-line', HdLine)
Vue.component('hd-title', HdTitle)
Vue.component('hd-icon', HdIcon)
Vue.use(VueCompositionAPI)
Vue.use(qrcode)
Vue.mixin({
  metaInfo () {
      return {
          title: this.titleText || this.$route.meta.title
      }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
