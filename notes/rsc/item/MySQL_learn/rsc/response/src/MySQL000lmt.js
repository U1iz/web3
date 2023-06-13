function call() {} {
    let dir = 'src/MySQL0001/';
    LM('MySQL 字符集');
    SM('MySQL 内部对于数据实际存储的字符集（服务器端）');
    lst('MySQL 内部对象可以在各个层级设置字符集', [111, 'disc', 2]);
    lst('MySQL 内部内嵌支持几乎所有主流字符集', [0, 'disc', 2]);
    lst('MySQL 内部对象存在字符集继承：字段 -> 表 -> 数据库 -> DBMS', [0, 'disc', 2]);
    lst('数据存储的最终字符集由字段控制', [0, 'disc', 2]);
    lst('客户端与服务器交互时，需要明确告知服务器客户端自己的字符集（数据格式）', [0, 'disc', 2]);

    SM('查看 MySQL 支持的所有字符集');
    cmd('show charset;');
    code_fn({
        call_fn: 'cmd',
        text: `mysql> show charset;
+----------+---------------------------------+---------------------+--------+
| Charset  | Description                     | Default collation   | Maxlen |
+----------+---------------------------------+---------------------+--------+
| armscii8 | ARMSCII-8 Armenian              | armscii8_general_ci |      1 |
| ascii    | US ASCII                        | ascii_general_ci    |      1 |
| big5     | Big5 Traditional Chinese        | big5_chinese_ci     |      2 |
| binary   | Binary pseudo charset           | binary              |      1 |
| cp1250   | Windows Central European        | cp1250_general_ci   |      1 |
| cp1251   | Windows Cyrillic                | cp1251_general_ci   |      1 |
| cp1256   | Windows Arabic                  | cp1256_general_ci   |      1 |
| cp1257   | Windows Baltic                  | cp1257_general_ci   |      1 |
| cp850    | DOS West European               | cp850_general_ci    |      1 |
| cp852    | DOS Central European            | cp852_general_ci    |      1 |
| cp866    | DOS Russian                     | cp866_general_ci    |      1 |
| cp932    | SJIS for Windows Japanese       | cp932_japanese_ci   |      2 |
| dec8     | DEC West European               | dec8_swedish_ci     |      1 |
| eucjpms  | UJIS for Windows Japanese       | eucjpms_japanese_ci |      3 |
| euckr    | EUC-KR Korean                   | euckr_korean_ci     |      2 |
| gb18030  | China National Standard GB18030 | gb18030_chinese_ci  |      4 |
| gb2312   | GB2312 Simplified Chinese       | gb2312_chinese_ci   |      2 |
| gbk      | GBK Simplified Chinese          | gbk_chinese_ci      |      2 |
| geostd8  | GEOSTD8 Georgian                | geostd8_general_ci  |      1 |
| greek    | ISO 8859-7 Greek                | greek_general_ci    |      1 |
| hebrew   | ISO 8859-8 Hebrew               | hebrew_general_ci   |      1 |
| hp8      | HP West European                | hp8_english_ci      |      1 |
| keybcs2  | DOS Kamenicky Czech-Slovak      | keybcs2_general_ci  |      1 |
| koi8r    | KOI8-R Relcom Russian           | koi8r_general_ci    |      1 |
| koi8u    | KOI8-U Ukrainian                | koi8u_general_ci    |      1 |
| latin1   | cp1252 West European            | latin1_swedish_ci   |      1 |
| latin2   | ISO 8859-2 Central European     | latin2_general_ci   |      1 |
| latin5   | ISO 8859-9 Turkish              | latin5_turkish_ci   |      1 |
| latin7   | ISO 8859-13 Baltic              | latin7_general_ci   |      1 |
| macce    | Mac Central European            | macce_general_ci    |      1 |
| macroman | Mac West European               | macroman_general_ci |      1 |
| sjis     | Shift-JIS Japanese              | sjis_japanese_ci    |      2 |
| swe7     | 7bit Swedish                    | swe7_swedish_ci     |      1 |
| tis620   | TIS620 Thai                     | tis620_thai_ci      |      1 |
| ucs2     | UCS-2 Unicode                   | ucs2_general_ci     |      2 |
| ujis     | EUC-JP Japanese                 | ujis_japanese_ci    |      3 |
| utf16    | UTF-16 Unicode                  | utf16_general_ci    |      4 |
| utf16le  | UTF-16LE Unicode                | utf16le_general_ci  |      4 |
| utf32    | UTF-32 Unicode                  | utf32_general_ci    |      4 |
| utf8mb3  | UTF-8 Unicode                   | utf8mb3_general_ci  |      3 |
| utf8mb4  | UTF-8 Unicode                   | utf8mb4_0900_ai_ci  |      4 |
+----------+---------------------------------+---------------------+--------+
41 rows in set (0.00 sec)

mysql>`
    }, '查看 "查看MySQL所有支持的字符集"用例');
    lst('MySQL服务端数据存储的字符集依赖各个对象设置', [111, 'disc', 2])

    lst('DBMS：设置最广，一旦设置所有对象都可以依赖，但是优先级最低', [0, 'circle', 3])
    lst('DB：针对数据库内的所有表，优先级高于DBMS，可以继承DBMS（一般在数据库层设置）', [0, 'circle', 3])
    lst('Table：针对当前表的设置，优先级高于DB，可以继承DB', [0, 'circle', 3])
    lst('Field：针对当前字段设置，优先级高于Table，可以继承Table，优先级最高', [0, 'circle', 3])

    lst('通常字符集的设置都是围绕数据表（现在都在数据库层），不会到具体字段', [111, 'disc', 2])

    lst('建议使用UTF8字符集存储数据（MySQL8以后建议使用UTF8MB4）', [111, 'disc', 2])

    lst('MySQL服务端支持各种字符集，并且能够进行各种字符集转换', [111, 'disc', 2])

    lst('客户端存储数据到服务端原理', [111, 'disc', 2])

    lst('客户端告知服务端客户端的字符集', [0, 'circle', 3])
    lst('服务端按照客户端指定的字符集接收数据（如果没有指定，使用默认，可能出现乱码）', [0, 'circle', 3])
    lst('服务端按照实际存储表对应的字符集进行转换', [0, 'circle', 3])
    lst('服务端存储数据', [0, 'circle', 3])

    lst('客户端读取服务端数据原理', [111, 'disc', 2])

    lst('客户端告知服务端客户端的字符集', [0, 'circle', 3])
    lst('服务端按照客户指定的指令从数据库读取原始字符集数据', [0, 'circle', 3])
    lst('服务端按照客户端的需求将数据进行字符转换', [0, 'circle', 3])
    lst('服务端发送目标数据给客户端', [0, 'circle', 3])
    lst('客户端按照自己的字符集进行解', [0, 'circle', 3])
    SL();

    LM('数据库记录长度');
    lst('MySQL中规定一条记录所占用的存储长度最长不超过65535个<b>字节</b></b>');

    lst('记录长度为表中所有字段预计占用的长度之和', [111, 'disc', 2])
    lst('所有字段只有允许Null存在，系统就会预留一个字节存储Null（多个Null也只要一个就好）', [0, 'disc', 2])
    lst('因为MySQL记录长度的存在，varchar永远达不到理论长度', [0, 'disc', 2])
    lst('GBK存储：65535（字符） * 2 + 2 = 131072（字节）', [0, 'circle', 3])
    lst('UTF8存储：65535（字符） * 3 + 2 = 196607（字节）', [0, 'circle', 3])
    lst('一般数据长度超过255个字符都会使用text/blob进行存储<b>（数据存储不占用记录长度）</b>', [0, 'disc', 2])
    space();
}