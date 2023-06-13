function call() {
    $('head').append('<link rel="stylesheet" href="/notes/rsc/item/Ajax/rsc/CSS/page_style.css">');
    add_title('笔记依据：黑马程序员《ajax从入门到精通》', [
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

    add_req('Ajax 初识', 'Ajax0000');
    add_req('PHP 动态网站', 'Ajax0001');
    add_req('Ajax 基础', 'Ajax0002');
    add_req('数据格式', 'Ajax0003');
    add_req('跨域', 'Ajax0004');
}