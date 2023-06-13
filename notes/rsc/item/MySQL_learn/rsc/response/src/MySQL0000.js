function call() {} {
    let dir = 'src/MySQL0000/';
    LM('数据库 database(DB)');
    tip('一种存储数据的仓库');

    lst('数据库是根据数据结构组织、 存储和管理数据', [111, 'disc', 2])
    lst('数据库能够' + b('长期、 高效的管理和存储数据'), [0, 'disc', 2])
    lst('数据库的目的就是能够存储（写） 和提供（读） 数据', [0, 'disc', 2])

    LM('数据库分类');
    tip('根据数据库的架构和数据组织原理进行分类');
    lst('早期根据数据库的组织数据的存储模型分类', [111, 'disc', 2])


    lst('层次数据库： 基于层次的数据结构（数据分层）', [0, 'circle', 3])
    lst('网状数据库： 基于网状的数据结构（数据网络）', [0, 'circle', 3])
    lst('关系数据库： 基于关系模型的数据结构（二维表）', [0, 'circle', 3])

    lst('现在较多根据实际数据管理模型分类（存储介质）', [111, 'disc', 2])

    lst('关系型数据库： 基于关系模型的数据结构（二维表）通常存储在磁盘', [0, 'circle', 3])
    lst('非关系型数据库： 没有具体模型的数据结构（键值对）通常存储在内存', [0, 'circle', 3])

    LM('关系型数据库');
    lst('关系模型', [111, 'disc', 2])
    lst('关系数据结构（存储）', [0, 'circle', 3])
    lst('关系操作集合（操作）', [0, 'circle', 3])
    lst('关系完整性约束（约束）', [0, 'circle', 3])
    lst('关系型数据库存储在磁盘中（永久性存储）', [111, 'disc', 2])
    lst('关系型数据库系统（DBS）模型有四层结构', [111, 'disc', 2])
    lst('数据库管理系统（DBMS）：管理系统运行（DataBase Management System）', [0, 'circle', 3])
    lst('数据库（DB）：数据存储的管理者（小管理，受DBMS管理）', [0, 'circle', 3])
    lst('数据表（Table）：数据关系管理者', [0, 'circle', 3])
    lst('数据字段（Field）：依赖于数据表，实际数据存储者', [0, 'circle', 3])
    lst('关系型数据库产品', [111, 'disc', 2])
    lst('大型：Oracle、DB2', [0, 'circle', 3])
    lst('中型：MySQL、SqlServer', [0, 'circle', 3])
    lst('小型：Sybase、Access', [0, 'circle', 3])

    LM('非关系型数据库');
    tip('NoSQL（Not only SQL），不仅仅是关系型数据库');
    lst('所有不是关系型数据库的统称', [111, 'disc', 2])
    lst('数据存储模型不是二维表，而是键值对（key->value）', [0, 'disc', 2])
    lst('存储的位置通常是内存（效率高）', [0, 'disc', 2])
    lst('不能永久性存储（需要定时存到关系型数据库中）', [0, 'disc', 2])
    lst('常见的非关系型数据库产品', [0, 'disc', 2])
    lst('MongoDB', [0, 'circle', 3])
    lst('Redis', [0, 'circle', 3])
    lst('Memcached', [0, 'circle', 3])

    tip('NoSQL通常是与关系型数据库配合使用的，他们彼此是一种互补关系')
    lst('NoSQL运行在内存，解决效率问题', [111, 'disc', 2])
    lst('I/O问题', [0, 'circle', 3])
    lst('效率问题', [0, 'circle', 3])
    lst('MySQL运行在磁盘，解决稳定问题', [111, 'disc', 2])
    lst('安全问题（永久存储）', [0, 'circle', 3])
    lst('稳定', [0, 'circle', 3])


    space();

    lst('NoSQL是对非关系型数据库的一类统称', [111, 'disc', 2])

    lst('NoSQL是不仅仅只是关系型数据库的意思', [0, 'circle', 4])

    lst('NoSQL通常运行在内存', [111, 'disc', 2])

    lst('读取效率高', [0, 'circle', 4])
    lst('并发访问高', [0, 'circle', 4])
    lst('稳定性不高（断电即丢失）', [0, 'circle', 4])

    lst('NoSQL通常是键值对存储数据，访问也比较简单', [111, 'disc', 2])
    SL();

    LM('SQL基本介绍');
    tip('SQL：Structured Query Language，结构化查询语言，是一种针对关系型数据库特殊标准化的编程语言');
    lst('SQL是一种编程语言', [111, 'disc', 2])

    lst('能够实现用户数据库查询和程序设计', [0, 'disc', 2])
    lst('SQL根据操作不同，分为几类', [0, 'disc', 2])
    lst('DQL：Data Query Language，数据查询语言，用于查询和检索数据', [0, 'circle', 3])
    lst('DML：Data Manipulation Language，数据操作语言，用于数据的写操作（增删改） ', [0, 'circle', 3])
    lst('DDL：Data Definition Language，数据定义语言，用于创建数据结构', [0, 'circle', 3])
    lst('DCL：Data Control Language，数据控制语言，用于用户权限管理', [0, 'circle', 3])
    lst('TPL：Transaction Process Language，事务处理语言，辅助DML进行事务操作（因此也归属于DML）', [0, 'circle', 3])

    lst('SQL虽然是编程语言，但是目前数据库通常只用来进行数据管理（逻辑部分给其他编程语言）', [111, ' cjk-ideographic', 1])
    lst('SQL虽然是针对关系型数据库的通用语言，但是不同的产品操作指令不完全通用', [0, ' cjk-ideographic', 1])

    SL();

    LM('MySQL基本介绍');
    lst('MySQL 是瑞典 AB 公司下的一款 <b>关系型数据库</b>', [111, 'none', 2]);
    lst('MySQL 当前属于甲骨文公司 （AB > Sun > Oracle）', [0, 'disc', 3]);
    lst('MySQL  开源免费 （部分存储引擎）', [0, 'disc', 3]);
    lst('MySQL 是一种 C/S 结构软件，因此需要 MySQL 的客户端来访问服务端 （数据管理）', [0, 'disc', 3]);
    lst('mysqld.exe： 服务端', [0, 'disc', 4]);
    lst('mysql.exe： 客户端', [0, 'disc', 4]);
    lst('MySQL 使用 SQL 指令来对数据库操作', [0, 'disc', 3]);

    lst('MySQL是一种C/S结构的软件，所以访问者必须通过客户端进行访问', [111, 'disc', 2]);
    lst('客户端与服务端通常不会在一台电脑上', [0, 'square', 3])
    lst('客户端访问服务端需要寻址、授权（-hPup）', [0, 'square', 3])
    lst('MySQL服务端的连接数是有限的，时刻注意用完就销毁（减少资源无效占用）', [0, 'square', 3])
    space();
}