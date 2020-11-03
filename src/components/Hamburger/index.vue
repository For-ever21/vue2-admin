<template>
  <div style="padding: 0 15px" @click="toggleClick">
    <svg-icon :class="[{ 'is-active': isActive }]" class-name="hamburger" icon-class="hamburger" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Hamburger"
})
export default class extends Vue {
  @Prop({ default: false }) private isActive!: boolean;

  private toggleClick() {
    this.$emit("toggle-click");
  }
}
</script>

<style scoped>
.hamburger.svg-icon {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
