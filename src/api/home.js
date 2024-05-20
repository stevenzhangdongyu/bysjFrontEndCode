import axios from 'axios'
// import store from '@/store'
// 获取首页数据

export const getImages = (page) => {
  return axios.get('http://116.63.35.72:5000/get_images/' + page)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching images:', error)
      throw error
    })
}

export const predictImages = (uploadImages) => {
  return axios.post('http://116.63.35.72:5000/predict', {
    uploadImages: uploadImages
  }).then((response) => {
    // store.state['images/resultImages'] = response.data.data
    return response
  })
    .catch(error => {
      console.error('Error fetching images:', error)
      throw error
    })
}
