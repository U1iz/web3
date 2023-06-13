function call() {}
if (sessionStorage.getItem('execute_all') === 'true') {} else {
    tit();
}
var dir = 'src/json/';
ajax({
    url: dir + '计算机网络基础.json',
    success: rst => {
        Q_KV_module(JSON.parse(rst));
        return;
    }
})