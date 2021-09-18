import Vue from 'vue'
import { getType } from '@/utils/util'
/**
 * toast轻提示
 * @param {String} message 提示信息
 * @param {String} type 提示类型 '' | success | fial
 * @param {Number} duration 持续时间 ms
 */
export const toast = (message, type = '', duration = 1500) => {
    if (getType(type) === 'number') {
        duration = type
        type = ''
    }
    if (type) {
        Vue.prototype.$toast[type]({
            message,
            forbidClick: true,
            duration
        })
    } else {
        Vue.prototype.$toast({
            message,
            forbidClick: true,
            duration
        })
    }
}

const dialog = (type, message, title = '提示', beforeClose = (action, done) => done()) => {
    if (getType(title) === 'function') {
        beforeClose = title
        title = '提示'
    }
    return new Promise((resolve, reject) => {
        Vue.prototype.$dialog[type]({
            title,
            message,
            overlayStyle: { zIndex: 20100 },
            className: 'dialog-class',
            confirmButtonColor: '#07c160',
            beforeClose
        })
        .then(() => {
            // on confirm
            resolve()
        })
        .catch(() => {
            // on cancel
            reject(new Error('取消操作'))
        })
    })
}

/**
 * alert 弹出交互层
 * @param {*} message 提示信息
 * @param {*} title 提示标题
 * @param {*} beforeClose 交互之后的回调
 * @returns Promise 对象
 */
export const alert = (message, title, beforeClose) => {
    return dialog('alert', message, title, beforeClose)
}

/**
 * confirm 弹出交互层
 * @param {*} message 提示信息
 * @param {*} title 提示标题
 * @param {*} beforeClose 交互之后的回调
 * @returns Promise 对象
 */
export const confirm = (message, title, beforeClose) => {
    return dialog('confirm', message, title, beforeClose)
}

Vue.prototype.toast = toast
Vue.prototype.alert = alert
Vue.prototype.confirm = confirm
