import vue from 'vue'
import loadingComponent from './index.vue'

const LoadingConstructor = vue.extend(loadingComponent)

// let toastDom, el
const toastDom = {}
const el = {}

function showLoading ({ title, type, duration = 2000, key = 'key' }) {
  if (!el[key] && !toastDom[key]) {
    el[key] = document.createElement('div')
    toastDom[key] = new LoadingConstructor({
      el: el[key],
      data () {
        return {
          isShow: true, // 是否显示
          title // 文本内容
        }
      }
    })
    // 添加节点
    document.body.appendChild(toastDom[key].$el)
  } else {
    toastDom[key].title = title
    toastDom[key].isShow = true
  }
}

function cancelLoading (key = 'key') {
  if (toastDom[key]) {
    toastDom[key].isShow = false
  }
}

// 全局注册
function registryToast () {
  vue.prototype.$showLoading = showLoading
  vue.prototype.$cancelLoading = cancelLoading
}

export default registryToast
