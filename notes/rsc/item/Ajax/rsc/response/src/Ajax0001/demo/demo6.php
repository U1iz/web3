<?php 

    $arr = array();
    $arr['张三'] = array('age'=>19, 'sex'=>'male', 'height'=>180);
    $arr['李四'] = array('age'=>21, 'sex'=>'female', 'height'=>170);
    $arr['王五'] = array('age'=>16, 'sex'=>'male', 'height'=>190);

    var_dump($arr);

    echo json_encode($arr);

?>