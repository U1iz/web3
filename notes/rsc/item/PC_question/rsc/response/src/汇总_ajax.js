function call() {}
if (sessionStorage.getItem('execute_all') === 'true') {} else {
    tit();
}

function dir(fileName) {
    return 'src/json/all/' + fileName + '.json';
}
add_ajaxReq({
    '单选题': dir('汇总_单选题'),
    '多选题': dir('汇总_多选题'),
    '多选题': dir('汇总_多选题'),
    '填空题': dir('汇总_填空题'),
    '判断_全部': dir('汇总_判断全部'),
    '判断_全对': dir('汇总_判断全对'),
    '判断_全错': dir('汇总_判断全错'),
    '全部题目(可能需要等上几分钟)': dir('汇总')
});