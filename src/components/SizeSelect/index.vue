<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item of sizeOptions"
        :key="item.value"
        :disabled="size === item.value"
        :command="item.value"
        >{{ item.label }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { appStore } from "@/store/modules/app";
import { tagsViewStore } from "@/store/modules/tagsView";

@Component({
  name: "SizeSelect"
})
export default class extends Vue {
  private sizeOptions = [
    { label: "默认尺寸", value: "default" },
    { label: "偏大尺寸", value: "medium" },
    { label: "正常尺寸", value: "small" },
    { label: "偏小尺寸", value: "mini" }
  ];

  get size() {
    return appStore.size;
  }

  private handleSetSize(size: string) {
    (this as any).$ELEMENT.size = size;
    appStore.setSizeAction(size);
    this.refreshView();
    this.$message.success("Switch Size Success");
  }

  private refreshView() {
    // In order to make the cached page re-rendered
    tagsViewStore.delAllCachedViewsAction();
    const { fullPath } = this.$route;
    this.$nextTick(() => {
      this.$router.replace({
        path: "/redirect" + fullPath
      });
    });
  }
}
</script>
