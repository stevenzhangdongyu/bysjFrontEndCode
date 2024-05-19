import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/layout/home.vue'

import Layout from '@/views/layout/index.vue'
import ImageHub from '@/views/layout/imageHub.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home', component: Home
      },
      {
        path: '/imageHub', component: ImageHub
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router
