let Data = 'jQuery 基本使用';
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

$('head').append('<script src="src/jq0002/add_formNode_parameter.js"></script>');
function call(Data) {
    topic(Data, '#24272e');

    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['height', '6rem'],
        ['width', '100%'],
    ]);

    LM('jQuery 选择器');
    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['height', '6rem'],
        ['width', '100%'],
    ]);

    SM('jQuery 层级选择器');
    form_ini_00();

    SM('jQuery 筛选选择器');
    form_ini_01();

    SM('jQuery 筛选方法');
    form_ini_02();


    LM('jQuery 隐式迭代');
    tip(`遍历内部DOM元素（伪数组形式存储）的过程就叫做<b style="color: red;margin-left:1em;">隐式迭代</b>`, 2, '#000');
    tip('即给匹配到的所有元素进行循环遍历，执行相应方法，简化操作，方便调用', 2, '#000');
    code(`<!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>jQuery 隐式迭代</title>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    <body>
        <ol>
            <li>111</li>
            <li>222</li>
            <li>333</li>
        </ol>
        <script>
            // 等效于
            /* let temp = document.querySelector('ol').querySelectorAll('li');
            for(let i = 0; i < temp.length; i++) {
                temp[i].style.backgroundColor = 'red';
            } */
    
            // 复合属性可以直接采用css原名
            // $("ol li").css('background-color','red');
            // 也可使用 小驼峰命名法
            $("ol li").css('backgroundColor','red');
        </script>
    </body>
    </html>`, 111, 0.32, 1);

    SM('jQuery 达成排他效果');
    code(`<!DOCTYPE html>
    <html lang="zh-CN">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>jQuery 排他思想</title>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    
    <body>
        <button>001</button>
        <button>002</button>
        <button>003</button>
        <script>
            // 等效于
            /* let btn = document.querySelectorAll('button');
            for(let i = 0; i < btn.length; i++) {
                btn[i].onclick = function(){
                    for(let j = 0; j < btn.length; j++) {
                        btn[j].style.background = '';
                    }
                    this.style.background = 'blue';
                }
            } */
    
            // 给所有 btn 绑定了点击事件
            $('button').click(function () {
                // 当前元素改变颜背景颜色
                $(this).css('background', 'blue');
                // 其余兄弟去掉背景颜色
                $(this).siblings().css('background', '');
            })
        </script>
    </body>
    
    </html>`, 111, 0.32, 1);

    SM('链式编程');
    code(`    // 常规写法
    /* $('button').click(function () {
        $(this).css('background', 'blue');
        $(this).siblings().css('background', '');
    }) */

    // 链式编程
    $('button').click(function () {
        $(this).css('background', 'green').siblings().css('background', '');
    })`);
    add_normalNode([''], ['p', 'normal', '6% 0 0 0', ud, ud, 'paragraph-2em'], [], []);
}