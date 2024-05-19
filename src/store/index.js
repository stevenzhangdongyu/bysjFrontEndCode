import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import cart from '@/store/modules/cart'
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
    user,
    cart,
    images
  }
})
