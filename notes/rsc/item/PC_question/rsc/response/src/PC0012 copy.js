function call() {}
if (sessionStorage.getItem('execute_all') === 'true') {} else {
    tit();
}
var dir = 'src/json/';
ajax({
    url: dir + '文字录入.json',
    success: rst => {
        Q_KV_module(JSON.parse(rst));
        return;
    }
})