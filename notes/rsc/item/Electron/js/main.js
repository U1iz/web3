function call() {
    $('head').append('<link rel="stylesheet" href="/notes/rsc/item/Electron/rsc/CSS/page_style.css">');
    add_title('笔记依据：“BV177411s7Lt”', [
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

    add_req('配置 Electron 环境', 'Electron0000');
    add_req('配置 Electron 环境', 'Electron0001');
}