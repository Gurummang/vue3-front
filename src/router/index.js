import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '메인',
    component: () => import('../views/RegisterSaasView.vue')
  },
  {
    path: '/register/saas',
    name: '등록 - SaaS',
    component: () => import('../views/RegisterSaasView.vue')
  },
  {
    path: '/register/email',
    name: '등록 - 이메일알림',
    component: () => import('../views/RegisterEmailView.vue')
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
