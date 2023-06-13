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

    LM('R == L');
    SL();
    
    SM('ra');
    lst('ら => 5');
    lst('ラ => ');
    SL();

    SM('ri');
    lst('り => 利');
    lst('リ => ');
    SL();

    SM('ru');
    lst('る => ');
    lst('ル => 儿');
    SL();

    SM('re');
    lst('れ => ');
    lst('レ => 锄地会累');
    SL();

    SM('ro');
    lst('ろ => ');
    lst('ロ => ');
    SL();

    lst('さようなら\n\t再见【长期不见 永别】；较正式');
    lst('さよなら\n\t再见【长期不见 永别】；非正式');
    lst('おやすみ\n\t晚安');
    lst('あなた\n\t你；现实生活几乎不用，拉远距离');
    

    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['height', '6rem'],
    ]);
}