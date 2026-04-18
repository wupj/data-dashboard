import { createMemoryHistory, createRouter } from 'vue-router';
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
    ],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.afterEach((to: any) => {
  const {
    meta: { title },
  } = to;
  useTitle(i18n.global.t(title));
});

export default router;
