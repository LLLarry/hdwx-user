import Vue from 'vue'
// import axios from 'axios'
// import Qs from 'qs'

Vue.config.errorHandler = function (err, vm, info) {
    const message = `错误信息：${err.toString()} --- 名称：${vm.$route.name} --- 行数/info： ${info} `
    senderror(message)
}
Vue.prototype.$error = (error, vm, line) => {
    if (typeof error === 'object') {
        error = error.toString()
    }
    const message = `错误信息：${error} --- 名称：${vm.$route.name} --- 行数/info： ${line} `
    senderror(message)
}

function senderror (message) {
    axios.post('http://www.tengfuchong.com.cn/logger/revice', Qs.stringify({ error: message }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}
