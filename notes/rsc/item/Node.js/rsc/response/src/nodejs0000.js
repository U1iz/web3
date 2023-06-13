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
    obj.cStyle_3 = ['4', '1,1,0', 'fw', '800'];
    obj.cStyle = [obj.cStyle_0, obj.cStyle_1, obj.cStyle_2, obj.cStyle_3];
    obj.globalStyle_0 = ['1', '1', [2, 4, 3.2, 3.2], '1', [24]];
    obj.boxShadow = ['1px', '1px', '16px', '2px', '#6666666f'];
    // 写入内容
    obj.c0 = ['浏览器', '引擎名称'];
    obj.c1 = ['Chrome', 'V8\n（性能最佳）'];
    obj.c2 = ['Firefox', 'OdinMonkey（奥丁猴）'];
    obj.c3 = ['Safari', 'JSCore'];
    obj.c4 = ['IE', 'Chakra（查克拉）'];

    obj.contents = [obj.c1, obj.c2, obj.c3, obj.c4];

    // 写入tr容器属性
    obj.trStyle_0 = ['t', 'bgc', '#c0c2ec'];
    obj.trStyle_1 = ['t', 'c', '#233'];
    obj.trStyle_2 = ['1', 'bgc', 'rgba(0,150,255,.02)'];
    obj.trStyle_3 = ['2', 'bgc', 'rgba(0,150,255,.02)'];
    obj.trStyle_4 = ['3', 'bgc', 'rgba(0,150,255,.02)'];
    obj.trStyle_5 = ['4', 'bgc', 'rgba(0,150,255,.02)'];
    obj.trStyle = [obj.trStyle_0, obj.trStyle_1, obj.trStyle_2, obj.trStyle_3, obj.trStyle_4, obj.trStyle_5];

    add_formNode(obj);
}

function form_ini_01() {
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
    obj.cStyle_3 = ['4', '1,1,0', 'fw', '800'];
    obj.cStyle_4 = ['5', '1,1,0', 'fw', '800'];
    obj.cStyle = [obj.cStyle_0, obj.cStyle_1, obj.cStyle_2, obj.cStyle_3, obj.cStyle_4];
    obj.globalStyle_0 = ['1', '1', [2, 4, 3.2, 3.2], '1', [24]];
    obj.boxShadow = ['1px', '1px', '16px', '2px', '#6666666f'];
    // 写入内容
    obj.c0 = ['键', '功能']
    obj.c1 = ['↑（上方向键）', '快速定位到上一次执行的命令'];
    obj.c2 = ['tab', '快速补全路径'];
    obj.c3 = ['esc', '快速清空当前输入的命令'];
    obj.c4 = ['cls', '清空终端（cmd）'];
    obj.c5 = ['clear', '清空终端（PowerShell、cmd、VScode终端）'];

    obj.contents = [obj.c1, obj.c2, obj.c3, obj.c4, obj.c5];

    // 写入tr容器属性
    obj.trStyle_0 = ['t', 'bgc', '#c0c2ec'];
    obj.trStyle_1 = ['t', 'c', '#233'];
    obj.trStyle_2 = ['1', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_3 = ['3', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_4 = ['5', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle = [obj.trStyle_0, obj.trStyle_1, obj.trStyle_2, obj.trStyle_3, obj.trStyle_4];

    add_formNode(obj);
}

let Data = 'Node.js 初识';
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

    link('Node.js 中文网址', 'https://nodejs.org/zh-cn');
    link('Node.js 官方文档', 'http://nodejs.cn/api');

    LM(`在此之前：
    \t熟练掌握js语法（DOM、BOM）`);

    add_normalNode('', ['p', 'normal', '2% 0']);

    SM('不同的浏览器使用的不同的JavaScript解析引擎');
    form_ini_00();

    tip('可以借助Node.js开发后端', 1);

    LM('Node.js 简介');
    lst(`Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.`, ['111', 'disc', 2]);
    lst('Node.js 是一个基于 Chrome V8 引擎的 ' + '<b style="color:red;">JavaScript 运行环境</b>' + '。', ['0', 'disc', 2]);
    lst('Node.js 中' + '<b style="color:red;">无法调用</b>' + 'DOM 和 BOM 等' + '<b style="color:red;">浏览器内置API</b>', ['0', 'disc', 2]);

    SM('Node.js 可以做什么');
    link('Express', 'https://www.expressjs.com.cn');
    link('Electron', 'https://www.electronjs.org');
    link('Restify', 'http://restify.com');

    lst('Nodejs作为一个JavaScript 的运行环境，仅仅提供了基础的功能和API。\n\t然而，基于Node,js 提供的这些基础能，很多强大的工具和框架如雨后春笋，层出不穷，\n\t所以学会了Node.js，可以让前端程序员胜任更多的工作和岗位:', [111, 'none', 2]);
    lst('基于 <a href="https://www.expressjs.com.cn" target="_bank" style="color:#64b2c0;textDecoration:none;">Express</a> 框架，可以快速构建 Web 应用', [111, 'decimal-leading-zero', 4]);
    lst('基于 <a href="https://www.electronjs.org" target="_bank" style="color:#64b2c0;textDecoration:none;">Electron</a> 框架，可以构建跨平台的桌面应用<i>（VS Code 以此构建）</i>', [0, 'decimal-leading-zero', 4]);
    lst('基于 <a href="http://restify.com" target="_bank" style="color:#64b2c0;textDecoration:none;">Restify</a> 框架，可以快速构建 API 接口项目', [0, 'decimal-leading-zero', 4]);
    lst('读写和操作数据库、创建实用的命令行工具辅助前端开发、etc', [0, 'decimal-leading-zero', 4]);

    lst('总之：Noe.js 是大前端时代的“大宝剑”，有了这个超级buff加持，前端程序员的行业竞争力会越来越强！', [111, 'none', 2]);

    LM('Node.js 环境');
    SM('查看当前 Node.js 版本号');
    tip('在任意code编辑器终端（terminal）或shell（cmd）键入；node 不区分大小写，参数需要区分大小写');
    cmd(`node -v`);

    SL();
    LM('使用 Node.js 执行js文件');
    lst('以 cmd 为例；设默认打开位置（user/userName），文件名：test.js', [111, 'none', 2]);
    lst('text.js', [111, 'none', 1]);
    code(`console.log('Hello World！');`);
    lst('js文件路径 D:\\js\\test.js', [111, 'none', 1]);
    cmd(`    :: 使用绝对js文件路径
    C:\\Users\\UserName>node D:\\js\\test.js

    :: 如果是 PowerShell 可以直接拖入js文件，会自动填充文件的绝对路径

    :: 使用 CD 命令使 cmd 跳转至 js文件所处文件夹 （这个\\写多少个都能正常运行）
    C:\\Users\\UserName>cd D:\\js
    D:\\js>node test.js

    :: 输出
    Hello World！
    `);
    SM('其他使cmd窗口打开即定位到当前文件夹的方法');
    lst('当前目录shit+右键 - 以PowerShell打开 （旧版win是cmd）', [111, 'decimal-leading-zero', 3]);
    lst('直接在当前目录地址栏键入cmd或PowerShell （不区分大小写）', [0, 'decimal-leading-zero', 3]);

    LM('终端快捷键');
    form_ini_01();
}