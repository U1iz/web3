<!DOCTYPE html>
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

</html>