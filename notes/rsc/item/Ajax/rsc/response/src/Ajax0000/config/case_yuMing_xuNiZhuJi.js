let Data = '实例：域名解析和虚拟主机';
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
    add_normalNode('', ['p', 'normal', '6rem 0']);

    LM('域名解析');
    SM('目标网址：http://www.temp.com/demo.html');

    SM('网页根目录结构');
    cmd(`D:\\WEB\\www\\temp>tree /f
    卷 Cache 的文件夹 PATH 列表
    卷序列号为 65F3-3762
    D:.
        demo.html
    
    没有子文件夹
    
    `);

    SM('hosts 追加');
    tArea(`提供服务的ip地址 目标域名
    192.168.0.108 www.temp.com`);

    SM('网站根目录 添加&设置（可选）');
    lst('httpd-vhosts.conf Apache');
    cmd(`  <VirtualHost *:80>
    DocumentRoot "D:/WEB/www/temp"      # 网页根目录
    ServerName www.temp.com             # 网页域名
  </VirtualHost>`);

    SM('设置根目录权限（可选）');
    lst('httpd.conf Apache');
    cmd(`    <Directory "D:\\WEB\\www\\temp">
        Options +Indexes +FollowSymLinks +Multiviews
        AllowOverride All
        // 为所有用户提供服务 用 local 即表示为本地用户提供
        Require all granted
        Allow from all
    </Directory>`);

    lst('---修改 Apache 设置后需重启该服务---');

    LM('虚拟主机');
    SM('目标额外网址：http://www.tp.com/tp.html');

    SM('目录结构');
    cmd(`D:\\WEB\\www\\temp>tree /f
    卷 Cache 的文件夹 PATH 列表
    卷序列号为 65F3-3762
    D:.
    │  demo.html
    │
    └─tp
            tp.html
    
    `);


    SM('hosts 追加');
    tArea('192.168.0.108 www.tp.com');

    SM('添加新域名');
    cmd(`  <VirtualHost *:80>
    DocumentRoot "D:/WEB/www/temp/tp"
    ServerName  www.tp.com
    # 以下内容可不写
    DirectoryIndex index.php
  <Directory />
  Options Indexes FollowSymLinks
  AllowOverride None
  Order allow,deny
  Allow from all
  </Directory>
  </VirtualHost>`);

    SM('最终效果');
    lst('服务端');
    img({
        innerHTML: srcData.svgImg.DT01,
        width: '90%',
        height: 'auto'
    });
    lst('虚拟机（客户机）');
    img({
        innerHTML: srcData.svgImg.DT02,
        width: '90%',
        height: 'auto'
    });

    SL();
    tip('旧版本的问题需自行百度');

    add_normalNode('', ['p', 'normal', '32rem 0']);
}