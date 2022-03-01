import vue from 'vue'
import loadingComponent from './index.vue'

const LoadingConstructor = vue.extend(loadingComponent)

// let vmMap, el
const vmMap = {} // key 对应组件实例
const el = {}

function showLoading ({ title, type, duration = 2000, key = 'key' }) {
  if (!el[key] && !vmMap[key]) {
    el[key] = document.createElement('div')
    vmMap[key] = new LoadingConstructor({
      el: el[key],
      data () {
        return {
          isShow: true, // 是否显示
          title // 文本内容
        }
      }
    })
    // 添加节点
    document.body.appendChild(vmMap[key].$el)
  } else {
    vmMap[key].title = title
    vmMap[key].isShow = true
  }
}

function cancelLoading (key = 'key') {
  if (vmMap[key]) {
    vmMap[key].isShow = false
  }
}

// 全局注册
function registryToast () {
  vue.prototype.$showLoading = showLoading
  vue.prototype.$cancelLoading = cancelLoading
}

export default registryToast
