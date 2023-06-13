<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>你未正确载入js，请确保目录结构无误！</title>
    <link rel="stylesheet" href="../CSS/page_style.css">
    <link rel="stylesheet" href="/notes/rsc/item/add_CSSNode/page_normalize.css">
    <script src="/notes/lib//jQuery.min.js"></script>
    <script src="/notes/rsc/lib/lib.min.js"></script>
    <script src="/notes/rsc/lib/local_lib.min.js"></script>
    <?php if (file_exists("../../js/lfn.js")) {
        echo '<script src="../../js/lfn.js"></script>';
    } ?>
    <script src="/notes/rsc/lib/Q_KVM_lib.min.js"></script>
    <script src="/notes/rsc/lib/add_formNode.min.js"></script>
    <script src="/notes/rsc/lib/highlight.js/highlight.min.js"></script>
    <script>
        (title => {
            let fileDate = title;
            setDocTitle(fileDate);
            window.addEventListener('load', () => {
                call();
            })
        })(<?php echo '"' . $_GET['tit'] . '"' ?>);

        function copy_codeSrc(e) {
            let __text__ = e.querySelector('.code_source');
            let __msg__ = e.querySelector('.copy_btn');

            __text__.select();
            console.log(__text__);
            document.execCommand("copy");
            __msg__.innerText = '已复制代码';
            setTimeout(() => {
                __msg__.innerText = '复制源代码';
            }, 600);
        }

        function ajax_fn(href, toggleName, call, sl) {
            link('源代码', href)
            $.ajax({
                url: href,
                success: (rst) => {
                    $('body').append('<div class="code_copy_wrap" onclick="copy_codeSrc(this)"><span class="copy_btn">复制源代码</span><textarea spellcheck="false" class="code_source">' + rst + '</textarea></div>')
                    cSharp({
                        text: rst,
                        dataAttr: toggleName,
                        later: true,
                        sf: false,
                        clear: true
                    });
                    space();
                    sl && SL('4rem');
                    call && call();
                }
            });
        }

        function ajax_hlc(href, codeTitle, call, sliderName, sl) {
            ajax({
                url: href,
                success: (rst) => {
                    hlc({
                        text: rst,
                        dataAttr: sliderName,
                        code_stow: sliderName ? true : false,
                        code_type: 'JavaScript',
                        style_name: 'base16/onedark.min',
                        code_tit: codeTitle ? codeTitle : ''
                    });
                    space();
                    sl && SL('4rem');
                    call && call();
                }
            });
        }

        function nor_hlc(tex, codeTitle, sliderName, sl) {
            hlc({
                text: tex,
                dataAttr: sliderName,
                code_tit: codeTitle ? codeTitle : '',
                code_stow: sliderName ? true : false,
                code_type: 'JavaScript',
                style_name: 'base16/onedark.min'
            });
            space();
            sl && SL('4rem');
        }

        function img_fn(src, w) {
            img({
                fullPath: src,
                width: w
            });
        }

        function video_fn(src, w) {
            video({
                fullPath: src,
                width: w
            });
        }
    </script>
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
    <script src="/notes/rsc/lib/beforeLoading.js"></script>
    <?php
    $js_path = $_GET['path'];
    echo '<script src="/notes/rsc/item/add_CSSNode/add_CSSNode-' . $_GET['root'] . '.js"></script>';
    if (file_exists('src/' . $js_path . '/js/add_formNode_parameter.js')) {
        echo '<script src="src/' . $js_path . '/js/add_formNode_parameter.js"></script>';
    }
    if (file_exists("src/" . $js_path . ".js")) {
        echo '<script src="src/' . $js_path . '.js"></script>';
    } else {
        echo '<script src="src/error.js"></script>';
    }
    ?>
    <script src="/notes/rsc/item/add_CSSNode/add_CSSNode.js"></script>
    <script>
        let hk_wrap = document.querySelector('#hotkey_wrap');
        setTimeout(() => {
            hk_wrap.style.transition = 'all 0.36s';
            hk_wrap.style.top = -hk_wrap.clientHeight + 'px';
            setTimeout(() => {
                hk_wrap.remove();
            }, 420);
        }, 4600);
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
    <script src="/notes/rsc/lib/toggle.js"></script>
    <script src="/notes/rsc/lib/CodeRenderer.js"></script>
</body>

</html>