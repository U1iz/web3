function call() {
    let dir = 'src/Markdown/';
    let href = dir + 'index.php';
    link('跳转不成功？在此打开页面', href, true);
    setTimeout(() => {
        window.location.href = href;
    }, 300);
}