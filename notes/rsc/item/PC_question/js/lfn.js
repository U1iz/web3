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