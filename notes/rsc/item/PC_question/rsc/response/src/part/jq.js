function call() {}
if (sessionStorage.getItem('execute_all') === 'true') {} else {
    tit();
}

function dir(fileName) {
    return 'src/part/json/' + fileName + '.json';
}
add_ajaxReq({
    '判断_全部': dir('判断_判断全部'),
    '判断_全对': dir('判断_判断全对'),
    '判断_全错': dir('判断_判断全错')
});