function call() {
    let dir = 'src/MySQL0001/';
    SM('配置环境变量所需文件目录');
    lst('安装目录/MySQL/MySQL Server 8.0/bin');
    SL();

    LM('MySQL 访问');
    SM('客户端连接上服务端，然后实现数据操作的过程');

    lst('客户端访问服务端', [111, 'disc', 2]);
    lst('自带客户端 mysql.exe: Windows 下借助 CMD', [0, 'circle', 3]);
    lst('利用数据库管理工具（Navicat），图形化管理', [0, 'circle', 3]);
    lst('支持 MySQL 扩展的编程语言: PHP、Java 等', [0, 'circle', 3]);
    lst('客户端需要连接认证', [111, 'disc', 2]);
    lst('-h: 主机地址（本机 localhost 可以省略）', [0, 'circle', 3]);
    lst('-P: 端口号（默认 3306 可以省略）', [0, 'circle', 3]);
    lst('-u: 用户名', [0, 'circle', 3]);
    lst('-p: 用户密码', [0, 'circle', 3]);
    lst('客户端连接上服务端就表示占用了一个资源，可以进行对应权限的操作', [111, 'disc', 2]);
    lst('MySQL 数据库连接资源有限：单个服务器最多 16384 个', [0, 'circle', 3]);
    lst('当连接资源不够了，其它访问就需要排队等待', [0, 'circle', 3]);
    lst('用完应尽可能释放资源', [0, 'circle', 3]);
    lst('客户端退出服务端', [111, 'disc', 2]);
    lst('\\q', [0, 'circle', 3]);
    lst('quit', [0, 'circle', 3]);
    lst('exit', [0, 'circle', 3]);

    SM('举个栗子');
    tip('这里 -p 参数后面不能跟空格');
    lst('mysql.exe -h localhost -P 3306 -u root -p你的密码', [111, 'none', 2]);
    lst('登陆成功会额外提示', [0, 'none', 3]);
    lst('mysql: [Warning] Using a password on the command line interface can be insecure.', [0, 'none', 4]);
    lst('mysql.exe -h localhost -P 3306 -u root -p', [111, 'none', 2]);
    lst('Enter password: 需要手动输入密码', [0, 'none', 3]);

    lst('<b>简化</b>', [111, 'none', 2]);
    lst('mysql -u root -p你的密码', [0, 'none', 3]);
    code_fn({
        call_fn: 'cmd',
        text: `Microsoft Windows [版本 10.0.19044.1645]
(c) Microsoft Corporation。保留所有权利。

C:\\WINDOWS\\system32>mysql -hlocalhost -P3306 -uroot -ptemp
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 10
Server version: 8.0.30 MySQL Community Server - GPL

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.

mysql> \\q
Bye

C:\\WINDOWS\\system32>mysql -u root -p
Enter password: ****
Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 11
Server version: 8.0.30 MySQL Community Server - GPL

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.

mysql>`
    }, '查看 栗子')
    SL();

    LM('在登陆时可能遇到的 疑难杂症');

    SM('启动/关闭 MySQL 服务');
    SM('方法一');
    lst('<b>以管理员身份运行cmd</b>');
    code_fn({
        call_fn: 'cmd',
        text: `C:\\WINDOWS\\system32>net start mysql
MySQL 服务正在启动 .
MySQL 服务已经启动成功。


C:\\WINDOWS\\system32>net stop mysql
MySQL 服务正在停止.
MySQL 服务已成功停止。


C:\\WINDOWS\\system32>`
    });

    SM('方法二');
    lst('进入计算机管理手动开关');

    img_fn(dir + 'img/compmgmt_1.png', '60%');
    img_fn(dir + 'img/compmgmt_2.png', '40%');

    SM('如果无法通过 net start 启动服务');
    lst('可以以管理员身份在环境变量所在目录打开cmd 先卸载 mysqld');
    cmd('C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin>mysqld --remove');
    lst('再 下载 mysqd 解决');
    cmd('C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin>mysqld --install');

    LM('修改用户密码 适用于 MySQL 8.0');
    cmd("alter user 'root'@'localhost' identified by '你的新密码';");
    code_fn({
        call_fn: 'cmd',
        text: `Microsoft Windows [版本 10.0.19044.1645]
(c) Microsoft Corporation。保留所有权利。

:: 原密码: temp
C:\\WINDOWS\\system32>mysql -u root -ptemp
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 11
Server version: 8.0.30 MySQL Community Server - GPL

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.

:: 新密码: temp_pwd
mysql> alter user 'root'@'localhost' identified by 'temp_pwd';
Query OK, 0 rows affected (0.00 sec)

mysql> \\q
Bye

:: 使用新密码登陆
C:\\WINDOWS\\system32>mysql -u root -ptemp_pwd
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 12
Server version: 8.0.30 MySQL Community Server - GPL

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.

mysql>`
    }, '查看 修改密码样例');

    space();
}