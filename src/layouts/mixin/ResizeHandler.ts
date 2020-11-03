import { Vue, Watch } from "vue-property-decorator";
import { appStore, deviceType } from "@/store/modules/app";

const WIDTH = 992; // refer to Bootstrap's responsive design

export default class extends Vue {
  get device() {
    return appStore.device;
  }

  get sidebar() {
    return appStore.sidebar;
  }

  @Watch("$route")
  private onRouteChange() {
    if (this.device === deviceType.Mobile && this.sidebar.opened) {
      appStore.closeSideBarAction(false);
    }
  }

  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  }

  mounted() {
    const isMobile = this.isMobile();
    if (isMobile) {
      appStore.toggleDeviceAction(deviceType.Mobile);
      appStore.closeSideBarAction(true);
    }
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile();
      appStore.toggleDeviceAction(isMobile ? deviceType.Mobile : deviceType.Desktop);
      if (isMobile) {
        appStore.closeSideBarAction(true);
      }
    }
  }
}
