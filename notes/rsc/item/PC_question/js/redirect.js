$('.t-bottom').remove();$('.t-flag').remove();$('.answer-r').remove();
$('.main-card').remove();$('.main-top').remove();$('#menu').remove();
$('#header-box').remove();$('.main-card').remove();$('.main-top').remove();$('main-info').remove();
$('.main-info').remove();$('#breadcrumbs').remove();$('#footer').remove();{
    let s = document.createElement('style');
    s.innerText = '.t-plus,.t-score,.t-level,.t-index{user-select: none;-webkit-user-select: none;}';
    document.head.appendChild(s);
    let temp = document.querySelectorAll('.t-item');
    for (let i of temp.keys()) {
        let mark = temp[i].querySelectorAll('.opt-index')
        for(let k of mark.keys()){
            temp[i].querySelectorAll('.opt')[k].style.display = 'inline-block';
            mark[k].style.display = 'inline-block';
            mark[k].innerHTML = '|》》|';
            mark[0].innerHTML = '|！》》|';
        }
    }

    window.addEventListener('click', e => {
        window.getSelection().selectAllChildren(e.target);
    })
}