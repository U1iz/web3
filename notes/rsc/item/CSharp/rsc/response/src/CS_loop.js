function call() {
    let dir = 'src/CS_loop/'
    LM('两种 for 循环');
    ajax_fn(dir + 'CS_loop.txt', '展开代码', fn_01);

    function fn_01() {
        img_fn(dir + 'CS_loop_log.png', '70%');

    }
}