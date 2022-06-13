import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    meta: {
      title: "Список задач",
      layout: "main-layout",
    },
    component: () => import("@/pages/HomePage.vue"),
  },
  {
    path: "/registration",
    name: "registration",
    meta: {
      title: "Регистрация",
      layout: "main-layout",
    },
    component: () => import("@/pages/RegistrationPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Авторизация",
      layout: "auth-layout",
    },
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/bugs",
    name: "bugs",
    meta: {
      title: "Баги",
      layout: "main-layout",
    },
    component: () => import("@/pages/BugsPage.vue"),
  },
  {
    path: "/playtests",
    name: "playtests",
    meta: {
      title: "Плейтесты",
      layout: "main-layout",
    },
    component: () => import("@/pages/PlaytestPage.vue"),
  },
  {
    path: "/games",
    name: "games",
    meta: {
      title: "Игры",
      layout: "main-layout",
    },
    component: () => import("@/pages/GamePage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//Защита роутов
// router.beforeEach((to, from, next) => {
//   const {accessToken} = localStorage;
//   const {workerPosition} = localStorage;
//   if (accessToken || to.name === "login") {
//     if(workerPosition !== 'Admin' && to.name ==='registration') {
//       next('/');
//     }
//     if(workerPosition === 'Worker' && (to.name === 'ClientsPage' || to.name === 'RaportPage')) {
//       next('/');
//     }
//     next()
//   } else {
//     next("/login")
//   }
// });

export default router;
