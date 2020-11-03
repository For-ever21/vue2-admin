<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  ></div>
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { isExternal } from "@/utils/validateUtil";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "SvgIcon"
})
export default class extends Vue {
  @Prop({ required: true }) private iconClass!: string;
  @Prop({ default: "" }) private className!: string;

  get iconName() {
    return `#icon-${this.iconClass}`;
  }

  get svgClass() {
    if (this.className) {
      return "svg-icon " + this.className;
    } else {
      return "svg-icon";
    }
  }

  get styleExternalIcon() {
    return {
      mask: `url(${this.iconClass}) no-repeat 50% 50%`,
      "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`
    };
  }

  get isExternal() {
    return isExternal(this.iconClass);
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
