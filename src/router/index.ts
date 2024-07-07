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
          meta: {
            title: "堇羽的编程博客",
          },
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

// 跳转前打印路由信息
// router.beforeEach((to, from, next) => {
//   console.log("to:", to);
//   console.log("from:", from);
//   console.log(router);
//   console.log("router:", routes);
//   next();
// });
const setDescription = (content: string) => {
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
  meta.setAttribute('content', content);
};
// 跳转后修改标题
router.afterEach((to) => {
  document.title = to.meta.title as string ?? "堇羽的编程博客";
  setDescription(to.meta.description as string ?? "堇羽的编程博客");
});
export default router;
