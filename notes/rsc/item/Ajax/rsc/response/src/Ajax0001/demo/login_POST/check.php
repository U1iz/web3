<?php 

    $username = $_POST['username'];
    $password = $_POST['password'];

    // 实际应用场景应该查询数据库
    if ($username == 'admin' && $password == '123') {
        echo 'Login Successful';
    } else {
        echo 'Login Failed';
    }

?>