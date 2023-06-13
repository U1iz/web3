// ==UserScript==
// @name         上海市中职校计算机应用专业教育质量监测理论考试平台 题目全选
// @namespace    http://tampermonkey.net/
// @version      0.4.1
// @description  顾名思义，左键单击选中考题，右键取消选择
// @author       U1iz@yzl
// @match        https://jisuanji.cantaicloud.com/ExamsStudPerson/JoinExamsStud?*
// @match        https://jisuanji.cantaicloud.com/ExamsStudPerson/ExamsStudPractice?*
// @icon         https://jisuanji.cantaicloud.com/img/LOGO%20(2).png
// @require      https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    window.addEventListener('click', e => {
        /* 单击选择 */
        if (e.target.className == 'timu-text') {
            /* 选中题目 */
            if (!e.target.querySelector('.operated')) {
                if ($('.weui-input-fill').length > 0) {
                    $('.weui-input-fill').get().forEach((e, i) => {
                        let underLine = document.createElement('span');
                        underLine.innerText = '___';
                        $('.timu-text')[0].insertBefore(underLine, $('.weui-input-fill')[i]);
                    });
                }
                let t = e.target.innerText;
                let t2 = t;
                t2 = t2.substr(t2.indexOf('、') + 1, t2.length);
                t2 = t2.replace(/\( \)/g, '()');
                t = t.replace(t2.replace(/\(\)/g, '( )'), '');
                /* console.log(t + '\n' + t2); */
                let select = document.createElement('div');

                select.innerHTML = `<span>${t}</span><span class="operated">${t2}</span>`;
                e.target.appendChild(select);
            }
            window.getSelection().selectAllChildren(e.target.querySelector('.operated'));
        } else if (e.target.className == 'operated' || e.target.className.indexOf('options-w') != -1) {
            window.getSelection().selectAllChildren(e.target);
        }
    })
    window.addEventListener('contextmenu', () => {
        /* 右键清除选择 */
        window.getSelection().removeAllRanges()
    })
})();