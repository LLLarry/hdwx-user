import vue from 'vue'
import loadingComponent from './index.vue'

const LoadingConstructor = vue.extend(loadingComponent)

let toastDom, el

function showLoading ({ title, type, duration = 2000 }) {
  if (!el && !toastDom) {
    el = document.createElement('div')
    toastDom = new LoadingConstructor({
      el,
      data () {
        return {
          isShow: true, // 是否显示
          title // 文本内容
        }
      }
    })
    // 添加节点
    document.body.appendChild(toastDom.$el)
  } else {
    toastDom.isShow = true
  }
}

function cancelLoading () {
  if (toastDom) {
    toastDom.isShow = false
  }
}

// 全局注册
function registryToast () {
  vue.prototype.$showLoading = showLoading
  vue.prototype.$cancelLoading = cancelLoading
}

export default registryToast
