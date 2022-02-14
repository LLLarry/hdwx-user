import { getType } from '@/utils/util'
import store from '@/store'
export default router => {
  router.beforeEach(async (to, from, next) => {
    if (['/auth'].includes(to.path)) {
      next()
    } else if (getType(store.state.user.id) === 'undefined') {
      const { code } = await store.dispatch('getAccount')
      if (code === 200) {
        next()
      } else {
        next('/auth')
      }
      // if (WECHAT_BROWSER_ENV) {
      //     window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WX_APPID}&redirect_uri=${encodeURIComponent(`${BASE_URL}/wx/auth`)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      // } else {
      //     next()
      // }
    } else {
      next()
    }
  })
}
