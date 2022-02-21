import ajax from '../ajax'

/**
 * 获取测试离线机信息
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const testType4Equipment = (data, loadText) => {
  return ajax({
    url: '/wxpay/testType4Equipment',
    params: data,
    loadText
  })
}

/**
 * 读取测试离线机卡信息
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const testType4Card = (data, loadText) => {
  return ajax({
    url: '/wxpay/testType4Card',
    params: data,
    loadText
  })
}

/**
 * 下发测试离线机充值余额
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
 export const testofflineCharge = (data, loadText) => {
  return ajax({
    url: '/wxpay/testofflineCharge',
    params: data,
    loadText
  })
}
