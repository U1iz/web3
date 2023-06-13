let Data = 'jQuery 效果 Part2';
// main execute
window.addEventListener('load', function () {
    switch (sessionStorage.getItem(document.querySelector('title').innerText + 'execute.js_hadRun')) {
        case 'false':
            sessionStorage.setItem(document.querySelector('title').innerText + 'execute.js_hadRun', 'true');
            call(Data);
            setTimeout(function () {
                //手动触发窗口resize事件
                if (document.createEvent) {
                    var event = document.createEvent("HTMLEvents");
                    event.initEvent("resize", true, true);
                    window.dispatchEvent(event);
                } else if (document.createEventObject) {
                    window.fireEvent("onresize");
                }
            }, 100);
            document.documentElement.style.overflowX = 'hidden';
            document.body.style.backgroundColor = '#c6d7ff';
            document.documentElement.style.width = '100%';
            document.body.style.width = '100%';
            if (localStorage.getItem('equipmentType') == 1) {
                document.body.style.width = window.screen.availWidth + 'px';
                document.body.style.overflowX = 'hidden';
                setTimeout(function () {
                    document.body.style.overflowX = 'auto';
                }, 3600)
            }
            break;
    }
})

window.addEventListener('DOMContentLoaded', function () {
    setDocTitle(Data);
    sessionStorage.setItem(document.querySelector('title').innerText + 'execute.js_hadRun', 'false');
});

function call(Data) {
    topic(Data, '#24272e');

    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['position', 'relative'],
        ['height', '6rem'],
        ['width', '100%'],
    ]);
    LM('淡入淡出效果（源码）');
    link('效果', 'rsc/jq05.htm');
    code({
        later: true,
        text: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            div {
                width: 150px;
                height: 300px;
                background-color: pink;
                display: none;
            }
        </style>
        <script src="jquery.min.js"></script>
    </head>
    
    <body>
        <button>淡入效果</button>
        <button>淡出效果</button>
        <button>淡入淡出切换</button>
        <button>修改透明度</button>
        <div></div>
        <script>
            $(function () {
                $("button").eq(0).click(function () {
                    // 淡入 fadeIn()
                    $("div").fadeIn(1000);
                });

                $("button").eq(1).click(function () {
                    // 淡出 fadeOut()
                    $("div").fadeOut(1000);
                });

                $("button").eq(2).click(function () {
                    // 淡入淡出切换 fadeToggle()
                    $("div").fadeToggle(1000);
                });

                $("button").eq(3).click(function () {
                    //  修改透明度 fadeTo() 这个速度和透明度要必须写
                    $("div").fadeTo(1000, 0.5);
                });
            });
        </script>
    </body>
    
    </html>`
    });

    LM('自定义动画 animate');
    link('animate()', '../../../rsc/DOC/jQuery_3.3.1_API_Docs_CN/animate.html');
    code('animate(params, [speed], [easing], [fn])');

    SM('参数');
    lst('<b style="color:#ff5813;">params:想要更改的样式属性，以对象形式传递，必须写。属性可以不用带引号，如果是复合属性则需采取驼峰命名法。</b>其余参数都可以忽略', ['111', 'decimal-leading-zero', 3]);
    lst('speed: 三种预定义速度之一的字符串（"slow","normal","fast"）或动画时长毫秒数（如：1000）', ['001', 'decimal-leading-zero', 3]);
    lst('easing:（Optional）用来指定切换效果，默认是"swing",可以参数"linear"', ['001', 'decimal-leading-zero', 3]);
    lst('fn:回调函数，在动画完成时执行的函数，每个元素执行一次', ['001', 'decimal-leading-zero', 3]);

    add_normalNode([''], ['p', 'normal', '1rem 0 0 0', ud, ud, 'paragraph-2em'], [], []);
    SM('自定义动画效果（源码）');

    link('效果', 'rsc/jq06.htm');
    SM('手风琴效果');
    (function (url) {
        link('效果', url);
        ajax({
            url: url,
            async: false,
            success: function (rst) {
                code({
                    later: true,
                    text: rst
                });
            }
        })
    })('src/jq0005/Accordion/index.html');

    add_normalNode([''], ['p', 'normal', '6% 0 0 0', ud, ud, 'paragraph-2em'], [], []);
}