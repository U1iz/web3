function call() {
    let ud = undefined;
    if (sessionStorage.getItem('execute_all') === 'true') {} else {
        tit();
    }
    SM('页面简化代码');
    code(`$('.t-bottom').remove();$('.t-index').remove();$('.t-flag').remove();$('.answer-r').remove();
    $('.main-card').remove();$('.main-top').remove();$('#menu').remove();
    $('#header-box').remove();$('.main-card').remove();$('.main-top').remove();$('main-info').remove();
    $('.main-info').remove();$('#breadcrumbs').remove();$('#footer').remove();`);
    let url = 'src/DW0000/10_220916.htm';
    link('地址', url);
    
    setTimeout(() => {
        window.open(url, '_self');
    }, 4280)
}