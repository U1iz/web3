let Data = 'm 行';
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

    SM('ma');
    lst('ま => 馬/末');
    lst('マ => 通');
    SL();

    SM('mi');
    lst('み => ');
    lst('ミ => 三');
    SL();

    SM('mu');
    lst('む => 十字架下躺着人，天上飞着乌鸦（墓地）');
    lst('ム => 牟');
    SL();

    SM('め 读作 mei');
    lst('め => あ');
    lst('メ => ×');
    SL();

    SM('mo');
    lst('も => 毛');
    lst('モ => 简化');
    SL();

    lst('まさか\n\turl: <a href="https://zhidao.baidu.com/question/350039119.html" target="_blank">https://zhidao.baidu.com/question/350039119.html</a>'+ `

                1 まさか （难道，怎能，怎会）
                まさか、そんなことがあるはずがない。 （绝不可能有那样的事）
                まさかと思うかもしれないが事実なんだ。 （也许你不相信，可这是事实）
                まさか君一人で行くんじゃないだろうね。　（你该不会一个人去吧？）

                2 まさか　（万一，一旦）
                まさかの时にはすぐに知らせてくれ。 （一旦有事马上通知我）
                まさかの时に备える （准备万一）`);

    add_normalNode([''], ['p', 'normal', '6% 5% 0 5%', ud, ud, 'paragraph-2em'], [], [
        ['height', '6rem'],
    ]);
}