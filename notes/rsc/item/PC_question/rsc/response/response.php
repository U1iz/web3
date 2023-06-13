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
    <script src="/notes/rsc/item/add_CSSNode/add_CSSNode.js"></script>
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
    <link rel="stylesheet" href="../response/src/temp.css">
    <style>
        #hotkey_wrap {
            position: fixed;
            top: 1rem;
            left: 1rem;
            background: rgba(128, 128, 128, .2);
            padding: 0.32rem 0.64rem;
            z-index: 10;
        }
    </style>
</head>

<body>

    <div id="hotkey_wrap">
        <h4>快捷键提示</h4>
        <p>R*3 显示/隐藏 答案</p>
        <p>S*3 隐藏/显示 做题操作模块</p>
        <p>L*3 隐藏/显示 分割线</p>
        <p>J 一键批改</p>
        <p>G 页面黑白</p>
        <p>B 页面关灯</p>
        <p>为避免浏览器未刷新缓存，请先 Ctrl+F5 , 一次就好</p>
    </div>
    <script src="/notes/rsc/lib/beforeLoading.js"></script>
    <?php
    $js_path = $_GET['path'];
    echo '<script src="src/' . $js_path . '.js"></script>';
    ?>
    <script>
        document.body.style.overflowX = 'hidden';
        window.scrollTo(0, document.documentElement.scrollTop);
        let hk_wrap = document.querySelector('#hotkey_wrap');
        setTimeout(() => {
            hk_wrap.style.transition = 'all 0.36s';
            hk_wrap.style.top = -hk_wrap.clientHeight + 'px';
            setTimeout(() => {
                hk_wrap.remove();
            }, 420);
        }, 4600);
    </script>
    <script src="/notes/rsc/lib/CodeRenderer.js"></script>
</body>

</html>