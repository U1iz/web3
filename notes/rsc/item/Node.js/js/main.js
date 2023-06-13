function call() {
    $('head').append('<link rel="stylesheet" href="/notes/rsc/item/Node.js/rsc/CSS/page_style.css">');
    add_title('部分笔记依据：“黑马程序员”', [
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
    add_title('笔记1：“BV1a34y167AZ”', [
        ['addClass', 'black'],
        ['label', 'h2h1'],
        ['backgroundColor', 'transparent'],
        ['whiteSpace', 'nowrap'],
        ['font', '800 1.2rem "MicroSoft YaHei"'],
        ['boxShadow', '1px 1px 1rem 0.125rem transparent'],
        ['padding', '0.6rem 0 0.6rem 0'],
        ['borderRadius', '64px 0 0 64px'],
        ['margin', '0 -0.6rem 0.4rem 12rem'],
        ['transition', 'all 0.5s'],
    ]);

    add_req('Node.js 初识', 'nodejs0000');
    add_req('fs文件模块', 'nodejs0001');
    add_req('路径处理', 'nodejs0002');
    add_req('路径练习', 'nodejs0003');
    add_req('http 模块（概念）', 'nodejs0004');
    add_req('http 模块 创建服务器', 'nodejs0005');
    add_req('http 模块 根据url动态加载HTML', 'nodejs0006');
    add_req('http 案例', 'nodejs0007');
    add_req('模块化 基本概念', 'nodejs0008');
    add_req('Node.js 中的模块化', 'nodejs0009');
    add_req('npm与包（概念）', 'nodejs0010');
    add_req('实例');
    add_req('【封装】fs本地文件基本操作', '20230503');
}