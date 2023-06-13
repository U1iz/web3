let Data = 'a 行';
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

    add_wsy();
    LM('五段十行');
    SM('第一行的五个音是日语中最重要的发音');
    lst('相当于中文で韵母');
    lst('后面で所有发音都是根据第一行进行拼读的');

    SM('元音行：あいうえお +');
    SM('辅音： k s t n h m y r w');
    SL();

    SM('a');
    lst('あ => 女');
    lst('ア => 啊');
    SL();

    SM('i');
    lst('い => 以');
    lst('イ => 依');
    SL();

    SM('u');
    lst('う => i');
    lst('ウ => 宀');
    SL();

    SM('e');
    lst('え => 元');
    lst('エ => 工');
    SL();

    SM('o');
    lst('お => 书');
    lst('オ => 才');
    SL();

    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['height', '6rem'],
    ]);
}