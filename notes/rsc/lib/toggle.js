/! toggle ver: 0.4.0 date: 2022.10.12 20:27 /
/* 定义: 插件 def: plug-in script */
/* ver 0.2.1 修复了第一次获取Url不全的问题 repair that cant get all url parament at once */
/* ver 0.3.0 修复了可能存在的套娃问题 */
/* ver 0.3.1 修复了在循环时打开toggle导致的套娃问题 */
/* ver 0.3.2 容器及代码节点样式修改 */
/* ver 0.4.0 兼容 hlc() */

window.addEventListener('load', () => {
    let rawData = getURL('cid');
    let re_time = 0;
    setTimeout(() => {
        re_time = 64;
    }, 12800)
    let timer = setInterval(() => {
        rawData = getURL('cid');
        add_closeToggle(true, {
            dataAttr: ''
        });
        if (re_time >= 64) {
            clearInterval(timer);
        }
        re_time++;
    }, 100)

    function add_closeToggle(noAjax, obj) {
        let code_info = {
            sonNode: document.body,
            fn: null,
            localFile: '#',
            dataAttr: '点此显示代码'
        }
        for (let key in obj) {
            code_info[key] = obj[key];
        }
        if (noAjax) {
            let cArr = [...document.querySelectorAll('.code_wrap'), ...document.querySelectorAll('.hl_code')];
            if (cArr.length) {
                for (let i = 0; i < cArr.length; i++) {
                    if (cArr[i].dataset.toggle == 'true') {
                        let es = cArr[i];
                        let code_wrap_par = document.createElement('div');
                        let code_lines_info = document.createElement('div');
                        code_style(es);
                        code_wrap_par.id = '';
                        code_wrap_par.className = 'close-toggle';
                        code_lines_info.className += ' code_lines_info';
                        if (es.parentNode.className.toString().indexOf(code_wrap_par.className) == -1) {
                            code_wrap_par.dataset.name = es.dataset.name;
                            es.parentNode.insertBefore(code_wrap_par, es.nextElementSibling);
                            add_cld(es, code_wrap_par);
                            add_cld(code_lines_info, code_wrap_par);
                            code_toggle(code_wrap_par, es)
                            code_wrap_par.dataset.height = code_wrap_par.clientHeight;

                            let ls = es.querySelectorAll('.listNode');
                            code_lines_info.innerText = `共 ${ls.length} 行`;
                        }
                    }
                }
            }
        }
    }
}); {
    let s = document.createElement('style');
    s.id = 'addBy_code_toggle';
    let __style = '';
    function code_style(e) {
        e.style.margin = 0;
        if (localStorage.getItem('equipmentType') == 1) {
            e.style.width = '96%';
            e.style.left = '1%';
            e.style.paddingRight = '1%'
            __style = '.ctrl_left-toggle{left:-4.2% ! important;}';
        }
    }

    function code_toggle(par_node, son_node) {
        {
            if (!document.documentElement.querySelector('#addBy_code_toggle')) {
                add_cld(s, document.head);
                s.innerText = '.div_tit-toggle{position:absolute;top:100%;left:1rem;transition:all 0.3s;opacity:1;color:#fff;z-index:1;cursor:default;pointer-events:none;}' +
                    '.ctrl-toggle{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.3);border-radius:1rem;transition:all 0.6s;}.ctrl_left-toggle{text-align:center;cursor:pointer;left:-2vw;width:1vw;padding:0.2rem 0.4rem;color:rgb(255,101,35);background:rgba(0,0,0,.3);writing-mode:vertical-lr;}' +
                    '.close-toggle{overflow:hidden;}.open-toggle{overflow:visible;}.code_lines_info{position:absolute;top:0;right:2vw;text-align:center;font:400 0.72rem auto;color:#fff;z-index:2;transition:all .6s;}' +
                    '.ctrl-toggle:hover{background:#24272e ! important;}' + __style;
            }
        }
        son_node.style.opacity = 0;
        son_node.style.zIndex = -1;
        son_node.style.transition = 'all 0.6s';
        son_node.style.position = 'relative';
        son_node.style.top = -son_node.clientHeight + 'px';
        par_node.style.position = 'relative';
        par_node.style.margin = '0.6rem 5%';
        son_node.style.margin = 0;
        add_div_tit(par_node);

        function add_div_tit(e, type) {
            let elem2 = e.querySelector('.code_lines_info');
            if (type == 'down') {
                let elem = e.querySelector('.div_tit-toggle');
                elem.style.top = '100%';
                elem.style.opacity = 0;
                elem2.style.transition = 'all .6s'
                elem2.style.right = '12%';
                elem2.style.opacity = 0;
                son_node.style.opacity = 1;
            } else {
                if (!e.querySelector('.div_tit-toggle')) {
                    let div = document.createElement('div');
                    div.className += ' div_tit-toggle';
                    div.innerHTML = par_node.dataset["name"];
                    par_node.style.padding = '0.2rem 0';
                    add_cld(div, par_node);
                }
                elem2.style.transition = 'all .6s ease 0.3s'
                elem2.style.opacity = 1;
                elem2.style.right = '2%';
                al_exist(true)
            }

            function al_exist(toggle) {
                let p = 6;
                let elem = e.querySelector('.div_tit-toggle');
                let elem2 = e.querySelector('.code_lines_info');
                if (toggle) {
                    e.style.height = elem.clientHeight + p * 2 + 'px';
                    elem.style.top = p + 'px';
                    elem2.style.top = p * 1.44 + 'px';
                    elem.style.opacity = 1;
                    son_node.style.opacity = 0;
                } else {
                    e.style.height = elem.clientHeight + p * 2 + 'px';
                    elem.style.top = '100%';
                    son_node.style.opacity = 1;
                }
            }
        } /* 添加控件  */
        let ctrl = document.createElement('span');
        ctrl.className = 'ctrl-toggle';
        add_cld(ctrl, par_node); {
            let flag = 0;
            ctrl.addEventListener('click', () => {
                switch (flag) {
                    case 0:
                        par_node.style.overflow = 'visible';
                        son_node.style.top = 0;
                        add_div_tit(par_node, 'down');
                        ctrl.className += ' ctrl_left-toggle';
                        ctrl.innerHTML = '>';
                        son_node.style.display = 'block';
                        son_node.style.zIndex = 2;
                        par_node.style.height = son_node.clientHeight + 'px';
                        setTimeout(() => {
                            ctrl.style.background = 'rgba(36,39,46,.3)';
                        }, 300);
                        flag = 1;
                        break;
                    case 1:
                        son_node.style.top = -son_node.clientHeight + 'px';
                        add_div_tit(par_node);
                        ctrl.className = 'ctrl-toggle';
                        ctrl.innerHTML = '';
                        ctrl.style.background = 'rgba(0,0,0,.3)';
                        son_node.style.zIndex = -1;
                        setTimeout(() => {
                            par_node.className = 'close-toggle';
                            /* par_node.style.overflow = 'hidden';
                            par_node.style.height = par_node.dataset.height + 'px';
                            son_node.style.display = 'none'; */
                        }, 1200);
                        flag = 0;
                        break;
                }
            })
        }
    }
}

function media_toggle() {

}

function add_cld(e, par) {
    if (!par.contains(e)) {
        par.appendChild(e);
    }
}