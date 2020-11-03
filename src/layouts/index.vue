<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="showTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// import { mixins } from 'vue-class-component';
import { deviceType, appStore } from "@/store/modules/app";
import { settingStore } from "@/store/modules/settings";
import { AppMain, Navbar, Sidebar, TagsView, Settings } from "./components";
import RightPanel from "@/components/RightPanel/index.vue";
// import ResizeMixin from './mixin/resize';

@Component({
  name: "Layout",
  components: {
    Sidebar,
    AppMain,
    Navbar,
    TagsView,
    Settings,
    RightPanel
  }
})
export default class extends Vue {
  get sidebar() {
    return appStore.sidebar;
  }
  get device() {
    return appStore.device;
  }
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === deviceType.Mobile
    };
  }

  get showSettings() {
    return settingStore.showSettings;
  }

  get showTagsView() {
    return settingStore.tagsView;
  }

  get fixedHeader() {
    return settingStore.fixedHeader;
  }

  private handleClickOutside() {
    appStore.closeSideBarAction(false);
  }
}
</script>

<style lang="less" scoped>
@import (reference) "~@/assets/styles/variable.less";
.app-wrapper {
  // @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - @sideBarWidth);
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
.mobile .fixed-header {
  width: 100%;
}
</style>
