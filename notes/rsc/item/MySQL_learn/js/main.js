function call() {
    $('head').append('<link rel="stylesheet" href="/notes/rsc/item/MySQL_learn/rsc/CSS/page_style.css">');
    add_title('MySQL web后端', [
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

    add_req('MySQL 基本');
    add_req('概念', 'MySQL0000');
    add_req('数据库访问', 'MySQL0001');
    add_req('Markdown', 'Markdown');
    add_req('MySQL 基础');
    add_req('SQL语法规则', 'MySQL0003');
    add_req('--------------');
    add_req('基本操作');


    // add_req('字符集', 'MySQL0002');
    // add_req('高级SQL操作(增删改查)');
    // add_req('多表操作', 'MySQL0003');
}