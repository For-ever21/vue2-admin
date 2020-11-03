<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const vnodes = [];
    const { title, icon } = context.props;
    if (icon) {
      if (icon.includes("el-icon")) {
        vnodes.push(<i class={[icon, "sub-el-icon"]}></i>);
      } else {
        vnodes.push(<svg-icon icon-class={icon} />);
      }
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }

    return vnodes;
  }
};
</script>

<style scoped>
.sub-el-icon {
  width: 1em;
  height: 1em;
}
</style>
