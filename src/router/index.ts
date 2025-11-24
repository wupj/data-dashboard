import { createMemoryHistory, createRouter } from "vue-router";

import Layout from "@/layout/index.vue";

const routes = [
  {
    path: "/",
    redirect: "/sales",
    component: Layout,
    children: [
      {
        path: "/sales",
        component: () => import("@/pages/sales/index.vue"),
        meta: {
          title: '销售数据平台'
        }
      },
    ],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
