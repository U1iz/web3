function call() {} {
    let dir = 'src/20230503/',
        tit = '【封装】fs本地文件基本操作';
    window.addEventListener('load', () => {
        document.title = tit
    })
    LM(tit);

    space();
    ajax_hlc(dir + 'FileOperator.js', '代码', fn_01());

    function fn_01() {
        ajax_hlc(dir + 'console.txt', '运行结果')
    }
}