import variables from '@/assets/style/variables.scss'
export default {
  namespace: true,
  state () {
    return {
      variables,
      global: {
        clientWidth: 375, // 全局屏幕宽度
        clientHeight: 812 // 全局屏幕高
      }
    }
  },
  mutations: {
    setGlobalData (state, global) {
      state.global = global
    }
  }
}
