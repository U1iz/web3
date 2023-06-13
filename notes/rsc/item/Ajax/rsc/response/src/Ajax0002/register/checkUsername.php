<?php

    $uname = $_GET['username'];

    if ($uname == 'zhangsan') {
        echo '<p style="color: red;">用户名已存在！</p><p>username already exists！</p>';
    } else {
        echo '用户名通过验证 username verified';
    }

?>