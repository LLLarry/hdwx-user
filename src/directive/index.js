import Vue from 'vue'
import NoData from '@/components/no-data/index.vue'
// NoData构造函数
const NoDataConstructor = Vue.extend(NoData)

Vue.directive('no-data', {
  bind (el, { value, arg = {} }) {
    const position = window.getComputedStyle(el).position
    if (!['fixed', 'absolute', 'relative'].includes(position)) {
      el.style.position = 'relative'
    }
    const dom = document.createElement('div')
    const noData = new NoDataConstructor({
      el: dom
    })
    noData.tip = arg.tip
    noData.imgPath = arg.imgPath
    noData.isShow = value
    el.appendChild(noData.$el)
    el.__no_data__ = noData
  },
  update (el, { value, arg = {} }) {
    if (el.__no_data__) {
      el.__no_data__.tip = arg.tip
      el.__no_data__.imgPath = arg.imgPath
      el.__no_data__.isShow = value
    }
  }
})
