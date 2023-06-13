<?php header("Content-Type:text/html;charset=utf-8"); ?>
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php echo '<title>' . $_GET['tit'] . ' 笔记</title>';
    echo '<script src="./item//add_CSSNode/add_CSSNode-' . $_GET['path'] . '.js"></script>'
    ?>
    <script src="/notes/lib//jQuery.min.js"></script>
    <script src="/notes/rsc/lib/lib.min.js"></script>
    <script src="/notes/rsc/lib/local_lib.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        img {
            vertical-align: middle;
        }

        .part {
            font: 800 1.2rem auto;
            text-indent: 30%;
        }
    </style>
    <script>
        function add_req(n, pn, tit, extraData) {
            if (!$('#request_wrap').length) {
                $('body').append('<div id="request_wrap"></div>');
            }
            if (tit == undefined) {
                tit = n;
            }
            let node = `<div class="request" tit="${tit}" data-path="${pn}" eData="${extraData}">${n}</div>`;
            if (pn == undefined) {
                node = '<div class="part">' + n + '</div>'
            }
            $('#request_wrap').append(node);
        }
        $(function() {
            $('.request').click(function() {
                let data = $(this).data('path');
                let tit = $(this).attr('tit');
                let extraData = $(this).attr('eData');
                let req = getURL();
                $.ajax({
                    type: 'GET',
                    url: '/notes/rsc/item/' + req.path + '/rsc/response/response.php',
                    data: data,
                    success: function(response) {
                        var newPage = window.open("/notes/rsc/item/" + req.path + `/rsc/response/response.php?root=${getURL('path')}&tit=${tit}&path=${data}&eData=${extraData ? extraData : ''}`,
                            "_blank");
                    }
                })
            })
        })
    </script>
    <script src="/notes/rsc/lib/add_formNode.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            cursor: default;
        }

        body {
            background: #efefef;
        }

        #request_wrap {
            width: 80%;
            margin-left: 10%;
            margin-top: 1%;
        }

        .request {
            text-align: center;
        }

        .request:hover {
            background-image: linear-gradient(to right, transparent 10%, #fff, transparent 90%);
        }

        .req_tit {
            margin: 0.6rem;
            margin-left: 40vw;
        }

        .request::selection {
            color: #000 !important;
            background-color: #8bb4bf !important;
        }

        .req_tit::selection {
            color: #000 !important;
            background-color: #1b8aa9 !important;
        }
    </style>
</head>

<body>
    <?php
    $js_path_n = $_GET['path'];
    if (isset($_GET['file_type'])) {
        if ($_GET['file_type'] == 'html') {
            echo "<script>window.location.replace('item/" . $js_path_n . "/" . $_GET['html_file_name'] . "')</script>";
        }
    }
    $js_p = "item/' . $js_path_n . '/js/main.js";
    /* if (!is_dir($js_p)) {
        echo ('./item/' . $js_path_n . '/index.html');
    } */
    echo '<script src="' . './item/' . $js_path_n . '/js/main.js' . '"></script>';
    ?>
    <script>
        $('head').append('<link rel="stylesheet" href="/notes/rsc/item/<?php echo $js_path_n ?>/rsc/CSS/page_style.css">');
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

        sessionStorage.setItem(document.querySelector('title').innerText + 'root_execute.js_hadRun', 'false');

        // main execute
        switch (sessionStorage.getItem(document.querySelector('title').innerText + 'root_execute.js_hadRun')) {
            case 'false':
                call();
                sessionStorage.setItem(document.querySelector('title').innerText + 'root_execute.js_hadRun', 'true');
                break;
        }
        let div = document.createElement("div");
        div.style.height = '80%';
        document.body.appendChild(div);
        document.documentElement.style.height = '100%';
    </script>
</body>

</html>