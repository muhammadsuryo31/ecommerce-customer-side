import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import CartList from '../views/CartList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/cartlist',
    name: 'CartList',
    component: CartList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) {
    if (to.name === 'CartList') {
      return next('/login')
    }
  } else if (accessToken) {
    if (to.name === 'Login' || to.name === 'Register') {
      return next('/')
    }
  }
  next()
})

export default router
