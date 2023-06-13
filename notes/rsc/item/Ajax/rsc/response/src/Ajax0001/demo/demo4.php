<?php 

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

?>