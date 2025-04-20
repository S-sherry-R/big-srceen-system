import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demo',
    name: 'IndexDemo',
    component: () => import('@/views/demo/index/index.vue')
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    redirect: '/situation',
    children: [
      {
        path: '/situation',
        name: 'Situation',
        component: () => import('@/views/situation/index.vue'),
        meta:{
          title: '综合态势',
          statisticsShow: true
        }
      },
      {
        path: '/energy',
        name: 'Energy',
        component: () => import('@/views/energy/index.vue'),
        meta:{
          title: '企业耗能',
          companyShow: true,
          statisticsShow: true
        }
      },
      {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('@/views/statistics/index.vue'),
        meta:{
          title: '统计分析',
          statisticsShow: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
