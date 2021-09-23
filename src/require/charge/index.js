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

/**
 * 获取智慧款充电的加密信息
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const chargepay = (data, loadText) => {
    return ajax({
        url: '/wxpay/chargepay',
        params: data,
        loadText
    })
}

/**
 * 智慧款设备钱包支付充电
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const walletChargePay = (data, loadText) => {
    return ajax({
        url: '/general/WalletChargePay',
        params: data,
        loadText
    })
}

/**
 * 检查用户是否在当前设备当前端口进行充电
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const checkUserIfCharge = (data, loadText) => {
    return ajax({
        url: '/allowInterface/checkUserIfCharge',
        params: data,
        loadText
    })
}

/**
 * 智慧款设备：用户使用包月支付
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const monthPayUse = (data, loadText) => {
    return ajax({
        url: '/general/allowMonthPayUse',
        params: data,
        loadText
    })
}

/**
 * 修改用户充电页面下次不再提醒接口
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const editAccountAloneData = (data, loadText) => {
    return ajax({
        url: '/general/editAccountAloneData',
        params: data,
        loadText
    })
}

/**
 * 查询用户钱包列表
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const accountwalletverify = (data, loadText) => {
    return ajax({
        url: '/general/accountwalletverify',
        params: data,
        loadText
    })
}
