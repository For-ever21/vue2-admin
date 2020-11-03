<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot></slot>
  </a>
  <router-link v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { isExternal } from "@/utils/validateUtil";

@Component({
  name: "AppLink"
})
export default class extends Vue {
  @Prop({ required: true }) private to!: string;

  private isExternal = isExternal;
}
</script>
