## Electron进程通信

> ##### Electron12+默认开启上**下文隔离**，即：无法在 `main.js`  中定义方法后直接被 `renderer.js` 调用

> 预加载脚本访问的 `window` 对象**并不是**网站所能访问的对象。 例如，如果您在预加载脚本中设置 `window.hello = 'wave'` 并且启用了上下文隔离，当网站尝试访问 `window.hello` 对象时将返回 undefined。



#### preload.js

```js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
    param: true,
    fn: param => {
        console.log(param);
    },
    promise: param => {
        return new Promise(resolve => {
            resolve(param)
        })
    },
    asyncFn: callBack => {
        callBack(Math.floor(Math.random() * 1024))
    }
})
```



#### renderer.js

```js
console.log(window.myAPI.param); // 获取变量
window.myAPI.fn(123456); // 执行函数
window.myAPI.promise(7890) // Promise
    .then(res => console.log(res))
window.myAPI.asyncFn(res => console.log(res)) // 回调
```



#### 打印结果

```
true        	renderer.js:1
123456        	VM74:16
40        		renderer.js:5
7890        	renderer.js:4
```



> ##### 以上方法相当于直接把值赋给了window对象。因此一旦暴露就可能被攻击者直接调用，因此preload.js不拥有Node环境的完全访问权。
>
> ##### 如果需要调用Node的模块功能则需要使用 `IPC` 在进程间通讯。



## 模式 1：渲染器进程到主进程（单向）

> 来自官网案例 ref: [进程间通信 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/ipc#模式-1渲染器进程到主进程单向)
>
> *当用户输入框中输入字符后点击 `button#btn` 后设置页面标题为输入框中的字符串 （经过改动变成了当前路径+字符串）*

要将单向 IPC 消息从渲染器进程发送到主进程，可以使用 [`ipcRenderer.send`](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer) API 发送消息，然后使用 [`ipcMain.on`](https://www.electronjs.org/zh/docs/latest/api/ipc-main) API 接收。



#### main.js

```js
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 执行步骤三：主进程接收到消息，并执行函数
  ipcMain.on('set-title', (event, title) => {
    // 获取消息来源的窗口信息
    const webContents = event.sender
    // 根据窗口信息获取窗口
    const win = BrowserWindow.fromWebContents(webContents)
    // 更改页面标题
    win.setTitle(title)
  })

  mainWindow.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```



#### preload.js

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    // 执行步骤二：被调用后向主进程发送 set-title 消息，以及传来的参数
    setTitle: title => ipcRenderer.send('set-title', title)
})
```



#### renderer.js

```js
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    // 执行步骤一：在这里调用 setTitle
    window.electronAPI.setTitle(title)
})
```



#### index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    Title: <input id="title"/>
    <button id="btn" type="button">Set</button>
    <script src="./renderer.js"></script>
  </body>
</html>
```



## 模式 2：渲染器进程到主进程（双向）

> 来自官网案例 ref: [进程间通信 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/ipc#模式-2渲染器进程到主进程双向)
>
> *当用户点击页面 `button#btn` 时打开文件对话框，打开后显示文件路径*

双向 IPC 的一个常见应用是从渲染器进程代码调用主进程模块并等待结果。 这可以通过将 [`ipcRenderer.invoke`](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args) 与 [`ipcMain.handle`](https://www.electronjs.org/zh/docs/latest/api/ipc-main#ipcmainhandlechannel-listener) 搭配使用来完成。



#### main.js

```js
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

// * 主进程接收到 dialog:openFile 会执行的函数
async function handleFileOpen(desc) {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  const res = desc + filePaths[0];
  if (canceled) {

  } else {
    // * 执行步骤四 函数执行完毕，返回数据
    // return res
    return new Promise(resolve => {
      resolve(res)
    })
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // * 执行步骤三 主进程接收到 dialog:openFile 将参数传给 handleFileOpen
  ipcMain.handle('dialog:openFile', (event, res) => handleFileOpen(res))
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```



#### preload.js

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    // * 执行步骤二 向主进程发送 dialog:openFile 消息，以及传来的参数
    openFile: res => ipcRenderer.invoke('dialog:openFile', res)
})
```



#### renderer.js

```js
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
    // * 执行步骤一 调用 window.electronAPI.openFile
    // 可以使用异步阻塞
    // const filePath = await window.electronAPI.openFile('\nFile Path:\n')
    // filePathElement.innerText = filePath

    // 也可使用 Promise
    window.electronAPI.openFile('\nFile Path:\n')
    // * 执行步骤五 获取返回数据，执行下一步操作
    .then(res => { filePathElement.innerText = res })
})
```



#### index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Dialog</title>
  </head>
  <body>
    <button type="button" id="btn">Open a File</button>
    <strong id="filePath"></strong>
    <script src='./renderer.js'></script>
  </body>
</html>
```



`ipcRenderer.invoke` API 是在 Electron 7 中添加的，作为处理渲染器进程中双向 IPC 的一种开发人员友好的方式。 但这种 IPC 模式存在几种替代方法。

用于单向通信的 `ipcRenderer.send` API 也可用于双向通信。 这是在 Electron 7 之前通过 IPC 进行异步双向通信的推荐方式。

**这种方法有几个缺点：**

- 您需要设置第二个 `ipcRenderer.on` 监听器来处理渲染器进程中的响应。 使用 `invoke`，您将获得作为 Promise 返回到原始 API 调用的响应值。
- 没有显而易见的方法可以将 `asynchronous-reply` 消息与原始的 `asynchronous-message` 消息配对。 如果您通过这些通道非常频繁地来回传递消息，则需要添加其他应用代码来单独跟踪每个调用和响应。

**如果可能，应避免使用旧方法**



## 模式 3：主进程到渲染器进程

> 来自官方案例 ref: [进程间通信 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/ipc#模式-3主进程到渲染器进程)



将消息从主进程发送到渲染器进程时，需要指定是哪一个渲染器接收消息。 消息需要通过其 [`WebContents`](https://www.electronjs.org/zh/docs/latest/api/web-contents) 实例发送到渲染器进程。 此 `WebContents` 实例包含一个 [`send`](https://www.electronjs.org/zh/docs/latest/api/web-contents#contentssendchannel-args) 方法，其使用方式与 `ipcRenderer.send` 相同。



> 此案例先在页面创建了菜单，当用户单击菜单时从 `主进程` 向 `渲染进程` 发送对应的数值
>
> 此时页面中的 “Current value” 便会加上该数值并发生变化
>
> 之后该值会再由 `渲染进程` 回复给 `主进程`



#### main.js

```js
const {
  app,
  BrowserWindow,
  Menu, // 1. 引入Electron中的Menu模块
  ipcMain
} = require('electron')
const path = require('path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  //* 执行步骤一：使用 webContents 模块发送消息
  // 2. 创建一个菜单数组
  let menuTemplate = [
    // 一级菜单
    {
      label: "菜单",
      // 二级菜单 submenu
      submenu: [{
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment 加一'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement 减一'
        }
      ]
    },
    {
      label: "+10",
      click: () => mainWindow.webContents.send('update-counter', 10),
    },
    {
      label: "-10",
      click: () => mainWindow.webContents.send('update-counter', -10),
    }
  ];

  // 3. 用于构建MenuItem
  let menuBuilder = Menu.buildFromTemplate(menuTemplate);

  // 4. setApplicationMenu 在macOS上将 menu设置成应用内菜单 在windows和Linux上，menu 将会被设置成窗口顶部菜单
  Menu.setApplicationMenu(menuBuilder);

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  //* 执行步骤五： 监听接收渲染进程的回复
  ipcMain.on('counter-value', (_event, value) => {
    console.log(value) // will print value to Node console
  })
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```



#### preload.js

```js
const { contextBridge, ipcRenderer } = require('electron')

//* 执行步骤二： 通过预加载脚本暴露 ipcRenderer.on
contextBridge.exposeInMainWorld('electronAPI', {
  handleCounter: callback => ipcRenderer.on('update-counter', callback)
})
```



#### renderer.js

```js
const counter = document.getElementById('counter')

//* 执行步骤三： 接收主进程消息，执行回调
window.electronAPI.handleCounter((event, value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue

  //* 执行步骤四： 将回复发送给主进程
  event.sender.send('counter-value', newValue)
})
```



#### index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Menu Counter</title>
  </head>
  <body>
    Current value: <strong id="counter">0</strong>
    <script src="./renderer.js"></script>
  </body>
</html>
```

