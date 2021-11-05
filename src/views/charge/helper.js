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

/**
 * 通过硬件版本号生成端口状态
 * @param {*} hardversion 硬件版本号
 * @returns List
 */
export const createPortStatusByHV = (portStatus, hardversion) => {
    if (Array.isArray(portStatus) && portStatus.length) return portStatus
    // map 硬件版本号对应端口数
    const map = {
        '00': 10,
        '01': 10,
        '02': 2,
        '03': 10,
        '05': 16,
        '06': 20,
        '07': 1,
        '08': 10,
        '09': 2,
        10: 20,
        11: 2
    }
    const portNum = map[hardversion]
    const portList = []
    for (let i = 0; i < portNum; i++) {
        portList.push({
            port: i + 1,
            portStatus: 1
        })
    }
    return portList
}
