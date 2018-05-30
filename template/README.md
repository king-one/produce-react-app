## start-react-app 脚手架

####目录结构说明
```
+---bin                     辅助脚本
+---code-style              代码规范说明
+---dist                    打包资源生成目录
\---src
    +---images
    +---mock                模拟数据
    +---pages               各个页面（单页应用只有一个子目录）
    |   +---home            各个页面功能的js 路由配置 入口html
    |
    +---public              业务逻辑中可复用的部分
    |   +---components      公共组件Header Footer等
    |   \---lib             不在npm中的第三方库
    \---stylesheets
     variables.less         less变量 颜色、大小、辅助类等等
|   .editorconfig
|   .eslintrc               eslint 代码规范配置
|   .gitignore
|   config.js
|   entries.js              应用的入口文件
|   favicon.ico
|   htmlpage.config.js      html 打包配置
|   package-lock.json
|   package.json
|   README.md
|   server.js               开发阶段node服务环境，并处理 webpack 编译服务
|   webpack.base.config.js  编译、打包配置,下同
|   webpack.dev.config.js
|   webpack.pro.config.js
|
```
####工作流程说明
#####安装Editconfig 插件
给IDE或者编辑器安装 Editconfig 插件 统一代码缩进风格 官方文档可以在这个网站查看 http://editorconfig.org/
#####安装 Node.js 6.x+
安装后会集成 npm 包管理工具，为了加快安装速度，设置国内镜像
```
$ npm config set registry https://registry.npm.taobao.org
```
#####依赖安装
```
$ npm install
```
#####启动开发环境
```
$ npm start
```
默认端口888 也可增加参数指定端口：
```
$ npm start 3100
```
#####阅读前端代码规范
详见code-style文件
#####代码规范检查
```
$ npm run lint
```
#####构建线上环境代码

```
$ npm run lint
$ npm run build
```
***请勿跳过代码规范检查*** 规范前端代码很重要
完成后,只需将dist目录 交付后端
#####修改服务器配置
脚手架采用 browser history 控制 URL，服务器也需要做相应的配置。
####其它
#####登录状态控制
是否登录由服务器返回 {"code": 401} 前端跳转到login
##### AJAX 全局配置
请求工具为对axios 二次封装的 fetch.js 请求url可以在 config.js 下进行全局配置

