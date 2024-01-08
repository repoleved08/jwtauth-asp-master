import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegisterUser from '@/views/RegisterUser.vue'
import LoginUser from '@/views/LoginUser.vue'
import Admin from '@/views/Admin.vue'
import AdminForm from '@/views/AdminForm.vue'
import UsersList from '@/views/UsersList.vue'
import Cart from '@/views/Cart.vue'
import Bots from '@/views/Bots.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUser
  },
  {
    path: '/Admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/Create',
    name: 'adminform',
    component: AdminForm
  },
  {
    path: '/Admin/Users',
    name: 'users',
    component: UsersList
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/bots',
    name: 'bots',
    component: Bots
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
