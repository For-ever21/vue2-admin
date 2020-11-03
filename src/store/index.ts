import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // !这里只引入静态模块, 动态模块不要引入,动态模块直接import相应模块即可
});

// import Vuex, { ModuleTree } from "vuex";

// /**加载同级目录下的module里的所有脚本 */
// const modulesFiles = require.context("./modules", true, /\.ts$/);
// let modules: ModuleTree<any> = {};
// modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName: string = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
//   const value = modulesFiles(modulePath);
//   modules[moduleName] = value.default;
//   return modules;
// }, modules);

// /** 实现自动加载@modules 下的模块里的router文件夹里的文件 ：要求模块名不能与/store/modules下的文件名重复*/
// const serviceModulesFiles = require.context(
//   "../modules",
//   true,
//   /\.\/[a-zA-Z0-9_-]+\/store\/.+\.ts$/
// );
// modules = serviceModulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName: string = modulePath.replace(/\.\/([a-zA-Z0-9_-]+)\/store\/(.+)\.ts$/, "$1-$2");
//   const value = serviceModulesFiles(modulePath);
//   modules[moduleName] = value.default;
//   return modules;
// }, modules);
// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: modules,
// });
