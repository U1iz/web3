function call() {
    let dir = 'src/MySQL0002/';
    LM('SQL 语法规则');
    lst('基础SQL指令通常是以行为单位', [111, 'square', 2])
    lst('SQL指令需要语句结束符，默认是 英文分号：' + b(';') + ' ' + b(' \\g') + ' ' + b(' \\G'), [0, 'square', 2])
    lst('\\G：主要用于查询数据，立体展示结果', [0, 'square', 2])
    lst('SQL指令类似自然语言', [0, 'square', 3])
    lst('编写的SQL中如果用到了关键字或者保留字，需要使用反引号``来包裹，让系统忽略', [0, 'square', 2])
    SL();

    SM('结构创建');
    cmd('create 结构类型 结构名 结构描述;');
    SM('显示结构');
    cmd(`#显示结构
show 结构类型（复数）;

#显示结构创建详情
show create 结构类型 结构名;`);
    SM('数据操作（数据表）');
    cmd(`#新增数据
insert into 表名 values

#查看数据
select from 表名

#更新数据
update 表名 set 

#删除数据
delete from 表名`);

    lst('SQL是一种类似于自然语言的编程语言', [111, 'none', 2])

    lst('基本SQL指令以行为单位', [0, 'disc', 3])
    lst('SQL指令需要语句结束符', [0, 'disc', 3])

    lst('根据数据库的对象层级，可以将基础SQL操作分为三类', [111, 'none', 2])

    lst('库操作：数据库相关操作', [0, 'disc', 3])
    lst('表操作：数据表（字段）相关操作', [0, 'disc', 3])
    lst('数据操作：数据相关操作', [0, 'disc', 3])
    space();
}