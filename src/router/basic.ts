import { CustomRoute } from "@router/types";
import Layout from "@/layouts/index.vue";

const mockRoutes: Array<CustomRoute> = [
  {
    path: "/account",
    name: "account",
    redirect: "noRedirect",
    component: Layout,
    meta: { title: "账号管理", icon: "el-icon-user-solid" },
    children: [
      {
        path: "userManage",
        component: () => import("@/modules/account/userManage.vue"),
        name: "userManage",
        meta: { title: "用户管理" }
      },
      {
        path: "roleManage",
        component: () => import("@/modules/account/roleManage.vue"),
        name: "roleManage",
        meta: { title: "角色管理" }
      }
    ]
  },
  {
    path: "/cmsArticle",
    name: "cmsArticle",
    component: Layout,
    meta: { title: "CMS文章管理", icon: "el-icon-document" },
    children: [
      {
        path: "collect",
        component: () => import("@/modules/cmsArticle/collect.vue"),
        name: "collect",
        meta: { title: "采集内容" }
      },
      {
        path: "articleManage",
        component: () => import("@/modules/cmsArticle/articleManage.vue"),
        name: "articleManage",
        meta: { title: "文章管理" }
      }
    ]
  }
];

const basicRoutes: Array<CustomRoute> = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/modules/dashboard/welcome.vue"),
        name: "Dashboard",
        meta: { title: "首页", icon: "el-icon-menu" }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: (): any => import("@/modules/system/login/login.vue"),
    hidden: true,
    meta: { title: "登录" }
  },
  {
    path: "/404",
    name: "404",
    component: (): any => import("@/modules/system/error-pages/404.vue"),
    hidden: true
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/modules/system/redirect/index.vue")
      }
    ]
  },
  ...mockRoutes,
  // ! 404 配置 必须放置最后
  { path: "**", redirect: "/404", hidden: true }
];

// 基础路由 不用权限
export default basicRoutes;
