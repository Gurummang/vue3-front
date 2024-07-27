import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '메인',
    component: () => import('../views/MainView.vue')
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
  {
    path: '/saas/jira',
    name: 'SaaS - Jira',
    component: () => import('../views/SaasJiraView.vue')
  },
  {
    path: '/saas/slack',
    name: 'SaaS - Slack',
    component: () => import('../views/SaasSlackView.vue')
  },
  {
    path: '/file/dashboard',
    name: '파일 - 대시보드',
    component: () => import('../views/FileDashboardView.vue')
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
    path: '/users',
    name: '사용자',
    component: () => import('../views/UsersView.vue')
  },
  {
    path: '/dlp',
    name: 'DLP 설정',
    component: () => import('../views/DlpView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/testView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
