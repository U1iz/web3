{
    let s = document.createElement('style');
    s.innerText = '.t-plus,.t-score,.t-level,.t-index{user-select: none;-webkit-user-select: none;}';
    document.head.appendChild(s);
    let temp = document.querySelectorAll('.t-item');
    for (let i of temp.keys()) {
        let mark = temp[i].querySelectorAll('.opt-index')
        for (let k of mark.keys()) {
            temp[i].querySelectorAll('.opt')[k].style.display = 'inline-block';
            mark[k].style.display = 'inline-block';
            mark[k].innerHTML = '|》》|';
            mark[0].innerHTML = '|！》》|';
        }
    }

    // window.addEventListener('click', e => {
    //     /* 单击选择 */
    //     if (e.target.className == 'timu-text') {
    //         /* 选中题目 */
    //         if (!e.target.querySelector('.operated')) {
    //             let t = e.target.innerText;
    //             let t2 = t;
    //             t2 = t2.substr(t2.indexOf('、') + 1, t2.length);
    //             t2 = t2.replace(/\( \)/g, '()');
    //             t = t.replace(t2.replace(/\(\)/g, '( )'), '');
    //             /* console.log(t + '\n' + t2); */
    //             let select = document.createElement('div');
    //             select.innerHTML = `<span>${t}</span><span class="operated">${t2}</span>`;
    //             e.target.appendChild(select);
    //         }
    //         window.getSelection().selectAllChildren(e.target.querySelector('.operated'));
    //     } else if(e.target.className == 'operated' || e.target.className.indexOf('options-w') != -1){
    //         window.getSelection().selectAllChildren(e.target);
    //     }
    // })
    // window.addEventListener('contextmenu', () => {
    //     /* 右键清除选择 */
    //     window.getSelection().removeAllRanges()
    // })

    // {
    //     let _s = document.createElement('style');
    //     _s.innerText = '*{user-select: text ! important;}';
    //     document.head.appendChild(_s);

    //     document.onselectstart = function () {
    //         return true;
    //     };
    // }
}