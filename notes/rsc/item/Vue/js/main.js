function call() {
    $('head').append('<link rel="stylesheet" href="/notes/rsc/item/MySQL_learn/rsc/CSS/page_style.css">');
    add_title('Vue.js js框架', [
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
    link('官方教程', 'https://cn.vuejs.org/guide/introduction.html');
    add_req('Vue 基本');
    add_req('概念', 'vue000');
    add_req('数据库访问', 'vue001');
}