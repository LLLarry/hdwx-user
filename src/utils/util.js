import * as dayjs from 'dayjs'
import Vue from 'vue'

/**
 * 获取元素的类型： number、string、array、regexp ...
 * @param {*} e 元素
 * @returns string 类型的小写
 */
export const getType = (e) => {
    return Object.prototype.toString.call(e).replace(/\[object (\w+)\]/, '$1').toLowerCase()
}

/**
 * 格式化日期
 * @param {Date | String} date date对象或日期类型的字符串
 * @param {*} type 按照dayjs格式的字符串
 * @returns 解析之后的字符串
 */
 export const fmtDate = (date, type = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(date).format(type)
}

/**
 * 格式化金额
 * @param {Number} money money 格式化金额
 * @param {*} digit 保留几位小数
 * @returns 解析之后的金额字符串
 */
 export const fmtMoney = (money, digit = 2) => {
    if (typeof money !== 'number') {
        money = Number.parseFloat(money)
        money = Number.isNaN(money) ? 0 : money
    }
    return money.toFixed(digit)
}

/**
 * 检验辅助函数
 * @param {Array} list // 检验列表
 * @returns 所有项都成功返回true，否则返回false
 */
export const verification = (list) => {
    return list.every(({ verifi, content }) => {
        if (!verifi) {
            Vue.prototype.alert(content)
        }
        return verifi
    })
}
