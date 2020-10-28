import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/Signin.vue'),
    meta:{
      requiresGuest:true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
    meta:{
      requiresGuest:true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass:'active',
})


router.beforeEach((to,from,next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next('/signin')
    }else{
      next()
    }
  }
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      next('/')
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

export default router
