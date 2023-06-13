function call() {}
if (sessionStorage.getItem('execute_all') === 'true') {} else {
    tit();
}

function dir(fileName) {
    return 'src/part/json/' + fileName + '.json';
}
ajax({
    url: dir('填空'),
    success: rst => {
        Q_KV_module(JSON.parse(rst));
    }
})