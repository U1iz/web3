let Data = 'PHP 动态网站';
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

$('head').append('<script src="src/Ajax0001/data.js"></script>');

function call(Data) {
    function span(str, color) {
        let c = 'red';
        if (color) {
            c = color;
        }
        return '<span style="color:' + c + ';position:relative;top:-0.12rem;">' + str + '</span>';
    }
    topic(Data, '#24272e');
    add_normalNode('', ['p', 'normal', '3rem 0']);
    lst(`作为游客，你在这里所看到的的每一个笔记页面都是一字一词敲上去的
        这些是静态网站`);

    lst('用PHP可以制作动态网站，一般以asp，jsp，php，aspx 等结尾');

    LM('PHP 基本语法格式');
    lst('所有代码都要写在 ' + span('<?php...?>') + ' 里面');
    lst('PHP 代码可以嵌入HTML使用');
    lst('PHP 代码必须在服务器执行');

    LM('PHP echo用法');
    SM('demo.php');
    link('demo.php', './src/Ajax0001/demo/demo.php');
    code(`<?php
        echo '<h2>123</h2>';
?>`);
    img({
        innerHTML: srcData.svgImg.SI01,
        width: '90%',
        height: 'auto'
    });
    SL();

    LM('PHP 嵌入用法');
    SM('demo2.php');
    link('demo2.php', './src/Ajax0001/demo/demo2.php');
    code(`<!DOCTYPE html>
    <html lang="zh-cn">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>嵌入式PHP</title>
    </head>
    <body>
        <div><?php echo "<h3>123</h3>" ?></div>
    </body>
    </html>`);
    img({
        innerHTML: srcData.svgImg.SI02,
        width: '90%',
        height: 'auto'
    });
    SL();

    LM('echo 的概念');
    lst('echo 的作用是向页面输入字符串，类似于js中的innerHTML');

    SM('其他输出方式');
    lst('print_r 输入复杂类型');
    lst('var_dump 输出复杂类型');

    LM('PHP 中代码的声明和调用');
    SM('demo3.php');
    link('demo3.php', './src/Ajax0001/demo/demo3.php');
    code(`<?php 

        // 声明变量名前要加 $ 符号
        $str = '123abc';
        // 调用变量时前也要加 $ 符号
        echo $str;

        // 运算使用
        $num1 = 100;
        $num2 = 200;
        $rst = $num1 + $num2;

        echo  $rst;

        // 字符串拼接
        // 符号 + 特指数学加法运算
        $s1 = '11';
        $s2 = '22';
        $s3 = $s1 + $s2;
        echo '</br>' . "字符串拼接结果为\t" . $s3;

?>`);
    img({
        innerHTML: srcData.svgImg.SI03,
        width: '90%',
        height: 'auto'
    });
    SL();

    LM('PHP 中声明与打印数组');
    SM('demo4.php');
    link('demo4.php', './src/Ajax0001/demo/demo4.php');
    code(`<?php 

        // 数组定义 方法1
        $arr = array();
        $arr[0] = 'zs';
        $arr[1] = 'ls';
        $arr[2] = 'ww';
        // 数组定义 方法2
        $arr = array('zs', 'ls', 'ww');

        echo $arr[0] . $arr[1] . $arr[2];

        print_r($arr);
        var_dump($arr);

        echo '<br>';

        // 将数组转为json格式的字符串
        $result = json_encode($arr);
        echo $result;

?>`);
    img({
        innerHTML: srcData.svgImg.SI04,
        width: '90%',
        height: 'auto'
    });
    SL();

    LM('自定义数组索引');
    SM('demo5.php');
    link('demo5.php', './src/Ajax0001/demo/demo5.php');
    code(`<?php 

        $arr1 = array('index1'=>'zs', 'ls', 'ww');
        $arr2 = array('zs', 'index1'=>'ls', 'ww');
        $arr3 = array('index1'=>'zs', 'index2'=>'ls', 'index3'=>'ww');

        // 调用函数
        print2page($arr1);
        print2page($arr2);
        print2page($arr3);

        // PHP 中函数的使用与js相像
        function print2page($arr){
            $result = json_encode($arr);
            echo $result;
            echo '<br>';
            var_dump($arr);
            echo '<br>';
        }

?>`);
    img({
        innerHTML: srcData.svgImg.SI05,
        width: '90%',
        height: 'auto'
    });
    SL();

    LM('二维数组（类似于js中的对象）');
    SM('demo6.php');
    link('demo6.php', './src/Ajax0001/demo/demo6.php');
    code(`<?php 

        $arr = array();
        $arr['张三'] = array('age'=>19, 'sex'=>'male', 'height'=>180);
        $arr['李四'] = array('age'=>21, 'sex'=>'female', 'height'=>170);
        $arr['王五'] = array('age'=>16, 'sex'=>'male', 'height'=>190);

        var_dump($arr);

        echo json_encode($arr);

?>`);
    img({
        innerHTML: srcData.svgImg.SI06,
        width: '90%',
        height: 'auto'
    });
    SL();

    LM('数组的遍历');
    SM('demo7.php');
    link('demo7.php', './src/Ajax0001/demo/demo7.php');
    code(`<?php 

        // 对于普通 的索引可以用 for 循环，与 js 相像
        $arr = array('zs', 'ls', 'ww');
        for ($i = 0; $i < count($arr); $i++) {
            $temp = $arr[$i];
            echo $temp . '<br>';
        }

        echo '<p>-----------------------</p>';

        // foreach 的使用范围更广
        $arr = array('name1' => 'zs', 'name2' => 'ls', 'name3' => 'ww');
        foreach ($arr as $key => $value) {
            echo $key . " => " . $value . '<br>';
        }

?>`);
    lst('foreach (传入的数组 as 传参（键） => 传参（值）)');
    img({
        innerHTML: srcData.svgImg.SI07,
        width: '90%',
        height: 'auto'
    });
    SL();

    LM('PHP get&post');
    lst('get 会将数据追加在URL后，post不会，两者区别不大，');
    SM('GET');
    link('login', './src/Ajax0001/demo/login_GET/index.html');
    SM('index.html');
    code(`    <body>
        <h1>登陆界面</h1>
        <form action="./check.php" method="get">
    
            用户名：<input type="text" name="username"><br>
            密码：<input type="password" name="password"><br>
            <input type="submit" value="提交">
    
        </form>
    </body>`);
    SM('check.php');
    code(`<?php 

        $username = $_GET['username'];
        $password = $_GET['password'];

        // 实际应用场景应该查询数据库
        if ($username == 'admin' && $password == '123') {
            echo 'Login Successful';
        } else {
            echo 'Login Failed';
        }

?>`);
    video({
        fullPath: '../media/p02/bandicam 2022-06-04 12-21-38-674.mp4'
    });
    SL();

    SM('POST');
    link('login', './src/Ajax0001/demo/login_POST/index.html');
    SM('index.html');
    code(`    <body>
        <h1>登陆界面</h1>
        <form action="./check.php" method="post">
    
            用户名：<input type="text" name="username"><br>
            密码：<input type="password" name="password"><br>
            <input type="submit" value="提交">
    
        </form>
    </body>`);
    SM('check.php');
    code(`<?php 

        $username = $_POST['username'];
        $password = $_POST['password'];

        // 实际应用场景应该查询数据库
        if ($username == 'admin' && $password == '123') {
            echo 'Login Successful';
        } else {
            echo 'Login Failed';
        }

?>`);
    video({
        fullPath: '../media/p02/bandicam 2022-06-04 12-45-17-550.mp4'
    });
    SL('6rem', '12rem');

    LM('练习：学生成绩查询');
    link('index.html', './src/Ajax0001/demo/score_query/index.html');
    SM('index.html');
    tArea(`<!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>登陆</title>
    </head>
    <body>
        <h1>登陆界面</h1>
        <form action="./query.php" method="get">
    
            学生名：<input type="text" name="username"><br>
            <input type="submit" value="查询">
    
        </form>
    </body>
    </html>`);
    SM('query.php');
    tArea(`<!DOCTYPE html>
    <html lang="zh-CN">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>查询结果</title>
    </head>
    
    <body>
        <?php
    
        $uname = $_GET['username'];
    
        $scoreArr['张三'] = array('Chinese' => 100, 'Math' => 90, 'English' => 70);
        $scoreArr['李四'] = array('Chinese' => 120, 'Math' => 60, 'English' => 80);
        $scoreArr['王五'] = array('Chinese' => 70, 'Math' => 90, 'English' => 110);
    
    
        ?>
    
        <div>
            <?php
            if (array_key_exists($uname, $scoreArr)) {
                $rst = $scoreArr[$uname];
    
            ?>
    
                <h3><?php echo $uname . '的成绩如下'; ?></h3>
                <ul>
                    <li><?php echo '语文：' . $rst['Chinese']; ?></li>
                    <li><?php echo '数学：' . $rst['Math']; ?></li>
                    <li><?php echo '英语：' . $rst['English']; ?></li>
                </ul>
    
            <?php
            } else {
            ?>
                <h3>查无此人</h3>
            <?php
            }
            ?>
        </div>
    </body>
    
    </html>`);
    video({
        fullPath: '../media/p02/bandicam 2022-06-04 13-53-39-629.mp4'
    });
    SL();


    add_normalNode('PHP 基础---结束---', ['p', 'normal', '6rem 0 6rem 6rem']);

    // lst('动态网站');
    add_normalNode('', ['p', 'normal', '32rem 0']);
}