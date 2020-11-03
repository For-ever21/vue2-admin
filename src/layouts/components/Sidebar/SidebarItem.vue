<script>
import path from "path";
import { isExternal } from "@/utils/validateUtil";
import AppLink from "./Link.vue";
import Item from "./Item.vue";
export default {
  name: "SidebarItem",
  functional: true,
  components: {
    AppLink,
    Item
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    let onlyOneChild = null;

    const { item, isNest, basePath } = context.props;

    const hasNestChild =
      hasOneShowingChild(item.children, item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !item.alwaysShow;
    // const vnodes = []
    if (item.hidden) return [];
    if (hasNestChild) {
      return (
        <el-menu-item
          v-if={onlyOneChild.meta}
          index={resolvePath(onlyOneChild.path)}
          class={{ "submenu-title-noDropdown": !isNest }}
        >
          <Item
            icon={(onlyOneChild.meta && onlyOneChild.meta.icon) || (item.meta && item.meta.icon)}
            title={onlyOneChild.meta && onlyOneChild.meta.title}
          />
        </el-menu-item>
      );
    } else {
      return (
        <el-submenu v-else ref="subMenu" index={resolvePath(item.path)} popper-append-to-body>
          <template slot="title">
            <Item v-if={item.meta} icon={item.meta && item.meta.icon} title={item.meta.title} />
          </template>
          {item.children.map((child) => {
            return (
              <sidebar-item
                key={child.path}
                is-nest={true}
                item={child}
                base-path={resolvePath(child.path)}
                class="nest-menu"
              />
            );
          })}
        </el-submenu>
      );
    }

    function hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild = item;
          return true;
        }
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    }
    function resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(basePath)) {
        return basePath;
      }
      return path.resolve(basePath, routePath);
    }
  }
};
</script>
