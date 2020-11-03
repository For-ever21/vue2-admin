import Vue from "vue";
import { DirectiveBinding } from "vue/types/options";

export default {
  inserted(el: HTMLElement, binding: DirectiveBinding): void {
    const { value } = binding;
    if (!Vue.prototype.$hasPermission(value)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
};
