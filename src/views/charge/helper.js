import { checkUserIfCharge, chargepay } from '@/require/charge'
import { toast, alert } from '@/assets/js/vant-helper'
import wxpay from '@/utils/wxUtil/wxpay'

/**
 * 检验当前使用端口能否作为本人续充端口使用
 * @param {Object} data 参数
 * @returns orderid
 */
export const verifiUserIfCharge = async (data) => {
    const { code, message, orderid } = await checkUserIfCharge(data)
    if (code === 200) {
        return orderid
    } else {
        toast(message)
    }
}

export const wxPayFun = async (data) => {
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
}
