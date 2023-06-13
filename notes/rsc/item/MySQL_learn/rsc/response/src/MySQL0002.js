function call() {
    let dir = 'src/MySQL0002/';
    let href = dir + 'DOC/MySQL_DOC.html';
    link('跳转不成功？在此打开HTML页面', href, true);
    setTimeout(() => {
        window.location.href = href;
    }, 0);
}