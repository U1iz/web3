let Data = 'jQuery 样式修改';
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

    SM('CSS方法');
    tip('（1）、参数只写属性名，则返回属性值', 2, '#222');
    code('$("elem").css("key")');
    tip('（2）、参数是<b style="color: red;">属性名，属性值，逗号分割</b>，是一组样式；属性必须加引号，值如果是数字可以不用跟单位和引号', 2, '#222');
    code('$("elem").css("key","value)');
    tip('（3）、参数可以是对象形式，方便设置多样式，属性名和属性值用冒号隔开，属性名可以不用加引号', 2, '#222');
    code('$("elem").css({"key1":"value1","key2":"value2","key3":"value3"})');

    code(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CSS方法</title>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <style>
            div {
                width: 100px;
                height: 100px;
                background-color: blue;
            }
        </style>
    </head>
    
    <body>
        <div></div>
        <span></span>
        <script>
            console.log($('div').css('width'));
            // 返回 100px
    
            // 值为数字时可以不加引号，默认单位px
            $('div').css('width',200);
    
            // 参数是对象形式时，可以设置多组样式
            // 复合属性需要采用小驼峰命名法，如果值不是数字，则需要加引号
            $('span').css({
                display: 'block',
                width: 300,
                height: 400,
                backgroundColor: '#ccc'
            });
        </script>
    </body>
    
    </html>`);
    LM('设置类样式方法');
    tip('作用等同于以前的classList，可以操作类样式，注意操作类里面的参数不要加点。', 1);

    tip('（1）、添加类', 2);
    code('$("elem").addClass("className")');
    tip('（2）、移除类', 2);
    code('$("elem").removeClass("className")');
    tip('（3）、切换类，如果存在该类，则移除，不存在，则添加', 2);
    code('$("elem").toggleClass("className")');
    tip('addClass和removeClass不会影响到其他类名');

    LM('TAB栏切换案例（源码）');
    code(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            * {
                margin: 0;
                padding: 0;
            }
            
            li {
                list-style-type: none;
            }
            
            .tab {
                width: 978px;
                margin: 100px auto;
            }
            
            .tab_list {
                height: 39px;
                border: 1px solid #ccc;
                background-color: #f1f1f1;
            }
            
            .tab_list li {
                float: left;
                height: 39px;
                line-height: 39px;
                padding: 0 20px;
                text-align: center;
                cursor: pointer;
            }
            
            .tab_list .current {
                background-color: #c81623;
                color: #fff;
            }
            
            .item_info {
                padding: 20px 0 0 20px;
            }
            
            .item {
                display: none;
            }
        </style>
        <script src="jquery.min.js"></script>
    </head>
    
    <body>
        <div class="tab">
            <div class="tab_list">
                <ul>
                    <li class="current">商品介绍</li>
                    <li>规格与包装</li>
                    <li>售后保障</li>
                    <li>商品评价（50000）</li>
                    <li>手机社区</li>
                </ul>
            </div>
            <div class="tab_con">
                <div class="item" style="display: block;">
                    商品介绍模块内容
                </div>
                <div class="item">
                    规格与包装模块内容
                </div>
                <div class="item">
                    售后保障模块内容
                </div>
                <div class="item">
                    商品评价（50000）模块内容
                </div>
                <div class="item">
                    手机社区模块内容
                </div>
            </div>
        </div>
        <script>
            $(function() {
                // 1.点击上部的li，当前li 添加current类，其余兄弟移除类
                $(".tab_list li").click(function() {
                    // 链式编程操作
                    $(this).addClass("current").siblings().removeClass("current");
                    // 2.点击的同时，得到当前li 的索引号
                    var index = $(this).index();
                    console.log(index);
                    // 3.让下部里面相应索引号的item显示，其余的item隐藏
                    $(".tab_con .item").eq(index).show().siblings().hide();
                });
            })
        </script>
    </body>
    
    </html>`);
    add_normalNode([''], ['p', 'normal', '6% 0 0 0', ud, ud, 'paragraph-2em'], [], []);
}