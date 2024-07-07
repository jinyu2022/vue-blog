import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../components/layout/index.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/Home.vue"),
        },
        {
          path: "/blog",
          name: "blog",
          component: () => import("../views/Blog.vue"),
          children: [...(routes[0].children ?? [])],
        },
      ],
    },
  ],
});

// 跳转前打印路由信息
router.beforeEach((to, from, next) => {
  console.log("to:", to);
  console.log("from:", from);
  console.log(router);
  console.log("router:", routes);
  next();
});

export default router;
