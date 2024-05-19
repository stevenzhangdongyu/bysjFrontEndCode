import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout/index.vue'
import Search from '@/views/search/index.vue'
import Myorder from '@/views/myorder/index.vue'
import Pay from '@/views/pay/index.vue'
import Prodetail from '@/views/prodetail/index.vue'
import List from '@/views/search/list.vue'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login', component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home', component: Home
      },
      {
        path: '/category', component: Category
      },
      {
        path: '/cart', component: Cart
      },
      {
        path: '/user', component: User
      }
    ]
  },
  {
    path: '/search', component: Search
  },
  {
    path: '/myorder', component: Myorder
  },
  {
    path: '/pay', component: Pay
  },
  {
    path: '/prodetail/:id', component: Prodetail
  },
  {
    path: '/searchlist', component: List
  }
]

const router = new VueRouter({
  routes
})
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
