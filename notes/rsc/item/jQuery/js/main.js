function call() {
    $('style')[0].innerHTML = 'html { overflow-x: hidden; } .chapter::selection { color: rgba(255, 98, 0, 0.64) !important; background-color: rgba(119, 0, 255, 0.12) !important; } .pink::selection { color: pink !important; background-color: transparent !important; } .black::selection { color: black !important; background-color: #fff !important; } #request_wrap { width: 100%; margin-top: 1vw; } .request { text-align: center; } .request:hover { background-color: #fff; } .req_tit { margin: 0.6rem; margin-left: 40vw; }'
    add_title('笔记依据：“黑马程序员《jQuery网页开发案例精讲》”', [
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

        ['js-style', 'fontPosition', '0.24-middle'],
        ['js-addEventListener', 'mouseenter', 'ML', '2.4rem'],
        ['js-addEventListener', 'mouseenter', 'LSP', '0.6rem'],
        ['js-addEventListener', 'mouseenter', 'TID', '4.6rem'],
        ['js-addEventListener', 'mouseenter', 'boxShadow', '1px 1px 1rem 0.25rem rgba(54, 54, 54,0.64)'],
        // leave
        ['js-addEventListener', 'mouseleave', 'ML', '12rem'],
        ['js-addEventListener', 'mouseleave', 'LSP', 'normal'],
        ['js-addEventListener', 'mouseleave', 'color', '#666'],
        ['js-addEventListener', 'mouseleave', 'BGC', 'transparent'],
        ['js-addEventListener', 'mouseleave', 'js-style', 'fontPosition', '0.24-middle'],
        ['js-addEventListener', 'mouseleave', 'boxShadow', '1px 1px 1rem 0.125rem transparent'],
        // click
        ['js-AEL', 'click', 'BGC', '#222'],
        ['js-AEL', 'click', 'color', '#ddd'],
    ]);
    add_normalNode('——\tpink老师', ['p', 'normal', '6% 5% 0 5%', undefined, undefined, 'paragraph-2em'], [
        ['addClass', 'pink']
    ], [
        ['padding', '0.4rem', '1.6rem'],
        ['borderRadius', '1rem'],
        ['boxShadow', '1px 1px 1rem 0.25rem transparent'],
        ['color', 'transparent'],

        ['js-event', 'setTimeout', '1800', 'transition', 'all 0.96s'],
        ['js-event', 'setTimeout', '1200', 'boxShadow', '1px 1px 24rem 2rem transparent'],
        ['js-event', 'setTimeout', '2000', 'MT', '2.4rem'],
        ['js-event', 'setTimeout', '2400', 'ML', '72%'],
        ['js-event', 'setTimeout', '1960', 'color', '#363636']
    ]);

    add_req('相关手册', 'jq0000');
    add_req('第一部分');
    add_req('jQuery 初识', 'jq0001');
    add_req('jQuery 基本使用', 'jq0002');
    add_req('jQuery 样式修改', 'jq0003');
    add_req('jQuery 效果 Part1', 'jq0004');
    add_req('jQuery 效果 Part2', 'jq0005');
    add_req('第二部分（五月~八月更新）');
    add_req('第三部分 终章（六月~八月更新）');
}