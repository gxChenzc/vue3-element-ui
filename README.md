### 关于测试环境发布

项目根目录有 4 个.env 文件要根据实际修改：

- .env（公共环境变量，公用变量，开发生产和测试环境都一样的变量写在这里）
- .env.development(开发环境变量，用于开发人员开发项目时使用)
- .env.production(生产环境变量，用于发布正式环境时使用)
- .env.sit（测试环境变量，用于发布测试环境时使用）

### 启动、编译及一键发布脚本

在`package.json`文件的`script`有以下几个脚本：

```json
"scripts": {
    "serve": "vue-cli-service serve", // 开发启动脚本
    "build": "vue-cli-service build", // 生产环境编译脚本
    // 这里的--mode sit表示编译时执行的环境变量文件为.env.sit
    "build-dev": "vue-cli-service build --mode sit", // 测试环境编译脚本
    "lint": "vue-cli-service lint", // 检查代码脚本
    "deploy": "yarn build-dev && node ./app.js" // 一键发布到测试环境脚本
  },
```
