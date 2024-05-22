// store/modules/images.js
import { getImages } from '@/api/home'

const state = {
  selectedImages: [],
  originalImages: [],
  resultImages: [],
  page: 0,
  maxPage: 0,
  selectedFiles: []
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
  },
  SET_MAX_PAGE (state, maxPage) {
    state.maxPage = maxPage
  },
  SET_SELECTED_FILES (state, files) {
    console.log('selected files mutations begin')
    state.selectedFiles = files
    console.log(state.selectedFiles)
    console.log('selected files mutations end')
  },
  SET_ORIGINAL_IMAGES (state, imgs) {
    state.originalImages = imgs
  }
}

const actions = {
  async fetchImages ({ commit }, tune) {
    // 模拟从后端获取图片列表
    if (state.page + tune < 0) {
      return 'no'
    }
    const response = await getImages(state.page + tune)
    if (response.status === 'yes') {
      commit('SET_IMAGES', response.images)
      state.page = state.page + tune
      state.maxPage = response.maxPage
    }
    return response.status
  },
  async fetchImagesAt ({ commit }, page) {
    const response = await getImages(page)
    if (response.data.status === 'yes') {
      commit('SET_IMAGES', response.data.images)
      state.page = page
      state.maxPage = response.data.maxPage
    }
    return response.data.status
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
    commit('SET_PAGE', state.page + 1)
  },
  setRes ({ commit }, imgs) {
    commit('SET_RES', imgs)
  },
  clearSelectedImages ({ commit }) {
    commit('CLEAR_SELECT_IMAGES')
  },
  clearRes ({ commit }) {
    commit('CLEAR_RES')
  },
  setMaxPage ({ commit }, maxPage) {
    commit('SET_MAX_PAGE', maxPage)
  },
  setSelectedFiles ({ commit }, files) {
    commit('SET_SELECTED_FILES', files)
  },
  setOriginalImages ({ commit }, imgs) {
    commit('SET_ORIGINAL_IMAGES', imgs)
  },
  setPage ({ commit }, p) {
    commit('SET_PAGE', p)
  }
}

const getters = {
  originalImages: state => state.originalImages,
  selectedImages: state => state.selectedImages,
  page: state => state.page,
  resultImages: state => state.resultImages,
  maxPage: state => state.maxPage,
  selectedFiles: state => state.selectedFiles
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
