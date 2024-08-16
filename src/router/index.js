import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '메인',
    component: () => import('../views/FileDashboardView.vue')
  },
  {
    path: '/login',
    name: '로그인',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: '회원가입',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/register/saas',
    name: '등록 - SaaS',
    component: () => import('../views/RegisterSaasView.vue')
  },
  {
    path: '/saas/googledrive',
    name: 'SaaS - Google Drive',
    component: () => import('../views/SaasGoogleDriveView.vue')
  },
  {
    path: '/saas/slack',
    name: 'SaaS - Slack',
    component: () => import('../views/SaasSlackView.vue')
  },
  {
    path: '/file/history',
    name: '파일 - 파일 히스토리',
    component: () => import('../views/FileHistoryView.vue')
  },
  {
    path: '/file/scan',
    name: '파일 - 파일 검사',
    component: () => import('../views/FileScanView.vue')
  },
  {
    path: '/test',
    name: 'Test - Test',
    component: () => import('../views/testView.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
