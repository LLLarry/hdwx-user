// import * as dayjs from 'dayjs'
import { Dialog } from 'vant'

/**
 * 获取元素的类型： number、string、array、regexp ...
 * @param {*} e 元素
 * @returns string 类型的小写
 */
export const getType = (e) => {
    return Object.prototype.toString.call(e).replace(/\[object (\w+)\]/, '$1').toLowerCase()
}

export const verification = (list) => {
    return list.every(({ verifi, content }) => {
        if (!verifi) {
            Dialog.alert({
                title: '提示',
                message: content
            })
        }
        return verifi
    })
}
