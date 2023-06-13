<?php
    $file = $_POST['file'];
    echo file_get_contents('./md/'. $file . '.md');
?>