import ajax from '../ajax'
/**
 * 获取微信sdk加密信息
 * @param {*} data { pageUrl： 页面地址 }
 * @returns
 */
export const sdkWxGet = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/sdkWxGet',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 获取用户信息
 * @param {*} data { pageUrl： 页面地址 }
 * @returns
 */
export const accountCentre = (data, loadText) => {
  return ajax({
    url: '/allowInterface/accountCentre',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 获取修改用户信息
 * @param {*} data { pageUrl： 页面地址 }
 * @returns
 */
export const updateAccountPhoneById = (data, loadText) => {
  return ajax({
    url: '/allowInterface/updateAccountPhoneById',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 获取用户钱包列表
 * @param {*} data { }
 * @returns
 */
export const getWalletList = (data, loadText) => {
  return ajax({
    url: '/allowInterface/getWalletList',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 获取用户钱包详情
 * @param {*} data { walletid 钱包id }
 * @returns
 */
export const getWalletDetail = (data, loadText) => {
  return ajax({
    url: '/allowInterface/getWalletDetail',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 创建钱包邀请码
 * @param {*} data { walletid 钱包id }
 * @returns
 */
export const createWalletCaptcha = (data, loadText) => {
  return ajax({
    url: '/allowInterface/createWalletCaptcha',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 获取缓存中的账户信息
 * @param {*} data {}
 * @returns
 */
export const getAccountData = (data, loadText) => {
  return ajax({
    url: '/allowInterface/getAccountData',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 在线卡信息
 * @param {*} data {}
 * @returns
 */
export const getOnLineCardList = (data, loadText) => {
  return ajax({
    url: '/allowInterface/getOnLineCardList',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 包月信息
 * @param {*} data {}
 * @returns
 */
export const getPackageMonthInfo = (data, loadText) => {
  return ajax({
    url: '/allowInterface/getPackageMonthInfo',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 用户绑定ic卡
 * @param {*} data {}
 * @returns
 */
export const bindingonline = (data, loadText) => {
  return ajax({
    url: '/allowInterface/bindingonline',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 用户修改ic卡状态
 * @param {*} data {}
 * @returns
 */
export const icCardChangeStatus = (data, loadText) => {
  return ajax({
    url: '/allowInterface/icCardChangeStatus',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 用户删除ic卡
 * @param {*} data {}
 * @returns
 */
export const icCardDelete = (data, loadText) => {
  return ajax({
    url: '/allowInterface/icCardDelete ',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 用户编辑ic卡备注
 * @param {*} data {}
 * @returns
 */
export const icCardEditRemark = (data, loadText) => {
  return ajax({
    url: '/allowInterface/icCardEditRemark ',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 用户充值钱包获取加密信息
 * @param {*} data {}
 * @returns
 */
export const walletRecharge = (data, loadText) => {
  return ajax({
    url: '/general/walletRecharge ',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 用户充值钱包获取加密信息
 * @param {*} data {}
 * @returns
 */
export const getWalletRecordInfo = (data, loadText) => {
  return ajax({
    url: '/allowInterface/getWalletRecordInfo ',
    method: 'post',
    data,
    loadText
  })
}
