export interface ISettings {
  title: string; // 配置系统title
  showSettings: boolean; // 配置栏 是否展示
  tagsView: boolean; // 系统标签页 是否展示
  sidebarLogo: boolean; // 侧边栏Logo 是否展示
  fixedHeader: boolean; // 顶部导航栏 是否固定
  errorLog: string[]; // 是否开启错误日志打印，最好只支持生产环境
  devServerPort: number; // webpack-dev-server 端口号
  mockServerPort: number; // mock server 端口号
}

// 自定义设置
const settings: ISettings = {
  title: "NCME",
  showSettings: true,
  tagsView: true,
  fixedHeader: true,
  sidebarLogo: true,
  errorLog: ["production"],
  devServerPort: 9527,
  mockServerPort: 9528
};

export default settings;
