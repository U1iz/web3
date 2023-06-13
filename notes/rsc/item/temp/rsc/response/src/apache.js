function call() {} {
    // let dir = 'src/01/';
    LM('Apache添加本地网站');
    SM('httpd.conf');
    hlc(`<Directory "C:\\Users\\(网站根目录)">
    Options +Indexes +FollowSymLinks +Multiviews
    AllowOverride All
    Require all granted
    Allow from all
</Directory>`);
    SM('httpd-vhosts.conf');
    hlc(`<VirtualHost *:端口,默认80>
    DocumentRoot "网站根目录"
    ServerName  任意网址
</VirtualHost>`);
    SM('hosts');
    lst('终端输入 ipconfig 获取 “无线局域网适配器 WLAN 下 IPv4地址”');
    lst('将获取到的地址用于修改host');
    lst('重复以上方法可以添加多个本地网站');
    tip('C:/Windows/System32/drivers/etc');
    hlc(`192.168.0.116 任意网址
192.168.0.116 任意网址2`);
    lst('最终刷新本机dns完成映射');
    hlc('ipconfig /flushdns');
    space();
}