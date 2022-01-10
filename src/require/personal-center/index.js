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
