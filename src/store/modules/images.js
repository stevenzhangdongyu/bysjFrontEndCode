// store/modules/images.js
import { getImages } from '@/api/home'

const state = {
  selectedImages: [],
  originalImages: [],
  resultImages: [],
  page: 0
}

const mutations = {
  SET_IMAGES (state, imgs) {
    state.originalImages = imgs
  },
  SELECT_IMAGE (state, image) {
    state.selectedImages.push(image)
  },
  DESELECT_IMAGE (state, image) {
    state.selectedImages = state.selectedImages.filter(img => img !== image)
  },
  SET_PAGE (state, page) {
    state.page = page
  },
  SET_RES (state, imgs) {
    state.resultImages = imgs
  },
  CLEAR_SELECT_IMAGES (state) {
    state.selectedImages = []
  },
  CLEAR_RES (state) {
    state.resultImages = []
  }
}

const actions = {
  async fetchImages ({ commit }) {
    // 模拟从后端获取图片列表
    const imgs = await getImages(state.page)
    commit('SET_IMAGES', imgs.images)
  },
  selectImage ({ commit }, image) {
    commit('SELECT_IMAGE', image)
  },
  deselectImage ({ commit }, image) {
    commit('DESELECT_IMAGE', image)
  },
  pageDown ({ commit }) {
    if (state.page > 0) {
      commit('SET_PAGE', state.page - 1)
    }
  },
  pageUp ({ commit }) {
    if (state.page < 20) {
      commit('SET_PAGE', state.page + 1)
    }
  },
  setRes ({ commit }, imgs) {
    commit('SET_RES', imgs)
  },
  clearSelectedImages ({ commit }) {
    commit('CLEAR_SELECT_IMAGES')
  },
  clearRes ({ commit }) {
    commit('CLEAR_RES')
  }
}

const getters = {
  originalImages: state => state.originalImages,
  selectedImages: state => state.selectedImages,
  page: state => state.page,
  resultImages: state => state.resultImages
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
