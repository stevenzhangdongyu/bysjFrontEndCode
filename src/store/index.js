import Vue from 'vue'
import Vuex from 'vuex'
import images from '@/store/modules/images'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: []
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    }
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    images
  }
})
