import { addResizeListener, removeResizeListener } from "element-ui/src/utils/resize-event";

// import ResizeObserver from 'resize-observer-polyfill';
/** Resize Observer是一个新的JavaScript API，它与其他观察者API（如Intersection Observer API）非常相似。
 * 它允许元素在大小变化时得到通知。元素大小更改的最常见原因是视口大小调整或设备的方向在纵向和横向之间变化时。
 * 到目前为止，我们不得不依赖全局window.resize事件来侦听调整大小事件并检查某些元素是否已更改大小。
 * 由于大量触发事件，这很容易导致性能问题。
 * 换句话说，使用window.resize通常是浪费的，因为它告诉我们每个视口大小的变化，而不仅仅是元素的大小实际变化。
 * Resize Observer API的另一个用例是窗口的resize事件无法帮助我们：当动态地从DOM添加或删除元素时，会影响父元素的大小。现代单页应用程序越来越频繁。
 */

/**
 * <el-table height="100px" v-adaptive-table="{bottomOffset: 30}">...</el-table>
 * el-table height is must be set
 *  bottomOffset: 115(default)   // The height of the table from the bottom of the page.
 */

const doResize = (el, binding, vnode) => {
  const { componentInstance: $table } = vnode;
  const { device } = $table.$store.getters;
  const { value } = binding;

  if (!$table.height) {
    throw new Error(`el-$table must set the height. Such as height='100px'`);
  }
  const bottomOffset = (value && value.bottomOffset) || 115;

  if (!$table) return;

  const height =
    device === "mobile"
      ? "675"
      : window.innerHeight - el.getBoundingClientRect().top - bottomOffset;
  $table.layout.setHeight(height);
  $table.doLayout(); // 开放 Table 的 `doLayout` 方法，用于重新计算 Table 的布局
};

export default {
  bind(el, binding, vnode) {
    el.resizeListener = () => {
      doResize(el, binding, vnode);
    };
    addResizeListener(el, el.resizeListener);
  },
  inserted(el, binding, vnode) {
    doResize(el, binding, vnode);
  },
  unbind(el) {
    removeResizeListener(el, el.resizeListener);
  }
};
