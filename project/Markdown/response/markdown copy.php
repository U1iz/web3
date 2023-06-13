<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <?php echo $_GET["md"] ?>
    </title>
    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
    <script src="/node_modules/dompurify/dist/purify.min.js"></script>
    <script src="/node_modules/highlight.js/highlight.min.js"></script>
    <script src="/node_modules/marked/marked.min.js"></script>
    <link rel="shortcut icon" href="/favicon.png">
    <style>
        * {
            font-family: "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            font-size: 25px;
        }

        ::selection {
            background: #dce3ea;
        }

        img {
            vertical-align: middle;
        }

        body {
            margin-top: 1rem;
        }

        #d {
            padding: 1vh 1vw;
            background: #fff;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0.2rem 0.2rem 1rem #ddd;
        }

        code {
            background: #eee;
        }

        code * {
            font-family: Consolas, Monaco;
        }

        table {
            margin: auto;
            table-layout: fixed
        }

        table td {
            padding: 0.06em 0.12em;
        }

        blockquote {
            position: relative;
        }

        /* blockquote::before {
            content: '';
            position: absolute;
            width: 1rem;
            height: 100%;
            background: #000;
            left: -1rem;
        } */

        pre {
            padding: 0 ! important;
            border-radius: 0.5rem ! important;
            overflow: none ! important;
            box-shadow: 1px 1px 1rem #ddd;
        }

        thead tr {
            background: #f6f8fa !important;
        }

        .code-block-header {
            text-align: right;
            background: #00000012;
            padding: 0.2em 1em;
            box-shadow: 1px 1px 1rem #ddd;
        }

        .code-block-header * {
            font: 100 1rem auto;
            color: #b3b3b3;
        }

        .code-block-header div {
            position: relative;
            display: inline-block;
            cursor: pointer;
            margin-left: 1em;
        }

        .code-block-header div>span {
            display: block;
            position: relative;
        }

        .code-block-header div>span:first-child {
            position: absolute;
            cursor: default;
            top: -100%;
            opacity: 0;
            color: #65a665;
        }

        .code-block-header div>span:hover:last-child {
            color: #b3b;
        }

        #head_links {
            display: flex;
            justify-content: space-between;
        }

        .mark {
            font-size: 0.7em;
            vertical-align: top;
        }

        #content-block {
            max-width: 90vw;
            min-width: 50rem;
            margin: 0 auto;
        }
    </style>
    <link rel="stylesheet" href="md.css">
    <link rel="stylesheet" href="/node_modules/highlight.js/styles/base16/onedark.css">
</head>

<body class="markdown-body">
    <!-- <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script> -->
    <div id="content-block">
        <div id="head_links">
            <a href="/project/Markdown/index.html"><- 上一层级</a>
                    <a href="javascript:;" onclick="openSource()">查看源码 -></a>
        </div>
        <div id="d"></div>
    </div>
    <script>
        /* let dirty = document.documentElement.innerHTML.toString();
        let clean = DOMPurify.sanitize(dirty); */

        let d = document.querySelector('#d');
        $.ajax({
            url: `./md/<?php echo $_GET["md"]; ?>.md`,
            success: rst => {
                try {
                    window.markdown = rst;
                    /* const reg = /!\[.*\]\(.*\)/g
                    // imgs = reg.exec(rst)
                    imgs = rst.match(reg)
                    console.log(imgs); */
                    rst = rst.replace(/(!\[.*?\]\()(.*?)(\))/gi, '<img src="$2">');
                    d.innerHTML = marked.parse(rst);
                    hljs.highlightAll();
                } finally {
                    /* $('table').attr({
                        cellpadding: 0,
                        cellspacing: 0,
                        border: 1
                    }) */

                    $('code').get().forEach((e, i) => {
                        const cn = e.className;
                        const reg = /(?<=language-)[a-zA-Z]+/
                        if (cn.includes('language')) {
                            const lan = reg.exec(cn)[0];
                            const codeCtrl = $('<div class="code-block-header">').html(`<span>${lan}</span><div><span>复制成功</span><span>复制代码</span></div>`)
                            codeCtrl.insertBefore(e)
                            copyEvent(codeCtrl.find('div>span'), e)
                        }
                    })

                    {
                        // 解决角标问题
                        all('a', e => {
                            const regex = /\^\d+/;
                            if (regex.test(e.innerText)) {
                                e.title = decodeURI(e.href).split('/').slice(-1).join('')
                                e.href = 'javascript:;'
                                e.className = 'mark'
                            }
                        })
                        change_th_width();
                        window.addEventListener('resize', change_th_width)

                        function change_th_width() {
                            all('th', e => {
                                // 不断向上级匹配，直到匹配到最后一层父级为table的元素后获取其父级
                                let par = $(e).parentsUntil('table').last().parent()[0]

                                e.style.width = ($(par).width() / $(window).width() * 100) / e.parentNode.querySelectorAll('th').length + 'vw'
                            })
                        }

                        function all(elem, call) {
                            $(elem).get().forEach((e, i) => {
                                call(e, i)
                            })
                        }
                    }

                    const addr_index = `<?php
                    $md = $_GET["md"];
                    $strPos = strpos($md, '/');
                    if ($strPos) {
                        echo substr($md, 0, $strPos);
                    } else {
                        echo '';
                    } ?>`
                        ; console.log(addr_index);
                    if (addr_index.length) {
                        $('img').get().forEach(e => {
                            e.src = `md/${addr_index}/${$(e).attr('src')}`
                        })
                        $('a').get().forEach(e => {
                            const params = new URL(e.href, 'http://localhost').searchParams
                            let target = params.get('target');
                            if (target) {
                                target = target.split(':')
                                if (target[0] == 'file') {
                                    if (target[1] == 'md') {
                                        e.href = (location.href.split('?')[0] +
                                            `?md=${addr_index}/${$(e).attr('href').split('?')[0]}`.replace('.md', ''))
                                            .replace(/\\+/g, '/')
                                        console.log(e.href);
                                    } else {
                                        e.href = `md/${addr_index}/${$(e).attr('href')}`
                                    }
                                }
                            }
                            // console.log(params.get('target'));
                        })
                    }


                }
            },
        });

        function copyEvent(btn, code) {
            // btn.addEventListener('click', () => {
            //     // 将#code的内容复制到剪贴板
            //     navigator.clipboard.writeText(code.textContent);
            // });
            btn[1].addEventListener('click', () => {
                const $textarea = $('<textarea>').val(code.textContent).css({
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    'pointer-events': 'none'
                })
                $('body').append($textarea);
                $textarea.select()

                document.execCommand('copy');
                $textarea.remove()
                ani([0, '1rem'], [1, 0], 'none', `ani(['1rem', 0], [0, 1], 'auto')`)

                function ani(top, opacity, event, callBack) {
                    $(btn[0]).stop().animate({
                        top: top[0],
                        opacity: opacity[0]
                    })
                    $(btn[1]).stop().animate({
                        top: top[1],
                        opacity: opacity[1],
                        'pointer-events': event
                    }, () => {
                        setTimeout((() => {
                            eval(callBack)
                        }), 500)

                    })
                }
            });
        }

        function openSource() {
            const md = new URLSearchParams(window.location.search).get('md')
            /* fetch('./md/' + md + '.md')
                .then(res => res.text())
                .then(txt => {
                }) */

            // 创建一个新的文档对象
            const newDoc = document.implementation.createHTMLDocument();
            // 设置文档编码
            newDoc.characterSet = 'UTF-8';
            let pre = $('<pre>');
            pre.text(window.markdown)
            $(newDoc.body).append(pre)
            newDoc.body.innerHTML += `<script>history.pushState(null, null, "md/${md}.markdown");<\/script>`;
            newDoc.documentElement.lang = "zh-cn"
            newDoc.title = md


            const newWindow = window.open();
            newWindow.document.open();
            newWindow.document.write(newDoc.documentElement.outerHTML);
            newWindow.document.close();
            console.log('./md/' + new URLSearchParams(window.location.search).get('md') + '.md');
        }
    </script>
</body>

</html>