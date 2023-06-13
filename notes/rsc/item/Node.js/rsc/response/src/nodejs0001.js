var win_w = document.body.clientWidth;
var win_h = document.body.clientHeight;

/* Initialization */

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
    /* 写入内容 */
    obj.c0 = ['方法', '作用'];
    obj.c1 = ['fs.readFile()', '用来<b style="color:red;">读取</b>指定文件中的内容'];
    obj.c2 = ['fs.writeFile()', '用来向指定的文件中<b style="color:red;">写入</b>内容'];
    obj.c3 = ['fs.appendFile()', '用来向指定的文件中<b style="color:red;">追加</b>内容'];

    obj.contents = [obj.c1, obj.c2, obj.c3];

    /* 写入tr容器属性 */
    obj.trStyle_0 = ['t', 'bgc', '#c0c2ec'];
    obj.trStyle_1 = ['t', 'c', '#233'];
    obj.trStyle_2 = ['1', 'bgc', 'rgba(0,150,255,.06)'];
    obj.trStyle_3 = ['2', 'bgc', 'rgba(0,150,255,.06)'];
    obj.trStyle_4 = ['3', 'bgc', 'rgba(0,150,255,.06)'];
    obj.trStyle = [obj.trStyle_0, obj.trStyle_1, obj.trStyle_2, obj.trStyle_3, obj.trStyle_4];

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
    /* 写入内容 */
    obj.c0 = ['键', '功能']
    obj.c1 = ['↑（上方向键）', '快速定位到上一次执行的命令'];
    obj.c2 = ['tab', '快速补全路径'];
    obj.c3 = ['esc', '快速清空当前输入的命令'];
    obj.c4 = ['cls', '清空终端（cmd）'];
    obj.c5 = ['clear', '清空终端（PowerShell、cmd、VScode终端）'];

    obj.contents = [obj.c1, obj.c2, obj.c3, obj.c4, obj.c5];

    /* 写入tr容器属性 */
    obj.trStyle_0 = ['t', 'bgc', '#c0c2ec'];
    obj.trStyle_1 = ['t', 'c', '#233'];
    obj.trStyle_2 = ['1', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_3 = ['3', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_4 = ['5', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle = [obj.trStyle_0, obj.trStyle_1, obj.trStyle_2, obj.trStyle_3, obj.trStyle_4];

    add_formNode(obj);
}

let Data = 'fs文件模块';
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

    LM('fs 模块简介');
    lst('fs 模块是Node.js官方提供的，用来操作文件的模块。\n\t它提供了一系列的方法和属性，用来满足用户对文件的操作需求。', [111, 'none', 2]);
    form_ini_00();
    lst('如果要在 js 中使用 fs 模块来操作文件，则需要先导入该模块', [111, 'none', 2]);
    code('const fs = require("fs")');

    LM('fs.readFile() 语法格式');
    code('fs.readFile(path[, options], callback)');

    lst('参数1：<span style="color:red;">必选</span>参数，字符串，宝石文件的路径。', [111, 'disc', 2]);
    lst('参数2：可选参数，表示以什么编码格式来读取文件，默认utf8。', [0, 'disc', 2]);
    lst('参数3：<span style="color:red;">必选</span>参数，文件读取完成后，通过回调函数拿到读取的结果。', [0, 'disc', 2]);

    SM('目录结构');
    cmd(`D:\\js>dir
    驱动器 D 中的卷是 Cache
    卷的序列号是 65F3-3762

    D:\\js 的目录

    2022/05/05  11:39    <DIR>          .
    2022/05/05  11:39    <DIR>          ..
    2022/05/05  11:20               469 fs_test.js
    2022/05/05  11:34                12 text.txt
                  2 个文件            481 字节
                  2 个目录 25,552,404,480 可用字节`);

    SM('fs_test.js');
    code(`    // 1. 导入 fs 模块， 来操作文件
    const fs = require('fs');

    // 2. 调用 fs.readFile() 方法读取文件
    fs.readFile('text.txt', 'utf8', function (err, dataStr) {
        // 2.1 打印失败的结果
        // 如果读取成功，则 err 的值为 null
        // 如果读取失败，则 err 的值为 错误对象，dataStr 的值为 undefined
        console.log(err + '------分界线------');
        // 2.2 打印成功的结果
        console.log(dataStr);
    });`);

    SM('text.txt');
    tArea(`1234

    ABCD`);

    SM('读取成功');
    cmd(`D:\\js>node fs_test.js
    null
    ------分界线------
    1234

    ABCD`);

    SM('读取失败');
    cmd(`D:\\js>node fs_test.js
    Error: ENOENT: no such file or directory, open 'D:\\js\\false.txt'
    ------分界线------
    undefined`);

    code(`    :: 错误信息
    err.message
    :: 错误对象
    err`);

    SL();

    LM('fs.writeFile() 语法格式');
    code('fs.writeFile(file, data[, options], callback)');

    lst('参数1：<span style="color:red;">必选</span>参数，需要指定一个<span style="color:red;">文件路径的字符串</span>，表示文件的存放路径。', [111, 'disc', 2]);
    lst('参数2：<span style="color:red;">必选</span>参数，表示要写入的内容。', [0, 'disc', 2]);
    lst('参数3：可选，表示以什么格式写入文件内容，默认utf8。', [0, 'disc', 2]);
    lst('参数4：<span style="color:red;">必选</span>参数，文件写入完成后的回调函数。', [0, 'disc', 2]);

    SM('fs_test.js');
    code(`const fs = require('fs');

    // 创建或覆盖该文件 不会自动创建文件夹
    fs.writeFile('temp.txt', 'ABCD', function (err) {
        console.log(err);
    });

    // 追加字符 与 writeFile() 用法相同
    fs.appendFile('temp.txt', 'ABCD', function (err) {
        console.log(err);
    });`);

    cmd(`D:\\js>node fs_test.js
    null
    null`);

    SM('执行完成之后的目录');
    cmd(`D:\\js>dir
    驱动器 D 中的卷是 Cache
    卷的序列号是 65F3-3762
   
    D:\\js 的目录
   
   2022/05/05  17:30    <DIR>          .
   2022/05/05  17:30    <DIR>          ..
   2022/05/05  17:34               710 fs_test.js
   2022/05/05  17:32                 8 temp.txt
   2022/05/05  11:34                12 text.txt
                  3 个文件            730 字节
                  2 个目录 25,394,659,328 可用字节
   `);

    SM('temp.txt');
    tArea('ABCDABCD')

    LM('判断文件（读取，写入，追加）失败');
    code(`fs.writeFile('undefined:/temp.txt', '123', function (error) {
        // 写在回调函数开头
        if (error) {
            // return 即不再执行之后的代码
            return console.log('操作粗问题啦：' + error);
        }

        // 执行成功执行的操作
        console.log(234);
    });`);
    cmd(`D:\\js>node fs_test.js
    操作粗问题啦：Error: ENOENT: no such file or directory, open 'D:\\js\\undefined:\\temp.txt'`);
    add_normalNode('', ['p', 'normal', '16rem 0']);
    SL();
    LM('练习');
    tArea(`文档 A.txt 内容：

    小埋=100 小明=90 aa=80 bb=90 cc=70 dd=70

    -----------------

    将文档 A.txt 内容写入文档 B.txt 中。

    效果:

    小埋：100
    小明：90
    aa：80
    bb：90
    cc：70
    dd：70`);

    add_normalNode('', ['p', 'normal', '16rem 0']);
    SM('文件夹目录');
    cmd(`D:\\js>dir /b
    score.txt
    split.js`);
    SM('score.txt');
    tArea(`uName_1=100 uName_2=90 uName_3=80 uName_4=80 uName_5=70`);
    LM('我的方案');
    SM('split.js');
    code(`const fs = require('

    fs.readFile('score.txt', 'utf8', function (err, result) {
        let temp = result.split(' ');
        let nStr;
        for (let i = 0; i < temp.length; i++) {
            temp[i] = temp[i].replace(/=/g, '：');
            nStr += temp[i] + '\\n';
            fs.writeFile('score_new.txt', nStr, function () {});
        }
    });`);
    SM('执行');
    cmd(`D:\\js>node split.js

    D:\\js>node split.js

    D:\\js>dir /b
    score.txt
    score_new.txt
    split.js
    `);
    SM('score_new.txt');
    tArea(`uName_1：100
    uName_2：90
    uName_4：80
    uName_3：80
    uName_5：70
    `);

    SL();
    LM('讲师方案');
    SM('split.js');
    code(`const fs = require('fs');
        fs.readFile('score.txt', 'utf8', function (err, result) {
        // 先将成绩的数据，按照空格分割
        const temp = result.split(' ');

        // 循环分割后的数组，对每一项数据，进行字符串的替换操作
        const arr = [];
        // ES6 语法
        temp.forEach(i => {
            arr.push(i.replace('=', '：'))
        })

        // 将新数组中的每一项，进行合并，得到一个新的字符串
        const nStr = arr.join('\\r\\n');

        fs.writeFile('score_anotherNew.txt', nStr, function () {});
    });`);
    cmd(`D:\\js>dir /b
    score.txt
    split.js
    
    D:\\js>node split.js
    
    D:\\js>node split.js
    
    D:\\js>dir /b
    score.txt
    score_anotherNew.txt
    split.js
    `);
    SM('score_anotherNew.txt');
    tArea(`uName_1：100
    uName_2：90
    uName_3：80
    uName_4：80
    uName_5：70`);

    add_normalNode('', ['p', 'normal', '32rem 0']);
}