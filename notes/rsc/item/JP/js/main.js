let step = 0;

function lfn(date, pth) {
    let path = './rsc/HTML/JP000' + step;
    let style_001 = ['js-addEventListener', 'mouseenter', 'boxShadow', '1px 1px 1rem 0.25rem rgba(54, 54, 54,0.64)'];
    let style_002 = ['js-addEventListener', 'mouseleave', 'boxShadow', '1px 1px 1rem 0.125rem transparent'];
    let style_003 = ['js-event', 'setTimeout', '720', 'color', '#999'];
    let style_004 = ['fontWeight', 400];
    let style_005 = ['LSP', '1rem'];
    let style_006 = ['skip'];

    pth && (function () {
        path = pth;
    })();
    step.toString().length == 2 && (function () {
        path = './rsc/HTML/JP00' + step;
    })();

    let label = 'a'
    pth == 000 && (function () {
        label = 'span';
        style_001 = [];
        style_002 = [];
        style_003 = ['js-event', 'setTimeout', '320', 'color', 'black'];
        style_004 = ['fontWeight', 800];
        style_005 = ['LSP', '0.64rem'];
        style_006 = ['addClass', 'chapter'];
        step--;
    })();



    add_normalNode([date], [label, 'normal', '0.2rem 5% 0 5%', undefined, undefined, 'paragraph-2em'], [
        ['textDecoration', 'none'],
        ['width', '100%'],
        ['height', '100%'],
        ['cursor', 'pointer'],
        ['fontSize', '0.84rem'],
        ['js-style', 'fontPosition', 'center-middle'],
        ['color', 'transparent'],
        ['element-attribute', 'href', path + '/index.html'],
        ['element-attribute', 'target', '_blank'],
        ['js-event', 'setTimeout', '240', 'transition', 'all 0.64s'],

        style_003,
        style_004,
        style_005,
        style_006,
    ], [
        ['padding', '0.4rem', '1.6rem'],
        ['width', '90%'],
        ['transition', 'all 0.64s'],
        ['padding', '0'],
        ['borderRadius', '1rem'],
        ['boxShadow', '1px 1px 1rem 0.25rem transparent'],
        style_001,
        style_002,

        ['js-event', 'setTimeout', '2000', 'MT', '0.6rem']
    ]);
    step++;
}

function call() {
    add_title('笔记依据：“Av257520299”', [
        ['addClass', 'black'],
        ['label', 'h1'],
        ['backgroundColor', 'transparent'],
        ['whiteSpace', 'nowrap'],
        ['font', '800 1.6rem "MicroSoft YaHei"'],
        ['boxShadow', '1px 1px 1rem 0.125rem transparent'],
        ['padding', '0.6rem 0 0.6rem 0'],
        ['padding', '0.6rem 0 0.6rem 0'],
        ['borderRadius', '64px 0 0 64px'],
        ['margin', '1rem -0.6rem 1.4rem 12rem'],
        ['transition', 'all 0.4s'],

        ['js-style', 'fontPosition', '0.32-middle'],
        ['js-addEventListener', 'mouseenter', 'ML', '6.4rem'],
        ['js-addEventListener', 'mouseenter', 'LSP', '0.6rem'],
        ['js-addEventListener', 'mouseenter', 'TID', '4.6rem'],
        ['js-addEventListener', 'mouseenter', 'boxShadow', '1px 1px 1rem 0.25rem rgba(54, 54, 54,0.64)'],
        // leave
        ['js-addEventListener', 'mouseleave', 'ML', '12rem'],
        ['js-addEventListener', 'mouseleave', 'LSP', 'normal'],
        ['js-addEventListener', 'mouseleave', 'color', '#666'],
        ['js-addEventListener', 'mouseleave', 'BGC', 'transparent'],
        ['js-addEventListener', 'mouseleave', 'js-style', 'fontPosition', '0.32-middle'],
        ['js-addEventListener', 'mouseleave', 'boxShadow', '1px 1px 1rem 0.125rem transparent'],
        // click
        ['js-AEL', 'click', 'BGC', '#222'],
        ['js-AEL', 'click', 'color', '#ddd'],
    ]);

    $('body').append('<div id="request_wrap"></div>');
    add_req('五十音')
    add_req('a 行', 'JP0000');
    add_req('k 行', 'JP0001');
    add_req('s 行', 'JP0002');
    add_req('t 行', 'JP0003');
    add_req('n 行', 'JP0004');
    add_req('h 行', 'JP0005');
    add_req('m 行', 'JP0006');
    add_req('y 行', 'JP0007');
    add_req('r 行', 'JP0008');
    add_req('w 行', 'JP0009');
    add_req('浊音')
}