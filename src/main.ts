import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import "@/setup"; // 初始化操作

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
