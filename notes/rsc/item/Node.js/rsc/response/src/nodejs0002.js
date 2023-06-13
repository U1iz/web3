var win_w = document.body.clientWidth;
var win_h = document.body.clientHeight;

// Initialization

function form_ini_00() {
    let obj = new Object();
    obj.ctrSize = ['100%'];
    obj.setTitLabelType = 'all';
    obj.titLabel = 'h2';
    obj.setTexLabelType = 'all';
    obj.texLabel = 'h3';
    obj.setLabelType = 'part';
    obj.sLl_00 = ['0', 'h3,h3,h3'];
    obj.setLabel = [obj.sLl_00];
    obj.cStyle_0 = ['1', '1,1,0', 'fw', '800'];
    obj.cStyle_1 = ['2', '1,1,0', 'fw', '800'];
    obj.cStyle_2 = ['3', '1,1,0', 'fw', '800'];
    obj.cStyle = [obj.cStyle_0, obj.cStyle_1, obj.cStyle_2];
    obj.globalStyle_0 = ['1', '1', [2, 4, 3.2, 3.2], '1', [24]];
    obj.boxShadow = ['1px', '1px', '16px', '2px', '#6666666f'];
    // 写入内容
    obj.c0 = ['方法', '作用'];
    obj.c1 = ['path.join()', '用来<b style="color:red;">将多个路径片段拼接成一个完整的路径字符串</b>'];
    obj.c2 = ['path.basename()', '用来从路径字符串中，将<b style="color:red;">文件名</b>解析出来'];
    obj.c3 = ['path.extname()', '用来从路径字符串中，将<b style="color:red;">文件扩展名</b>解析出来'];

    obj.contents = [obj.c1, obj.c2, obj.c3];

    // 写入tr容器属性
    obj.trStyle_0 = ['t', 'bgc', '#c0c2ec'];
    obj.trStyle_1 = ['t', 'c', '#233'];
    obj.trStyle_2 = ['1', 'bgc', 'rgba(0,150,255,.06)'];
    obj.trStyle_3 = ['2', 'bgc', 'rgba(0,150,255,.06)'];
    obj.trStyle_4 = ['3', 'bgc', 'rgba(0,150,255,.06)'];
    obj.trStyle = [obj.trStyle_0, obj.trStyle_1, obj.trStyle_2, obj.trStyle_3, obj.trStyle_4];

    add_formNode(obj);
}

let Data = '路径处理';
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

    LM('fs 模块 - 路径动态拼接的问题');
    lst('在使用 fs 模块操作文件时，如果使用的是<span style="color:red;">相对路径</span>，很容易出现路径动态凭借错误的问题。', [111, 'none', 1]);
    lst('原因：代码在运行时，<span style="color:red;">会以执行 node 命令时所处的目录</span>，动态拼接出被操作文件的完整路径。', [0, 'disc', 2]);

    SM('例');
    SM('test.js');
    code(`fs = require('fs');

    fs.readFile('./file/1.txt', 'utf8', function (err, value) {
        if (err) {
            return console.log('读取失败：' + err);
        }
        console.log(value);
    });`);
    SM('1.txt');
    tArea('123');

    cmd(`D:\\js>tree /f
    卷 Cache 的文件夹 PATH 列表
    卷序列号为 65F3-3762
    D:.
    │  test.js
    │
    └─file
            1.txt
    
    
    D:\\js>node test.js
    123
    
    D:\\js>cd ../
    
    D:\\>node js/test.js
    读取失败：Error: ENOENT: no such file or directory, open 'D:\\file\\1.txt'
    `);
    SM('解决方案');
    lst('使用绝对路径 （移植性差，不利于维护）', [111, 'disc', 2]);
    lst('使用 __dirname 自动补齐绝对路径', [111, 'disc', 2]);

    SM('test.js');
    code(`fs = require('fs');

    console.log(__dirname);

    fs.readFile(__dirname + '/file/1.txt', 'utf8', function (err, value) {
        if (err) {
            return console.log('读取失败：' + err);
        }
        console.log(value);
    });`);

    cmd(`D:\\js>node test.js
    D:\\js
    123
    
    D:\\js>cd ../
    
    D:\\>node js/test.js
    D:\\js
    123
    `);

    add_normalNode('', ['p', 'normal', '6rem 0']);
    SL();

    LM('path 路径模块');

    lst('<span style="color:red;">path 模块</span>是 Node.js 官方提供的，用来<span style="color:red;">处理</span>路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。', [111, 'none', 1]);
    form_ini_00();

    lst('如果要在 js 中使用 path 模块来处理路径，则需要先导入该模块', [111, 'none', 2]);
    code("const path = require('path');");

    LM('path.join() 语法格式');
    code('path.join([...paths])'); /* cjk-ideographic square */
    lst('...paths /<string> 路径片段的序列', [111, 'disc', 2]);
    lst('返回值：/<string>', [0, 'disc', 2]);

    LM('路径拼接');
    lst('使用 path.join() 方法，可以把多个路径片段拼接为完整的路径字符串。', [111, 'square', 1]);

    SM('path.js');
    code(`const path = require('path');
    
    const pathStr = path.join('/a', '/b/c', '../', './d', 'e');
    console.log(pathStr);
    
    const pStr = path.join('/a', '/b/c', '../../', './d', 'e');
    console.log(pStr);
    
    const pathStr2 = path.join(__dirname, './path.js');
    console.log(pathStr2);`);

    cmd(`D:\\js>node path.js
    \\a\\b\\d\\e
    \\a\\d\\e
    D:\\js\\path.js
    `);

    tip('注意：凡是涉及到路径拼接的操作，都要使用 path.join() 方法进行处理。尽量不要直接使用 + 进行字符串的拼接', 1);

    LM('获取路径中的文件名');
    LM('path.basename() 语法格式');
    lst('使用 path.basename() 方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名。', [111, 'square', 1]);
    code('path.basename(path[, ext])');
    lst('path /<string> 必选参数，表示一个路径的字符串', [111, 'disc', 2]);
    lst('ext /<string> 可选参数，表示文件扩展名', [0, 'disc', 2]);
    lst('返回：/<string> 表示路径中的最后一部分', [0, 'disc', 2]);

    lst('使用 path.basename() 方法，可以从一个文件路径中，获取到文件的名称部分。', [111, 'square', 1]);
    SM('path2.js');
    code(`const path = require('path');

    const fPath = 'a/b/c/index.html';

    var fullName = path.basename(fPath);
    console.log('\\n' + fullName);

    console.log('---------');

    var nameWithoutExt = path.basename(fPath, '.html');
    console.log(nameWithoutExt);`);
    cmd(`D:\\js>node path2.js

    index.html
    ---------
    index`);

    LM('获取路径中的文件扩展名');
    LM('path.extname() 语法格式');
    lst('使用 path.extname() 方法，可以获取路径中的扩展名部分。', [111, 'square', 1]);
    code('path.extname(path)');
    lst('path /<string> <b style="color:red;">必选</b>参数，表示一个路径的字符串', [111, 'disc', 2]);
    lst('返回：/<string> 返回得到的扩展名字符串', [0, 'disc', 2]);

    SM('path2.js');
    code(`const path = require('path');

    const fPath = 'a/b/c/index.html';
    
    const fExt = path.extname(fPath);
    console.log(fExt);`);
    cmd(`D:\\js>node path2.js
    .html`);


    add_normalNode('', ['p', 'normal', '32rem 0']);
}