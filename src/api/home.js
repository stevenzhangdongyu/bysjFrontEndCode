import axios from 'axios'
// import store from '@/store'
// 获取首页数据

export const getImages = (page) => {
  return axios.get('http://116.63.35.72:5000/get_images/' + page)
    .then(response => response)
    .catch(error => {
      console.error('Error fetching images:', error)
      throw error
    })
}

export const predictImages = (selectedImages) => {
  return axios.post('http://116.63.35.72:5000/predict', {
    uploadImages: selectedImages
  }).then((response) => {
    // store.state['images/resultImages'] = response.data.data
    return response
  })
    .catch(error => {
      console.error('Error fetching images:', error)
      throw error
    })
}
export const uploadFiles = (formData) => {
  return axios.post('http://116.63.35.72:5000/upload_images', formData)
}
export const refresh = () => {
  console.log('refresh')
  return axios.get('http://116.63.35.72:5000/refresh')
}
