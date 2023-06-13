let Data = 'jQuery 初识';
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

    LM('jQuery 获取');
    link('jQuery 官网', 'https://jquery.com');
    link('jQuery 全版本', 'https://releases.jquery.com');

    let as1 = ['p', 8, 111, ud, ud, ud, '10rem'];
    let as2 = ['p', 8, 0, ud, ud, ud, '10rem'];

    SM('各版本区别：');
    add_listNode(['1x: 兼容 IE 678 等低版本浏览器，官网不再更新'], as1);
    add_listNode(['2x: 不兼容 IE 678 等低版本浏览器，官网不再更新'], as2);
    add_listNode(['3x: 不兼容 IE 678 等低版本浏览器，是官网主要更新维护的版本'], as2);

    LM('jQuery 基础');

    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['height', '2rem'],
        ['width', '100%'],
    ]);

    SM('jQuery 入口函数');

    code(`<!DOCTYPE html>
    <html lang="zh-CN">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>jQuery 入口函数</title>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <style>
            div {
                width: 100px;
                height: 100px;
                background-color: black;
            }
        </style>
    </head>
    
    <body>
        <script>
            // 等效于
            /* document.addEventListener("DOMContentLoaded", function(){
                document.querySelector('div').style.display = 'none';
            }) */

            // jQuery 入口函数
            /* $(document).ready(function () {
                $('div').hide();
            }) */
    
            // 更推荐此简化写法
            $(function () {
                $('div').hide();
            })
        </script>
        <div></div>
        <script>
            // 等效于 document.querySelector('div').style.display = 'none';
            $('div').hide();
        </script>
    </body>
    
    </html> `, 111, 0.32, 1);

    tip('“$” 是 jQuery 中的顶级对象，可以用 “jQuery” 代替', 1, '#fff');
    code(`$(function () {
        $('div').hide();
    })

    // 所有的 $ 可以用 jQuery 代替
    jQuery(function () {
        jQuery('div').hide();
    })`, 111, 0.32, 1);

    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['height', '2rem'],
        ['width', '100%'],
    ]);

    SM('jQuery对象 和 DOM对象 是不同的，不能够混用');
    code(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <style>
            div {
                width: 100px;
                height: 100px;
                background-color: pink;
            }
        </style>
    </head>
    
    <body>
        <div></div>
        <script>
            // 1. DOM 对象：  用原生js获取过来的对象就是DOM对象
            var myDiv = document.querySelector('div'); // myDiv 是DOM对象
            console.dir(myDiv);
            // 2. jQuery对象： 用jquery方式获取过来的对象是jQuery对象。 本质：通过$把DOM元素进行了包装
            // 返回的是伪数组
            $('div'); // $('div')是一个jQuery 对象
            console.dir($('div'));
            // 3. jQuery 对象只能使用 jQuery 方法，DOM 对象则使用原生的 JavaScirpt 属性和方法
            // myDiv.style.display = 'none';
            // myDiv.hide(); myDiv是一个dom对象不能使用 jquery里面的hide方法
            // $('div').style.display = 'none'; 这个$('div')是一个jQuery对象不能使用原生js 的属性和方法
        </script>
    </body>
    
    </html>`, 111, 0.32, 1);

    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['height', '2rem'],
        ['width', '100%'],
    ]);

    SM('jQuery对象 与 DOM对象 互相转换');
    code(`<!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>jQuery对象与DOM对象的转换</title>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    <body>
        <video src="http://res1433223.net3v.net/media/Nyan_cat.mp4" muted></video>
        <script>
            // 播放视频
            // 原生js方法
            var myVideo = document.querySelector('video');
            // myVideo.play();
    
            // jQuery方法
            // jQuery中不包含play方法
            // $(myVideo).play(); 将 DOM对象 转为 jQuery对象
            // $('video').play();
            
            // 将 jQuery对象 转换为 DOM对象
            // 方法1
            $('video')[0].play();
            // 方法2
            $('video').get(0).play();
        </script>
    </body>
    </html>`, 111, 0.32, 1);
    add_normalNode([''], ['p', 'normal', '6% 0 0 0', ud, ud, 'paragraph-2em'], [], []);
}