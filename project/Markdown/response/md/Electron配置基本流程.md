## electron基本运行环境&打包流程

#### 终端运行命令，配置 `package.json`

```bash
npm init
```

##### 安装 `electron`  模块

```bash
npm i electron --save-dev
```

##### 安装 `electron-builder` 模块

```bash
npm i electron-builder -g
```

##### 更改 `package.json`

```json
"main": "main.js",
"scripts": {
    "start": "electron .",
    "build": "electron-builder"
  }
```

###### 终端输入 `npm start`  or `electron .` 运行程序

> 如果成功运行

终端输入 `npm run build` 打包应用程序，默认位置在 `./dist/`

------

也可在 `package.json` 中添加打包配置 ref: [electron-builder打包不成功解决方法_electron-builder打包失败_weixin_41779718的博客-CSDN博客](https://blog.csdn.net/weixin_41779718/article/details/106562736)

```json
"build": {
    "appId": "com.example.app", // 应用程序id 
    "productName": "测试", // 应用名称 
    // 设置为 true 可以把自己的代码合并并加密
    "asar": true,
    "directories": {
        "buildResources": "build", // 构建资源路径默认为build
        "output": "dist" // 输出目录 默认为dist
    },
    "mac": {
        "category": "public.app-category.developer-tools", // 应用程序类别
        "target": ["dmg", "zip"], // 目标包类型 
        "icon": "build/icon.icns" // 图标的路径
    },
    "dmg": {
        "background": "build/background.tiff or build/background.png", // 背景图像的路径
        "title": "标题",
        "icon": "build/icon.icns" // 图标路径
    },
    "win": {
        // 打包成一个独立的 exe 安装程序
        // 'target': 'nsis',
        // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
        // 'arch': [
        //   'x64',
        //   'ia32'
        // ]
        "target": ["nsis", "zip", "7z"] // 目标包类型 
    },
    "nsis": {
        // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
        "oneClick": false,
        // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
        "allowElevation": true,
        // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
        "allowToChangeInstallationDirectory": true,
        // 安装图标
        "installerIcon": "build/installerIcon_120.ico",
        // 卸载图标
        "uninstallerIcon": "build/uninstallerIcon_120.ico",
        // 安装时头部图标
        "installerHeaderIcon": "build/installerHeaderIcon_120.ico",
        // 创建桌面图标
        "createDesktopShortcut": true,
        // 创建开始菜单图标
        "createStartMenuShortcut": true,
        // electron中LICENSE.txt所需要的格式，并非是GBK，或者UTF-8，LICENSE.txt写好之后，需要进行转化，转化为ANSI
        "license": "LICENSE.txt"
    }
}
```

*如果下载依赖过慢，可以提前从* [Releases · electron/electron (github.com)](https://github.com/electron/electron/releases)

*下好与当前 electron版本对应的 `electron-v[version]-win32-x64.zip`* 

*放置于 `C:\Users\userName\AppData\Local\electron\Cache`*