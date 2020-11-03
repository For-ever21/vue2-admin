import VueRouter from "vue-router";

import { createProgressGuard } from "./NProgressGuard";

export function createGuard(router: VueRouter): void {
  // let axiosCanceler: AxiosCanceler | null;
  // if (removeAllHttpPending) {
  //   axiosCanceler = new AxiosCanceler();
  // }
  router.beforeEach(async (to, from, next) => {
    // const isOpen = getIsOpenTab(to.path);
    // to.meta.inTab = isOpen;
    try {
      // if (closeMessageOnSwitch) {
      //   Modal.destroyAll();
      //   notification.destroy();
      // }
      // TODO Some special interfaces require long connections
      // Switching the route will delete the previous request
      // removeAllHttpPending && axiosCanceler!.removeAllPending();
      next();
    } catch (error) {
      console.warn("basic guard error:" + error);
    }
  });
  createProgressGuard(router);
  // createPermissionGuard(router);
  // createPageTitleGuard(router);
  // createPageLoadingGuard(router);
}
