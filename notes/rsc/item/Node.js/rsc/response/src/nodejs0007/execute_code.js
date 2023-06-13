let Data = 'http 案例 相关文件源码';
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

    link('钟表页面源码', '../../nodejs0003/index.html');

    LM('http_exercise.js');
    code(`    // 导入 http 模块
    const http = require('http');
    
    //  导入 fs 文件系统模块
    const fs = require('fs');
    
    // 导入 path 路径处理模块
    const path = require('path');
    
    // 创建 web 服务器
    const server = http.createServer();
    
    // 监听 web 服务器的 request 事件
    server.on('request', (req, res) => {
        // 获取到客户端请求的 url 地址
        const url = req.url;
    
        // 把请求的 url地址，映射为本地文件的文件的存放路径
        const fPath = path.join(__dirname, url);
    
        fs.readFile(fPath, 'utf8', (err, dataStr) => {
            // 读取文件失败后，项客户端响应固定的 错误信息
            if (err) return res.end('404 Not Found');
            // 读取文件成功后，将 读取成功的内容 响应给客户端
            res.end(dataStr);
        });
    });
    
    // 启动 web 服务器
    server.listen(80, () => {
        console.log('server listen at http://127.0.0.1');
    });`);

    LM('index.html');
    code(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>index</title>
    </head>
    <body>
        <h1>index.html</h1>
    </body>
    </html>`);

    LM('temp.htm');
    code(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>temp.htm</title>
        <link rel="stylesheet" href="style.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    <body>
        <div>temp.htm</div>
        <script src="index.js"></script>
    </body>
    </html>`);

    LM('style.css');
    tArea(`div {
        width: 100px;
        height: 100px;
    }`);

    LM('index.js');
    code(`$(
        $('div').css({
            color: '#fff',
            background: 'blue',
        })
    );`);


    add_normalNode('', ['p', 'normal', '32rem 0']);
}