declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

// declare module "vue/types/vue" {
//   interface Vue {
//     $router: VueRouter;
//     $route: Route;
//     $https: any;
//     $urls: any;
//     $message: ElMessage;
//     $modal: any;
//     $validator: Validator;
//   }
// }

// declare module "vue-router/types/router" {
//   interface VueRouter {
//     history: {
//       router: VueRouter;
//       base: string;
//       current: Route;
//       pending?: Route;
//     };
//   }
// }
