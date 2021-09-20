import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
    children: [
      {
        path: "/users",
        component: () => import("../views/User.vue"),
        name: "users",
      },
      {
        path: "/roles",
        component: () => import("../views/Roles.vue"),
        name: "roles",
      },
      {
        path: "/rights",
        component: () => import("../views/Rights.vue"),
        name: "rights",
      },
      {
        path: "/goods",
        component: () => import("../views/Goods.vue"),
        name: "goods",
      },
      {
        path: "/addgoods",
        component: () => import("../views/addgoods/AddGoods.vue"),
        name: "addgoods",
        redirect: "addgoods/info",
        children: [
          {
            path: "/addgoods/info",
            component: () => import("../views/addgoods/GoodsInfo.vue"),
            name: "info",
          },
          {
            path: "/addgoods/params",
            component: () => import("../views/addgoods/GoodsParams.vue"),
            name: "addparams",
          },
          {
            path: "/addgoods/attr",
            component: () => import("../views/addgoods/GoodsAttr.vue"),
            name: "attr",
          },
          {
            path: "/addgoods/img",
            component: () => import("../views/addgoods/GoodsImg.vue"),
            name: "img",
          },
          {
            path: "/addgoods/content",
            component: () => import("../views/addgoods/Goodscontent.vue"),
            name: "content",
          },
        ],
      },
      {
        path: "/params",
        component: () => import("../views/Params.vue"),
        name: "params",
      },
      {
        path: "/categories",
        component: () => import("../views/Categories.vue"),
        name: "categories",
      },
      {
        path: "/orders",
        component: () => import("../views/Orders.vue"),
        name: "orders",
      },
      {
        path: "/reports",
        component: () => import("../views/Reports.vue"),
        name: "reports",
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// 路由导航守卫 就是路由跳转是默认被触发的函数
// 作用是检验登录
// 当用户登陆之后，会在浏览器中存储 sessionStorage ,只有在用户登陆之后才可以访问其他页面否则不可以访问
// 那么当用户直接进入非登录页的时候都需要判断用户是否登录，就可以使用路由导航守卫了

// beforeEach 就是守卫中的一个全局前置守卫，路由跳转之前触发

// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

router.beforeEach((to, from, next) => {
  // 在路由跳转之前获取 token ，token 不存在跳转回 login 页面
  if (to.path === "/login") return next();
  const token = window.sessionStorage.getItem("token");
  // console.log('xxx')
  if (!token) return next("/login");
  next();
});
export default router;
