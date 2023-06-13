let Data = '数据格式(第一个通过json传输数据完成的页面)';
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
    function span(str, color) {
        let c = 'red';
        if (color) {
            c = color;
        }
        return '<span style="color:' + c + ';position:relative;top:-0.12rem;">' + str + '</span>';
    }
    topic(Data, '#24272e');
    Ajax4Json({
        path: 'src/Ajax0003/data.json'
    });code({
        sf: true,
        text: `<!-- <!DOCTYPE html> -->
    <html>
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>32 郁志良</title>
        <script src="lib/beforeLoading.js"></script>
        <script src="lib/jQuery.min.js"></script>
        <script src="lib/lib.min.js"></script>
        <script src="lib/local_lib.min.js"></script>
        <style type="text/css">
            * {
                margin: 0;
                padding: 0;
                cursor: default;
            }
    
            html {
                font-size: 24px;
            }
    
            body {
                position: relative;
                text-align: center;
            }
    
            .bj {
                background-image: url(images/pic_03.jpg);
                background-repeat: no-repeat;
            }
    
            .bj_1 {
                background-image: url(images/pic_04.jpg);
                background-repeat: no-repeat;
                padding-left: 150px;
            }
        </style>
        <style>
            table {
                display: flex;
                text-align: unset !important;
                z-index: -1;
            }
    
            li {
                list-style-type: none;
                display: inline-block;
            }
    
            #nav_wrap {
                position: absolute;
                /* display: flex;
                justify-content: space-between; */
                top: 42px;
                left: 368px;
                margin: 0;
                padding: 0;
                font: 400 20px 'Microsoft YaHei';
                color: #fff;
            }
    
            .nav_item {
                padding: 0 6px;
            }
    
            #msg_wrap {
                position: absolute;
                top: 150;
                left: 540;
            }
            #msg_wrap p {
                color: rgb(0, 255, 123);
            }
            #msg_wrap h1 {
                margin-top: 20px;
                color: rgb(14, 59, 2);
            }
        </style>
    </head>
    
    <body bgcolor="#FFFFFF">
        <table width="1000" height="615" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td colspan="2">
                    <img src="images/pic_01.jpg" width="1000" height="33" alt=""></td>
            </tr>
            <tr>
                <td rowspan="2">
                    <img src="images/pic_02.jpg" width="360" height="416" alt=""></td>
                <td height="49" align="center" class="bj">&nbsp;</td>
            </tr>
            <tr>
                <td width="640" height="367" align="center" valign="middle" class="bj_1">
                    <p class="text1">&nbsp;</p>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <img src="images/pic_05.jpg" width="1000" height="166" alt=""></td>
            </tr>
        </table>
        <div id="msg_wrap">
            <p>一次令人心跳加速的神秘约会即将来临!<br />精装修外销公寓，直接入住</p>
            <h1>家在风景里<br />绿意生活即将上演</h1>
        </div>
        <script>
            let tArr = ['首页', '关于我们', '新闻中心', '项目介绍', '项目展示', '户型解析', '联系我们']
            $('body').append('<ul></ul>');
            $('ul').attr('id', 'nav_wrap');
            for (let i in tArr) {
                $('#nav_wrap').append('<li class="nav_item">' + tArr[i] + '</li>')
            }
        </script>
        <script src="./lib/CodeRenderer.js"></script>
        <script src="./lib/toggle.js"></script>
    </body>
    
    </html>`
    });
}