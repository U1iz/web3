let Data = 'Ajax 基础';
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


$('head').append('<script src="src/Ajax0002/data.js"></script>');

function call(Data) {
    topic(Data, '#24272e');

    LM('验证用户名是否已存在');
    link('index.html', './src/Ajax0002/register/index.html');
    SM('index.html');
    code(`<!DOCTYPE html>
    <html lang="zh-CN">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>注册页面</title>
    </head>
    
    <body>
        <h1>注册验证</h1>
        <form action="./checkUsername.php" method="get">
    
            用户名：<input type="text" name="username" id="ipt" onkeyup="getMsg(this.value, 'POST');">
            <span id="msg"></span>
            <br>
    
            <input type="submit" value="提交">
    
        </form>
        <script>
            // 封装 Ajax 功能
            function getMsg(value, type) {
    
                // xhr，全称为XMLHttpRequest，用于与服务器交互数据，是ajax功能实现所依赖的对象，jquery中的ajax就是对 xhr的封装。
    
                // 1、创建该对象    IE6 以下需要写兼容代码
                let xhr = new XMLHttpRequest();
                // 2、准备发送 最后的 true 代表同步， false 代表异步， true 可省略
    
                if (type == 'GET') {
                    // 2、准备发送 GET
                    xhr.open('get', 'checkUsername.php?username=' + value, true);
                    //3、执行发送 GET
                    xhr.send(null);
    
                } else if (type == 'POST') {
                    // 3、准备发送 POST
                    xhr.open("post", "checkUsername.php", true);
                    // 3、执行发送 POST
                    let param = "username=" + value;
                    // 对于post请求来说的话，我们的参数应该放到请求体中
                    // 设置xhr的请求头信息，这个步骤仅仅是针对于post请求才有的 固定写法
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.send(param);
                }
    
                // 设置回调函数
                xhr.onreadystatechange = function () {
                    // let result = xhr.responseText;
                    // msg.innerHTML = result;
    
                    // 外if为固定写法
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            // 得到数据
                            let result = xhr.responseText;
                            msg.innerHTML = result;
                        }
                    }
                }
            }
        </script>
    </body>
    
    </html>`);
    SM('checkUsername.php');
    code(`<?php

        $uname = $_GET['username'];

        if ($uname == 'zhangsan') {
            echo '<p style="color: red;">用户名已存在！</p><p>username already exists！</p>';
        } else {
            echo '用户名通过验证 username verified';
        }

?>`);
    video({
        fullPath: '../media/p02/bandicam 2022-06-04 16-32-15-721.mp4'
    });

    img({
        innerHTML: srcData.svgImg.SI01,
        width: '90%',
        height: 'auto'
    });

    add_normalNode('', ['p', 'normal', '32rem 0']);
}