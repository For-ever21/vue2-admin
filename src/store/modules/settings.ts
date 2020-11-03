import { VuexModule, Module, Mutation, Action, getModule } from "vuex-module-decorators";
import store from "@/store";
import defaultSettings from "@/settings";
// import variables from "@/styles/element-variables.less"

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

export interface SettingsState {
  theme: string;
  fixedHeader: boolean;
  showSettings: boolean;
  tagsView: boolean;
  sidebarLogo: boolean;
}

const NAME = "settings";

@Module({ dynamic: true, store, name: NAME })
class Settings extends VuexModule implements SettingsState {
  public theme = "#409EFF";
  public fixedHeader = fixedHeader;
  public showSettings = showSettings;
  public tagsView = tagsView;
  public sidebarLogo = sidebarLogo;

  @Mutation
  private commitChangeSetting(payload: { key: string; value: any }): void {
    const { key, value } = payload;
    if (key) {
      (this as any)[key] = value;
    }
  }

  @Action
  public changeSettingAction(payload: { key: string; value: any }): void {
    this.commitChangeSetting(payload);
  }
}

export const settingStore = getModule(Settings);
