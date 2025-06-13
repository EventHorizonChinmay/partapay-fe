import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', name: 'LoginPage', component: () => import('@/views/LoginView.vue') },
  { path: '/register', name: 'RegisterPage', component: () => import('@/views/RegisterView.vue') },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: 'home', name: 'Home', component: () => import('@/views/HomeView.vue') },
      { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/DashboardView.vue') },
      { path: 'groups', name: 'Groups', component: () => import('@/views/GroupsView.vue') },
      { path: 'add-expense', name: 'AddExpense', component: () => import('@/views/AddExpenseView.vue') },
      { path: 'settle-up', name: 'SettleUp', component: () => import('@/views/SettleUpView.vue') },
      { path: 'analytics', name: 'Analytics', component: () => import('@/views/AnalyticsView.vue') },
      { path: 'notifications', name: 'Notifications', component: () => import('@/views/NotificationsView.vue') },
      { path: 'profile', name: 'Profile', component: () => import('@/views/ProfileView.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
