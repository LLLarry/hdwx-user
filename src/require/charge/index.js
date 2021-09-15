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
