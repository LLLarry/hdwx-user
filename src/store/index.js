import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import { getAccountData } from '@/require/admin'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async getAccount({ commit }) {
      try {
        const info = await getAccountData()
        commit('setUser', info.account)
        return info
      } catch (e) {
        return {}
      }
    }
  },
  getters,
  modules: {
    app
  }
})
