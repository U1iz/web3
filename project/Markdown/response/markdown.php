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
    <script src="/node_modules/katex/dist/katex.min.js"></script>

    <link rel="shortcut icon" href="/favicon.png">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/md.css">
    <link rel="stylesheet" href="/node_modules/highlight.js/styles/base16/onedark.css">
    <link rel="stylesheet" href="/node_modules/katex/dist/katex.css">
    <!-- <style>
        .katex .base {
            width: 100%;
            display: inline-block;
            white-space: normal;
        }
    </style> -->
</head>

<body class="markdown-body">
    <aside id="aside_menu" class="show">
        <ul id="menu_content">
        </ul>
        <div id="menu_toggle">
            <span>&lt;</span>
            <span>&gt;</span>
        </div>
    </aside>
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
        window.addEventListener('DOMContentLoaded', () =>
            renderer("<?php echo $_GET["md"]; ?>"))
        function renderer(addr) {
            const _d = document.querySelector('#d');
            $(_d).html('')
            new Promise(resolve => {
                $.ajax({
                    url: `./md/${addr}.md`,
                    success: rst => resolve(rst),
                    error: err => resolve(addr)
                })
            })
                .then(rst => {
                    try {
                        window.markdown = rst;
                        /* const reg = /!\[.*\]\(.*\)/g
                        // imgs = reg.exec(rst)
                        imgs = rst.match(reg)
                        console.log(imgs); */
                        rst = rst.replace(/(!\[.*?\]\()(.*?)(\))/gi, '<img src="$2">');
                        _d.innerHTML = marked.parse(rst);
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
                        katex_format()

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

                        const addr_index = `md/<?php
                        $md = $_GET["md"];
                        $strPos = strpos($md, '/');
                        if ($strPos) {
                            echo substr($md, 0, $strPos);
                        } else {
                            echo '';
                        } ?>`;
                        $('img').get().forEach(e => {
                            e.src = `${addr_index}/${$(e).attr('src')}`
                        })
                        $('a').get().forEach(e => {
                            const params = new URL(e.href, 'http://localhost').searchParams
                            let target = params.get('target');
                            if (target) {
                                target = target.split(':')
                                if (target[0] == 'file') {
                                    e.target = '_blank'
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
                        })
                    }
                })
        }
    </script>
    <script src="./js/fn.js"></script>
</body>

</html>