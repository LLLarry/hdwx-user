import { checkUserIfCharge, chargepay, monthPayUse } from '@/require/charge'
import { toast, alert } from '@/assets/js/vant-helper'
import wxpay from '@/utils/wxUtil/wxpay'

/**
 * 检验当前使用端口能否作为本人续充端口使用
 * @param {Object} data 参数
 * @returns orderid
 */
export const verifiUserIfCharge = async (data) => {
   try {
        const { code, message, orderid } = await checkUserIfCharge(data)
        if (code === 200) {
            return orderid
        } else {
            toast(message)
            return Promise.reject(message)
        }
   } catch (error) {
        toast('异常错误', 'fail')
   }
}

/* 微信支付 */
export const wxPayFun = async (data) => {
    try {
        const { code, message, result } = await chargepay(data)
        if (code === 200) {
            // 调用微信支付接口
            wxpay(result)
            .then(res => {
                alert(res)
            })
            .catch(e => {
                alert(e)
            })
        } else {
            toast(message, 'fail')
        }
    } catch (error) {
        toast('异常错误', 'fail')
    }
}

/* 包月支付 */
export const moneylyPayFun = async (data) => {
    try {
        const { code, message } = await monthPayUse(data)
        if (code === 200) {
            alert('支付成功').then(res => {
                wx.closeWindow()
            })
        } else {
            toast(message, 'fail')
        }
    } catch (error) {
        toast('异常错误', 'fail')
    }
}
