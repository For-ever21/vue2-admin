/**
 * 引入svgicon图片
 */
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue"; //svg component

// true-文件夹下的全部  false-只查找子文件夹
const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext: any) => {
  requireContext.keys().map(requireContext);
}
requireAll(req);

// /**自动加载@modules 下的业务模块里的assets/svg文件夹下的.svg文件 */
// req = require.context("../../modules", true, /\.\/[a-zA-Z0-9_-]+\/assets\/svg\/.+\.svg$/);
// requireAll(req);

Vue.component("svg-icon", SvgIcon);
