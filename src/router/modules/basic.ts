import { CustomRoute } from "@router/types";
const routes: Array<CustomRoute> = [
  {
    path: "/404",
    name: "404",
    component: (): any => import("@/modules/error-pages/404.vue"),
    hidden: true
  },
  { path: "**", redirect: "/404" }
];
export default routes;
