<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="false"
        active-text-color="#409EFF"
        :collapse-transition="false"
        mode="vertical"
        router
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { appStore } from "@/store/modules/app";
import { settingStore } from "@/store/modules/settings";

import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";

import variables from "@/assets/styles/variable.less";

@Component({
  name: "Sidebar",
  components: {
    Logo,
    SidebarItem
  }
})
export default class extends Vue {
  get sidebar() {
    return appStore.sidebar;
  }
  get routes() {
    // TODO 后续增加权限路由
    return this.$router.options.routes;
  }
  get activeMenu() {
    const route = this.$route;
    const { meta, path } = route;
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  }

  get showLogo() {
    return settingStore.sidebarLogo;
  }

  get isCollapse() {
    return !this.sidebar.opened;
  }

  get variables() {
    return variables;
  }
}
</script>
