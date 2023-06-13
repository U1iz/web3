<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>你未正确载入js，请确保目录结构无误！</title>
    <link rel="stylesheet" href="../CSS/page_style.css">
    <script src="../lib/add_CSSNode.js"></script>
    <script src="/notes/lib//jQuery.min.js"></script>
    <script src="/notes/rsc/lib/lib.min.js"></script>
    <script src="/notes/rsc/lib/local_lib.min.js"></script>
    <script src="/notes/rsc/lib/add_formNode.min.js"></script>
</head>

<body>
    <?php
        $js_path = $_GET['path'];
        echo '<script src="src/' . $js_path . '.js"></script>';
    ?>
    <script src="/notes/rsc/lib/toggle.js"></script>
    <script src="/notes/rsc/lib/CodeRenderer.js"></script>
</body>

</html>