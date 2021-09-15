export default (router) => {
    router.beforeEach(async (to, from, next) => {
        console.log('to', to)
        if (['/auth'].includes(to.path)) {
            next()
        } else if (getType(store.state.user.id) === 'undefined') {
            if (WECHAT_BROWSER_ENV) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WX_APPID}&redirect_uri=${encodeURIComponent(`${BASE_URL}/wx/auth`)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
            } else {
                next()
            }
        } else {
            next()
        }
    })
}
