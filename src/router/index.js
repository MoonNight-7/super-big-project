import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { Message } from 'element-ui';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/rentCat',
    component: HomeView,
    meta: { title: 'iMiao在线猫猫平台' },
    children: [
      {
        path: '/rentCat',
        name: 'rentCat',
        component: () => import('@/views/product/RentView.vue'),
        meta: { title: '租猫猫' },

      },
      {
        path: '/buyCat',
        component: () => import('@/views/product/BuyView.vue'),
        meta: { title: '买猫猫' },
      },
      {
        path: '/postCat',
        component: () => import('@/views/product/PostView.vue'),
        meta: { title: '发布猫猫' }
      },
      {
        path:'/myCat',
        component: () => import('@/views/product/MyCatView.vue'),
        meta:{title:'我的发布'}
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/user_admin/LoginView.vue'),
    meta: { title: 'iMiao登录' },
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import('../views/user_admin/RegView.vue'),
    meta: { title: 'iMiao注册' },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach(to => {
  document.title = to.meta.title
})

router.beforeEach((to, from, next) => {
  let jwt = localStorage.getItem('jwt')
  if (jwt) {
    next()
  } else {
    if (to.path === '/login' || to.path === '/reg') {
      next()
    } else {
      Message.info('请先登录')
      next('/login')
    }
  }
})
export default router
