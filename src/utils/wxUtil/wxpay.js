function wxpay ({ appId, date: timeStamp, nonceStr, packagess, signType, paySign }) {
    return new Promise((resolve, reject) => {
        if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
            }
        } else {
            onBridgeReady()
        }

        function onBridgeReady () {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    appId, // 公众号ID，由商户传入
                    timeStamp, // 时间戳，自1970年以来的秒数
                    nonceStr, // 随机串
                    package: packagess,
                    signType, // 微信签名方式：
                    paySign // 微信签名
                },
                function (res) {
                    if (res.err_msg === 'get_brand_wcpay_request:ok') {
                            // 使用以上方式判断前端返回,微信团队郑重提示： res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            resolve('支付成功')
                    } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                            reject(new Error('用户已取消支付'))
                    } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                            reject(new Error('支付失败'))
                    }
                })
         }
    })
}

export default wxpay
