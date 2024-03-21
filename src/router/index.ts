import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import {
  ROUTE_NAME_INDEX,
  ROUTE_NAME_LOGIN,
  ROUTE_NAME_REGISTER,
  ROUTE_NAME_ERROR
} from '@/constants/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAME_INDEX,
      component: IndexView,
      meta: {
        authorizationRequired: true,
        title: 'Index',
      }
    },
    {
      path: '/login',
      name: ROUTE_NAME_LOGIN,
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Login',
      }
    },
    {
      path: '/register',
      name: ROUTE_NAME_REGISTER,
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: 'Register',
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: ROUTE_NAME_ERROR,
      component: () => import('../views/ErrorView.vue'),
      meta: {
        title: 'Error',
      },
    },
  ]
})

export default router
