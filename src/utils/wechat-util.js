// 微信工具
import { sdkWxGet } from '@/require/personal-center'
import { Dialog } from 'vant'

// 获取微信加密信息
const wxConfig = async (jsApiList) => {
    const pageUrl = encodeURIComponent(window.sessionStorage.getItem('__init_url__'))
    const { appId, nonceStr, signature, timestamp: timestampStr } = await sdkWxGet({ pageUrl }, false)
    const timestamp = Number(timestampStr)
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList // 必填，需要使用的JS接口列表
    })
}

/**
 * 监听jsApi
 * @param {*} tip 是否提示重新尝试
 * @returns
 */
const wxReady = (tip = true) => {
    return new Promise((resolve, reject) => {
        wx.ready(() => {
            resolve()
        })
        wx.error((res) => {
            if (tip) {
                Dialog.alert({
                    title: '提示',
                    message: '请重新尝试'
                })
                .then(() => {
                    window.location.reload()
                })
            }
            reject(res)
        })
    })
}

/**
 * 调取微信扫一扫
 * @param {*} pageUrl 地址url
 * @returns Promise
 */
export const scanQRCode = () => {
   return new Promise((resolve, reject) => {
        wxConfig(['scanQRCode'])
        wxReady()
        .then(() => {
            wx.scanQRCode({
                needResult: 1,
                scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success: ({ resultStr }) => {
                    resolve(resultStr)
                }
            })
        })
        .catch(e => {
            reject(e)
        })
   })
}

/**
 * 调取手机网络类型
 * @param {*} pageUrl 地址url
 * @returns Promise
 */
 export const getNetworkType = () => {
    return new Promise((resolve, reject) => {
         wxConfig(['getNetworkType'])
         wxReady(false)
         .then(() => {
            wx.getNetworkType({
                success: ({ networkType }) => {
                    resolve(networkType) // 返回网络类型2g，3g，4g，wifi
                }
              })
         })
         .catch(e => {
             reject(e)
         })
    })
 }
