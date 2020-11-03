import store from "@/store";

import { VuexModule, getModule, Module, Mutation, Action } from "vuex-module-decorators";

import { getSidebarStatus, getSize, setSidebarStatus, setSize } from "@utils/cookies";

export enum deviceType {
  Mobile = "mobile",
  Desktop = "desktop"
}

export interface IAppState {
  // 系统菜单
  // pageLoadingState: boolean;
  device: deviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  size: string;
}

// let timeId: ReturnType<typeof setTimeout>;
const NAME = "app";

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule implements IAppState {
  /**
   * 侧边栏
   */
  public sidebar = {
    opened: getSidebarStatus() !== "closed",
    withoutAnimation: false
  };

  /**
   * 设备环境
   */
  public device = deviceType.Desktop;

  /**
   * 页面布局 size
   */
  public size = getSize() || "medium";

  get getDevice() {
    return this.device;
  }

  get getSize() {
    return this.size;
  }

  get getSidebar() {
    return this.sidebar;
  }

  @Mutation
  private commitToggleSideBar(withoutAnimation: boolean): void {
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
    if (this.sidebar.opened) {
      setSidebarStatus("opened");
    } else {
      setSidebarStatus("closed");
    }
  }

  @Mutation
  private commitCloseSideBar(withoutAnimation: boolean) {
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
    setSidebarStatus("closed");
  }

  @Mutation
  private commitToggleDevice(device: deviceType) {
    this.device = device;
  }

  @Mutation
  private commitSetSize(size: string) {
    this.size = size;
    setSize(this.size);
  }

  /**
   * @description: 展开收起 侧边栏
   * @param withoutAnimation 是否需要动画 true-需要 false-不需要
   */
  @Action
  public toggleSideBarAction(withoutAnimation: boolean): void {
    this.commitToggleSideBar(withoutAnimation);
  }

  /**
   * @description: 收起 侧边栏
   * @param withoutAnimation 是否需要动画 true-需要 false-不需要
   */
  @Action
  public closeSideBarAction(withoutAnimation: boolean): void {
    this.commitCloseSideBar(withoutAnimation);
  }

  /**
   * @description: 切换 设备类型
   * @device 设备枚举值 mobile-移动端 desktop-PC端
   */
  @Action
  public toggleDeviceAction(device: deviceType) {
    this.commitToggleDevice(device);
  }

  /**
   * @description: 设置界面 字体大小
   * @size 枚举值 default medium small mini
   */
  @Action
  public setSizeAction(size: string) {
    this.commitSetSize(size);
  }
}
export { App };
export const appStore = getModule<App>(App);
