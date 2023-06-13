<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>你未正确载入js，请确保目录结构无误！</title>
    <link rel="stylesheet" href="/notes/rsc/item/Node.js/rsc/CSS/page_style.css">
    <script src="/notes/rsc/item/Node.js/rsc/lib/add_CSSNode.js"></script>
    <script src="/notes/lib//jQuery.min.js"></script>
    <script src="/notes/rsc/lib/lib.min.js"></script>
    <script src="/notes/rsc/lib/local_lib.min.js"></script>
    <script src="/notes/rsc/lib/add_formNode.min.js"></script>
    <script src="/notes/rsc/lib/highlight.js/highlight.min.js"></script>

</head>

<body>
    <script>
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
                        later: sliderName ? true : false,
                        code_type: 'csharp',
                        style_name: 'base16/onedark.min',
                        code_tit: codeTitle ? codeTitle : ''
                    });
                    space();
                    sl && SL('4rem');
                    call && call();
                }
            });
        }
    </script>
    <?php
    $js_path = $_GET['path'];
    echo '<script src="src/' . $js_path . '.js"></script>';
    ?>
    <script src="/notes/rsc/item/add_CSSNode/add_CSSNode.js"></script>
    <script src="/notes/rsc/lib/CodeRenderer.js"></script>
</body>

</html>