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
    // url: '/wxpay/chargepayTenant',
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
    url: '/general/monthChargePay',
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
 * 修改用户充电协议
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const updateAgree = (data, loadText) => {
  return ajax({
    url: '/general/updateAgree',
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

/**
 * 查询离线充值机卡信息
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const queryOfflineCard = (data, loadText) => {
  return ajax({
    url: '/allowInterface/queryOfflineCard',
    params: data,
    loadText
  })
}

/**
 * 查询离线充值机信息
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const offlineCardCharge = (data, loadText) => {
  return ajax({
    url: '/allowInterface/offlineCardCharge',
    params: data,
    loadText
  })
}

/**
 * 查询离线充值机获取微信支付秘钥
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const offlineCharge = (data, loadText) => {
  return ajax({
    url: '/wxpay/offlineCharge',
    params: data,
    loadText
  })
}

/**
 * 更新一拖二设备端口状态
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const queryAddrAllPortStatus = (data, loadText) => {
  return ajax({
    // url: '/wolfNewSendData/queryAddrAllPortStatus',
    url: '/wolfNewSendData/queryAddrPortStatus',
    data,
    method: 'post',
    loadText
  })
}

/**
 * 更新端口状态
 * @param {*} data {  code: String }
 * @param {*} loadText
 * @returns
 */
export const portstate1 = (data, loadText) => {
  return ajax({
    url: '/portstate1',
    data,
    method: 'post',
    loadText
  })
}

/**
 * 测试加密信息
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const chargepayTest = (data, loadText) => {
  return ajax({
    url: '/wxpay/chargepayTest',
    params: data,
    loadText
  })
}

/**
 * 断开设备连接
 * @param {*} data { code: 设备号 }
 * @param {*} loadText
 * @returns
 */
export const removeClient = (data, loadText) => {
  return ajax({
    url: '/general/removeClient',
    data,
    method: 'post',
    loadText
  })
}
