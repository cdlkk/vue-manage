import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    // redirect :'/home'
    children: [
      // { path: '/home', name: 'home', meta: { title: '首页' }, component: () => import('@/views/Home/index.vue') },
      // { path: '/users', name: 'users', meta: { title: '用户管理' }, component: () => import('@/views/Users/Users.vue') },
      // { path: '/mall', name: 'mall', meta: { title: '商品管理' }, component: () => import('@/views/mall/index.vue') },
      // { path: '/page1', name: 'page1', meta: { title: '页面1' }, component: () => import('@/views/other/pageOne.vue') },
      // { path: '/page2', name: 'page2', meta: { title: '页面2' }, component: () => import('@/views/other/pageTwo.vue') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
export default router
