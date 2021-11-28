import {createRouter, createWebHashHistory} from 'vue-router'
import Login from '../view/Login.vue'
import Home from '../view/Home.vue'
import Welcome from '../view/Welcome.vue'
import User from '../view/user/index.vue'
import Role from '../view/role/index.vue'
import Menu from '../view/role/index.vue'

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/user',
        component: User
      },
      {
        path: '/role',
        component: Role
      },
      {
        path: '/menu',
        component: Menu
      }
    ]
  }
]
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行， next('/login') 强制跳转到 login
  if (to.path === '/login') {
    return next()
  }
  // 获取token
  const tokenStr = localStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router