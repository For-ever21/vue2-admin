<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统布局配置</h3>

      <!-- <div class="drawer-item">
        <span>主题色</span>
        <el-color-picker
          v-model="menuColor"
          popper-class="theme-picker-dropdown"
          @change="themeChange">
        </el-color-picker>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div> -->

      <div class="drawer-item">
        <span>标签页</span>
        <el-switch v-model="showTagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>固定 header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>菜单 Logo</span>
        <el-switch v-model="showSidebarLogo" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { settingStore } from "@/store/modules/settings";
@Component({
  name: "Settings",
  components: {}
})
export default class extends Vue {
  private menuColor = "#409EFF";
  get fixedHeader() {
    return settingStore.fixedHeader;
  }

  set fixedHeader(value) {
    settingStore.changeSettingAction({ key: "fixedHeader", value });
  }

  get showTagsView() {
    return settingStore.tagsView;
  }

  set showTagsView(value) {
    settingStore.changeSettingAction({ key: "tagsView", value });
  }

  get showSidebarLogo() {
    return settingStore.sidebarLogo;
  }

  set showSidebarLogo(value) {
    settingStore.changeSettingAction({ key: "sidebarLogo", value });
  }

  private themeChange(value: string) {
    settingStore.changeSettingAction({ key: "theme", value });
  }
}
</script>

<style lang="less" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  /deep/.el-color-picker {
    float: right;
    height: 26px;
    margin: -3px 8px 0 0;
  }

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>

<style lang="less">
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}
</style>
