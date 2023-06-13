let Data = 'jQuery 效果 Part1';
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

$('head').append('<script src="src/jq0004/add_formNode_parameter.js"></script>');
function call(Data) {
    topic(Data, '#24272e');

    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['position', 'relative'],
        ['height', '6rem'],
        ['width', '100%'],
    ]);
    form_ini_00();

    link('show()', '../../../rsc/DOC/jQuery_3.3.1_API_Docs_CN/show.html');
    link('hide()', '../../../rsc/DOC/jQuery_3.3.1_API_Docs_CN/hide.html');

    LM('jQuery 显示与隐藏效果（源码）');
    link('效果', 'rsc/jq01.htm');
    code(`<!DOCTYPE html>
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
            }
        </style>
        <script src="jquery.min.js"></script>
    </head>
    
    <body>
        <button>显示</button>
        <button>隐藏</button>
        <button>切换</button>
        <div></div>
        <script>
            $(function() {
                $("button").eq(0).click(function() {
                    $("div").show(1000, function() {
                        alert(1);
                    });
                })
                $("button").eq(1).click(function() {
                    $("div").hide(1000, function() {
                        alert(1);
                    });
                })
                $("button").eq(2).click(function() {
                        $("div").toggle(1000);
                    })
                    // 一般情况下，我们都不加参数直接显示隐藏就可以了
            });
        </script>
    </body>
    
    </html>`);

    LM('jQuery 滑动效果（源码）');
    link('效果', 'rsc/jq02.htm');

    code(`<!DOCTYPE html>
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
        <button>下拉滑动</button>
        <button>上拉滑动</button>
        <button>切换滑动</button>
        <div></div>
        <script>
            $(function() {
                $("button").eq(0).click(function() {
                    // 下滑动 slideDown()
                    $("div").slideDown();
                })
                
                $("button").eq(1).click(function() {
                    // 上滑动 slideUp()
                    $("div").slideUp(500);
                })
    
                $("button").eq(2).click(function() {
                    // 滑动切换 slideToggle()
                    $("div").slideToggle(500);
                });
    
            });
        </script>
    </body>
    
    </html>`);

    LM('简化滑动下拉菜单（源码）');

    link('效果', 'rsc/jq03.htm');
    tip('jq0304.css', 1);
    tArea(`* {
        margin: 0;
        padding: 0;
    }
    
    li {
        list-style-type: none;
    }
    
    a {
        text-decoration: none;
        font-size: 14px;
    }
    
    .nav {
        margin: 100px;
    }
    
    .nav>li {
        position: relative;
        float: left;
        width: 80px;
        height: 41px;
        text-align: center;
    }
    
    .nav li a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 41px;
        color: #333;
    }
    
    .nav>li>a:hover {
        background-color: #eee;
    }
    
    .nav ul {
        display: none;
        position: absolute;
        top: 41px;
        left: 0;
        width: 100%;
        border-left: 1px solid #FECC5B;
        border-right: 1px solid #FECC5B;
    }
    
    .nav ul li {
        border-bottom: 1px solid #FECC5B;
    }
    
    .nav ul li a:hover {
        background-color: #FFF5DA;
    }`);
    code(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="jq0304.css">
        <script src="jquery.min.js"></script>
    </head>
    
    <body>
        <ul class="nav">
            <li>
                <a href="#">微博</a>
                <ul>
                    <li>
                        <a href="">私信</a>
                    </li>
                    <li>
                        <a href="">评论</a>
                    </li>
                    <li>
                        <a href="">@我</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">微博</a>
                <ul>
                    <li>
                        <a href="">私信</a>
                    </li>
                    <li>
                        <a href="">评论</a>
                    </li>
                    <li>
                        <a href="">@我</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">微博</a>
                <ul>
                    <li>
                        <a href="">私信</a>
                    </li>
                    <li>
                        <a href="">评论</a>
                    </li>
                    <li>
                        <a href="">@我</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">微博</a>
                <ul>
                    <li>
                        <a href="">私信</a>
                    </li>
                    <li>
                        <a href="">评论</a>
                    </li>
                    <li>
                        <a href="">@我</a>
                    </li>
                </ul>
            </li>
        </ul>
        <script>
            $(function() {
                // 鼠标经过
                /* $(".nav>li").mouseover(function() {
                    // $(this) jQuery 当前元素  this不要加引号
                    // show() 显示元素  hide() 隐藏元素
                    $(this).children("ul").slideDown(200);
                }); */
                // 鼠标离开
                /* $(".nav>li").mouseout(function() {
                    $(this).children("ul").slideUp(200);
                }); */
                
                // 1. 事件切换 hover 就是鼠标经过和离开的复合写法
                /* $(".nav>li").hover(function() {
                    $(this).children("ul").slideDown(200);
                }, function() {
                    $(this).children("ul").slideUp(200);
                }); */
    
                // 2. 事件切换 hover  如果只写一个函数，那么鼠标经过和鼠标离开都会触发这个函数
                $(".nav>li").hover(function() {
                    $(this).children("ul").slideToggle();
                });
            })
        </script>
    </body>
    
    </html>`);

    LM('动画或效果队列');
    SM('动画或效果一旦触发就会执行，如果多次触发，就会造成多个动画或效果排队执行。');
    code(`//停止队列
    stop()`);
    tip('（1）、stop() 方法用于停止动画或效果。');
    tip('（2）、注意：stop() 写到动画或效果的' + '<b style="color:red;">前面，相当于停止结束上一次的动画。</b>');

    LM('简洁版滑动下拉菜单 stop停止排队（源码）');
    link('效果', 'rsc/jq04.htm');
    code(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="jq0304.css">
        <script src="jquery.min.js"></script>
    </head>
    
    <body>
        <ul class="nav">
            <li>
                <a href="#">微博</a>
                <ul>
                    <li>
                        <a href="">私信</a>
                    </li>
                    <li>
                        <a href="">评论</a>
                    </li>
                    <li>
                        <a href="">@我</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">微博</a>
                <ul>
                    <li>
                        <a href="">私信</a>
                    </li>
                    <li>
                        <a href="">评论</a>
                    </li>
                    <li>
                        <a href="">@我</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">微博</a>
                <ul>
                    <li>
                        <a href="">私信</a>
                    </li>
                    <li>
                        <a href="">评论</a>
                    </li>
                    <li>
                        <a href="">@我</a>
                    </li>
                </ul>
            </li>
        </ul>
        <script>
                $(".nav>li").hover(function() {
                    // stop 方法必须写到动画的前面
                    $(this).children("ul").stop().slideToggle();
                });
        </script>
    </body>
    
    </html>`);
    add_normalNode([''], ['p', 'normal', '6% 0 0 0', ud, ud, 'paragraph-2em'], [], []);
}