import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
Vue.use(VueRouter)
// 路由懒加载: 优化首屏的加载速度
const routes = [
  {
    path: '/login',
    // component: Login
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
