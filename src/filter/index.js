import Vue from 'vue'
import { fmtMoney, fmtDate } from '@/utils/util'
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
