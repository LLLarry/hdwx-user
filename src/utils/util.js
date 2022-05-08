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
 * 日期范围
 * @param {Date} date 起始日期
 * @param {Number} day 推迟天数
 * @returns [Date, Date] 日期数组
 */
 export const dateRange = (date, day = 0, type = 'YYYY-MM-DD HH:mm:ss') => {
    date = new Date(date)
    const times = date.getTime()
    if (Number.isNaN(times)) {
        throw TypeError('date argument is not Date type')
    }
    const newTimes = times - day * 24 * 60 * 60 * 1000
    if (times < newTimes) {
        return [fmtDate(new Date(times), type), fmtDate(new Date(newTimes), type)]
    } else {
        return [fmtDate(new Date(newTimes), type), fmtDate(new Date(times), type)]
    }
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

/**
 * 获取随机数
 * @returns String
 */
 export const getRamdom = () => {
    const r = Math.round(Math.random() * 255)
    const g = Math.round(Math.random() * 255)
    const b = Math.round(Math.random() * 255)
    const color = r << 16 | g << 8 | b
    return color.toString(16)
}

/**
 * 是否是不存在的值
 * @param value
 * @returns boolean
 */
 export const isFalsy = (value) => value === 0 ? true : !value

 /**
  * 删除值为null、undefined、''、 NaN的键
  * @param targetObj 目标元素
  * @returns 格式化之后的值
  */
 export const cleanObject = (targetObj) => {
   const result = Object.assign({}, targetObj)
   Object.entries(result).forEach(([key, value]) => {
     if (isFalsy(value)) {
       delete result[key]
     }
   })
   return result
 }
