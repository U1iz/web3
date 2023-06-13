let Data = 'ipconfig 查看电脑ip';
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
    

    cmd(`C:\\Users\\username>ipconfig

    Windows IP 配置
    
    
    无线局域网适配器 本地连接* 1:
    
       媒体状态  . . . . . . . . . . . . : 媒体已断开连接
       连接特定的 DNS 后缀 . . . . . . . :
    
    无线局域网适配器 本地连接* 10:
    
       媒体状态  . . . . . . . . . . . . : 媒体已断开连接
       连接特定的 DNS 后缀 . . . . . . . :
    
    以太网适配器 VMware Network Adapter VMnet1:
    
       连接特定的 DNS 后缀 . . . . . . . :
       本地链接 IPv6 地址. . . . . . . . : ----::----:----:----:-------
       IPv4 地址 . . . . . . . . . . . . : 192.168.--.--
       子网掩码  . . . . . . . . . . . . : 255.255.255.0
       默认网关. . . . . . . . . . . . . :
    
    以太网适配器 VMware Network Adapter VMnet8:
    
       连接特定的 DNS 后缀 . . . . . . . :
       本地链接 IPv6 地址. . . . . . . . : ----::----:----:----:------
       IPv4 地址 . . . . . . . . . . . . : 192.168.--.--
       子网掩码  . . . . . . . . . . . . : 255.255.255.0
       默认网关. . . . . . . . . . . . . :
    
    无线局域网适配器 WLAN:
    
       连接特定的 DNS 后缀 . . . . . . . :
       本地链接 IPv6 地址. . . . . . . . : fe80::7d5b:ba78:dc03:f5a7%3
       IPv4 地址 . . . . . . . . . . . . : 192.168.0.108
       子网掩码  . . . . . . . . . . . . : 255.255.255.0
       默认网关. . . . . . . . . . . . . : 192.168.0.1
    
    以太网适配器 蓝牙网络连接:
    
       媒体状态  . . . . . . . . . . . . : 媒体已断开连接
       连接特定的 DNS 后缀 . . . . . . . :
    
    隧道适配器 Teredo Tunneling Pseudo-Interface:
    
       连接特定的 DNS 后缀 . . . . . . . :
       IPv6 地址 . . . . . . . . . . . . : ----:-:----:----:----:----:----:----
       本地链接 IPv6 地址. . . . . . . . : ----::----:----:----:-------
       默认网关. . . . . . . . . . . . . : ::
    `);

    add_normalNode('', ['p', 'normal', '32rem 0']);
}