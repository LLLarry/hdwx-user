import 'amfe-flexible'
// 监听页面尺寸变化，重置html字体大小
import '@/utils/resizeFontSize'
// 初始化全局变量
import '@/utils/global'
// 封装vant的辅助函数
import '@/assets/js/vant-helper'
// 封装异常捕获辅助函数
// import '@/assets/js/error-helper'
// 引入全局过滤器
import '@/filter'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HdLine from '@/components/hd-line'
import HdTitle from '@/components/hd-title'
import loadingIndex from '@/components/hd-loading/loadingIndex'
import VueMeta from 'vue-meta'
import { Button, Icon, Dialog, Overlay, Loading, Toast, Popup, Switch } from 'vant'
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.use(loadingIndex)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Dialog)
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Popup)
Vue.use(Switch)

Vue.config.productionTip = false
Vue.component('hd-line', HdLine)
Vue.component('hd-title', HdTitle)

Vue.mixin({
  metaInfo () {
      return {
          title: this.title
      }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
