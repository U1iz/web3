let Data = 'http 模块（概念）';
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
        return '<span style="color:' + c + ';position:relative;top:-0.12rem;">' + str + '</span>'
    }

    topic(Data, '#24272e');

    add_normalNode('', ['p', 'normal', '6% 5% 0 5%']);

    LM('http 模块简介');
    lst('在网络节点中，负责' + span('消费资源') + '的电脑，叫做客户端;负责' + span('对外提供网络资源') + '的电脑，叫做服务器。', [111, 'disc', 2]);
    lst('<span style="color:red;">http 模块</span> 是 Nodejs 官方提供的、用来创建web服务器的模块。\n\t\t通过 http 模块 提供的 <span style="color:#527fde;">http.createServer()</span> 方法，就能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。', [0, 'disc', 2]);
    lst('如果要使用 http 模块 创建 Web 服务器，则需要先导入它。', [111, 'none', 1]);
    code("const http = require('http')");

    link('phpStudy（仅了解）', 'https://cn.bing.com/search?q=phpStudy');
    lst(`服务器和普通电脑的` + span('区别') + `在于，服务器上安装了 ` + span('web 服务器软件') + `，例如:llS、Apache等。
        \t通过安装这些服务器软件，就能把一台普通的电脑变成一台 Web 服务器。`, [111, 'none', 2]);
    lst(`在 Node.js 中， 我们` + span('不需要使用', '#527fde') + ` IIS、 Apache 等这些` + span('第三方web服务器软件') + `。
        \t因为我们可以基于 Node.js 提供的 http 模块，` + span('通过几行简单的代码， 就能轻松的手写一个服务器软件', '#527fde') + `， 从而对外提供 Web服务。`, [111, 'none', 2]);

    tip('没有内网穿透就不能在公网被访问哦');

    LM('服务器相关概念');
    lst(span('IP 地址') + `就是互联网上` + span('每台计算机的唯一地址') + `，因此 IP 地址具有唯一性。
    \t如果把“个人电脑”比作“一台电话”，那么“IP地址”就相当于“电话号码”，
    \t只有在知道对方 IP 地址的前提下，才能与对应的电脑之间进行数据通信。`, [111, 'none', 1]);

    lst(`IP 地址的格式：通常用“` + span('点分十进制', '#527fde') + `”表示成（a.b.c.d）的形式，其中，a,b,c,d 都是 0~255 之间的十进制整数。
    \t例如：用点分十进表示的 IP地址（192.168.1.1）`, [0, 'none', 1]);

    lst(span('互联网中每台 Web 服务器，都有自己的 IP 地址') + `，
    \t例如：大家可以在 Windows 的终端中运行 ` + span('ping') + ` ` + span('www.baidu.com', '#527fde') + ` 命令，即可查看到百度服务器的 IP 地址。`, [111, 'disc', 2]);

    lst(`在开发期间，自己的电脑既是一台服务器，也是一个客户端，
    \t为了方便测试，可以在自己的浏览器中输入 127.0.0.1 这个 IP 地址，就能把自己的电脑当做一台服务器进行访问了。`, [0, 'disc', 2]);

    SM('域名和域名服务器');

    lst(`尽管 IP 地址能够唯一地标记网络上的计算机，但IP地址是一长串数字，` + span('不直观', '#527fde') + `，而且` + span('不便于记忆', '#527fde') + `，
    \t于是人们又发明了另一套` + span('字符型') + `的` + span('地址方案') + `，即所谓的` + span('域名（Domain Name）地址') + `。`);
    lst(span('IP地址', '#527fde') + `和` + span('域名', '#527fde') + `是` + span('一一对应的关系') + `，这份对应关系存放在一种叫做` + span('域名服务器') + `(DNS，Domain name server)的电脑中。
    \t使用者只需通过好记的域名访问对应的服务器即可，对应的转换工作由域名服务器实现。因此，` + span('域名服务器就是提供 IP 地址和域名之间的转换服务的服务器。'));

    lst('单纯使用 IP 地址，互联网中的电脑也能够正常工作。但是有了域名的加持，能让互联网的世界变得更加方便。', [111, 'disc', 3]);
    lst('在开发测试期间， ' + span('127.0.0.1') + ' 对应的域名是 ' + span('localhost') + '，它们都代表我们自己的这台电脑，在使用效果上没有任何区别。', [0, 'disc', 3]);

    SM('端口号');
    lst('计算机中的端口号，就好像是现实生活中的门牌号一样。通过门牌号，外卖小哥可以在整栋大楼众多的房间中，准确把外卖送到你的手中。');
    lst(`同样的道理，在一台电脑中，可以运行成百上千个 web 服务。每个 web 服务都对应一个唯一的端口号。
    \t客户端发送过来的网络请求，通过端口号，可以被准确地交给对应的 ` + span('web 服务') + `进行处理。`);

    img({
        width: '90%',
        height: 'auto',
        innerHTML: '<?xml version="1.0" encoding="utf-8"?> <!-- Generator: Adobe Illustrator 26.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 534 242" style="enable-background:new 0 0 534 242;" xml:space="preserve"> <style type="text/css"> .st0{fill:#414141;} .st1{font-family:"SentyGoldenBell";} .st2{font-size:13px;} .st3{font-family:"STHeitiSC-Light";} .st4{font-family:"FZKATJW--GB1-0";} .st5{font-size:18px;} .st6{font-family:"FZKATK--GBK1-0";} .st7{fill:none;stroke:#3B3B3B;stroke-width:3;stroke-miterlimit:10;} .st8{fill:#3B3B3B;} .st9{fill:none;stroke:#3B3B3B;stroke-width:2;stroke-miterlimit:10;} </style> <g id="图层_1"> <path class="st0" d="M348.5,6.6c59-0.2,118-0.1,177,0c1,1,2,2,2.9,3c-0.1,75.8,0.1,151.7-0.1,227.5c-0.3,0.5-1,1.6-1.3,2.2 c-1.6,0.5-3.2,1.1-4.9,1c-57,0-114.1,0-171.1,0c-2.5,0.2-4.9-1.6-4.9-4.2c-0.4-5.5,0-11-0.2-16.5c-3-0.3-5.9-0.8-8.9-1.3 c-1.3-0.5-2.5-1-3.8-1.5c-3.7-1.6-6.5-4.3-8.4-7.7c-0.2-1.7-0.5-3.4-0.9-5.1c0.3-1.7,0.6-3.4,0.9-5c1-1.4,1.9-2.8,2.9-4.2 c2.7-2.2,5.9-3.8,9.2-5c3-0.5,6-1.2,9.1-1.3c-0.1-4.9,0-9.9-0.1-14.8c-7.4-0.2-15.1-1.7-21.1-6.2c-1.5-1.7-2.9-3.4-4.2-5.3 c-1.4-5.5,0.4-11.3,5.1-14.5c5.9-3.9,13.2-5.3,20.2-5.4c0-4.8,0.1-9.6-0.1-14.4c-2.3-0.1-4.6-0.3-6.9-0.5c-5-1.5-9.9-3.7-13.3-7.7 c-0.8-2.1-1.4-4.3-1.8-6.5c0.4-1.8,0.7-3.6,1-5.3c4.5-7.2,13.3-9.4,21.2-10.1c-0.1-3.7-0.1-7.4,0-11.1c-2.8-0.1-5.5-0.7-8.1-1.4 c-1.3-0.7-2.7-1.3-4-1.9c-8.2-4.4-11.7-14.7-9-23.5c1.4-3.4,3.6-6.4,6.2-9c4.4-3,9.5-5,14.9-4.9c0.2-11.4-0.1-22.9,0.1-34.3 C345.9,9.6,346.9,7.9,348.5,6.6 M348.7,8.6c-1.5,12.4-0.7,25-0.5,37.4c10.7-0.1,21.1,8.5,21,19.7c6.8-0.4,13.6-0.1,20.4-0.2 c0-1.4,0-2.8,0-4.2c4.9,2.2,10.9,2.5,15,5.8c0.6-5.8,0-11.6,0.7-17.4c33.4,0.1,66.7-0.1,100.1,0.1c0.2,10.9,0.1,21.8,0,32.7 c-33.4,0.1-66.8,0.1-100.1,0c-0.6-5.1-0.2-10.3-0.4-15.4c-1.2,0.3-2.5,0.7-3.7,1.1c-1.1,0.3-2.1,0.7-3.2,1c-1,0.3-1.9,0.7-2.9,1 c-1.9,0.5-3.7,1.1-5.6,1.6c0-1.4,0.1-2.8,0.1-4.1c-6.9-0.2-13.9,0.2-20.8-0.3c0.3,4.8-2.1,9-5,12.6c-1.5,1.2-3,2.3-4.6,3.3 c-1.1,0.5-2.2,1-3.4,1.6c-2.6,0.9-5.3,1.5-8,1.7c0,3.8-0.1,7.7,0.2,11.5c7.7,0.3,16.1,2.9,20.2,9.9c0.1,1.2,0.3,2.4,0.4,3.6 c6.9-0.6,13.9-0.1,20.8-0.3c0-1.4,0-2.8,0-4.1c5.2,1.4,10.2,3.2,15.3,4.8c0.1-5.2-0.1-10.4,0.3-15.5c33.4-0.1,66.9-0.2,100.3,0 c0.1,10.8,0.1,21.7,0,32.5c-33.4,0.6-66.7,0.1-100.1,0.2c-0.7-5.6-0.3-11.2-0.5-16.8c-5,2.2-10.2,3.5-15.3,5.3c0-1.4,0-2.9,0-4.3 c-6.8-0.1-13.5,0.1-20.3-0.1c-0.5,6-5,10.6-10.5,12.5c-1.3,0.4-2.6,0.8-4,1.3c-2.2,0.5-4.5,0.6-6.8,0.7c-0.3,4.8-0.4,9.7-0.1,14.5 c10,0.1,23.4,3.6,25.3,15.1c5.4-0.9,10.8-0.3,16.2-0.5c0-1.3-0.1-2.6-0.1-3.9c4.9,0.7,9.3,3.5,14.3,3.8c0,0.8,0.1,1.7,0,2.5 c-3.5,0.1-6.8,1.7-10,2.8c-1.4,0.3-2.8,0.6-4.3,0.9c0-1.3,0-2.6,0-3.8c-5.4-0.2-10.9,0.5-16.3-0.5c-0.4,1.5-0.8,3-1.2,4.4 c-5.2,7.9-15.1,10.2-24,10.5c-0.4,5-0.2,9.9-0.2,14.9c7.8,0.6,16.4,3,20.4,10.4c0.3,1.8,0.6,3.7,1,5.5c6.5-1.9,13.6-0.3,20.3-0.8 c0-1.4,0-2.8,0-4.2c2.1,0.6,4.2,1.2,6.3,2c1,0.4,2,0.7,3,1.1c0.6,0.1,1.7,0.3,2.3,0.4c0.8,1.5,3.2,1.7,4.1,0.2 c-0.7-5.1-0.5-10.2-0.1-15.2c33.4,0,66.8,0,100.1,0c0.2,10.9,0.1,21.8,0.1,32.7c-33.4,0.1-66.8,0.1-100.2,0 c-0.6-4.9-0.2-10.1-0.2-14.8c-2.9-1-6.4,2-9.6,2.2l0.1,0.3c-2,0.4-4,1-5.9,1.6c0-1.4,0-2.7,0-4.1c-6.9-0.2-13.8,0.1-20.7-0.2 c0,5.7-5,9.6-9.8,11.8c-3.6,1.1-7.3,2-11.1,2.2c-0.2,6.1-0.5,12.2,0.3,18.2c3.8,0.9,7.7,0.6,11.6,0.6c54.7,0,109.5,0,164.2,0 c0.5-0.3,1.5-0.9,2-1.2c0.2-74.4,0-148.7,0.1-223.1c0.1-1.8-0.4-3.6-0.8-5.4C466.5,8.5,407.6,8.5,348.7,8.6 M336.8,49.8 c-13,5.1-14.4,24.8-2.2,31.7c2.4,1.1,4.9,2,7.4,2.8c3,0.2,6,0.2,8.9,0c1.1-0.3,2.2-0.7,3.3-0.9c5.4-1.8,9.7-5.9,12-11.1 c1.2-6.1,0.9-13.1-3.8-17.7C356.2,47.3,345.4,46.8,336.8,49.8 M407.1,51.9c0.1,9.5,0,19.1,0,28.7c32.1-0.1,64.2-0.1,96.3,0 c0-9.5,0-19.1,0-28.6C471.3,51.9,439.2,51.9,407.1,51.9 M407.1,98.4c0,9.5,0,19,0,28.5c32.1,0.3,64.2-0.1,96.3,0.1 c0.1-9.5,0-19.1,0.1-28.6C471.4,98.4,439.2,98.4,407.1,98.4 M335.7,101.6c-6.9,2-12.5,10-8,16.8c6.2,8.2,17.9,7.9,27.1,6.7 c1.5-0.6,3-1.2,4.5-1.7c4.3-1.9,7.4-5.8,8-10.5C364.6,99,346.6,98.6,335.7,101.6 M322.6,153.9c-0.5,2.6-0.5,5.3,0,7.9 c4.9,7.8,14.9,9.4,23.4,9.7c7.5-0.1,15.5-1.1,21.4-6.1c4.5-3.5,4.8-11.4,0.1-14.8c-6.1-5.4-14.8-6.3-22.6-6.2 C336.8,144.7,327.4,146.5,322.6,153.9 M407.1,189.8c0,9.6,0.1,19.1,0,28.6c32.1,0.1,64.3,0,96.4,0c0-9.5,0-19.1,0-28.6 C471.3,189.8,439.2,189.8,407.1,189.8 M332.6,193.7l-0.2,0.3c-6.6,3-8.3,12.7-3.1,17.7c8.2,6.8,20.1,6.9,29.7,3.3 c4.5-2.1,7.8-6,8.4-11c-0.6-2.6-1.6-5.1-2.9-7.5c-1.8-1.2-3.6-2.4-5.5-3.6C350.5,189.6,340.8,189.8,332.6,193.7z"/> <path class="st0" d="M405.3,141.9c33.4,0.2,66.8-0.3,100.1,0.2c0.2,10.6,0,21.1,0.1,31.7c-33.4,0.7-66.8,0.1-100.2,0.3 C404.6,163.4,404.7,152.6,405.3,141.9 M407.2,143.9c-0.1,9.4-0.1,18.9,0,28.3c32.1,0,64.2,0,96.2,0c0.1-9.4,0.1-18.9,0-28.3 C471.3,143.9,439.2,143.8,407.2,143.9z"/> <text transform="matrix(1 0 0 1 442.7388 209.1205)" class="st1 st2">etc...</text> <text transform="matrix(1 0 0 1 419.3866 162.3582)" class="st3 st2">web server3</text> <text transform="matrix(1 0 0 1 419.3866 117.2952)" class="st3 st2">web server2</text> <text transform="matrix(1 0 0 1 419.3866 71.3252)" class="st3 st2">web server1</text> <text transform="matrix(1 0 0 1 403.1634 29.0944)" class="st4 st5">服务器</text> </g> <g id="图层_2"> <text transform="matrix(1 0 0 1 19.3922 112.8969)" class="st6 st2">客户端发起请求</text> <text transform="matrix(1 0 0 1 19.3926 142.2091)" class="st1 st2">http://127.0.0.1</text> <text transform="matrix(1 0 0 1 341.05 69.204)" class="st6 st2">80</text> <text transform="matrix(1 0 0 1 337.6519 114.8789)" class="st6 st2">443</text> <text transform="matrix(1 0 0 1 334.7253 160.8347)" class="st6 st2">3006</text> <text transform="matrix(1 0 0 1 333.0014 209.12)" class="st6 st2">xxx</text> <g> <path class="st7" d="M124.6,126.9c92,0,114.1-59.8,184-59.8"/> <polygon class="st8" points="308.6,61.9 308.6,72.3 321.3,66.4 		"/> </g> <path class="st9" d="M114.8,233.5H15.3c-4.8,0-8.7-3.9-8.7-8.7V33.1c0-4.8,3.9-8.7,8.7-8.7h99.4c4.8,0,8.7,3.9,8.7,8.7v191.7 C123.5,229.6,119.6,233.5,114.8,233.5z"/> </g> </svg>'
    });

    lst('每个端口号不能同时被多个 web 服务占用。', [111, 'disc', 2]);
    lst('在实际应用中，URL 中的 80 端口可以被省略。', [0, 'disc', 2]);
    tip('http 默认 80 端口', 3);
    tip('https 默认 443 端口', 3);

    add_normalNode('', ['p', 'normal', '32rem 0']);
}