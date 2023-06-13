function call() {
    $('head').append('<link rel="stylesheet" href="/notes/rsc/item/Ajax/rsc/CSS/page_style.css">');
    add_title('Unity C# 杂记', [
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

    add_req('4种循环', 'CS_loop');
}