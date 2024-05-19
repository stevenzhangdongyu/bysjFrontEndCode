import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  timeout: 5000
})

instance.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中',
    forbidClick: true,
    duration: 0
  })
  // Do something before request is sent
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const res = response.data

  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  }
  Toast.clear()
  return response.data
}, function (error) { // todo 这段代码什么时候会被执行呢
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default instance
