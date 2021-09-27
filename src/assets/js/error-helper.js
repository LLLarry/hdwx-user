import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
import { fmtDate } from '@/utils/util'
const LOGGER_URL = 'http://www.tengfuchong.com.cn'
const env = window.HDWX_USER.env

Vue.config.errorHandler = function (err, vm, info) {
    try {
        const dateTime = fmtDate(new Date())
        const message = `
            -------【hdwx-user-错误start】-------
                时间： ${dateTime}
                错误信息: ${err.toString()} 
                名称：${vm.$route.name}
                行数/info： ${info} 
            -------【hdwx-user-错误end】-------
        `
        senderror(message)
    } catch (e) {

    }
}
Vue.prototype.$error = (error, vm, line) => {
    try {
        if (typeof error === 'object') {
            error = error.toString()
        }
        const dateTime = fmtDate(new Date())
        const message = `
            -------【hdwx-user-错误start】-------
            时间：${dateTime} 
            错误信息: ${error}
            名称：${vm.$route.name} 
            行数/info： ${line} 
            -------【hdwx-user-错误end】-------
        `
        senderror(message)
    } catch (e) {

    }
}

function senderror (message) {
    if (env === 'production') {
        axios.post(`${LOGGER_URL}/logger/revice`, Qs.stringify({ error: message }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
    }
}
