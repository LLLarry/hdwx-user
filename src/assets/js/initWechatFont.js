(function () {
    // eslint-disable-next-line no-undef
    if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
      handleFontSize()
    } else {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
      } else if (document.attachEvent) {
         // IE浏览器，非W3C规范
        document.attachEvent('onWeixinJSBridgeReady', handleFontSize)
      }
    }
    function handleFontSize () {
      // 设置网页字体为默认大小
      // eslint-disable-next-line no-undef
      WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
      // 重写设置网页字体大小的事件
      // eslint-disable-next-line no-undef
      WeixinJSBridge.on('menu:setfont', function () {
        // eslint-disable-next-line no-undef
        WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 })
      })
    }
})()
