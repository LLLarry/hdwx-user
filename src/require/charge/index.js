import ajax from '../ajax'

/**
 * 通过设备号、openid获取充电信息
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const getChargeDataByCodeAndOpenid = (data, loadText) => {
    return ajax({
        url: '/allowInterface/getDeviceDataForGeneral',
        params: data,
        loadText
    })
}

/**
 * 获取脉冲充电的加密信息
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const inCoinsPay = (data, loadText) => {
    return ajax({
        url: '/wxpay/inCoinsPay',
        params: data,
        loadText
    })
}

/**
 * 脉冲充电使用钱包支付
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const inCoinsWalletPay = (data, loadText) => {
    return ajax({
        url: '/general/inCoinsWalletPay',
        params: data,
        loadText
    })
}

/**
 * 00 01 02 智慧款充电页面信息
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const deviceCharge = (data, loadText) => {
    return ajax({
        url: '/allowInterface/deviceCharge',
        params: data,
        loadText
    })
}
