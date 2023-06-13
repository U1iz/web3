let Data = 'npm与包（概念）';
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
    function span(str, color) {
        let c = 'red';
        if (color) {
            c = color;
        }
        return '<span style="color:' + c + ';position:relative;top:-0.12rem;">' + str + '</span>';
    }
    topic(Data, '#24272e');

    add_normalNode('', ['p', 'normal', '6% 5% 0 5%']);

    LM('概念');
    SM('包');
    lst('Node.js 中的' + span('第三方模块') + '又叫做' + span('包') + '。');
    lst('就像' + span('电脑', '#047ffd') + '和' + span('计算机', '#047ffd') + '指的是相同的东西， ' + span('第三方模块', '#047ffd') + '和' + span('包') + '指的是同一个概念， 只不过叫法不同。');
    SM('包的来源');
    lst('不同于 Node.js 中的内置模块与自定义模块， ' + span('包是由第三方个人或团队开发出来的') + '， 免费供所有人使用。');
    lst('' + span('注意') + '： Node.js 中的包都是免费且开源的， 不需要付费即可免费下载使用。');
    SM('为什么需要包');
    lst('由于 Node.js 的内置模块仅提供了一些底层的 API， 导致在基于内置模块进行项目开发的时， 效率很低。');
    lst(span('包是基于内置模块封装出来的') + '， 提供了更高级、 更方便的 API， ' + span('极大的提高了开发效率') + '。');
    lst(span('包') + '和' + span('内置模块', '#047ffd') + '之间的关系， 类似于 ' + span('jQuery') + ' 和 ' + span('浏览器内置 API', '#047ffd') + ' 之间的关系。');

    SM('从哪里下载包');
    lst(`国外有一家 IT 公司，叫做 ` + span('npm, Inc.') + ` 这家公司旗下有一个非常著名的网站： ` + 'https://www.npmjs.com/' + ` ，
        \t它是全球` + span('最大的包共享平台') + `，你可以从这个网站上搜索到任何你需要的包，只要你有足够的耐心！
        \t到目前位置，全球约 ` + span('1100 多万', '#047ffd') + `的开发人员，通过这个包共享平台，开发并共享了超过 ` + span('120 多万个包', '#047ffd') + ` 供我们使用。

    ` + span('npm, Inc. ') + `公司提供了一个地址为 ` + 'https://registry.npmjs.org/' + ` 的服务器，来对外共享所有的包，我们可以从这个服务器上下载自己所需要的包。
    `);
    SM(span('注意'));
    lst('从 ' + 'https://www.npmjs.com/' + ' 网站上搜索自己所需要的包');
    lst('从 ' + 'https://registry.npmjs.org/' + ' 服务器上下载自己需要的包');

    SM('如何下载包');
    lst(span('npm, Inc. 公司') + `提供了一个包管理工具，我们可以使用这个包管理工具，从 https://registry.npmjs.org/ 服务器把需要的包下载到本地使用。

    这个包管理工具的名字叫做 ` + span('Node Package Manager', '#047ffd') + `（简称 ` + span('npm 包管理工具') + `），这个包管理工具随着 Node.js 的安装包一起被安装到了用户的电脑上。

    大家可以在终端中执行 ` + span('npm -v ') + `命令，来查看自己电脑上所安装的 npm 包管理工具的版本号：
    `);

    cmd(`C:\\Users>npm -v
    8.1.2
    `);

    LM('npm 安装包');
    cmd('npm install 包的名称');
    lst('简写');
    cmd('npm i 包的名称');
    lst('安装指定版本的包');
    cmd('npm i 包的名称@版本号');
    LM('导入 npm 安装的包');
    lst('直接 require 安装包时使用的名称');

    SL();
    LM('包的' + span('语义化版本规范'));
    add_normalNode('', ['p', 'normal', '1rem 0']);
    lst(`包的版本号是以“ 点分十进制” 形式进行定义的， 总共有三位数字， 例如 2.24 .0
    其中每一位数字所代表的的含义如下：`);

    lst('第1位数字： 大版本', [111, 'disc', 3]);
    lst('第2位数字： 功能版本', [0, 'disc', 3]);
    lst('第3位数字： Bug修复版本', [0, 'disc', 3]);
    add_normalNode('', ['p', 'normal', '3.2rem 0']);

    lst(span('版本号提升的规则：\t') + '只要前面的版本号增长了， 则后面的版本号归零。');
    SL();
    LM('包管理配置文件');
    add_normalNode('', ['p', 'normal', '1rem 0']);
    lst(`npm 规定， 在` + span(`项目根目录`) + `中， ` + span(`必须`) + `提供一个叫做 ` + span(`package.json`) + ` 的包管理配置文件。 用来记录与项目有关的一些配置信息。 例如：
    项目的名称、 版本号、 描述等`);
    add_normalNode('', ['p', 'normal', '1rem 0']);
    lst('项目中都用到了哪些包', [111, 'disc', 3]);
    lst('哪些包只在' + span('开发期间') + '会用到', [0, 'disc', 3]);
    lst('哪些包在' + span('开发') + '和' + span('部署') + '时都需要用到', [0, 'disc', 3]);
    SL();

    SM('多人协作的问题');

    lst('第三方包的体积过大， 不方便团队成员之间共享项目源代码。');
    lst('解决方案： 共享时剔除node_modules');


    add_normalNode('', ['p', 'normal', '32rem 0']);
}