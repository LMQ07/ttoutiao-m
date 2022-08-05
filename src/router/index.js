import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
Vue.use(VueRouter)
// 路由懒加载: 优化首屏的加载速度
const routes = [
  {
    path: '/login',
    // component: Login
    component: () => import('@/views/login')
  },
  {
    // 二级路由当中如果没有/ 那么就是会和一级路由进行拼接 假设一级路由 /my 二级路由 home 那么就是/my/home
    // 二级路由当中如果有/ 那么就是不会和一级路由进行拼接
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/home'),
        children: [
          {
            path: '/detail ',
            component: () => import('@/components/articleText')
          }
        ]
      },
      {
        path: '/video',
        component: () => import('@/views/video')
      },
      {
        path: '/qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/user')
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  }
]
const router = new VueRouter({
  routes
})

export default router
