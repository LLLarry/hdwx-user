import Vue from 'vue'
import { fmtMoney, fmtDate } from '@/utils/util'
const defaultAvatar = require('@/assets/images/default_avatar.png')
/**
 * 格式化金額
 * money：格式化金額
 * digit：格式化位數
 */
Vue.filter('fmtMoney', fmtMoney)

/**
 * 格式化金額
 * date：格式化日期
 * type：格式
 */
Vue.filter('fmtDate', fmtDate)

/**
 * 当头像地址不存在时，使用默认头像
 */
Vue.filter('fmtAvatar', url => {
  if (!url) {
    url = defaultAvatar
  }
  return url
})

/**
 * 格式化金額
 * money：格式化金額
 * digit：格式化位數
 */
Vue.filter('fmtFill', (value, length, fill = '0') => {
  if (typeof value === 'undefined') return ''
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value.padStart(length, fill)
})
