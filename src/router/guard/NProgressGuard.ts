import VueRouter from "vue-router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

export function createProgressGuard(router: VueRouter): void {
  NProgress.inc(0.1);
  NProgress.configure({ easing: "ease", speed: 200, showSpinner: false });

  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    next();
    return true;
  });
  router.afterEach(async () => {
    NProgress.done();
    return true;
  });
}
