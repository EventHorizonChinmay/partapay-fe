import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/home', name: 'Home', component: () => import('@/views/HomeView.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue') },
  { path: '/register', name: 'Register', component: () => import('@/views/RegisterView.vue') },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      // { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/DashboardView.vue') },
      // { path: 'groups', name: 'Groups', component: () => import('@/views/GroupsView.vue') },
      {path: 'login', name: 'Login', component: () => import('@/views/LoginView.vue')},
      {path: 'register', name: 'Register', component: () => import('@/views/RegisterView.vue')},  
      {path: 'profile', name: 'Profile', component: () => import('@/views/ProfileView.vue')},
      // { path: 'groups/:id', name: 'GroupDetail', component: () => import('@/views/GroupDetailView.vue') },
      // { path: 'add-expense', name: 'AddExpense', component: () => import('@/views/AddExpenseView.vue') },
      // { path: 'settle-up', name: 'SettleUp', component: () => import('@/views/SettleUpView.vue') },
      // { path: 'profile', name: 'Profile', component: () => import('@/views/ProfileView.vue') },
      // { path: 'analytics', name: 'Analytics', component: () => import('@/views/AnalyticsView.vue') },
      // { path: 'notifications', name: 'Notifications', component: () => import('@/views/NotificationsView.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
