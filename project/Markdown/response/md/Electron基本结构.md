## Electron基本结构

> 以下内容部分依据官方文档。 ref: [创建您的第一个应用程序 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/tutorial-first-app)

#### <font color="#7db6bf">一、所需文件描述</font>

| 文件        | 名称                   | 描述                                                         |
| ----------- | ---------------------- | ------------------------------------------------------------ |
| main.js     | 主进程入口脚本         | 控制整个应用程序的生命周期和创建渲染进程，有完整的Node环境环境访问权。 |
| index.html  | 常规html索引文档       | 应用程序的用户界面                                           |
| preload.js  | 在渲染进程预加载的脚本 | 将 Electron 的不同类型的进程桥接在一起，无完整Node环境访问权（Electron20+）。 |
| renderer.js | 在渲染进程运行的脚本   | 处理用户界面逻辑和与主进程通信，无Node环境。                 |





#### <font color="#7db6bf">二、Electron对象</font>

| 文件        | 名称                   |
| ----------- | ---------------------- |
|app|控制应用程序的生命周期和事件处理。|
|BrowserWindow|创建和控制应用程序中的窗口。|
|dialog|显示本地系统对话框（如打开文件或保存文件）。|
|ipcMain 和 ipcRenderer|进程间通信模块，用于在主进程和渲染进程之间进行通信。|
|Menu|创建和控制菜单栏和上下文菜单。|
|shell|执行本地系统操作（如打开外部链接或文件夹）。|
|nativeImage|处理和转换图像数据。|
|Tray|创建和控制系统托盘图标和相关事件。|
|powerMonitor|监测系统电源状态变化。|

> *Electron 遵循 JavaScript 传统约定，以**帕斯卡命名法** (PascalCase) 命名**可实例化**的类 (如 BrowserWindow, Tray 和 Notification)，以**驼峰命名法** (camelCase) 命名**不可实例化**的函数、变量等 (如 app, ipcRenderer, webContents) 。*





### <font color="#7db6bf">三、基本文件内容</font>

#### main.js

```javascript
/**
 * * 使用 CommonJS 语法导入了两个 Electron 模块
 * app, which controls your application's event lifecycle.
 * app：控制你程序的事件生命周期
 * BrowserWindow, which creates and manages app windows.
 * BrowserWindow：创建以及管理程序窗口
 */
const {
    app,
    BrowserWindow
} = require('electron')

/**
 * * 使用 createWindow 创建一个 800px*600px 的窗口
 * * 并载入 index.html 文档
 */
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('index.html')
}

// * 当应用就绪时调用的方法
// * 通常使用 '.on'方法 监听事件
// app.on('ready', () => {})
app.whenReady().then(() => {
    createWindow()

    // activate 事件在 macOS 系统下被触发。如果没有 BrowserWindow 的实例，打开初始页面
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

/**
 * * 关闭所有窗口时退出应用
 * * process.platform 属性返回用于标识编译 Node.js 二进制文件的操作系统平台的字符串。
 * 目前可能的值是
 * 'aix'
 * 'darwin'
 * 'freebsd'
 * 'linux'
 * 'openbsd'
 * 'sunos'
 * 'win32'
 */
// 如果 Node.js 是在安卓操作系统上构建的，则也可能返回值 'android'。
// 但是，Node.js 中的安卓支持是实验的。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
```

#### index.html

```html
<!DOCTYPE html>
<html lang="zh-cn">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Basic</title>
</head>

<body>
  <script src="./renderer.js"></script>
</body>

</html>
```

