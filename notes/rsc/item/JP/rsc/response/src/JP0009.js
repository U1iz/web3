let Data = 'r 行';
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
    SL();

    SM('wa');
    lst('わ => ');
    lst('ワ => ');
    SL();

    SM('wo');
    tip('用作助词，用的少');
    lst('を => ');
    lst('ヲ => ');
    SL();

    LM('拨音');
    SM('nn');
    lst('ん => ');
    lst('ン => ');
    SL();

    lst('せんせい\n\t先生、老师 | 先发制人、专制，独裁、宣誓\n\t\tエロマンガ先生');
    lst('おはよう\n\t早上好');
    lst('かわいい\n\t卡哇伊');
    lst('ほんとに\n\t真的');
    lst('ほんとうに\n\t真的吗');
    lst('すみません\n\t对不起、不好意思');

    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['height', '6rem'],
    ]);
}