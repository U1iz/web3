function tit() {
    add_title([document.querySelector('title').innerText], [
        ['label', 'h1'],
        ['backgroundColor', 'transparent'],
        ['whiteSpace', 'nowrap'],
        ['font', '800 1.6rem "MicroSoft YaHei"'],
        ['boxShadow', 'none'],
        ['padding', '0.6rem 0 0.6rem 0'],
        ['padding', '0.6rem 0 0.6rem 0'],
        ['borderRadius', '2.7rem'],
        ['marginTop', '-3.6rem'],
        ['color', '#000'],
        ['textAlign', 'center'],
        ['width', '90%'],
        ['ML', '5%'],
        ['MR', '5%'],
        ['display', 'none'],
        ['color', 'transparent'],

        ['js-style', 'fontPosition', 'center-middle'],
        ['js-addEventListener', 'mouseenter', 'LSP', '0.2rem'],
        ['js-addEventListener', 'mouseenter', 'BGC', '#fff'],
        ['js-addEventListener', 'mouseenter', 'color', '#ddd'],
        [
            'js-addEventListener', 'mouseenter', 'TSD', '0.6rem 0.6rem 0.08rem rgba(0, 252, 181, 0.06)', 'CTN',
            'js-event', 'setTimeout', '240', 'TSD', '0.6rem 0.6rem 0.08rem rgba(0, 252, 181, 0.24)', 'CTN',
            'JSC', 'LTS'
        ],
        [
            'elemAtt', 'onmouseenter', "newStyle_API_Ver000([['JSBuild'," +
            "'(function () { timer_001 = setTimeout(function () { this.style.textShadow = " + '"0.6rem 0.6rem 0.08rem rgba(0, 252, 181, 0.06)"' +

            "; this.style.color = " + '"#555"' +
            ";(function () {  timer_002 = setTimeout(function () { this.style.textShadow = " + '"0.6rem 0.6rem 0.08rem rgb(0 252 181 / 24%), 0.7rem 0.7rem 0.2rem rgb(105 0 252 / 20%)"' +

            "; this.style.color = " + '"#aaa"' +
            "; (function () {  timer_003 = setTimeout(function () { this.style.textShadow = " + '"0.6rem 0.6rem 0.08rem rgb(0 252 181 / 24%), 0.7rem 0.7rem 0.2rem rgb(105 0 252 / 20%), 0.8rem 0.8rem 0.2rem rgba(223 0 252 /20%)"' +

            " }, 512) }()); }, 512) }())}, 256) }())'" +
            "]],this); " +

            "newStyle_API_Ver000([['JSBuild','ATT','onmouseleave', " +
            "'(function () {clearTimeout(timer_001);clearTimeout(timer_002);clearTimeout(timer_003);}())'" +
            "]],this);"
        ],
        // leave
        ['js-addEventListener', 'mouseleave', 'js-style', 'fontPosition', 'center-middle'],
        ['js-addEventListener', 'mouseleave', 'BGC', 'transparent'],
        ['js-addEventListener', 'mouseleave', 'color', '#000'],
        ['js-addEventListener', 'mouseleave', 'LSP', 'normal'],
        ['js-addEventListener', 'mouseleave', 'TSD', '0rem 0rem 0rem rgba(255, 255, 255, 0)'],
        // setTimeout  1000-num-3   1000-time-3000
        ['js-event', 'setTimeout', '1800', 'transition', 'all 0.96s'],
        ['js-event', 'setTimeout', '1800', 'display', 'block'],
        ['js-event', 'setTimeout', '1900', 'color', '#666'],
        ['js-event', 'setTimeout', '2000', 'MT', '2.4rem']
    ]);
}

function split_p(str) {
    let arr = new Array;
    for (let i = 0; i < str.length; i++) {
        arr[i] = str[i];
    }
    return arr;
}