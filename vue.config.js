const { proxy } = require('./hdwx.user.config')
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/userwx' : '/',
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                entry: {
                    initWecharFont: './src/assets/js/initWechatFont.js'
                },
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
                        threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
                        deleteOriginalAssets: false // 是否删除原文件
                    })
                ]
            }
        } else {
            return {
                entry: {
                    initWecharFont: './src/assets/js/initWechatFont.js'
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "~@/assets/style/index.scss";'
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://www.he360.cn', // 目标地址
                target: proxy.target, // 目标地址
                ws: true, // 是否启用websockets
                changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: { '^/api': '/' } // 这里重写路径
            }

        }
    },
    chainWebpack: config => {
        // 移除 prefetch 插件 prefetch：一种利用浏览器的空闲时间加载页面将来可能用到的资源的一种机制；通常可以用于加载非首页的其他页面所需要的资源，以便加快后续页面的首屏速度；
        config.plugins.delete('prefetch')
        // 移除 preload 插件 preload：加载的资源是在浏览器渲染机制之前进行处理的，并且不会阻塞onload事件；
        config.plugins.delete('preload')
    }
}
