function call() {
    tip('该脚本使用暂有风险，暂不开放使用', 1);
    $('head').append('<link rel="stylesheet" href="/notes/rsc/item/Ajax/rsc/CSS/page_style.css">');
    add_title('阿b日志', [
        ['addClass', 'black'],
        ['label', 'h1'],
        ['backgroundColor', 'transparent'],
        ['whiteSpace', 'nowrap'],
        ['font', '800 1.6rem "MicroSoft YaHei"'],
        ['boxShadow', '1px 1px 1rem 0.125rem transparent'],
        ['padding', '0.6rem 0 0.6rem 0'],
        ['borderRadius', '64px 0 0 64px'],
        ['margin', '1rem -0.6rem 0.4rem 12rem'],
        ['transition', 'all 0.4s'],
    ]);

    add_req('V1.2', 'v1');
    add_req('V2 demo_0.1', 'v2d1');
}