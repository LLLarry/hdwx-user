// hdwx-user 配置文件
module.exports = {
    proxy: {
        open: true, // 是否开启代理
        target: 'http://www.tengfuchong.com.cn' // 代理目标源, 更改代理目标源之后要重启项目
        // target: 'http://www.he360.cn'
    },
    env: {
        // 正式环境
        production: {
            host: ['www.he360', '49.233.68.158', '62.234.145.36', '62.234.167.130'], // 服务器域名 / ip
            wx_appid: 'wx3a3b6ef1ae075731' // 微信appid
        },
        // 正式环境
        productionTest: {
            host: ['www.tengfuchong', '47.93.203.50'], // 服务器域名 / ip
            wx_appid: 'wx343168d6b8072668' // 微信appid
        }
    }
}
