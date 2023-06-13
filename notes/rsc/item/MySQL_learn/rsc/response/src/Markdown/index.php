<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>index</title>
    <script src="/notes/rsc/lib/lib.min.js"></script>
    <script src="/notes/rsc/lib/local_lib.min.js"></script>
    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
    <script src="/node_modules/dompurify/dist/purify.min.js"></script>
    <!-- <script src="/node_modules/highlight.js/highlight.js"></script> -->
    <script src="/notes/rsc/lib/highlight.js/highlight.min.js"></script>
    <!-- <script src="/node_modules/highlight.js/lib/languages/sql.js" integrity="sha384-B+2bfwVGfINC0JKyX4uXYRQoMm1J7uKtB/rN/LTlBEGegycTBx5fJDBEYGEAeCLf"></script> -->
    <script src="/node_modules/marked/marked.min.js"></script>

    <script>
        function exportRaw(data, name) {
            let urlObject = window.URL || window.webkitURL || window;
            let export_blob = new Blob([data]);
            let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
            save_link.href = urlObject.createObjectURL(export_blob);
            save_link.download = name;
            save_link.click();
        }
    </script>
    <link rel="stylesheet" href="/node_modules/highlight.js/styles/base16/onedark.css">
    <style>
        * {
            font-size: 24px;
        }

        body {
            min-width: 872px;
        }

        #md_wrap {
            padding: 2rem;
        }

        .md_item li {
            position: relative;
            cursor: pointer;
            list-style-type: decimal-leading-zero;
            font: 400 1rem 'Microsoft YaHei';
            text-indent: 2rem;
            transition: all 0.3s;
            margin-bottom: 0.2rem;
        }

        .reqBtn {
            text-indent: 0;
            width: 40%;
        }

        .dlder {
            position: absolute;
            top: 0;
            right: 5%;
            padding: 0 1rem;
        }

        .reqBtn:hover,
        .dlder:hover {
            background: #efefef;
        }
    </style>
</head>

<body>
    <script async="false">
        link('typora1.48', './md/typora1.48/typora1.48x64.7z');
    </script>
    <ul class="md_item"></ul>
    <div id="md_wrap"></div>
    <script>
        let md_arr = [
            '01MySQL数据库介绍',
            '02MySQL基本操作',
            '03MySQL数据库字符集',
            '04MySQL数据库字段详解',
            '05MySQL数据库设计规范',
            '06MySQL高级操作',
            '07MySQL多表操作',
            '08MySQL安全管理',
            '09PHP操作MySQL',
            '10新闻管理系统',
            'fin/MySQL基础'
        ];

        let ul = document.querySelector('.md_item');
        md_arr.forEach((e, i) => {
            let li = document.createElement('li');
            let req_btn = document.createElement('p');
            let dlder = document.createElement('span');

            req_btn.innerHTML = e;
            dlder.innerText = '下载此文档';

            req_btn.className = 'reqBtn';
            dlder.className = 'dlder';

            li.appendChild(req_btn);
            li.appendChild(dlder);
            ul.appendChild(li);

            req_btn.addEventListener('click', _ => {
                lfn(r => {
                    $('#md_wrap').html(marked.parse(r)).attr('index', i);
                    $('pre code').addClass('hljs');
                    hljs.initHighlighting();
                });
            });

            dlder.addEventListener('click', _ => {
                lfn(r => {
                    exportRaw(r, req_btn.innerText + '.md');
                });
            });

            function lfn(call) {
                console.log($('#md_wrap').attr('index'));
                if ($('#md_wrap').attr('index') != i) {
                    $.ajax({
                        url: './req.php',
                        type: 'post',
                        data: {
                            'file': e
                        },
                        success: rst => {
                            call(rst);
                        },
                    });
                }
            }
        });
    </script>
</body>

</html>