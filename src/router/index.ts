import Vue from "vue";
import VueRouter from "vue-router";
// import { CustomRoute } from "./types";
import { createGuard } from "./guard/";
import basicRoutes from "./basic";
Vue.use(VueRouter);

// let routes: Array<CustomRoute> = [];
// /** 实现自动加载@modules 下的模块里的router文件夹里的文件 */
// const serviceModulesFiles = require.context(
//   "../modules",
//   true,
//   /\.\/[a-zA-Z0-9_-]+\/router\/.+\.ts$/
// );
// routes = serviceModulesFiles.keys().reduce((routes, modulePath) => {
//   const value = serviceModulesFiles(modulePath);
//   routes = routes.concat(value.default);
//   return routes;
// }, routes);

// /**加载同级目录下的module里的所有脚本 */
// const modulesFiles = require.context("./modules", true, /\.ts$/);
// routes = modulesFiles.keys().reduce((routes, modulePath) => {
//   const value = modulesFiles(modulePath);
//   routes = routes.concat(value.default);
//   return routes;
// }, routes);

const router = new VueRouter({
  mode: "hash",
  routes: basicRoutes,
  base: process.env.BASE_URL,
  scrollBehavior(savedPosition: any): { x: number; y: number } {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
createGuard(router);
export default router;
