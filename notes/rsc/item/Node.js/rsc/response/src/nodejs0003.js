let Data = '路径练习';
// main execute
window.addEventListener('load', function () {
    switch (sessionStorage.getItem(document.querySelector('title').innerText + 'execute.js_hadRun')) {
        case 'false':
            sessionStorage.setItem(document.querySelector('title').innerText + 'execute.js_hadRun', 'true');
            call(Data);
            setTimeout(function () {
                //手动触发窗口resize事件
                if (document.createEvent) {
                    var event = document.createEvent("HTMLEvents");
                    event.initEvent("resize", true, true);
                    window.dispatchEvent(event);
                } else if (document.createEventObject) {
                    window.fireEvent("onresize");
                }
            }, 100);
            document.documentElement.style.overflowX = 'hidden';
            document.body.style.backgroundColor = '#c6d7ff';
            document.documentElement.style.width = '100%';
            document.body.style.width = '100%';
            if (localStorage.getItem('equipmentType') == 1) {
                document.body.style.width = window.screen.availWidth + 'px';
                document.body.style.overflowX = 'hidden';
                setTimeout(function () {
                    document.body.style.overflowX = 'auto';
                }, 3600)
            }
            break;
    }
})

window.addEventListener('DOMContentLoaded', function () {
    setDocTitle(Data);
    sessionStorage.setItem(document.querySelector('title').innerText + 'execute.js_hadRun', 'false');
});

function call(Data) {
    topic(Data, '#24272e');

    add_normalNode('', ['p', 'normal', '6% 5% 0 5%']);

    tArea(`现有 index.html 文件

    style 和 js 以标签内嵌在 index.html 内
    
    ----------------
    
    要求
    
    将 index.html 分别提取出三个文件：
    
    index.html
    index.css
    index.js
    
    其中 index.html 要采用外链的形式链接 index.css 、index.js`);
    SM('index.html（源码）');
    code(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>index首页</title>
      <style>
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          background-image: linear-gradient(to bottom right, red, gold);
        }
    
        .box {
          width: 400px;
          height: 250px;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 6px;
          position: absolute;
          left: 50%;
          top: 40%;
          transform: translate(-50%, -50%);
          box-shadow: 1px 1px 10px #fff;
          text-shadow: 0px 1px 30px white;
    
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: 70px;
          user-select: none;
          padding: 0 20px;
    
          /* 盒子投影 */
          -webkit-box-reflect: below 0px -webkit-gradient(
              linear, left top, left bottom, from(transparent), color-stop(0%, transparent),
              to(rgba(250, 250, 250, .2)));
        }
      </style>
    </head>
    
    <body>
      <div class="box">
        <div id="HH">00</div>
        <div>:</div>
        <div id="mm">00</div>
        <div>:</div>
        <div id="ss">00</div>
      </div>
    
      <script>
        window.onload = function () {
          // 定时器，每隔 1 秒执行 1 次
          setInterval(() => {
            var dt = new Date()
            var HH = dt.getHours()
            var mm = dt.getMinutes()
            var ss = dt.getSeconds()
    
            // 为页面上的元素赋值
            document.querySelector('#HH').innerHTML = padZero(HH)
            document.querySelector('#mm').innerHTML = padZero(mm)
            document.querySelector('#ss').innerHTML = padZero(ss)
          }, 1000)
        }
    
        // 补零函数
        function padZero(n) {
          return n > 9 ? n : '0' + n
        }
      </script>
    </body>
    
    </html>`);

    add_normalNode('', ['p', 'normal', '16rem 0']);
    SL();

    LM('讲师方案（源码）');
    SM('09.时钟案例.js');
    code(`    // 1.1 导入 fs 模块
    const fs = require('fs')
    // 1.2 导入 path 模块
    const path = require('path')
    
    // 1.3 定义正则表达式，分别匹配 <style></style> 和 <script></script> 标签
    const regStyle = /<style>[\\s\\S]*<\\/style>/
    const regScript = /<script>[\\s\\S]*<\\/script>/
    
    // 2.1 调用 fs.readFile() 方法读取文件
    fs.readFile(path.join(__dirname, '../素材/index.html'), 'utf8', function(err, dataStr) {
      // 2.2 读取 HTML 文件失败
      if (err) return console.log('读取HTML文件失败！' + err.message)
      // 2.3 读取文件成功后，调用对应的三个方法，分别拆解出 css, js, html 文件
      resolveCSS(dataStr)
      resolveJS(dataStr)
      resolveHTML(dataStr)
    })
    
    // 3.1 定义处理 css 样式的方法
    function resolveCSS(htmlStr) {
      // 3.2 使用正则提取需要的内容
      const r1 = regStyle.exec(htmlStr)
      // 3.3 将提取出来的样式字符串，进行字符串的 replace 替换操作
      const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
      // 3.4 调用 fs.writeFile() 方法，将提取的样式，写入到 clock 目录中 index.css 的文件里面
      fs.writeFile(path.join(__dirname, './clock/index.css'), newCSS, function(err) {
        if (err) return console.log('写入 CSS 样式失败！' + err.message)
        console.log('写入样式文件成功！')
      })
    }
    
    // 4.1 定义处理 js 脚本的方法
    function resolveJS(htmlStr) {
      // 4.2 通过正则，提取对应的 <script></script> 标签内容
      const r2 = regScript.exec(htmlStr)
      // 4.3 将提取出来的内容，做进一步的处理
      const newJS = r2[0].replace('<script>', '').replace('</script>', '')
      // 4.4 将处理的结果，写入到 clock 目录中的 index.js 文件里面
      fs.writeFile(path.join(__dirname, './clock/index.js'), newJS, function(err) {
        if (err) return console.log('写入 JavaScript 脚本失败！' + err.message)
        console.log('写入 JS 脚本成功！')
      })
    }
    
    // 5.1 定义处理 HTML 结构的方法
    function resolveHTML(htmlStr) {
      // 5.2 将字符串调用 replace 方法，把内嵌的 style 和 script 标签，替换为外联的 link 和 script 标签
      const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
      // 5.3 写入 index.html 这个文件
      fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, function(err) {
        if (err) return console.log('写入 HTML 文件失败！' + err.message)
        console.log('写入 HTML 页面成功！')
      })
    }`);

    cmd(`D:\\js>tree /f
    卷 Cache 的文件夹 PATH 列表
    卷序列号为 65F3-3762
    D:.
    ├─code
    │  │  09.时钟案例.js
    │  │
    │  └─clock
    └─素材
            index.html
    
    
    D:\\js>cd code
    
    D:\\js\\code>node 09.时钟案例.js
    写入 JS 脚本成功！
    写入 HTML 页面成功！
    写入样式文件成功！

    D:\\js\\code>cd ../
    
    D:\\js>tree /f
    卷 Cache 的文件夹 PATH 列表
    卷序列号为 65F3-3762
    D:.
    ├─code
    │  │  09.时钟案例.js
    │  │
    │  └─clock
    │          index.css
    │          index.html
    │          index.js
    │
    └─素材
            index.html
    
    `);
    SM('index.html');
    code(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>index首页</title>
      <link rel="stylesheet" href="./index.css" />
    </head>
    
    <body>
      <div class="box">
        <div id="HH">00</div>
        <div>:</div>
        <div id="mm">00</div>
        <div>:</div>
        <div id="ss">00</div>
      </div>
    
      <script src="./index.js"></script>
    </body>
    
    </html>`);

    SM('index.css');
    tArea(`
    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      background-image: linear-gradient(to bottom right, red, gold);
    }

    .box {
      width: 400px;
      height: 250px;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 6px;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      box-shadow: 1px 1px 10px #fff;
      text-shadow: 0px 1px 30px white;

      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 70px;
      user-select: none;
      padding: 0 20px;

      /* 盒子投影 */
      -webkit-box-reflect: below 0px -webkit-gradient(
          linear, left top, left bottom, from(transparent), color-stop(0%, transparent),
          to(rgba(250, 250, 250, .2)));
    }
  `);
    SM('index.js');
    code(`
    window.onload = function () {
      // 定时器，每隔 1 秒执行 1 次
      setInterval(() => {
        var dt = new Date()
        var HH = dt.getHours()
        var mm = dt.getMinutes()
        var ss = dt.getSeconds()

        // 为页面上的元素赋值
        document.querySelector('#HH').innerHTML = padZero(HH)
        document.querySelector('#mm').innerHTML = padZero(mm)
        document.querySelector('#ss').innerHTML = padZero(ss)
      }, 1000)
    }

    // 补零函数
    function padZero(n) {
      return n > 9 ? n : '0' + n
    }
  `);

    LM('我的修改方案');
    SM('temp.html');
    code(`<!DOCTYPE html>
    <html lang="zh-CN">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            div {
                position: absolute;
                top: 10%;
                left: calc(50% - 50px);
                width: 100px;
                height: 100px;
                background-color: #ccc;
            }
        </style>
    </head>
    
    <body>
        <script>
            let div = document.createElement('div');
            document.body.appendChild(div);
        </script>
    </body>
    
    </html>`);

    SM('path_exercise.js');
    code(`const path = require('path');
    const fs = require('fs');
    
    fs.readFile(path.join(__dirname, './temp.html'), 'utf8', (err, dataStr) => {
        // 读取失败
        if (err) {
            return console.log("读取HTML文件失败！");
        }
    
        const regStyle = /<style>[\\s\\S]*<\\/style>/;
        const regScript = /<script>[\\s\\S]*<\\/script>/;
    
        resolve_CSS_JS(dataStr, regStyle, 'style', 'style.css');
        resolve_CSS_JS(dataStr, regScript, 'script', 'index.js');
        writeFinHTML();
    });
    
    // 处理 css 和 js
    let finHTML = '';
    
    function resolve_CSS_JS(htmlStr, getStr, type, fileName) {
        // 使用正则获取页面中的 style script 标签
        let r1 = getStr.exec(htmlStr);
    
        // 文件路径
        const filePath = path.join(__dirname, './src/' + fileName);
    
        // 将提取出来的样式字符串，做进一步的处理
        let newLabel;
    
        localReplace(type);
    
        function localReplace(type) {
            let t1 = '<' + type + '>';
            let t2 = '</' + type + '>';
            newLabel = r1[0].replace(new RegExp(t1, 'g'), '').replace(new RegExp(t2, 'g'), '').replace(/\\n/g, '');
    
            // 替换原本处在 HTML 内的标签， 改为路径
            let path = '<script src="' + fileName + '"></script>';
            if (type == 'style') {
                path = '<link rel="stylesheet" href="' + fileName + '">'
            }
            finHTML == '' ?
                finHTML = htmlStr.replace(getStr, path).replace(new RegExp(getStr, 'g'), '') :
                finHTML = finHTML.replace(getStr, path).replace(new RegExp(getStr, 'g'), '');
    
            // console.log(finHTML);
        }
    
        // 将提取出来的文本，写入到 指定 文件中
        fs.writeFile(filePath, newLabel, err => {
            if (err) {
                return console.log('写入 ' + fileName + ' 失败！');
            }
            console.log('写入 ' + fileName + ' 成功！');
        });
    
    
    }
    
    function writeFinHTML() {
        fs.writeFile(path.join(__dirname, './src/index.html'), finHTML, err => {
            if (err) {
                return console.log('写入 index.html 失败！');
            }
            console.log('写入 index.html 成功！');
        });
    }`);
    cmd(`D:\\js>tree /f
    卷 Cache 的文件夹 PATH 列表
    卷序列号为 65F3-3762
    D:.
    │  path_exercise.js
    │  temp.html
    │
    └─src
    
    D:\\js>node path_exercise.js
    写入 style.css 成功！
    写入 index.js 成功！
    写入 index.html 成功！
    
    D:\\js>tree /f
    卷 Cache 的文件夹 PATH 列表
    卷序列号为 65F3-3762
    D:.
    │  path_exercise.js
    │  temp.html
    │
    └─src
            index.html
            index.js
            style.css
    `);

    SM('style.css');
    tArea(`
    div {
        position: absolute;
        top: 10%;
        left: calc(50% - 50px);
        width: 100px;
        height: 100px;
        background-color: #ccc;
    }
    `);
    SM('index.js');
    code(`
    let div = document.createElement('div');
    document.body.appendChild(div);
    `);
    SM('index.html');
    code(`<!DOCTYPE html>
    <html lang="zh-CN">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="style.css">
    </head>
    
    <body>
        <script src="index.js"></script>
    </body>
    
    </html>`);


    add_normalNode('', ['p', 'normal', '32rem 0']);
}