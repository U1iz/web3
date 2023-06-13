const search = new URLSearchParams(window.location.search);

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
    const md = search.get('md')
    /* fetch('./md/' + md + '.md')
        .then(res => res.text())
        .then(txt => {
        }) */

    // 创建一个新的文档对象
    const newDoc = document.implementation.createHTMLDocument();
    // 设置文档编码
    newDoc.characterSet = 'UTF-8';
    let pre = $('<pre>');
    pre.append('<code>').children('code').text(window.markdown)
    $(newDoc.body).append(pre)
    newDoc.head.innerHTML += '<script src="/node_modules/highlight.js/highlight.min.js"></script><link rel="stylesheet" href="/node_modules/highlight.js/styles/base16/onedark.css"><style>*{margin:0;padding:0}</style>';
    newDoc.body.innerHTML += `<script>history.pushState(null, null, "md/${md}.markdown");window.addEventListener('load', () => { hljs.highlightAll(); })<\/script>`;
    newDoc.documentElement.lang = "zh-cn"
    newDoc.title = `source: [${md}]`


    const newWindow = window.open();
    newWindow.document.open();
    newWindow.document.write(newDoc.documentElement.outerHTML);
    newWindow.document.close();
    // console.log('./md/' + new URLSearchParams(window.location.search).get('md') + '.md');
}

let table = search.get('table');
const aside = $('#aside_menu');
window.addEventListener('load', () => {
    if (table) {
        const show = $('#menu_toggle>span').first();
        const hide = $('#menu_toggle>span').last();
        const content = $('#menu_content')
        let error = null;
        try {
            table = JSON.parse(table)
        } catch (err) {
            error = err
            aside.remove()
        } finally {
            if (!error) {

                content.html('')
                for (let k in table) {
                    content.append(`<li><h3>${k}</h3></li>`)
                    table[k].forEach(e => {
                        let text = e
                        if (e.includes('/')) {
                            text = e.split('/').slice(-1)
                        }
                        const item = $(`<li><p>${text}</p></li>`)
                        item.on('click', () => {
                            const _search = new URLSearchParams(window.location.search);
                            if (_search.get('md') !== e) {
                                renderer(e)
                                history.pushState(null, null, `markdown.php?md=${e}&table=${search.get('table')}`)
                            }
                            $("#menu_toggle > span:nth-child(1)")[0].click()
                        })
                        content.append(item)
                    })
                }
                function menuShow() {
                    aside.stop().animate({
                        left: -content.width() + 'px'
                    })

                }

                function menuHide() {
                    aside.stop().animate({
                        left: 0
                    })
                }

                setTimeout(() => {
                    const _init = () => {
                        if (aside.hasClass('show')) {
                            menuShow()
                        } else {
                            menuHide()
                        }
                        show.on('click', () => {
                            aside.attr('class', 'show')
                            menuShow()
                        })
                        hide.on('click', () => {
                            aside.attr('class', 'hide')
                            menuHide()
                        })

                        /* window.addEventListener('load',
                            () => window.scrollTo(0, content.height())
                        ) */

                    }

                    _init()
                }, 500)
            }
        }
    } else {
        aside.remove()
    }
})

function katex_format() {
    $('p').get().forEach(e => {
        try {
            const text = e.innerText,
                reg = /\$\$(.*)\$\$/
            const _r = text.match(reg)[1]

            katex.render(_r, e);
        } catch (err) {
            let temp = e.innerText.replace(/\/\//g, '\n')
            e.innerText = temp
            console.log(err);
        }

    })
}