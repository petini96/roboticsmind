import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    // O :lang? torna o parâmetro de idioma opcional
    path: "/:lang(pt|en|es)?", // Restringe os idiomas aceitos
    component: () => import("layouts/home/HomeLayout.vue"),
    children: [
      {
        path: "", // O caminho vazio herda o /:lang
        name: "home",
        component: () => import("pages/HomePage.vue"),
        meta: { requiresAuth: false },
      },
      // Se tiver outras páginas, adicione-as aqui
      // Ex: { path: "sobre", name: "about", component: ... }
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;