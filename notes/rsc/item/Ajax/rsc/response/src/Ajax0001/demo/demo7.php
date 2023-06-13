<?php 

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

?>