# MySQL基本操作



[TOC]



## 一、 数据库

1. 创建结构

   ```sql
   create 结构类型 结构名 结构描述
   ```

   

2. 显示结构

   ```sql
   # 显示结构
   show 结构类型（复数）
   
   
   # 显示具体结构
   show create 结构类型 结构名
   ```

   

3. 数据操作（数据表）

   ```sql
   #新增数据
   insert into 表名 values
   
   #查看数据
   select from 表名
   
   #更新数据
   update 表名 set 
   
   #删除数据
   delete from 表名
   ```

   ------

   

### 1、 创建数据库

> 语法

```sql
create database 数据库名称 [数据库选项]
```



> 实例

```sql
mysql> create database db_01;
Query OK, 1 row affected (0.01 sec)

mysql> create database db_02 charset utf8MB4;
Query OK, 1 row affected, 1 warning (0.01 sec)
```



> 概念

- ### 创建的数据库会在 "安装目录/Data" 下自动生成对应名称的文件夹作为数据库的根目录。

  - ***自定义数据库名称***
    - 数字、字母和下划线组成
    - 不区分大小写
    - 数字不能开头
  - ***数据库选项:***
    - 字符集：charset/character set 字符集，默认继承 DBMS。
    - 校对集：collate 校对集，依赖字符集。



> Data 目录

![image-20221120192435339](http://96yzl.vip/notes/rsc/item/MySQL_learn/rsc/response/src/Markdown/md/fin/img/image-20221120192435339.webp)

### 2、 显示数据库信息

- ***显示当前 DBMS 下创建的所有数据库***

> 语法

```sql
show databases;
```



> 实例

```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| db_00              |
| db_01              |
| db_02              |
| information_schema |
| mysql              |
| performance_schema |
| sakila             |
| sys                |
| world              |
+--------------------+
9 rows in set (0.02 sec)
```



- ***显示当前数据库创建指令***

> 语法

```sql
show create database 表名;
```



> 实例

```sql
mysql> show create database db_01;
+----------+---------------------------------------------------------------------------------------------------------------------------------+
| Database | Create Database                                                                                                                 |
+----------+---------------------------------------------------------------------------------------------------------------------------------+
| db_01    | CREATE DATABASE `db_01` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */ |
+----------+---------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```



### 3、 使用数据库

> 概念

**使用数据库**：指在进行具体SQL指令之前，让系统知道操作针对的是哪个数据库

- 数据库的操作通常是针对数据表或者数据
- 通过使用数据库可以让后续指令默认针对具体数据库环境
- 简化后续SQL指令的复杂度（如果不指定数据库，那么所有的SQL操作都必须强制指定数据库名字）



> 语法

```sql
use 数据库名称;
```



> 实例

```sql
mysql> use db_01;
Database changed
```



### 4、 修改数据库

> 概念

- 数据库名称不可修改（老版本可以）
- 数据库修改分为两部分
  - 字符集
  - 校对集



> 语法

```sql
alter database 数据库名称 库选项;
```

***参数等同于 "创建表"***



### 5、 删除数据库

> 概念

**删除数据库**：将当前已有数据库删除

- 删除数据库会删除数据库内所有的表和数据
- 删除数据库操作要慎重（删前备份）
- 删除数据库后，对应的存储文件夹就会消失
- 删除语法

数据库的删除 **不可逆**



> 语法

```sql
drop database 数据库名称;
```

***所有的结构删除都是使用的 "drop"***



> 实例

```sql
mysql> create database temp;
Query OK, 1 row affected (0.01 sec)

mysql> drop database temp;
Query OK, 0 rows affected (0.00 sec)
```

------



## 二、 数据表 （字段）

### 1、 创建数据表

> 概念

**创建数据表**：根据业务需求，确定数据表的字段信息，然后创建表结构

- 表与字段不分家，相辅相成
- 表的创建需要指定存储的数据库
  - 明确指定数据库：`数据库.表名`
  - 先使用数据库：`use 数据库名称`
- 字段至少需要指定`名字`、`类型`
- 数据库表不限定字段数量
  - 每个字段间使用逗号 `,` 分隔
  - 最后一个字段不需要逗号
- 表可以指定表选项（都有默认值）
  - 存储引擎：engine [=] 具体存储引擎
  - 字符集：[default] charset 具体字符集（继承数据库）
  - 校对集：collate（继承数据库）



> 语法

```sql
create table [数据库名.]表名(
	字段名 字段类型,
	...
	字段名 字段类型
)表选项;
```



> 实例

1. 创建简单数据表

   ```sql
   mysql> use db_00;
   Database changed
   mysql> create table t_00(
       -> name varchar(50)
       -> );
   Query OK, 0 rows affected (0.02 sec)
   ```

   

2. 创建多字段数据表

   ```sql
   mysql> create table t_01(
       -> name varchar(50),
       -> age int,
       -> gender varchar(10)
       -> );
   Query OK, 0 rows affected (0.01 sec)
   ```

   

3. 附带表选项

   ```sql
   mysql> create table t_02(
       -> name varchar(60)
       -> )engine Innodb charset utf8MB4;
   Query OK, 0 rows affected (0.01 sec)
   ```



#### 扩展

存储引擎是指数据存储和管理的方式，MySQL中提供了多种存储引擎，一般使用默认存储引擎

- InnoDB
  - 默认存储引擎
  - 支持事务处理和外键
  - 数据统一管理
- MyIsam
  - 不支持事务和外键
  - 数据、表结构、索引独立管理
  - MySQL5.6以后不再维护



如果想创建一个与已有表一样的数据表，MySQL提供了一种便捷的复制模式

> 语法

```sql
create table 表名 like [数据库名.]表名
```



> 实例

```sql
mysql> create table t_01_copy like t_01;
Query OK, 0 rows affected (0.01 sec)
```



### 2、 显示数据表

> 概念

**显示数据表**：客户端通过指令显示已有的数据表

- 数据表的显示跟用户权限有关
- 显示数据表有两种方式
  - 显示所有数据表
  - 显示具体数据表的创建指令



- #### 显示所有数据表 (名称)

  - **当前数据库下**

  > 语法

  ```sql
  show tables;
  ```

  

  > 实例

  ```sql
  mysql> show tables;
  +-----------------+
  | Tables_in_db_00 |
  +-----------------+
  | t_00            |
  | t_01            |
  | t_01_copy       |
  | t_02            |
  +-----------------+
  4 rows in set (0.01 sec)
  ```

  

  - **指定数据库**

  > 语法

  ```sql
  show tables form 数据库名;
  ```

  

  > 实例

  ```sql
  mysql> show tables from db_00;
  +-----------------+
  | Tables_in_db_00 |
  +-----------------+
  | t_00            |
  | t_01            |
  | t_01_copy       |
  | t_02            |
  +-----------------+
  4 rows in set (0.00 sec)
  
  mysql> show tables from db_01;
  Empty set (0.00 sec)
  
  mysql> show tables from db_02;
  Empty set (0.00 sec)
  ```

  - **匹配**

  > 语法

  ```sql
  show tables like 'pattern';
  # _表示匹配一个字符（固定位置），%表示匹配N个字符
  ```

  

  > 实例

  ```sql
  mysql> show tables like '%_0%';
  +------------------------+
  | Tables_in_db_00 (%_0%) |
  +------------------------+
  | t_00                   |
  | t_01                   |
  | t_01_copy              |
  | t_02                   |
  +------------------------+
  4 rows in set (0.00 sec)
  
  mysql> show tables like '%_0_';
  +------------------------+
  | Tables_in_db_00 (%_0_) |
  +------------------------+
  | t_00                   |
  | t_01                   |
  | t_02                   |
  +------------------------+
  3 rows in set (0.00 sec)
  ```

  

- #### 显示数据表的创建指令及结构

> 语法

```sql
show create table t_1;
# 看到的结果未必一定是真实创建的指令（系统会加工）
```



> 实例

```sql
mysql> show create table t_01;
+-------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table | Create Table                                                                                                                                                                              |
+-------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| t_01  | CREATE TABLE `t_01` (
  `name` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
+-------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```

```sql
mysql> show create table t_01_copy;
+-----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table     | Create Table                                                                                                                                                                                   |
+-----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| t_01_copy | CREATE TABLE `t_01_copy` (
  `name` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
+-----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```



#### 扩展

- **在显示数据的时候可以使用不同的语句结束符**

  - `\g`：与普通分号无区别

  - `\G`：纵向显示列数据

> 实例

```sql
mysql> show create table t_01\g
+-------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table | Create Table                                                                                                                                                                              |
+-------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| t_01  | CREATE TABLE `t_01` (
  `name` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
+-------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```



```sql
mysql> show create table t_01\G
*************************** 1. row ***************************
       Table: t_01
Create Table: CREATE TABLE `t_01` (
  `name` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
1 row in set (0.00 sec)
```

### 3、 查看数据表

> 语法

三种语法，效果相同

```sql
desc 表名;
describe 表名;
show columns from 表名;
```





> 实例

```sql
mysql> desc t_01;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| name   | varchar(50) | YES  |     | NULL    |       |
| age    | int         | YES  |     | NULL    |       |
| gender | varchar(10) | YES  |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

```sql
mysql> describe t_01;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| name   | varchar(50) | YES  |     | NULL    |       |
| age    | int         | YES  |     | NULL    |       |
| gender | varchar(10) | YES  |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

```sql
mysql> show columns from t_01;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| name   | varchar(50) | YES  |     | NULL    |       |
| age    | int         | YES  |     | NULL    |       |
| gender | varchar(10) | YES  |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
3 rows in set (0.01 sec)
```





### 4、 更改数据表

- 修改表名

  > 语法

  ```sql
  rename table 原表名 to 新表名;
  ```

  > 实例

  ```sql
  mysql> show tables;
  +-----------------+
  | Tables_in_db_00 |
  +-----------------+
  | t_00            |
  | t_01            |
  | t_01_copy       |
  | t_02            |
  +-----------------+
  4 rows in set (0.00 sec)
  
  mysql> rename table t_01_copy to t_01_like;
  Query OK, 0 rows affected (0.03 sec)
  
  mysql> show tables;
  +-----------------+
  | Tables_in_db_00 |
  +-----------------+
  | t_00            |
  | t_01            |
  | t_01_like       |
  | t_02            |
  +-----------------+
  4 rows in set (0.00 sec)
  ```

  

- 修改表选项

  > 语法

  ```sql
  alter table 表名 参数名 参数值;
  ```

  > 实例

  ```sql
  mysql> show create table t_00\G
  *************************** 1. row ***************************
         Table: t_00
  Create Table: CREATE TABLE `t_00` (
    `name` varchar(50) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  1 row in set (0.00 sec)
  
  mysql> alter table t_00 charset utf8;
  Query OK, 0 rows affected, 1 warning (0.01 sec)
  Records: 0  Duplicates: 0  Warnings: 1
  
  mysql> show create table t_00\G
  *************************** 1. row ***************************
         Table: t_00
  Create Table: CREATE TABLE `t_00` (
    `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
  1 row in set (0.00 sec)
  ```

  

### 5、 更改字段

#### 5.1、 新增字段

*默认追加到所有字段末尾*

> 语法

```sql
alter table 表名 add [column] 字段名 字段类型 [字段属性] [字段位置]
```



> 实例

```sql
mysql> desc t_00;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| name  | varchar(50) | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
1 row in set (0.00 sec)

mysql> alter table t_00 add age int;
Query OK, 0 rows affected (0.01 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> desc t_00;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| name  | varchar(50) | YES  |     | NULL    |       |
| age   | int         | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
2 rows in set (0.00 sec)
```



#### 5.2、 字段位置
