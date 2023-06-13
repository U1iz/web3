<?php 

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

?>