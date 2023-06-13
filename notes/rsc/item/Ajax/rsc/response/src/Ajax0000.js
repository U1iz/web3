let Data = 'Ajax 初识';
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

$('head').append('<script src="src/Ajax0000/data.js"></script>');

function call(Data) {
    function span(str, color) {
        let c = 'red';
        if (color) {
            c = color;
        }
        return '<span style="color:' + c + ';position:relative;top:-0.12rem;">' + str + '</span>';
    }
    topic(Data, '#24272e');

    LM('Ajax 功能', {
        marginTop: '6rem'
    });
    lst('获取服务器数据');
    lst('局部刷新，异步加载');
    lst('使用 js 代码，获取服务器信息', {
        marginBottom: '6rem'
    });
    lst('HTTP、HTTPS 超文本传输协议', [111, 'disc', 3]);
    lst('FTP 文件传输协议', [0, 'disc', 3]);
    lst('SMTP 简单邮件传输协议', [0, 'disc', 3]);

    lst('在 HTTP 协议中，需要大致了解的是：请求头、响应头、请求体、响应体。', {
        marginTop: '2rem'
    });

    LM('wamp ' + span('为电脑提供网页服务'));
    link('wamp（官网）', 'https://www.wampserver.com/en/#download-wrapper');
    lst('Wamp 指的是： Windows、Apache、MySQL、PHP几个服务器软件的缩写,\n\t类似的还有 Lamp：Linux、Apache、MySQL、PHP');

    tip('安装后托盘图标为绿色则安装成功', 3);
    tip('若之前安装过MySQL且保持运行，图标可能为黄色', 3);

    lst('在浏览器输入入：127.0.0.1 或 localhost 能看到该页面则代表服务正常运行');
    img({
        innerHTML: srcData.img.svg.d1,
        width: '90%',
        height: 'auto'
    });

    SL();
    add_normalNode('', ['p', 'normal', '6rem 0']);
    lst('在wamp安装页面中的“www”文件夹中存入HTML，开启服务后可输入输入其路径访问');
    lst('在' + span('同一局域网下') + '另一台上网设备可以通过' + span('提供服务计算机的ip（无线局域网）' + '文件相对www文件夹的路径') + '以访问');
    SM('服务器');
    img({
        innerHTML: srcData.img.svg.d2,
        width: '90%',
        height: 'auto'
    });
    SM('虚拟机（客户机）');
    img({
        innerHTML: srcData.img.svg.d3,
        width: '90%',
        height: 'auto'
    });
    lst('新版wamp可直接访问，旧版需要设定权限');
    tip('通过更改 httpd.conf 将 “Deny from all” 改成 “Allow from all” 后 重启服务，其他设置，如路径等也可通过此文件设置');

    link('ipconfig 查看电脑ip', './src/Ajax0000/ipconfig.html');

    LM('配置虚拟服务器');

    lst('通过修改本机hosts文件，绕过DNS服务器解析域名');
    SM('hosts文件绝对路径：');
    lst('C:\\Windows\\System32\\drivers\\etc\\hosts');
    SM('在其末尾追加例：');
    lst('127.0.0.1 localhost');
    SM('虚拟主机运用场景');
    lst('一台服务器可能有' + span('多个域名') + '，每个域名对应不同的文件夹');
    SM('设置虚拟主机');
    lst('httpd.conf 中，将 “Deny from all” 改成 “Allow from all”');
    lst('httpd.conf 中，找到 “Virtual hosts” 下的 Include~~ 解除注释' + span('（新版本默认开启）'));
    cmd(`
    # Virtual hosts
    Include conf/extra/httpd-vhosts.conf
    `);

    SM('刷新DNS');
    cmd(`ipconfig /flushdns`);

    link('实例：域名解析与虚拟主机', './src/Ajax0000/case_yuMing_xuNiZhuJi.html');

    add_normalNode('', ['p', 'normal', '32rem 0']);
}