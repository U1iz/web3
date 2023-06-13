# vue.js

## 一、 环境配置

> vue 中文官网

```http
https://cn.vuejs.org
```



> npm 代码

```shell
npm init vue@latest
```



> 项目代码

*内联*

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test_01</title>
    <script src="node_modules/vue/dist/vue.global.js"></script>
</head>

<body>
    <div></div>
    <div id="app">{{ message }}</div>

    <script>
        const { createApp } = Vue
        createApp({
            data() {
                return {
                    message: 'Hello Vue!'
                }
            }
        }).mount('#app')
    </script>
</body>

</html>
```

*ES module*

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test_01</title>
</head>

<body>
    <div></div>
    <div id="app">{{ message }}</div>
    <script type="module">
        import { createApp } from './node_modules/vue/dist/vue.esm-browser.js'

        createApp({
            data() {
                return {
                    message: 'Hello Vue!'
                }
            }
        }).mount('#app')
    </script>
    </script>
</body>

</html>
```

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test_01</title>
    <script type="importmap">
        {
          "imports": {
            "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
          }
        }
      </script>
</head>

<body>
    <div></div>
    <div id="app">{{ message }}</div>
    <script type="module">
        import { createApp } from 'vue'

        createApp({
            data() {
                return {
                    message: 'Hello Vue!'
                }
            }
        }).mount('#app')
    </script>
    </script>
</body>

</html>
```



- 配置本地服务器

  - 使用 node.js

    - 安装 http-server

    ```shell
    npm install http-server
    ```

    

    - 开启 http-server

    ```shell
    http-server -c-1
    ```

  - 使用 wamp

    ```http
    http://96yzl.vip/notes/rsc/item/temp/rsc/response/response.php?root=temp&tit=apache%20%E6%98%A0%E5%B0%84%E6%9C%AC%E5%9C%B0%E7%BD%91%E7%AB%99&path=apache&eData=undefined
    ```



## 二、 数字点击自增案例

> html

```html
<div id="app">
    <span>{{count}}</span>
    <button @click="count+=ext">点击自增 {{ext}}</button>
</div>
```

```JavaScript
import { createApp } from 'vue'
const app = createApp({
    data() {
        return {
            count: 0,
            ext: 10
        }
    }
})
app.mount('#app')
```

