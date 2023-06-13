function call() {
    let dir = 'src/exam/'
    window.location.href = dir + getURL('eData') + '.htm';
}
if (sessionStorage.getItem('execute_all') === 'true') {} else {
    tit();
}