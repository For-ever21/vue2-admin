module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        // angular 提交风格
        "feat", // 新特性
        "fix", // 修复问题
        "docs", // 文档修改
        "perf", // 提升性能的修改
        "style", // 代码格式修改, 注意不是 css 修改
        "refactor", // 代码重构
        "test", // 测试用例修改
        "chore", // 其他修改, 比如构建流程, 依赖管理.
        "revert", // 代码回滚
        "types", // 类型定义文件更改
        // github 风格方式提交
        ":star:", // 增加新功能比如新增某个模块
        ":art:", // 界面样式相关更新
        ":fire:", // API 重大更新提示，比如修改字段等
        ":shirt:", // 包括文件代码结构以及代码风格的重构
        ":rocket:", // 重大改进，提升性能如修改某个方法或算法
        ":bug:", // 修复 bug
        ":ambulance:", // 修复线上 bug
        ":wrench:", // 修改配置文件
        ":memo:", // 添加文档说明
        ":white_check_mark:",
        ":lock:", // 提高代码的安全性
        ":tada:", // 发布 release 版本
        ":package:", // 发布 build
        ":heavy_plus_sign:", // 添加依赖
        ":heavy_minus_sign:", // 删除依赖
        ":arrow_up:", // 升级依赖
        ":arrow_down:" // 降级依赖
      ]
    ],
    "type-empty": [2, "never"], // 提交不符合规范时,不可以提交
    "subject-empty": [2, "never"], // 提交不符合规范时,不可以提交
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"]
  }
};
