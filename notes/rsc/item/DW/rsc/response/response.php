<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>你未正确载入js，请确保目录结构无误！</title>
    <link rel="stylesheet" href="../CSS/page_style.css">
    <script src="/notes/lib//jQuery.min.js"></script>
    <script src="/notes/rsc/lib/lib.min.js"></script>
    <script src="/notes/rsc/lib/local_lib.min.js"></script>
    <?php if (file_exists("../../js/lfn.js")) {
        echo '<script src="../../js/lfn.js"></script>';
    } ?>
    <script src="/notes/rsc/lib/Q_KVM_lib.min.js"></script>
    <script src="/notes/rsc/lib/add_formNode.min.js"></script>
    <?php echo '<script src="/notes/rsc/item/add_CSSNode/add_CSSNode-' . $_GET['root'] . '.js"></script>'; ?>
    <script>
        (title => {
            let fileDate = title;
            setDocTitle(fileDate);
            window.addEventListener('load', () => {
                call();
            })
        })(<?php echo '"' . $_GET['tit'] . '"' ?>);
    </script>
</head>

<body>
    <script src="/notes/rsc/lib/beforeLoading.js"></script>
    <?php
    $js_path = $_GET['path'];
    echo '<script src="src/' . $js_path . '.js"></script>';
    ?>
    <script>
        setTimeout(function() {
            //手动触发窗口resize事件
            if (document.createEvent) {
                var event = document.createEvent("HTMLEvents");
                event.initEvent("resize", true, true);
                window.dispatchEvent(event);
            } else if (document.createEventObject) {
                window.fireEvent("onresize");
            }
        }, 100);
    </script>
    <script src="/notes/rsc/lib/CodeRenderer.js"></script>
</body>

</html>