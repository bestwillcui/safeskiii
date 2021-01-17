import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import Login from '../views/Login.vue'
import Feed from '../views/Feed.vue'
import Links from '../views/Links.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
    // route level code-splitting
    // this generates a separate chunk (about. [hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/links',
    name: 'Links',
    component: Links
  }
]

const router = new VueRouter({
  routes
})

export default router
