let Data = 'h 行';
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

    SM('ha');
    lst('は => ');
    lst('ハ => 八');
    SL();

    SM('hi');
    lst('ひ => Ω');
    lst('ヒ => 匕');
    SL();

    SM('hu');
    lst('ふ => 小');
    lst('フ => 不');
    SL();

    SM('he 读作 hei');
    lst('ヘ => ');
    lst('へ => ');
    SL();

    SM('ho');
    lst('ほ => ');
    lst('ホ => 木 / 十八');
    SL();

    lst('はい\n\t应答、肯定、回应、附和\n\t唤起注意,一般可以翻译为“哎，好，喂”。\n\t疑问、不确定、不清楚,声调上扬时，就表示反问。对所获取信息不清楚、不确定，希望对方再说一遍等等情况中都可以使用。\n\t不耐烦，看语境\n\t恍然大悟、突然醒悟');

    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['height', '6rem'],
    ]);
}