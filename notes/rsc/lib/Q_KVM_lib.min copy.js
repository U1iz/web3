/ 2022.11.09 22:45 Q_KVM_lib ver: 0.15.0 /
/*
 * 0.3.0 add ajax fn,use txt instead of js
 * 0.3.2 add select fn (ctrl+click)
 * 0.4.0 add fn Ajax4MST() to read json for new Q_KVM_lib.js
 * 0.4.1 解决了按过 ctrl 键后不按其它键会保持复制模式的bug
 * 0.5.0 更改了部分结构，新增了 fill 类型
 * 0.6.0 新增了 JQ 单选功能
 * 0.7.0 新增了 CQ, MCQ 选择功能， 优化了 批改功能
 * 0.8.0 新增了 错题功能
 * 0.8.1 错题链接样式优化
 * 0.8.2 修复了在input输入时触发 F 热键的问题
 * 0.8.3 优化了 radio 的显示效果，修复了 split_line 高度不均的问题
 * 0.8.3_1 修复了忘加 style 的问题
 * 0.8.3_2 优化了 radio的 top 样式
 * 0.9.0 新增了 页面字体大小修改工具
 * 0.10.0 移动端适配
 * 0.11.0 增加了返回顶部功能，优化了滚动功能，修复了多空题的bug
 * 0.12.0 移除了 Ctrl+ 单击 的复制功能
 * 0.12.1 优化了 返回顶部容器的样式，将 split_line 的高度改为了1px
 * 0.12.2 修改了返回顶部容器呼出的条件
 * 0.12.3 禁止选中控件文本 优化体验
 * 0.12.4 转为Firefox修改了所以控件的样式
 * 0.12.5 修改了可见元素的 ::selection 样式
 * 0.12.6 笔电修改 优化移动端样式
 * 0.12.7 ::selection 样式优化
 * 0.12.8 修复了选择题不能传数字的问题
 * 0.13.0 新增 页面黑白功能
 * 0.14.0 新增 页面关灯功能, keyup 监听结构优化
 * 0.14.1 为关灯功能适配了 transition
 * 0.14.2 关灯样式优化
 * 0.14.4 修复了 fill题目 无样式的问题
 * 0.14.6 针对 题库 页面修复了一些问题
 * 0.14.7 关灯滚动条样式优化
 * 0.14.9 增加了选择题的结构，减小了触发面积
 * 0.14.11 .active_btn 样式优化
 * 0.14.13 将原F键批改改为 J 键
 * 0.14.14 优化快捷键算法
 * 0.15.0 新增 ajax功能 add_ajaxReq({key:value});
 */

let Q_KVM_index = 0;
let Q_KVM_global_loop_index = 0;
let Q_KVM_Local_loop_index = 0;
let wrongId_arr = [];
let question_length = 0;

function b(str) {
    return '<strong style="margin: 0 0.32rem;">' + str + '</strong>';
}

function bf(str, fontSize) {
    return ('<span style="margin: 0 0.32rem;font-weight: 400;font-size: ' + fontSize + '">' + str + '</span>');
}

function i(str) {
    return '<em style="margin: 0 0.4rem;">' + str + '</em>';
}

function u(str) {
    return '<ins style="margin: 0 0.32rem;">' + str + '</ins>';
}

function s(str) {
    return '<del style="margin: 0 0.32rem;">' + str + '</del>';
}

function pre(str) {
    return '<pre>' + str + '</pre>';
}

function addClass(e, cn) {
    if (e.className.indexOf(cn) == -1) {
        if (e.className == '') {
            e.className = cn;
        } else {
            e.className = e.className + ' ' + cn;
        }
    }
}

function two_fn([t, f], call1, call2) {
    if (t) {
        call1 && call1();
    } else if (f) {
        call2 && call2();
    }
}

function get_obj_type(obj) {
    return Object.prototype.toString.call(obj);
}

function get_normal_style(elem) {
    return elem.getBoundingClientRect();
}

function target_link(obj) {
    let dft = {
        elem: document.body,
        tgt: document.body,
        interval: 15,
        delta_x: 16,
        delta_y: 16,
        offset: 0,
        start: null,
        update: null,
        end: null,
    };
    for (let k in obj) {
        dft[k] = obj[k];
    }
    let is_obj_tgt = true;
    if (get_obj_type(dft.tgt) === '[object Array]') {
        is_obj_tgt = false;
    }
    dft.start && dft.start();
    dft.elem.addEventListener('click', () => {
        /* tgt.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' }); */
        let y = document.documentElement.scrollTop;
        let x = document.documentElement.scrollLeft;
        let __tgt;
        let tx;
        let ty;
        if (is_obj_tgt) {
            __tgt = dft.tgt.getBoundingClientRect();
            tx = __tgt.x;
            ty = __tgt.y + dft.offset;
        } else {
            tx = dft.tgt[0];
            ty = dft.tgt[1] + dft.offset;
        }
        let old = '';
        let step = 0;
        let tmr = setInterval(() => {
            step++;
            if (is_obj_tgt) {
                __tgt = dft.tgt.getBoundingClientRect();
                tx = __tgt.x;
                ty = __tgt.y + dft.offset;
                y = document.documentElement.scrollTop;
                x = document.documentElement.scrollLeft;
                x = Math.floor(x + tx / dft.delta_x);
                y = Math.floor(y + ty / dft.delta_y);
            } else {
                x = x + (tx - x) / dft.delta_x;
                y = y + (ty + dft.offset - y) / dft.delta_y;
                if (x > tx) {
                    x = x - x / dft.delta_x;
                }
                if (y > ty) {
                    y = y - y / dft.delta_y;
                }
            }
            x = x > 0 ? Math.ceil(x) : Math.floor(x);
            y = y > 0 ? Math.ceil(y) : Math.floor(y);
            let last = x + ', ' + y;
            window.scrollTo(x, y);
            dft.calling && dft.calling();
            if ((x == tx && y == ty) || last == old) {
                scrollEnd();
            }

            function scrollEnd() {
                console.log('滚动停啦' + '\n' + document.documentElement.scrollLeft + ', ' + document.documentElement.scrollTop);
                dft.end && dft.end();
                clearInterval(tmr);
            }
            if (step % 4 == 0) {
                old = last;
            }
        }, dft.interval);
    });
}

function slider(obj, num, [vobj, elem_w, elem_l, box_slider, tit]) {
    let hd = elem_w;
    let hdt = elem_l;
    let result = 24;
    if (localStorage.getItem('equipmentType') == 1) {
        document.documentElement.style.fontSize = '8px';
        obj.style.top = '-12px';
        obj.style.left = '-100px';
        obj.style.transform = 'scale(0.5)';
        obj.style.width = '320px';
        box_slider.style.display = 'none';
        vobj.style.width = '100px';
        vobj.style.left = '190px';
        vobj.style.font = '800 18px auto';
        vobj.style.color = '#0fb893';
        vobj.style.top = 0;
        tit.style.left = '37px';
        tit.style.top = '4px';
        tit.innerHTML = '更改页面文字大小:';
    } else if (localStorage.getItem('equipmentType') == 2) {
        document.documentElement.style.fontSize = '24px';
    }
    if (typeof parseFloat(document.documentElement.style.fontSize) == 'number') {
        result = parseFloat(document.documentElement.style.fontSize);
        vobj.value = result;
    } else if (vobj) {
        result = vobj.value;
    }
    hdt.style.width = result + 'px';
    hd.style.left = result + 'px';
    hd.addEventListener('mousedown', (event) => {
        var event = event || window.event;
        let leftVal = box_slider.offsetLeft + obj.offsetLeft;
        document.addEventListener('mousemove', slider_move);
        document.addEventListener('mouseup', () => {
            document.documentElement.style.fontSize = result + 'px';
            document.removeEventListener('mousemove', slider_move);
        });

        function slider_move() {
            var event = event || window.event;
            hd.style.left = event.clientX - leftVal + 'px';
            let far = parseInt(hd.style.left);
            if (far < 0) {
                hd.style.left = 0;
            } else if (far > 195) {
                hd.style.left = 195 + 'px';
            }
            hdt.style.width = hd.style.left;
            result = parseInt((parseInt(hdt.style.width) / 195) * num);
            vobj.value = result;
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
    });
    box_slider.onclick = (event) => {
        var event = event || window.event;
        let boxWidth = event.clientX - box_slider.offsetLeft - obj.offsetLeft;
        if (boxWidth > 195) {
            boxWidth = 195;
        }
        hdt.style.width = hd.style.left = boxWidth + 'px';
        let result = parseInt((parseInt(hdt.style.width) / 195) * num);
        vobj.value = result;
        document.documentElement.style.fontSize = result + 'px';
    };
    vobj.addEventListener('keyup', (e) => {
        if (e.keyCode == 13) {
            use_input();
        }
    });
    vobj.onblur = use_input;

    function use_input() {
        if (typeof parseFloat(vobj.value) == 'number' && parseFloat(vobj.value) >= 0) {
            result = vobj.value;
            hdt.style.width = result + 'px';
            hd.style.left = result + 'px';
            document.documentElement.style.fontSize = result + 'px';
        }
    }
}

function create(label) {
    return document.createElement(label);
}

function add_ajaxReq(req_obj) {
    let jNode = create('script');
    if (typeof $ !== 'function') {
        jNode.className = 'jquery_src';
        jNode.src = '/lib/jQuery.min.js';
        jNode.async = false;
        document.head.appendChild(jNode);
        jNode.onload = () => {
            _add_ajaxReq(req_obj);
        }
    } else {
        _add_ajaxReq(req_obj);
    }
}

function _add_ajaxReq(req_obj) {
    let wrap = create('div');
    let ctrl_show = create('span');
    if (!document.body.querySelector('#qA_wrap')) {
        wrap.id = 'qA_wrap';
        document.body.appendChild(wrap);
        ctrl_show.id = 'qAR_show';
        ctrl_show.title = '显示菜单';
        ctrl_show.innerHTML = '&gt;';
        wrap.appendChild(ctrl_show);
    }
    let ul = create('ul');
    let ctrl_hide = create('span');
    if (!document.body.querySelector('#qAR_wrap')) {
        ul.id = 'qAR_wrap';
        wrap.appendChild(ul);
        ctrl_hide.id = 'qAR_hide';
        ctrl_hide.innerHTML = '&lt;';
        ul.appendChild(ctrl_hide);
    }
    for (let i in req_obj) {
        let rl = create('li');
        rl.className = 'qDR_list';
        rl.dataset['val'] = i;
        rl.dataset['src'] = req_obj[i];
        ul.appendChild(rl)
    }
    let ctrl = $('#qAR_wrap #qAR_hide')[0];
    let ctrl_display = $('#qAR_show')[0];
    ctrl.addEventListener('click', _ => {
        $(ctrl_display).stop().animate({
            left: 0
        });
        $(ul).stop().animate({
            left: '-100%'
        });
        ctrl_display.addEventListener('click', _ => {
            $(ctrl_display).stop().animate({
                left: '1rem'
            });
            $(ul).stop().animate({
                left: '1rem'
            });
        })
    }); {
        let data_wrap = create('div');
        data_wrap.id = 'qADSNode_wrap';
        document.body.appendChild(data_wrap);
        q_ajax_req({
            req_par: ul,
            post_node: data_wrap
        });

        function q_ajax_req(req_obj) {
            req_obj.req_nodes = req_obj.req_par.childNodes;
            req_obj.req_par.childNodes.forEach(e => {
                if (e.tagName == 'LI' && e.className.indexOf('qDR_list') != -1) {
                    $(e).text($(e).data('val')); /* 默认打开第一个 */
                    window.addEventListener('load', () => {
                        load_data(req_obj.req_par.childNodes[1]);
                        e.addEventListener('click', _ => {
                            load_data(e);
                        })
                    })
                }

                function load_data(elem) {
                    $(req_obj.req_nodes).removeClass('data_current');
                    $.ajax({
                        type: 'GET',
                        async: true,
                        url: elem.dataset['src'],
                        success: rst => {
                            $(req_obj.post_node).html('');
                            $(elem).addClass('data_current');
                            Q_KV_module_par(rst, req_obj.post_node);
                        }
                    });
                }
            })
        }
    }
}

let q_kvm_loop_len = 0;

function Q_KV_module(arr, par_elem) {
    q_kvm_loop_len = arr.length;
    Q_KV_module_par(arr, par_elem);
}

function display_allAnswer(isShow) {
    let AffectedObj = document.querySelectorAll('.btn_showRst');
    let answers = document.querySelectorAll('.answers');
    let show_all_answer = document.querySelectorAll('.show_all_answer');
    if (isShow != undefined) {
        if (isShow) {
            fn_show();
        } else {
            fn_hide();
        }
    }

    function set_saa_text(t) {
        for (let i of show_all_answer.keys()) {
            show_all_answer[i].innerHTML = t;
        }
    }

    function fn_show() {
        for (let i of answers.keys()) {
            answers[i].style.display = 'inline-block';
            AffectedObj[i].innerHTML = '隐藏答案';
        }
        set_saa_text('隐藏所有答案');
    }

    function fn_hide() {
        for (let i of answers.keys()) {
            answers[i].style.display = 'none';
            AffectedObj[i].innerHTML = '显示答案';
        }
        set_saa_text('显示所有答案');
    }
}

let single_times = 10;
let leave_len;

function Q_KV_module_par(arr, par_elem) {
    leave_len = single_times > arr.length ? arr.length : arr.length - single_times;
    let wrong_bank_wrap = document.createElement('div');
    let wrong_bank_cont = document.createElement('ul');
    addClass(wrong_bank_wrap, 'wrong_bank_wrap');
    if (!document.querySelector('.wrong_bank_wrap')) {
        let wrong_bank_tit = document.createElement('h2');
        wrong_bank_tit.innerHTML = '错题集';
        wrong_bank_tit.id = 'wrong_bank_tit';
        addClass(wrong_bank_cont, 'wrong_bank_cont');
        wrong_bank_wrap.appendChild(wrong_bank_tit);
        wrong_bank_wrap.appendChild(wrong_bank_cont);
        let close_btn = document.createElement('span');
        addClass(close_btn, 'wrong_bank_close_btn');
        close_btn.innerHTML = 'x';
        close_btn.onclick = () => {
            wrong_bank_wrap.style.display = 'none';
        };
        wrong_bank_wrap.appendChild(close_btn);
        document.body.appendChild(wrong_bank_wrap);
    } /* 到达页面顶部 */
    let get2top = document.createElement('div');
    window.addEventListener('scroll', () => {
        let root_size = parseFloat(document.documentElement.style.fontSize);
        if (!typeof root_size == 'number') {
            root_size = 24;
        }
        if (document.documentElement.scrollTop >= root_size * 32) {
            get2top.style.bottom = '1rem';
            get2top.style.opacity = 1;
        } else {
            get2top.style.bottom = -get2top.clientHeight + 'px';
            get2top.style.opacity = 0;
        }
    });
    get2top.id = 'get_top';
    get2top.innerHTML = '<svg t="1664599446924" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1495" xmlns:xlink="http://www.w3.org/1999/xlink"> <path d="M30.332842 0.346901l963.333292 0 0 74.102718-963.333292 0 0-74.102718Z" p-id="1496"></path> <path d="M564.392254 162.53684 512 110.143563 459.606723 162.53684 459.606723 162.53684 119.017674 503.125889 171.409928 555.519166 474.948129 251.980965 474.948129 1023.653099 549.050848 1023.653099 549.050848 251.980965 852.589049 555.519166 904.982326 503.125889 564.392254 162.53684Z" p-id="1497"></path></svg>';
    if (!document.querySelector('#get_top')) {
        document.body.appendChild(get2top);
        target_link({
            elem: get2top,
            tgt: [0, 0],
            delta_y: 32
        });
    }
    let div_modulePar = document.createElement('div');
    let ul_contentListPar = document.createElement('ul');
    let show_all_answer = document.createElement('button');
    let show_all_RW = document.createElement('button');
    let fontSize_changer_wrap = document.createElement('div');
    let q_unifier = document.createElement('button');
    addClass(q_unifier, 'ctrl_btn');
    addClass(show_all_RW, 'ctrl_btn');
    addClass(show_all_answer, 'ctrl_btn');
    show_all_RW.innerHTML = '一键批改';
    show_all_answer.innerHTML = '显示所有答案';
    q_unifier.innerHTML = '统一题目字样'; {
        let slider_tit = document.createElement('span');
        let box_slider = document.createElement('span');
        let hd_slider = document.createElement('i');
        let hdt_slider = document.createElement('i');
        let fontSize_val = document.createElement('input');
        slider_tit.id = 'slider_tit';
        box_slider.id = 'box_slider';
        hd_slider.id = 'hd_slider';
        hdt_slider.id = 'hdt_slider';
        fontSize_val.id = 'fontSize_val';
        fontSize_changer_wrap.appendChild(slider_tit);
        box_slider.appendChild(hd_slider);
        box_slider.appendChild(hdt_slider);
        fontSize_changer_wrap.appendChild(box_slider);
        fontSize_changer_wrap.appendChild(fontSize_val);
        slider_tit.innerHTML = '更改页面字体大小';
        fontSize_val.value = 24;
        fontSize_val.setAttribute('maxlength', 3);
        fontSize_val.setAttribute('max', 100);
        fontSize_val.setAttribute('min', 0);
        fontSize_val.setAttribute('type', 'number');
        slider(fontSize_changer_wrap, 100, [fontSize_val, hd_slider, hdt_slider, box_slider, slider_tit]);
    }
    fontSize_changer_wrap.id = 'fontSize_changer_wrap';
    addClass(show_all_answer, 'show_all_answer');
    addClass(q_unifier, 'q_unifier');
    addClass(show_all_RW, 'show_all_RW');
    if (!par_elem) {
        document.body.appendChild(div_modulePar);
    } else {
        par_elem.appendChild(div_modulePar)
    }
    div_modulePar.appendChild(show_all_answer);
    div_modulePar.appendChild(q_unifier);
    div_modulePar.appendChild(show_all_RW);
    if (!document.querySelector('#fontSize_changer_wrap')) {
        document.body.appendChild(fontSize_changer_wrap);
    }
    div_modulePar.appendChild(ul_contentListPar);
    div_modulePar.setAttribute('id', 'Q_KVM_wrap' + Q_KVM_index);
    ul_contentListPar.setAttribute('id', 'Q_KVM_list_' + Q_KVM_index);
    addClass(div_modulePar, 'Q_KVM_wrap');
    addClass(ul_contentListPar, 'Q_KVM_list');
    ul_contentListPar.style.marginLeft = 2.4 + 'rem';
    // let divide = arr.length / single_times;
    // let times_len =
    //     divide - (Math.floor(divide)) === 0 ?
    //     divide : Math.floor(divide) + 1;
    for (let i = 0; i < single_times; i++) {
        Q_KV_module_contentList(arr[i], arr, ul_contentListPar, i == single_times - 1 && single_times < leave_len ? true : false, leave_len);
        Q_KVM_global_loop_index++;
        Q_KVM_Local_loop_index++;
        arr.shift();
    }
    show_all_answer.addEventListener('click', () => {
        switch (show_all_answer.innerText) {
            case '显示所有答案':
                display_allAnswer(true);
                break;
            case '隐藏所有答案':
                display_allAnswer(false);
                break;
        }
    });
    let can_exe = true;

    function jieliq() {
        setTimeout(() => {
            can_exe = true;
        }, 640);
    }
    show_all_RW.addEventListener('click', () => {
        if (can_exe) {
            can_exe = false;
            jieliq();
            wrongId_arr = [];
            wrong_bank_wrap.style.display = 'block';
            let ex_btn = document.querySelectorAll('.btn_showRW');
            for (let i of ex_btn.keys()) {
                ex_btn[i].click();
            }
        }
    });
    let unifiedFlag = 0;
    q_unifier.addEventListener('click', () => {
        let questions = document.querySelectorAll('.questions');
        if (sessionStorage.getItem('execute_all') == 'true' || sessionStorage.getItem('execute_all') == 'direct') {
            questions = document.querySelectorAll('.questions_all');
        }
        switch (unifiedFlag) {
            case 0:
                for (let i = 0; i < questions.length; i++) {
                    questions[i].style.fontSize = 1.1 + 'rem';
                    questions[i].style.fontFamily = 'Microsoft YaHei';
                    questions[i].style.fontWeight = 400;
                    questions[i].style.color = '#222333';
                    questions[i].style.textShadow = '0.16rem 0.24rem 0.2rem rgba(0 0 0/10%)';
                    questions[i].className += ' questionNormal';
                    q_unifier.style.color = '#999';
                    q_unifier.style.cursor = 'default';
                    q_unifier.innerHTML = '刷新回归原样式';
                }
                unifiedFlag = 1;
                break;
            case 1:
                ul_contentListPar.load(location.href + ' #Q_KVM_list_' + Q_KVM_index + '>*');
                break;
        }
    });
    Q_KVM_Local_loop_index = 0;
    Q_KVM_index++;
}

function Q_KV_module_contentList(valueArr, arr, par, is_last, _leave_len) {
    /* let par = document.getElementById('Q_KVM_list_' + Q_KVM_index); */
    let li_contentList = document.createElement('li');
    let div_questionWrap = document.createElement('div');
    let div_core = document.createElement('div');
    let ipt = document.createElement('input');
    let btn_showRW = document.createElement('button');
    let btn_showRst = document.createElement('button');
    let span_splitLine = document.createElement('span');

    addClass(span_splitLine, 'span_splitLine');
    span_splitLine.style.marginLeft = -par.offsetLeft + 'px';
    span_splitLine.style.width = document.body.clientWidth + 'px';
    window.addEventListener('load', () => {
        span_splitLine.style.width = document.body.clientWidth + 'px';
    });
    window.addEventListener('resize', () => {
        span_splitLine.style.width = document.body.clientWidth + 'px';
    });
    let p_question = document.createElement('p');
    let p_show_RW = document.createElement('p');
    let p_show_answer = document.createElement('p');
    addClass(p_show_answer, 'questionAnswerAddByQ_KVM');
    addClass(p_show_answer, 'p_show_answer');
    let formatArr = [];
    for (let i = 0; i < valueArr.length; i++) {
        if (typeof valueArr[i] == 'object') {
            if (valueArr[i][0] == 'formatArr' || valueArr[i][0] == 'FAR') {
                valueArr[i].shift();
                formatArr = valueArr[i][0];
            }
        }
    }

    function wi_add() {
        wrongId_arr[wrongId_arr.length] = li_contentList.id;
        let tit = document.querySelector('#wrong_bank_tit');
        let lst_wrap = document.querySelector('.wrong_bank_cont');
        let li = document.createElement('li');
        let link = document.createElement('span');
        let wrong_li = document.getElementById(li_contentList.id);
        lst_wrap.style.textIndent = '2em';
        li.style.margin = '0.32rem 0';
        li.style.color = '#00177b'; {
            /* 以错题序号排列 */
            li.style.listStyleType = 'none';
            let index_mark = document.createElement('span');
            let val = wrong_li.getAttribute('question_index');
            val < 10 ? (val = '0' + val) : null;
            index_mark.innerHTML = val;
            index_mark.style.pointerEvents = 'none';
            addClass(index_mark, 'wrong_index_mark');
            li.appendChild(index_mark);
        }
        addClass(li, 'wrong_bank_list');
        addClass(link, 'wrong_bank_link');
        tit.innerHTML = '错题 x' + (wrongId_arr.length);
        link.innerHTML = p_question.innerHTML;
        li.appendChild(link);
        lst_wrap.appendChild(li);
        target_link({
            elem: link,
            tgt: wrong_li,
            offset: -100,
            start: tgt_lnk_call,
            end: tgt_lnk_call,
        });

        function tgt_lnk_call() {
            let crt = wrong_li;
            let temp = crt.className;
            let temp_transition = crt.style.transition;
            crt.style.transition = 'all 0.2s';
            crt.className = temp + ' current_wrong_qst';
            setTimeout(() => {
                crt.style.transition = 'all 0.32s';
                crt.className = temp.replace(/current_wrong_qst/g, '');
                setTimeout(() => {
                    crt.style.transition = temp_transition;
                }, 320);
            }, 640);
        }
    }
    let checkbox_arr = [];
    let M_CQ_carr = [];

    function CQ_MCQ(para) {
        let ul_showChoices = document.createElement('ul');
        div_questionWrap.appendChild(ul_showChoices);
        let p_show_RW = document.createElement('p');
        let btn_showRW = document.createElement('button');
        btn_showRW.innerHTML = '显示对错';
        addClass(btn_showRW, 'btn_showRW');
        addClass(p_show_RW, 'p_show_RW');
        let acs = valueArr[1];
        btn_showRW.setAttribute('answer', valueArr[2]);
        let index = 0;
        for (let i in acs) {
            let li_choice = document.createElement('li');
            let active_btn = document.createElement('div');
            let __p_cont = document.createElement('p');
            let checkbox_ipt = document.createElement('input');
            let ipt_cn = '';
            let ipt_current = '';
            if (para == 'CQ') {
                checkbox_ipt.type = 'radio';
                ipt_cn = 'questionChoices_current_rd';
                ipt_current = 'CQ_ipt_current';
            } else if (para == 'MCQ') {
                ipt_current = 'MCQ_ipt_current';
                checkbox_ipt.type = 'checkbox';
                ipt_cn = 'questionChoices_current_cb';
            }
            checkbox_ipt.name = 'M_CQ';
            checkbox_ipt.value = acs[i];
            ul_showChoices.appendChild(li_choice);
            active_btn.appendChild(checkbox_ipt);
            active_btn.appendChild(__p_cont);
            li_choice.appendChild(active_btn);
            div_core.appendChild(btn_showRW);
            div_core.appendChild(p_show_RW);
            div_core.appendChild(btn_showRst);
            div_core.appendChild(p_show_answer);
            addClass(checkbox_ipt, 'checkbox_ipt');
            addClass(__p_cont, 'questionChoices');
            addClass(li_choice, 'M_CQ_li_choice');
            addClass(active_btn, 'active_btn');
            __p_cont.innerHTML = format(acs[i].toString(), formatArr);
            li_choice.setAttribute('index', index + 1);
            li_choice.setAttribute('latin', num2letter(index + 1));
            setQuestionColor(p_question, valueArr[3]);
            checkbox_arr[checkbox_arr.length] = checkbox_ipt;
            M_CQ_carr[M_CQ_carr.length] = __p_cont;
            active_btn.addEventListener('click', () => {
                for (let i in M_CQ_carr) {
                    if (checkbox_arr[i].checked == true) {
                        checkbox_arr[i].className = 'checkbox_ipt ' + ipt_current;
                        M_CQ_carr[i].className = 'questionChoices ' + ipt_cn;
                        M_CQ_carr[i].parentNode.parentNode.setAttribute('current', 'true');
                    } else {
                        checkbox_arr[i].className = 'checkbox_ipt';
                        M_CQ_carr[i].parentNode.parentNode.removeAttribute('current');
                        M_CQ_carr[i].className = 'questionChoices';
                    }
                }
                checkbox_ipt.click();
            });
            index++;
        }
        btn_showRW.addEventListener('click', () => {
            let uv = '';
            let rv = 'null';
            if (para == 'CQ') {
                for (let i in M_CQ_carr) {
                    if (M_CQ_carr[i].parentNode.parentNode.getAttribute('current') == 'true') {
                        uv = M_CQ_carr[i].parentNode.parentNode.getAttribute('index');
                    }
                }
                rv = btn_showRW.getAttribute('answer');
                if (uv == rv) {
                    ex_RW(true);
                } else {
                    ex_RW(false);
                }
            } else if (para == 'MCQ') {
                uv = [];
                for (let i in M_CQ_carr) {
                    if (M_CQ_carr[i].parentNode.parentNode.getAttribute('current') == 'true') {
                        uv[uv.length] = M_CQ_carr[i].parentNode.parentNode.getAttribute('index');
                    }
                }
                rv = btn_showRW.getAttribute('answer').split(',');
                if (uv.length == rv.length) {
                    if (pop_order(uv).toString() == pop_order(rv).toString()) {
                        ex_RW(true);
                    } else {
                        ex_RW(false);
                    }
                } else {
                    ex_RW(false);
                }
            }

            function pop_order(arr) {
                for (let i in arr) {
                    for (let j of arr.keys()) {
                        let temp = arr[j];
                        if (arr[j + 1] < temp) {
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                        }
                    }
                }
                return arr;
            }

            function ex_RW(para) {
                if (para) {
                    p_show_RW.innerHTML = '√';
                    p_show_RW.className = 'p_show_RW user_right';
                } else {
                    wi_add();
                    p_show_RW.className = 'p_show_RW user_wrong';
                    p_show_RW.innerHTML = '×';
                }
            }
        });
    }
    let choose_wrap = document.createElement('form');
    let radio_true = document.createElement('input');
    let radio_false = document.createElement('input');
    let text_true = document.createElement('span');
    let text_false = document.createElement('span');
    addClass(choose_wrap, 'choose_wrap');
    addClass(radio_true, 'radio_JQ');
    addClass(radio_false, 'radio_JQ');
    addClass(text_true, 'rd_text_JQ');
    addClass(text_false, 'rd_text_JQ');
    choose_wrap.appendChild(radio_true);
    choose_wrap.appendChild(text_true);
    choose_wrap.appendChild(radio_false);
    choose_wrap.appendChild(text_false);
    radio_true.value = 'true';
    radio_true.name = 'JQ';
    text_true.innerHTML = 'True';
    radio_false.value = 'false';
    radio_false.name = 'JQ';
    text_false.innerHTML = 'False';
    let radio_ipt = [radio_true, radio_false];
    let text_display = [text_true, text_false];
    for (let i in radio_ipt) {
        radio_ipt[1].style.marginLeft = '0.4rem';
        radio_ipt[i].setAttribute('type', 'radio');
        text_display[i].addEventListener('click', () => {
            radio_ipt[i].click();
            for (let k in radio_ipt) {
                if (radio_ipt[k].checked == true) {
                    radio_ipt[k].setAttribute('current', 'true');
                    text_display[k].className = 'rd_text_JQ radio_JQ_current';
                } else {
                    text_display[k].className = 'rd_text_JQ';
                    radio_ipt[k].removeAttribute('current');
                }
            }
        });
    }

    function JQ() {
        div_core.appendChild(choose_wrap);
        div_core.appendChild(btn_showRW);
        btn_showRW.addEventListener('click', () => {
            let uv = 'ud';
            let rv = 'null';
            for (let i in radio_ipt) {
                if (radio_ipt[i].getAttribute('current') == 'true') {
                    uv = radio_ipt[i].value;
                }
                if (radio_ipt[i].getAttribute('correct') == 'true') {
                    rv = radio_ipt[i].value;
                }
            }
            if (uv == rv) {
                p_show_RW.innerHTML = '√';
                p_show_RW.className = 'p_show_RW user_right';
            } else {
                wi_add();
                p_show_RW.innerHTML = '×';
                p_show_RW.className = 'p_show_RW user_wrong';
            }
        });
        div_core.appendChild(p_show_RW);
        div_core.appendChild(btn_showRst);
        div_core.appendChild(p_show_answer);
        p_question.className += ' judgeQuestionAddByQ_KVM';
    }

    function ae() {
        div_questionWrap.remove();
        div_core.remove();
        let h3 = document.createElement('h3');
        li_contentList.appendChild(h3);
        li_contentList.style.display = 'block';
        h3.style.fontSize = valueArr[1][0] + 'rem';
        h3.style.fontWeight = valueArr[1][1];
        h3.style.letterSpacing = valueArr[1][2];
        h3.style.color = '#222';
        h3.className += ' elemAddByQ_KVM_normal';
        valueArr[0] = format(valueArr[0], formatArr);
        h3.innerHTML = valueArr[0];
        newStyle_API_Ver000(valueArr[3], li_contentList);
        newStyle_API_Ver000(valueArr[2], h3);
    }

    function question_arr_plus() {
        question_length++;
        li_contentList.setAttribute('question_index', question_length);
    }

    function fillType() {
        p_question.className += ' fillTypeQuestionAddByQ_KVM';
        if (typeof valueArr[1] != 'string') {
            let ul = document.createElement('ul');
            addClass(ul, 'operate_answer_wrap');
            ul.style.marginLeft = '1rem';
            for (let i in valueArr[1]) {
                let li = document.createElement('li');
                let ipt = document.createElement('input');
                addClass(ipt, 'answer_ipt');
                ipt.setAttribute('type', 'text');
                ipt.setAttribute('placeholder', '输入你认为的答案');
                li.style.listStyleType = 'decimal-leading-zero';
                li.style.fontSize = '0.72rem';
                li.style.color = '#42bee4';
                li.appendChild(ipt); {
                    let btn_showRW = document.createElement('button');
                    let p_show_RW = document.createElement('p');
                    let btn_showRst = document.createElement('button');
                    li.appendChild(btn_showRW);
                    addClass(btn_showRW, 'btn_showRW');
                    let p_show_answer = document.createElement('p'); {
                        btn_showRW.setAttribute('answer', valueArr[1][i]);
                        btn_showRW.innerHTML = '显示对错';
                        btn_showRW.addEventListener('click', () => {
                            let uv = ipt.value;
                            let rv = btn_showRW.getAttribute('answer');
                            if (uv == rv) {
                                p_show_RW.innerHTML = '√';
                                p_show_RW.className = 'p_show_RW user_right';
                            } else {
                                wi_add();
                                p_show_RW.innerHTML = '×';
                                p_show_RW.className = 'p_show_RW user_wrong';
                            }
                        });
                    } {
                        addClass(p_show_RW, 'p_show_RW');
                        li.appendChild(p_show_RW);
                    } {
                        li.appendChild(btn_showRst);
                        btn_showRst.innerHTML = '显示答案';
                        addClass(btn_showRst, 'btn_showRst');
                        btn_showRst.addEventListener('click', () => {
                            two_fn([btn_showRst.innerText == '显示答案', btn_showRst.innerText == '隐藏答案', ], () => {
                                p_show_answer.style.display = 'inline-block';
                                btn_showRst.innerHTML = '隐藏答案';
                            }, () => {
                                p_show_answer.style.display = 'none';
                                btn_showRst.innerHTML = '显示答案';
                            });
                        });
                    } {
                        p_show_answer.innerHTML = valueArr[1][i];
                        addClass(p_show_answer, 'questionAnswerAddByQ_KVM');
                        addClass(p_show_answer, 'p_show_answer');
                        addClass(p_show_answer, 'answers');
                        li.appendChild(p_show_answer);
                    }
                }
                ul.appendChild(li);
            }
            div_core.appendChild(ul);
        } else {
            div_core.appendChild(ipt);
            div_core.appendChild(btn_showRW);
            div_core.appendChild(p_show_RW);
            div_core.appendChild(btn_showRst);
            div_core.appendChild(p_show_answer);
            setAnswerInner(valueArr[1], valueArr[3]);
        }
        setQuestionColor(p_question, valueArr[2]);
    }

    function num2letter(num) {
        num = num + 64;
        return String.fromCharCode(num);
    }
    par.appendChild(li_contentList);
    if (is_last) {
        /* mark */
        li_contentList.timmer = setTimeout(() => {
            leave_len = single_times > _leave_len ? _leave_len : _leave_len - single_times;
            single_times = single_times > _leave_len ? _leave_len : single_times;
            for (let i = 0; i < single_times; i++) {
                console.log((i == single_times - 1 && single_times != _leave_len));
                Q_KV_module_contentList(arr[i], arr, par, (i == single_times - 1 && single_times != _leave_len) ? true : false, _leave_len);
                Q_KVM_global_loop_index++;
                Q_KVM_Local_loop_index++;
                arr.shift();
            }
        }, 1000);
    }
    li_contentList.appendChild(div_questionWrap);
    div_questionWrap.appendChild(p_question);
    li_contentList.appendChild(div_core);
    addClass(div_core, 'operate_answer_wrap');
    switch (valueArr[0]) {
        case 'CQ':
            li_contentList.setAttribute('type', 'CQ');
            setAnswerInner(valueArr[3], valueArr[0]); {
                let v0 = valueArr[0];
                valueArr.shift();
                CQ_MCQ(v0);
            }
            question_arr_plus();
            break;
        case 'MCQ':
            li_contentList.setAttribute('type', 'MCQ');
            setAnswerInner(valueArr[3], valueArr[0]); {
                let v0 = valueArr[0];
                valueArr.shift();
                CQ_MCQ(v0);
            }
            question_arr_plus();
            break;
        case 'JQ':
            li_contentList.setAttribute('type', 'JQ');
            setAnswerInner(valueArr[2], valueArr[0]);
            valueArr.shift();
            setQuestionColor(p_question, valueArr[2]);
            JQ();
            question_arr_plus();
            break;
        case 'elem':
            li_contentList.setAttribute('type', 'elem');
            valueArr.shift();
            ae();
            break;
        case 'fill':
            setQuestionColor(p_question, valueArr[2]);
            li_contentList.setAttribute('type', 'fill');
            valueArr.shift();
            fillType();
            question_arr_plus();
            break;
        default:
            li_contentList.setAttribute('type', 'default');
            if (valueArr[3] == 'list') {
                li_contentList.setAttribute('type', 'list');
            }
            div_core.appendChild(ipt);
            div_core.appendChild(btn_showRW);
            div_core.appendChild(p_show_RW);
            div_core.appendChild(btn_showRst);
            div_core.appendChild(p_show_answer);
            setAnswerInner(valueArr[1], valueArr[3]);
            setQuestionColor(p_question, valueArr[2]);
            question_arr_plus();
            break;
    }
    li_contentList.appendChild(span_splitLine);
    li_contentList.className = 'question_wrap';
    addClass(p_question, 'questions');
    if (sessionStorage.getItem('execute_all') == 'true' || sessionStorage.getItem('execute_all') == 'direct') {
        addClass(p_question, 'questions_all');
    }
    p_question.innerHTML = (format(valueArr[0], formatArr)).replace(/\(\)/g, '(&nbsp;&nbsp;)');
    p_question.style.fontSize = '1rem';

    function setAnswerInner(para, jd) {
        if (jd == 'list') {
            div_core.insertBefore(document.createElement('br'), div_core.childNodes[4]);
            div_core.insertBefore(document.createElement('br'), div_core.childNodes[3]);
            addList(p_show_answer, para, jd);
        } else if (jd == 'CQ') {
            p_show_answer.innerHTML = num2letter(para);
        } else if (jd == 'MCQ') {
            let arrNew = [];
            for (let ib = 0; ib < para.length; ib++) {
                arrNew[ib] = num2letter(para[ib]);
            }
            p_show_answer.innerHTML = arrNew.toString();
        } else if (jd == 'JQ') {
            if (para == true) {
                addClass(p_show_answer, 'correct');
                p_show_answer.innerHTML = '✔';
                radio_true.setAttribute('correct', 'true');
                btn_showRW.setAttribute('answer', 'true');
            } else {
                addClass(p_show_answer, 'wrong');
                p_show_answer.innerHTML = '✖';
                radio_false.setAttribute('correct', 'true');
                btn_showRW.setAttribute('answer', 'false');
            }
        } else {
            p_show_answer.innerHTML = para;
            if (typeof para == 'object') {
                if (para.length > 1) {}
                p_show_answer.innerHTML = para[0];
            }
        }
    }
    if (sessionStorage.getItem('execute_all') == 'true' || sessionStorage.getItem('execute_all') == 'direct') {
        p_show_answer.className += ' answers';
    }

    function setQuestionColor(e, value) {
        switch (value) {
            case 1:
                addClass(e, 'easy_01');
                break;
            case 2:
                addClass(e, 'normal_01');
                break;
            case 3:
                addClass(e, 'normal_02');
                break;
            case 4:
                addClass(e, 'hard_01');
                break;
            case 5:
                addClass(e, 'hard_02');
                break;
            case 6:
                addClass(e, 'worn_01');
                break;
            case 7:
                addClass(e, 'difficult_01');
                break;
            case 8:
                addClass(e, 'difficult_02');
                break;
        }
    }
    initializeElementStyle();

    function initializeElementStyle() {
        addClass(ipt, 'answer_ipt');
        ipt.setAttribute('type', 'text');
        ipt.setAttribute('placeholder', '输入你认为的答案');
        btn_showRW.innerHTML = '显示对错';
        addClass(btn_showRW, 'btn_showRW');
        addClass(p_show_RW, 'p_show_RW');
        btn_showRst.innerHTML = '显示答案';
        addClass(btn_showRst, 'btn_showRst');
    }

    function trueAndFalseLog(temp) {
        switch (temp) {
            case true:
                p_show_RW.innerHTML = '√';
                p_show_RW.className = 'p_show_RW user_right';
                break;
            case false:
                wi_add();
                p_show_RW.innerHTML = '×';
                p_show_RW.className = 'p_show_RW user_wrong';
                break;
            case 'remove':
                ipt.remove();
                p_show_RW.remove();
                btn_showRW.remove();
                break;
            default:
                console.log(temp);
                p_show_RW.innerHTML = temp;
                break;
        }
    }
    if (li_contentList.getAttribute('type') == 'default') {
        btn_showRW.onclick = () => {
            if (btn_showRW.innerHTML == '显示对错') {
                let temp = false;
                if (typeof valueArr[1] == 'string') {
                    ipt.value == valueArr[1] && (() => {
                        temp = true;
                    })();
                } else if (typeof valueArr[1] == 'object') {
                    for (let ia = 0; ia < valueArr[1].length; ia++) {
                        if (ipt.value == valueArr[1][ia]) {
                            temp = true;
                        }
                    }
                }
                trueAndFalseLog(temp);
            } else {
                btn_showRW.innerHTML = '显示对错';
                trueAndFalseLog('');
            }
        };
    } else if (li_contentList.getAttribute('type') == 'CQ' || li_contentList.getAttribute('type') == 'MCQ' || li_contentList.getAttribute('type') == 'list') {
        trueAndFalseLog('remove');
    }
    if (sessionStorage.getItem('execute_all') == 'true' || sessionStorage.getItem('execute_all') == 'direct') {
        btn_showRst.className += ' btn_showRst_all';
    }
    p_show_answer.className += ' answers';
    btn_showRst.onclick = () => {
        switch (btn_showRst.innerHTML) {
            case '显示答案':
                btn_showRst.innerHTML = '隐藏答案';
                p_show_answer.style.display = 'inline-block';
                btn_showRst_flag = 1;
                break;
            case '隐藏答案':
                btn_showRst.innerHTML = '显示答案';
                p_show_answer.style.display = 'none';
                btn_showRst_flag = 0;
                break;
        }
    };
    let li_contentList_name = 'Q_KVM_list_exe_' + Q_KVM_index + '_gLoop_' + Q_KVM_global_loop_index + '_lLoop_' + Q_KVM_Local_loop_index;
    li_contentList.setAttribute('id', li_contentList_name);
    li_contentList.setAttribute('gIndex', Q_KVM_global_loop_index);
    li_contentList.setAttribute('lIndex', Q_KVM_Local_loop_index);
    setTimeout(() => {
        li_contentList.style.listStyleType = 'decimal-leading-zero';
    }, 100);
}
let aa = 0;
let bb = 0;
let cc = 0;
document.addEventListener('keyup', (e) => {
    if (document.activeElement.tagName == 'INPUT') {} else {
        if (e.keyCode == 83) {
            function oaw_bat(dis) {
                let oaw = document.querySelectorAll('.operate_answer_wrap');
                oaw.forEach(e => {
                    e.style.display = dis;
                });
            }
            switch (aa % 6) {
                case 2:
                    oaw_bat('none');
                    break;
                case 5:
                    oaw_bat('block');
                    aa++;
                    break;
            }
            aa > 6 ? (aa = 1) : aa++;
        }
        if (e.keyCode == 82) {
            switch (bb % 6) {
                case 2:
                    display_allAnswer(true);
                    break;
                case 5:
                    display_allAnswer(false);
                    bb++;
                    break;
            }
            bb > 6 ? (bb = 1) : bb++;
        }
        if (e.keyCode == 76) {
            function sl_bat(dis) {
                let sl = document.querySelectorAll('.span_splitLine');
                sl.forEach(e => {
                    e.style.display = dis;
                });
            }
            switch (cc % 6) {
                case 2:
                    sl_bat('none');
                    break;
                case 5:
                    sl_bat('block');
                    cc++;
                    break;
            }
            cc > 6 ? (cc = 1) : cc++;
        }
    }
});

function addList(elem, list, type) {
    let ul = document.createElement('ul');
    ul.style.color = '#666';
    elem.appendChild(ul);
    if (typeof list == 'string') {
        let li = document.createElement('li');
        let tNode = document.createElement('p');
        tNode.innerHTML = list;
        if (list == '') {
            li.style.display = 'none';
        }
        ul.appendChild(li);
        li.appendChild(tNode);
    } else {
        for (let iv = 0; iv < list.length; iv++) {
            let li = document.createElement('li');
            let tNode = document.createElement('p');
            li.style.listStyleType = 'upper-latin';
            setListStyle(li, ['#222', '400', '0.96rem']);
            tNode.innerHTML = list[iv];
            if (list[iv] == '') {
                li.style.position = 'absolute';
                li.style.overflow = 'hidden';
            }
            type == 'list' && (() => {
                li.className += ' questionAnswerAddByQ_KVM';
                tNode.className += ' questionAnswerAddByQ_KVM';
            })();
            ul.appendChild(li);
            tNode.className += ' click2select';
            li.appendChild(tNode);
        }
    }
}

function setListStyle(elem, arr) {
    elem.style.color = arr[0];
    elem.style.fontWeight = arr[1];
    elem.style.fontSize = arr[2];
}
let locked = true;
let lcs = 0;

function lock() {
    console.log('locked');
    alert('lock 通过按下密码以解锁\n(成功才有提示)\n(在触发域中)禁止选中/右键/以及一切键盘事件\n这不是用localStorage写的，所以你刷新就可以回归初始了');
    window.onkeydown = window.onkeyup = window.onkeypress = () => {
        window.event.returnValue = false;
        return false;
    };
    document.oncontextmenu = () => {
        return false;
    };
    document.onselectstart = () => {
        return false;
    };
    locked = true;
}
let fPsd = false;
let sPsd = false;
let tPsd = false;
document.addEventListener('keydown', (e) => {
    lmt(e);
});
document.addEventListener('keyup', (e) => {
    if (document.activeElement.tagName == 'INPUT') {} else {
        if (e.keyCode == 74) {
            document.querySelector('.show_all_RW').click();
        } else if (e.keyCode == 71) {
            if (document.documentElement.className) {
                document.documentElement.className = '';
            } else {
                document.documentElement.className = 'gray_page';
            }
        } else if (e.keyCode == 66) {
            addClass(document.body, 'body');
            if (document.body.className.indexOf('black_page') == -1) {
                document.body.className += ' black_page';
            } else {
                document.body.className = document.body.className.replace(/black_page/g, '');
            }
        }
        ulk(e);
    }
});

function lmt(e) {
    if (e.ctrlKey && e.keyCode == 70) {
        if (locked) {
            alert('想找啥呢小老弟？');
            lock();
            e.keyCode = 0;
            e.returnValue = false;
        } else {
            lcs++;
        }
    }
}

function ulk(e) {
    if (e.keyCode == 83) {
        fPsd = true;
        let ft = setTimeout(() => {
            fPsd = false;
        }, 2400);
    } else if (e.keyCode == 87) {
        sPsd = true;
        let st = setTimeout(() => {
            sPsd = false;
        }, 1600);
        if (!fPsd) {
            tPsd = false;
            sPsd = false;
            clearTimeout(st);
        }
    } else if (e.keyCode == 89) {
        tPsd = true;
        let tt = setTimeout(() => {
            tPsd = false;
        }, 720);
        if (!tPsd && !sPsd) {
            fPsd = false;
            sPsd = false;
            tPsd = false;
            clearTimeout(tt);
        }
        if (fPsd && sPsd && tPsd) {
            console.log('unlock');
            alert('unlock');
            window.onkeydown = window.onkeyup = window.onkeypress = () => {
                window.event.returnValue = true;
                return true;
            };
            window.onkeydown = (e) => {
                if (e.ctrlKey && e.keyCode == 70) {
                    return true;
                }
            };
            document.oncontextmenu = () => {
                return true;
            };
            document.onselectstart = () => {
                return true;
            };
            locked = false;
        }
    }
}
document.ondragstart = () => {
    return false;
};
let styleNode_selection = document.createElement('style');
styleNode_selection.innerText += ' br{-moz-user-select: none;-webkit-user-select: none;user-select: none;}';
document.querySelectorAll('head')[0].appendChild(styleNode_selection);
window.addEventListener('load', () => {
    let styleText = '.correct{color: aqua;}.wrong{color: tomato;}';
    let styleNode = document.createElement('style');
    styleNode.innerText = styleText;
    document.head.appendChild(styleNode);
    let styleNode_selectScsMsg = 'html{height: 100%;}body{height: 100%;}.success_msg_wrap{position: absolute;padding: 0.24rem 0.64rem;background-color: rgba(54,194,108,.72);font: 400 0.64rem "Microsoft YaHei";text-shadow: 0.08rem 0.08rem rgba(255,255,255,0.24);border-radius: 1rem;opacity: 0;transition: all 0.64s;}';
    let style = document.createElement('style');
    style.innerText = styleNode_selectScsMsg;
    document.head.appendChild(style);
    window.addEventListener('selectstart', () => {
        let cts = document.querySelectorAll('.click2select');
        let ans = document.querySelectorAll('.answers');
        let ac = [...cts, ...ans];
        ac.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (elem.querySelector('ul')) {
                    return false;
                } else {
                    var selection = window.getSelection();
                    selection.removeAllRanges();
                    var range = document.createRange();
                    range.selectNodeContents(elem.firstChild);
                    selection.addRange(range);
                    console.log(elem.innerText);
                }
            });
        });
    });
});
window.addEventListener('DOMContentLoaded', () => {
    let __s = document.createElement('style');
    __s.innerText += '.answer_ipt {cursor: text ! important; display: inline-block; cursor: text; height: 1.6rem; font-weight: 400; font-size: 0.8rem; background: transparent; color: #223323; }';
    __s.innerText += '.absolutePar span { color: inherit !important; box-sizing: border-box; } br::selection { background: transparent; } .questionChoices::selection { color: #175aec; background: rgba(168, 230, 82, 0.24); } .elemAddByQ_KVM_normal::selection { background: #f9f1ad; font-weight: 800; } .judgeQuestionAddByQ_KVM::selection { background: rgba(242, 197, 252, 0.631); color: #ec176c; } .questionAnswerAddByQ_KVM { letter-spacing: 0.1rem; background: transparent; text-shadow: 0.06rem 0.06rem 0.06rem #ff6600; } .questionAnswerAddByQ_KVM::selection { background: rgba(246, 255, 0, 0.76); text-shadow: 0.06rem 0.06rem 0.06rem #fff; } .questionsPart::selection { background: transparent; } .questionsPart::selection { background: transparent; } .questionChapter::selection { background: rgba(247, 182, 182, 0.9); color: #7300ff; text-shadow: 0.06rem 0.06rem 0.06rem #2233; } .questionNormal::selection { background: rgba(144, 0, 255, 0.06) !important; color: #000 !important; } pre.questions { font-family: "Microsoft YaHei"; color: #000; font-weight: bold; text-shadow: 0.12rem 0.12rem 0.24rem #999; } pre::selection { background: rgba(0, 242, 255, 0.705); color: #fff; text-shadow: 0.32rem 0.32rem 0.24rem rgb(125, 63, 196); } .questions { letter-spacing: 0.08rem; } .questions * { margin: 0 1px; } .easy_01 { font-weight: 100; color: #666; } .normal_01 { font-weight: 400; color: rgb(37, 38, 82); } .normal_02 { font-weight: 400; color: rgb(55, 34, 148); } .hard_01 { font-weight: 800; color: rgb(148, 34, 133); } .hard_02 { font-weight: 800; color: rgb(197, 32, 32); } .worn_01 { font-weight: 400; color: rgb(214, 218, 36); } .difficult_01 { font-weight: 800; text-shadow: 0.084rem 0.084rem 0.32rem rgba(236, 223, 43, 0.712); color: rgba(247, 0, 255, 0.733); } .difficult_02 { font-weight: 800; text-shadow: 0.084rem 0.084rem 0.32rem rgba(0, 255, 242, 0.733); color: rgba(43, 236, 123, 0.712); } .easy_01::selection { color: #6eb17a; background: rgba(215, 222, 222, 0.3); } .normal_01::selection { color: #11a77c; background: rgba(88, 93, 120, 0.32); } .normal_02::selection { color: #0b4ca1; background: rgba(106, 85, 170, 0.36); } .hard_01::selection { color: #ff3c00; background: rgba(61, 28, 161, 0.42); } .hard_02::selection { color: #f10e0e; background: rgba(226, 73, 219, 0.46); } .worn_01::selection { color: rgb(251, 255, 0); background: rgba(11, 128, 128, 0.32); } .difficult_01::selection { color: #ff0077; background: rgba(21, 0, 255, 0.32); } .difficult_02::selection { color: #008669; background: rgba(81, 255, 0, 0.312); } .user_wrong { color: #d00000; } .user_wrong::selection { color: red; background: rgba(225, 61, 19, 0.24); } .user_right { color: #00ff3c; } .user_right::selection { color: #00cd30; background: rgba(21, 224, 163, 0.24); }';
    __s.innerText += '.btn_showRW { cursor: pointer; font-weight: 400; border-radius: 0.4rem; font-size: 0.3rem; padding: 0.12rem 0.32rem; color: #999; }';
    __s.innerText += '.p_show_RW { display: inline-block; margin-left: 1rem; width: 2rem; font: 800 0.8rem auto; }';
    __s.innerText += '.p_show_answer { font-weight: 400; font-size: 0.8rem; color: #223323; margin-left: 2.4rem; display: none; }';
    __s.innerText += '.btn_showRst { cursor: pointer; font-weight: 400; border-radius: 0.4rem; font-size: 0.3rem; padding: 0.12rem 0.32rem; color: #999; }';
    __s.innerText += '.show_all_answer { position: relative; margin: 1rem 2.4rem; padding: 0.32rem 1.28rem; border-radius: 1rem; cursor: pointer; background: rgba(96, 96, 96, 0.12); }';
    __s.innerText += '.q_unifier,.show_all_RW { position: relative; margin: 1rem 2.4rem; padding: 0.32rem 1.28rem; border-radius: 1rem; background: rgba(96, 96, 96, 0.12); cursor: pointer; }';
    __s.innerText += '.wrong_bank_close_btn, .wrong_bank_wrap { user-select: none; -webkit-user-select: none; -moz-user-select: none; position: fixed; top: 2rem; right: 1rem; } .wrong_bank_wrap { display: none; overflow: auto; width: 30%; min-width: 15.8rem; height: 10rem; padding: 0.12rem 0.64rem; padding-left: 0.2rem; background: rgba(162, 165, 165, 0.589); z-index: 10; } #wrong_bank_tit { position: fixed; top: 0.4rem; right: 1.2rem; text-align: center; margin-bottom: 0.6rem; font: 400 1rem auto; color: rgb(20, 20, 119); } .wrong_bank_cont { position: relative; box-sizing: border-box; display: block; list-style-type: decimal-leading-zero; width: 100%; font: 100 0.54rem auto; color: #101d57; } .wrong_bank_list { padding: 0.125rem 0.17rem; padding-left: 0.084rem; border: 0.084rem solid transparent; transition: all 0.1s; } .wrong_bank_list:hover { border: 0.084rem solid saddlebrown; } .wrong_bank_link, .wrong_bank_link:visited { cursor: url(/img/ico/pointer.cur), pointer !important; font-style: normal; text-decoration: none; color: rgb(0, 0, 0); } .wrong_bank_link:hover { color: aliceblue; } .current_wrong_qst { box-shadow: 0.06rem 0.02rem 0.16rem 0.084rem rgb(255, 0, 0); } .wrong_bank_close_btn { padding: 0.08rem 0.32rem; font-size: 0.82rem; top: 1.6rem; color: white; } .wrong_bank_close_btn:hover { color: red; background: #a83737; } .wrong_index_mark { float: left; color: #c73800; }';
    __s.innerText += '.choose_wrap { display: inline-block; padding: 0 0.6rem; margin-right: 1rem; } .choose_wrap * { margin-left: 0.24rem; } .rd_text_JQ::after, .radio_JQ_current::after, .rd_text_JQ::before, .radio_JQ_current::before { content: ""; position: absolute; left: 0; width: 0.6rem; height: 0.6rem; } .radio_JQ_current::after { border: #2b32c1 0.2rem solid !important; } .radio_JQ_current::before { bottom: 0; width: 100% !important; background: rgb(16, 49, 0); } .rd_text_JQ { user-select: none; -webkit-user-select: none; -moz-user-select: none; position: relative; cursor: pointer !important; padding-left: 1rem; font-size: 0.8rem; color: #2b007a; } .rd_text_JQ::before { width: 0; height: 0.084rem; transition: width 0.2s; } .rd_text_JQ::after { box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; top: 0.2rem; border-radius: 50%; border: #000000 0.1rem solid; } .rd_text_JQ::selection { background: #c1ffec; color: #140136; } .checkbox_ipt, .questionChoices { display: inline-block; } .radio_JQ, .checkbox_ipt { position: absolute; width: 0; height: 0; opacity: 0 !important; } .questionChoices { position: relative; padding: 0 1.6rem; padding-left: 0.24rem; font-size: 0.96rem; color: #a200ff; letter-spacing: 0.064rem; } .questionChoices_current_cb::before, .questionChoices_current_rd::before { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 0.12rem; background-image: linear-gradient(to right, #2d1ad6, transparent 90%); } .questionChoices_current_cb::after, .questionChoices_current_rd::after { content: "☑"; position: absolute; bottom: 0; color: #00c721; } .questionChoices_current_cb::after { right: 0; } .questionChoices_current_rd::after { content: "(✔)"; left: 100%; } .M_CQ_li_choice { list-style-type: upper-latin; font-size: 0.96rem; color: #1b1b1b; }';
    __s.innerText += '#fontSize_changer_wrap { user-select: none; -webkit-user-select: none; -moz-user-select: none; position: fixed; left: 0; top: 0; width: 520px; height: 36px; margin-left: 20px; padding: 6px 12px; padding-left: 10px; background: rgba(44, 15, 162, 0.1); border-radius: 0 0 32px 32px; z-index: 9; } #fontSize_changer_wrap * { font: 400 16px auto; height: 33px; line-height: 33px; } #box_slider, #hd_slider, #hdt_slider { cursor: url(/img/ico/pointer.cur), pointer !important; display: inline-block; zoom: 1; } #box_slider { width: 195px; height: 3px; background-color: #bdbdbd; vertical-align: middle; } #hd_slider { width: 17px; height: 18px; background-color: #56a3fc; border-radius: 6px; position: absolute; left: 0; top: -8px; cursor: pointer; margin: 0; } #hdt_slider { position: absolute; top: 0; left: 0; height: 3px; width: 0; background-color: #56a3fc; margin: 0; } #fontSize_val { outline: none; border: none; background: none; border-bottom: 1px solid purple; } #fontSize_val, #slider_tit, #box_slider { position: absolute; top: 6px; } #fontSize_val { text-align: center; left: 400px; width: 64px; } #box_slider { top: 22px; left: 170px; } #slider_tit { left: 20px; }';
    __s.innerText += '#get_top {position: fixed; bottom: 1rem; right: 1rem; padding: 1rem 0.6rem; transition: all 0.7s; z-index: 10; opacity: 0; } #get_top:hover { background: rgba(0, 0, 0, 0.3); } #get_top svg { width: 3.6rem; height: auto; fill: rgba(0, 0, 0, 0.3) }';
    __s.innerText += '.btn_showRst, .btn_showRW, .ctrl_btn { user-select: none; -webkit-user-select: none; -moz-user-select: none; }';
    __s.innerText += '.gray_page { filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); -webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); -ms-filter: grayscale(100%); -o-filter: grayscale(100%); filter: grayscale(100%); filter: gray; }';
    __s.innerText += '.body, .body * { transition: all 640ms; } .span_splitLine { display: block; width: 100%; height: 1px; margin-top: 0.24rem; background: #54926b; } .black_page { background: #000; color: #fff; } .black_page .Q_KVM_list * { background: #000 !important; color: rgb(225, 224, 211) !important; } .black_page * { text-shadow: none !important; } .black_page #hdt_slider, .black_page #hd_slider { background: #fff; } .black_page #fontSize_val { color: #fff; border-bottom: 1px solid #8a8a8a; } .black_page #fontSize_changer_wrap { background: rgba(144, 144, 144, 0.404); } .black_page .span_splitLine { background: #9c9c9c !important; } .black_page .btn_showRW, .black_page .btn_showRst, .black_page .ctrl_btn { background: #424242 !important; color: #949494 !important; } .black_page *::selection { background: rgba(255, 255, 255, 0.3) !important; color: #fff !important; } .black_page .wrong_bank_wrap { background: rgba(220, 220, 220, 0.2); } .black_page .wrong_index_mark { color: #e5e5e5; } .black_page .wrong_bank_link { color: #fff; } .black_page #wrong_bank_tit { color: #b02929; }.black_page *::-webkit-scrollbar-track, .black_page::-webkit-scrollbar-track { background: #000 !important; } .black_page *::-webkit-scrollbar-thumb, .black_page::-webkit-scrollbar-thumb { background: rgb(49, 49, 49) !important; }';
    __s.innerText += '.active_btn { z-index: 9; width: 40%; min-width: 360px; padding-right: 5%; border-radius: 0.5em 0 0 0.5em; border-radius: 0 12em 12em 0; text-indent: normal; transition: all 0.2s; } .active_btn:hover { z-index: 10; padding-right: calc(5% - 0.6rem); padding-left: 0.6rem; box-shadow: 0.02rem 0.01rem 0.2rem #05322f; text-shadow: 0.01rem 0.01rem 0.06rem #05322f; background-image: linear-gradient(to right, rgba(59, 245, 255, 0.2) 80%, transparent); }';
    __s.innerText += '#qAR_wrap, #qAR_show { position: fixed; top: 10%; left: 1rem; background: #faf2ee; z-index: 10; transition: all 0.3s; } #qAR_show { padding: 0.6rem 0.3rem; background: #e3dddd50; border-radius: 0 4em 4em 0; } #qAR_show:hover { background: #e3dde0af; } #qAR_wrap .qDR_list { padding: 0.24rem 1rem; } #qAR_wrap .qDR_list:hover { background: #c2c9d6; color: #756d6d; } #qAR_wrap .data_current::after { content: ">"; position: absolute; left: -1rem; } #qAR_wrap #qAR_hide { display: block; text-align: center; background: #a7b0b4; } #qAR_wrap #qAR_hide:hover { background: #494b52; }';
    __s.innerText += '';
    __s.className = 'Q_KVM_style';
    if (!document.head.contains(__s)) {
        document.head.appendChild(__s);
    }
});