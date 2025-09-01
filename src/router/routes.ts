import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/home/HomeLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        children: [
          {
            path: "",
            name: "home-page",
            component: () => import("pages/HomePage.vue"),
            meta: { requiresAuth: false },
          }
        ]
      }
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;