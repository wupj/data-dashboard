import { createWebHistory, createRouter } from 'vue-router';
import { useTitle } from '@vueuse/core';
import i18n from '@/plugins/i18n';

import Layout from '@/layout/index.vue';

const routes = [
  {
    path: '/',
    redirect: '/sales',
    component: Layout,
    children: [
      {
        path: '/sales',
        component: () => import('@/pages/sales/index.vue'),
        meta: {
          title: 'sales.title',
        },
      },
      {
        path: '/logistics',
        component: () => import('@/pages/logistics/index.vue'),
        meta: {
          title: 'logistics.title',
        },
      },
      {
        path: '/404',
        meta: {},
        component: () => import('@/pages/not-found/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to: any) => {
  const {
    meta: { title },
  } = to;
  useTitle(i18n.global.t(title));
});

export default router;
