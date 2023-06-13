// ==UserScript==
// @name         上海市中职校计算机应用专业教育质量监测理论考试 自动答题
// @namespace    http://tampermonkey.net/
// @version      0.19.7
// @description  解放双手！！！适用于练习部分，PC端可使用(H键 隐藏/显示 菜单)(R键 显示/隐藏 答案)(右键停止脚本)。目前已支持： (单选|多选|判断|单空|多空)题 , 兼容移动端结构，目前尚有部分小问题
// @author       U1iz@yzl
// @match        https://jisuanji.cantaicloud.com/ExamsStudPerson/JoinExamsStud?*
// @match        https://jisuanji.cantaicloud.com/ExamsStudPerson/ExamsStudPractice?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cantaicloud.com
// @require      https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// @grant        GM_xmlhttpRequest
// @connect      gitee.com
// @license      MIT
// ==/UserScript==

(function () {
    let autoRes_start = false;
    let autoRes_exeSpeed = 100;
    let autoRes_skipAll = false;

    let autoRes_noJQ = false;
    let autoRes_noCQ = false;
    let autoRes_nomMCQ = false;
    let autoRes_noFill = false;

    let autoRes_empty_fill = false;

    let is_Mobile = true;

    let CQ = [];
    let MCQ = [];
    let Fill = [];
    let JQ = [];
    let final = [];

    let question_index = 0;
    let res = {
        cq: function () {
            if (is_Mobile) {
                let answer = ($('.swiper-slide-active .content').text()).split('标准答案：')[1];
                answer = normal_format(answer);
                let slt = $($('.swiper-slide-active .ans-item')).get();
                slt.forEach(e => {
                    let crt = $(e).attr('data-answer');
                    crt = normal_format(crt);
                    if (!autoRes_skipAll && crt == answer) {
                        e.click();
                        question_index++;
                        let card_lst = $('.card-content .card-list .card-item').get();
                        card_lst.forEach(c => {
                            if ($(c).text() == question_index.toString()) {
                                $(c)[0].click();
                            }
                        });
                        answer = '';
                    }
                });
                if (autoRes_skipAll) {
                    $('button.next')[0].click();
                }
            } else {
                let answer = ($('.option-hover span:last-child').text()).split('标准答案：')[1];
                let cq_temp = ['CQ'];
                cq_temp[1] = select_question();
                cq_temp[2] = [];
                cq_temp[3] = answer.charCodeAt(0) - 64;
                cq_temp[4] = 2;

                let slt = $('#ComQuestionDetail_qundefined .options-w p').get();
                slt.forEach(e => {
                    (cq_temp[2])[cq_temp[2].length] = $(e).text().substr($(e).text().indexOf('、') + 1, $(e).text().length);
                    let crt = $(e).attr('data-a-label');
                    if (!autoRes_skipAll && crt == answer) {
                        e.click();
                    }
                });
                if (CQ[CQ.length - 1]) {
                    if (CQ[CQ.length - 1][1] != cq_temp[1]) {
                        CQ[CQ.length] = cq_temp;
                    }
                } else {
                    CQ[CQ.length] = cq_temp;
                }
                if (autoRes_skipAll) {
                    $('button.next')[0].click();
                }
            }
            // console.log(CQ);
        },
        jq: function () {
            if (is_Mobile) {
                let answer = ($('.swiper-slide-active .content').text()).split('标准答案：')[1];
                answer = normal_format(answer);
                let slt = $($('.swiper-slide-active .ans-item')).get();
                slt.forEach(e => {
                    let crt = $(e).attr('data-answer');
                    crt = normal_format(crt);
                    if (!autoRes_skipAll && crt == answer) {
                        e.click();
                        gotoNext();
                    }
                });
                if (autoRes_skipAll) {
                    $('button.next')[0].click();
                }
            } else {
                let answer = ($('.option-hover span:last-child').text()).split('标准答案：')[1];
                let jq_temp = ['JQ'];
                jq_temp[1] = select_question();
                jq_temp[2] = answer == 'A' ? 1 : 0;
                jq_temp[3] = 2;

                let slt = $('#ComQuestionDetail_qundefined .options-w p').get();
                slt.forEach(e => {
                    let crt = $(e).attr('data-a-label');
                    if (!autoRes_skipAll && crt == answer) {
                        e.click();
                    }
                });
                if (JQ[JQ.length - 1]) {
                    if (JQ[JQ.length - 1][1] != jq_temp[1]) {
                        JQ[JQ.length] = jq_temp;
                    }
                } else {
                    JQ[JQ.length] = jq_temp;
                }
                if (autoRes_skipAll) {
                    $('button.next')[0].click();
                    gotoNext();
                }
            }
            // console.log(JQ);
        },
        mcq: function () {
            if (is_Mobile) {
                let answer = ($('.swiper-slide-active .content').text()).split('标准答案：')[1].split('');
                for (let i in answer) {
                    answer[i] = normal_format(answer[i]);
                }

                let slt = $('.swiper-slide-active .exam-ans .ans-item').get();
                let submit = $('.swiper-slide-active .multiButton span')[0];
                slt.forEach(e => {
                    let crt = normal_format($(e).attr('data-answer'));
                    answer.forEach(k => {
                        if (!autoRes_skipAll && crt == k) {
                            e.click();
                        }
                    });
                });
                if (autoRes_skipAll) {
                    $('button.next')[0].click();
                } else {
                    submit.click();
                }
                gotoNext();
            } else {
                let answer = ($('.option-hover span:last-child').text()).split('标准答案：')[1].split('');
                let mcq_temp = ['MCQ'];
                mcq_temp[1] = select_question();
                mcq_temp[2] = [];
                mcq_temp[3] = [];
                mcq_temp[4] = 2;

                for (let i in answer) {
                    (mcq_temp[3])[mcq_temp[3].length] = answer[i].charCodeAt(0) - 64
                }

                let slt = $('#ComQuestionDetail_qundefined .options-w p').get();
                let submit = $('#ComQuestionDetail_qundefined .options-w .btn-answer-ok')[0];
                slt.forEach(e => {
                    (mcq_temp[2])[mcq_temp[2].length] = $(e).text().substr($(e).text().indexOf('、') + 1, $(e).text().length);
                    let crt = $(e).attr('data-a-label');
                    answer.forEach(k => {
                        if (!autoRes_skipAll && crt == k) {
                            e.click();
                        }
                    });
                });
                if (autoRes_skipAll) {
                    $('button.next')[0].click();
                } else {
                    submit.click();
                }
                if (MCQ[MCQ.length - 1]) {
                    if (MCQ[MCQ.length - 1][1] != mcq_temp[1]) {
                        MCQ[MCQ.length] = mcq_temp;
                    }
                } else {
                    MCQ[MCQ.length] = mcq_temp;
                }
            }
        },
        fill: function () {
            if (is_Mobile) {
                let answer = ($('.swiper-slide-active .content').text()).split('标准答案：')[1];
                if (autoRes_empty_fill) {
                    answer = '';
                }
                let ipt = $('.swiper-slide-active .weui-input-fill');
                let submit = $('.swiper-slide-active .multiButton span')[0];

                if (answer.indexOf('|') != -1 && ipt.length > 1) {
                    answer = answer.split('|');
                    answer.forEach((e, i) => {
                        ipt[i].value = e;
                    })
                } else {
                    ipt.val(answer);
                }
                if (autoRes_empty_fill) {
                    submit.click();
                } else if (autoRes_skipAll) {
                    $('button.next')[0].click();
                } else {
                    submit.click();
                }
                gotoNext();
            } else {
                let answer = ($('.option-hover span:last-child').text()).split('标准答案：')[1];
                let fill_temp = ['fill'];
                fill_temp[1] = select_question();
                fill_temp[2] = answer.indexOf('|') != -1 ? answer.split('|') : [answer];
                fill_temp[3] = 2;
                if (autoRes_empty_fill) {
                    answer = '';
                }
                let ipt = $('#ComQuestionDetail_qundefined .weui-input-fill');
                let submit = $('#ComQuestionDetail_qundefined .options-w .btn-answer-ok')[0];

                if (answer.indexOf('|') != -1 && ipt.length > 1) {
                    answer = answer.split('|');
                    answer.forEach((e, i) => {
                        ipt[i].value = e;
                    })
                } else {
                    ipt.val(answer);
                }
                if (autoRes_empty_fill) {
                    submit.click();
                    $('button.next')[0].click();
                } else if (autoRes_skipAll) {
                    $('button.next')[0].click();
                } else {
                    submit.click();
                }
                if (Fill[Fill.length - 1]) {
                    if (Fill[Fill.length - 1][1] != fill_temp[1]) {
                        Fill[Fill.length] = fill_temp;
                    }
                } else {
                    Fill[Fill.length] = fill_temp;
                }
            }
        }
    }

    function gotoNext() {
        question_index++;
        let card_lst = $('.card-content .card-list .card-item').get();
        card_lst.forEach(c => {
            if ($(c).text() == question_index.toString()) {
                $(c)[0].click();
                console.log(question_index);
            }
        });
    }


    function q_execute() {
        let q_type = $('.option-type-msg').text();
        if (q_type == '') {
            is_Mobile = true;
            q_type = $('.swiper-slide-active .exam-title span.flag').text();
        }
        if (autoRes_start) {
            switch (q_type) {
                case '单选题':
                case '单选':
                    if (!autoRes_noCQ) {
                        res.cq();
                    }
                    break;
                case '判断题':
                case '判断':
                    if (!autoRes_noJQ) {
                        res.jq();
                    }
                    break;
                case '多选题':
                case '多选':
                    if (!autoRes_nomMCQ) {
                        res.mcq();
                    }
                    break;
                case '填空题':
                case '填空':
                    if (!autoRes_noFill) {
                        res.fill();
                    }
                    break;
                default:
                    console.log(q_type);
                    break;
            }
        }
    }

    let auto_timer = setInterval(q_execute, autoRes_exeSpeed);

    function normal_format(str) {
        str = str.replace(/\ +/g, "");
        str = str.replace(/[ ]/g, "");
        str = str.replace(/[\r\n]/g, "");
        return str;
    }

    function stop_res() {
        clearInterval(auto_timer);
        autoRes_start = false;
        $('#autoRes_operate').html('开始脚本');
    }

    function select_question() {
        $('.timu-text')[0].click();
        return $('.operated').text();
    }

    function exportRaw(data, name) {
        let urlObject = window.URL || window.webkitURL || window;
        let export_blob = new Blob([data]);
        let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
        save_link.href = urlObject.createObjectURL(export_blob);
        save_link.download = name;
        save_link.click();
    }


    $(function () {
        let inner = '';
        if ($('.option-type-msg').text() == '') {
            is_Mobile = true;
            inner = '<div id="autoRes_tools_wrap"> <div id="autoRes_toolsWrap_dragBar" style="color: #666;font-size:10px;">ver 0.18.1<i style="font-size: 6px;">（兼容移动端，但自动答题无法选题）</i></div> <span id="autoRes_tools_close">x</span> <span>做题速度: </span><input id="autoRes_speed" type="number" placeholder="做题速度" min="10" value="100"> <span id="autoRes_apply">应用</span> <div class="autoRes_ctrl_btn" id="autoRes_operate">开始脚本</div> <ul id="autoRes_no_wrap"> <li class="autoRes_ctrl_btn" id="autoRes_no_fill">不做填空</li> <li class="autoRes_ctrl_btn" id="autoRes_no_cq">不做单选</li> <li class="autoRes_ctrl_btn" id="autoRes_no_mcq">不做多选</li> <li class="autoRes_ctrl_btn" id="autoRes_no_jq">不做判断</li> </ul> <div class="autoRes_ctrl_btn" id="autoRes_fillEmpty">填空留空</div> <div class="autoRes_ctrl_btn" id="autoRes_displayRst" style="margin-top: 3px;border-top: 1px solid #666;">显隐答案</div> <div class="autoRes_ctrl_btn" id="autoRes_update">提交</div> <div class="autoRes_ctrl_btn" id="autoRes_rewrite">让我修改!</div> <a href="https://greasyfork.org/zh-CN/scripts/452955-%E4%B8%8A%E6%B5%B7%E5%B8%82%E4%B8%AD%E8%81%8C%E6%A0%A1%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%BA%94%E7%94%A8%E4%B8%93%E4%B8%9A%E6%95%99%E8%82%B2%E8%B4%A8%E9%87%8F%E7%9B%91%E6%B5%8B%E7%90%86%E8%AE%BA%E8%80%83%E8%AF%95-%E8%87%AA%E5%8A%A8%E7%AD%94%E9%A2%98" target="_blank" style="margin-top: 10px;font-size: 6px;border-top:1px solid #666;">当前脚本发布页</a> </div> </div>';
        } else {
            inner = '<div id="autoRes_tools_wrap"> <div id="autoRes_toolsWrap_dragBar" style="color: #666;font-size:10px;">version 0.19.3</div> <span id="autoRes_tools_close">x</span> <span>做题速度: </span><input id="autoRes_speed" type="number" placeholder="做题速度" min="10" value="100"> <span id="autoRes_apply">应用</span> <div class="autoRes_ctrl_btn" id="autoRes_operate">开始脚本</div> <ul id="autoRes_no_wrap"> <li class="autoRes_ctrl_btn" id="autoRes_no_fill">不做填空</li> <li class="autoRes_ctrl_btn" id="autoRes_no_cq">不做单选</li> <li class="autoRes_ctrl_btn" id="autoRes_no_mcq">不做多选</li> <li class="autoRes_ctrl_btn" id="autoRes_no_jq">不做判断</li> </ul> <div class="autoRes_ctrl_btn" id="autoRes_fillEmpty">填空留空</div> <div class="autoRes_ctrl_btn" id="autoRes_skipAll">跳过所有</div> <div class="autoRes_ctrl_btn" id="autoRes_displayRst" style="margin-top: 3px;border-top: 1px solid #666;">显隐答案</div> <div class="autoRes_ctrl_btn" id="autoRes_update">提交</div> <div class="autoRes_ctrl_btn" id="autoRes_rewrite">让我修改!</div> <div class="autoRes_ctrl_btn" id="autoRes_dld" style="margin-top: 10px;border:2px 4px;border-top:1px solid #666;"> 下载数据</div> <div class="autoRes_ctrl_btn" id="autoRes_HTML_outside">下载外链重定向HTML<br>(需联网)</div> <div class="autoRes_ctrl_btn" id="autoRes_HTML_inside">下载内联重定向HTML<br>(离线，可能出问题)</div> <a href="https://greasyfork.org/zh-CN/scripts/452855-%E4%B8%8A%E6%B5%B7%E5%B8%82%E4%B8%AD%E8%81%8C%E6%A0%A1%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%BA%94%E7%94%A8%E4%B8%93%E4%B8%9A%E6%95%99%E8%82%B2%E8%B4%A8%E9%87%8F%E7%9B%91%E6%B5%8B%E7%90%86%E8%AE%BA%E8%80%83%E8%AF%95%E5%B9%B3%E5%8F%B0-%E9%A2%98%E7%9B%AE%E5%85%A8%E9%80%89" target="_blank" style="margin-top: 10px;font-size: 6px;border-top:1px solid #666;">下载数据需配合该脚本使用</a> <a href="https://greasyfork.org/zh-CN/scripts/452955-%E4%B8%8A%E6%B5%B7%E5%B8%82%E4%B8%AD%E8%81%8C%E6%A0%A1%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%BA%94%E7%94%A8%E4%B8%93%E4%B8%9A%E6%95%99%E8%82%B2%E8%B4%A8%E9%87%8F%E7%9B%91%E6%B5%8B%E7%90%86%E8%AE%BA%E8%80%83%E8%AF%95-%E8%87%AA%E5%8A%A8%E7%AD%94%E9%A2%98" target="_blank" style="margin-top: 10px;font-size: 6px;border-top:1px solid #666;">当前脚本发布页</a> </div> </div> </div>';
            is_Mobile = false;
        }
        $('head').append('<style>#autoRes_tools_wrap * { white-space: nowrap; }#autoRes_tools_wrap a {display: block;} #autoRes_tools_wrap { cursor: default; position: fixed; left: 20px; top: 20px; padding: 6px 12px; background: rgba(128,128,128,.2); font: 400 16px auto; z-index: 9999;} #autoRes_tools_wrap * { user-select: none; -webkit-user-select: none; -moz-user-select: none; } #autoRes_no_wrap li { list-style-type: none; } #autoRes_tools_close { position: absolute; right: -10px; top: -10px; padding: 4px 6px; color: red; } #autoRes_tools_close:hover { background: red; } #autoRes_toolsWrap_dragBar { height: 20px; width: 100%; background: #2cc8c0; } .autoRes_ctrl_btn { padding: 3px 6px; } .autoRes_ctrl_btn:hover { background: rgba(0, 0, 0, .3); } #autoRes_speed { width: 60px; } #autoRes_apply { padding: 3px 6px; } #autoRes_apply:hover { background: #5fc996; } li.autoRes_ctrl_btn {text-indent: 2em;}</style>')
        $('body').bind({
            'contextmenu': stop_res
        }).append(inner);
        setTimeout(function () {
            let fs = $('#fuck_sx')[0];
            fs.style.display = 'none';
        }, 16000); {

            let tools_wrap = $('#autoRes_tools_wrap')[0];
            let bragBar = $('#autoRes_toolsWrap_dragBar')[0];
            bragBar.onmousedown = function (event) {
                /* PC 端 */
                var event = event || window.event;
                var diffX = event.clientX - tools_wrap.offsetLeft;
                var diffY = event.clientY - tools_wrap.offsetTop;
                if (typeof tools_wrap.setCapture !== 'undefined') {
                    tools_wrap.setCapture();
                }
                document.onmousemove = function (event) {
                    var event = event || window.event;
                    var moveX = event.clientX - diffX;
                    var moveY = event.clientY - diffY;
                    if (moveX < 0) {
                        moveX = 0
                    } else if (moveX > window.innerWidth - tools_wrap.offsetWidth) {
                        moveX = window.innerWidth - tools_wrap.offsetWidth
                    }
                    if (moveY < 0) {
                        moveY = 0
                    } else if (moveY > window.innerHeight - tools_wrap.offsetHeight) {
                        moveY = window.innerHeight - tools_wrap.offsetHeight
                    }
                    tools_wrap.style.left = moveX + 'px';
                    tools_wrap.style.top = moveY + 'px'
                }
                document.onmouseup = function (event) {
                    this.onmousemove = null;
                    this.onmouseup = null;
                    if (typeof tools_wrap.releaseCapture != 'undefined') {
                        tools_wrap.releaseCapture();
                    }
                }
            }
            Mobile_drag(bragBar, tools_wrap);

            function Mobile_drag(triggerElem, moveElem) {
                //获取手指初始坐标
                var startX = 0;
                var startY = 0;
                // 获取盒子原先的位置
                var x = 0;
                var y = 0;
                triggerElem.addEventListener("touchstart", function (e) {
                    //获取手指初始坐标
                    startX = e.targetTouches[0].pageX;
                    startY = e.targetTouches[0].pageY;
                    // 获取盒子原先的位置
                    x = moveElem.offsetLeft;
                    y = moveElem.offsetTop;
                    e.preventDefault();
                });
                triggerElem.addEventListener("touchmove", function (e) {
                    // 计算手指的移动距离：手指移动之后的坐标减去手指初始的坐标
                    var moveX = e.targetTouches[0].pageX - startX;
                    var moveY = e.targetTouches[0].pageY - startY;
                    moveElem.style.left = x + moveX + 'px';
                    moveElem.style.top = y + moveY + 'px';
                    e.preventDefault();
                })
            }

            $('#autoRes_tools_close').click(function () {
                /* 关闭菜单 */
                $('#autoRes_tools_wrap').remove();
            })
            $('#autoRes_apply').click(function () {
                /* 做题速度 */
                autoRes_exeSpeed = $('#autoRes_speed').val();
            });
            $('#autoRes_operate').click(function () {
                /* 开始做题 */
                autoRes_start = !autoRes_start;
                fillText($(this), '开始脚本', '停止脚本');
            });
            $('#autoRes_no_fill').click(function () {
                /* 不做填空 */
                fillText($(this), '不做填空', '做填空');
                autoRes_noFill = !autoRes_noFill;
            });
            $('#autoRes_no_cq').click(function () {
                /* 不做单选 */
                fillText($(this), '不做单选', '做单选');
                autoRes_noCQ = !autoRes_noCQ;
            });
            $('#autoRes_no_mcq').click(function () {
                /* 不做多选 */
                fillText($(this), '不做多选', '做多选');
                autoRes_nomMCQ = !autoRes_nomMCQ;
            });
            $('#autoRes_no_jq').click(function () {
                /* 不做判断 */
                fillText($(this), '不做判断', '做判断');
                autoRes_noJQ = !autoRes_noJQ;
            });
            $('#autoRes_fillEmpty').click(function () {
                /* 填空留空 */
                fillText($(this), '填空留空', '正常填空');
                autoRes_empty_fill = !autoRes_empty_fill;
            });
            $('#autoRes_skipAll').click(function () {
                /* 跳过所有 */
                fillText($(this), '跳过所有', '不跳过');
                autoRes_skipAll = !autoRes_skipAll;
            });
            $('#autoRes_dld').click(function () {
                /* 下载数据 */
                exportRaw(JSON.stringify(getData()).toString(), $('.common-channel-crumb strong').text() + '.json');
            });

            $('#autoRes_HTML_outside').click(function () {
                /* 下载重定向HTML */
                let DOC_tex = `<!DOCTYPE html> <html lang="zh-cn"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>${$('.common-channel-crumb strong').text()}</title> <link rel="stylesheet" href="https://gitee.com/u1iz/autoNote/raw/master/src/style/page_normalize.css"> <style> #hotkey_wrap { position: fixed; top: 1rem; left: 1rem; background: rgba(128, 128, 128, .2); padding: 0.32rem 0.64rem; z-index: 10; } </style> <script src="https://gitee.com/u1iz/autoNote/raw/master/src/lib/lib.min.js"></script> <script src="https://gitee.com/u1iz/autoNote/raw/master/src/lib/local_lib.min.js"></script> <script src="https://gitee.com/u1iz/autoNote/raw/master/src/lib/Q_KVM_lib.min.js"></script> <script> function tit() { add_title([document.querySelector('title').innerText], [ ['label', 'h1'], ['backgroundColor', 'transparent'], ['whiteSpace', 'nowrap'], ['font', '800 1.6rem "MicroSoft YaHei"'], ['boxShadow', 'none'], ['padding', '0.6rem 0 0.6rem 0'], ['padding', '0.6rem 0 0.6rem 0'], ['borderRadius', '2.7rem'], ['marginTop', '-3.6rem'], ['color', '#000'], ['textAlign', 'center'], ['width', '90%'], ['ML', '5%'], ['MR', '5%'], ['display', 'none'], ['color', 'transparent'], ['js-style', 'fontPosition', 'center-middle'], ['js-event', 'setTimeout', '1800', 'transition', 'all 0.96s'], ['js-event', 'setTimeout', '1800', 'display', 'block'], ['js-event', 'setTimeout', '1900', 'color', '#666'], ['js-event', 'setTimeout', '2000', 'MT', '2.4rem'] ]); } function split_p(str) { let arr = new Array; for (let i = 0; i < str.length; i++) { arr[i] = str[i]; } return arr; } </script> </head> <body> <div id="hotkey_wrap"> <h4>快捷键提示</h4> <p>R*3 显示/隐藏 答案</p> <p>S*3 隐藏/显示 做题操作模块</p> <p>L*3 隐藏/显示 分割线</p> <p>F 一键批改</p> <p>G 页面黑白</p> <p>B 页面关灯</p> <p>为避免浏览器未刷新缓存，请先 Ctrl+F5 , 一次就好</p> </div> <script> document.body.style.overflowX = 'hidden'; window.scrollTo(0, document.documentElement.scrollTop); let hk_wrap = document.querySelector('#hotkey_wrap'); setTimeout(() => { hk_wrap.style.transition = 'all 0.36s'; hk_wrap.style.top = -hk_wrap.clientHeight + 'px'; setTimeout(() => { hk_wrap.remove(); }, 420); }, 4600); if (sessionStorage.getItem('execute_all') === 'true') {} else { tit(); } function call() {} Q_KV_module(${JSON.stringify(getData())}); </script> <script src="https://gitee.com/u1iz/autoNote/raw/master/src/lib/beforeLoading.js"></script> </body> </html>`;
                exportRaw(DOC_tex, $('.common-channel-crumb strong').text() + '_外链.html');
            });
            let dld_tmr;
            let val_arr = [];
            $('#autoRes_HTML_inside').click(function () {
                /* 下载重定向HTML */
                val_arr = [];
                clearInterval(dld_tmr);
                get_fileText('https://gitee.com/u1iz/autoNote/raw/master/src/style/page_normalize.css')
                setTimeout(function () {
                    get_fileText('https://gitee.com/u1iz/autoNote/raw/master/src/lib/lib.min.js')
                    setTimeout(function () {
                        get_fileText('https://gitee.com/u1iz/autoNote/raw/master/src/lib/local_lib.min.js')
                        setTimeout(function () {
                            get_fileText('https://gitee.com/u1iz/autoNote/raw/master/src/lib/Q_KVM_lib.min.js')
                            setTimeout(function () {
                                get_fileText('https://gitee.com/u1iz/autoNote/raw/master/src/lib/beforeLoading.js')
                            }, 500);
                        }, 500);
                    }, 500);
                }, 500)
                let old = $('#autoRes_HTML_inside').html();
                dld_tmr = setInterval(function () {
                    $('#autoRes_HTML_inside').html('跨域获取中<br>请稍后');
                    if (val_arr[0] && val_arr[1] && val_arr[2] && val_arr[3] && val_arr[4]) {
                        let DOC_tex = `<!DOCTYPE html> <html lang="zh-cn"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>${$('.common-channel-crumb strong').text()}</title>
                                <style>${val_arr[0]}</style>
                                <style>#hotkey_wrap { position: fixed; top: 1rem; left: 1rem; background: rgba(128, 128, 128, .2); padding: 0.32rem 0.64rem; z-index: 10; }</style> <script>${val_arr[1]}</script>
                                </script> <script>${val_arr[2]}</script>
                                </script> <script>${val_arr[3]}</script>
                                <script> function tit() { add_title([document.querySelector('title').innerText], [ ['label', 'h1'], ['backgroundColor', 'transparent'], ['whiteSpace', 'nowrap'], ['font', '800 1.6rem "MicroSoft YaHei"'], ['boxShadow', 'none'], ['padding', '0.6rem 0 0.6rem 0'], ['padding', '0.6rem 0 0.6rem 0'], ['borderRadius', '2.7rem'], ['marginTop', '-3.6rem'], ['color', '#000'], ['textAlign', 'center'], ['width', '90%'], ['ML', '5%'], ['MR', '5%'], ['display', 'none'], ['color', 'transparent'], ['js-style', 'fontPosition', 'center-middle'], ['js-event', 'setTimeout', '1800', 'transition', 'all 0.96s'], ['js-event', 'setTimeout', '1800', 'display', 'block'], ['js-event', 'setTimeout', '1900', 'color', '#666'], ['js-event', 'setTimeout', '2000', 'MT', '2.4rem'] ]); } function split_p(str) { let arr = new Array; for (let i = 0; i < str.length; i++) { arr[i] = str[i]; } return arr; } </script> </head>
                                <body> <div id="hotkey_wrap"> <h4>快捷键提示</h4> <p>R*3 显示/隐藏 答案</p> <p>S*3 隐藏/显示 做题操作模块</p> <p>L*3 隐藏/显示 分割线</p> <p>F 一键批改</p> <p>G 页面黑白</p> <p>B 页面关灯</p> <p>为避免浏览器未刷新缓存，请先 Ctrl+F5 , 一次就好</p> </div> <script> document.body.style.overflowX = 'hidden'; window.scrollTo(0, document.documentElement.scrollTop); let hk_wrap = document.querySelector('#hotkey_wrap'); setTimeout(() => { hk_wrap.style.transition = 'all 0.36s'; hk_wrap.style.top = -hk_wrap.clientHeight + 'px'; setTimeout(() => { hk_wrap.remove(); }, 420); }, 4600); if (sessionStorage.getItem('execute_all') === 'true') {} else { tit(); } function call() {} Q_KV_module(${JSON.stringify(getData())}); </script>
                                <script>${val_arr[4]}</script>
                                </script> </body> </html>`;
                        exportRaw(DOC_tex, $('.common-channel-crumb strong').text() + '_内联.html');
                        $('#autoRes_HTML_inside').html(old);
                        val_arr = [];
                        clearInterval(dld_tmr);
                    }
                }, 200);
            });
            $('#autoRes_update').click(function () {
                if (is_Mobile) {
                    $('.com-exercise-tabbar .ExamButton')[0].click();
                } else {
                    $('.tijiao')[0].click();
                }
            });
            $('#autoRes_rewrite').click(function () {
                /* 跳过所有 */
                if (is_Mobile) {
                    $('.exam-ans').removeClass('done');
                    $('.exam-ans .false').removeClass('false');
                } else {
                    $('.options-w').removeClass('done');
                    $('.options-w .error').removeClass('error');
                }
            });
            let ajax_exe = false;

            function get_fileText(fileUrl) {
                if (val_arr.length == 0 || ajax_exe) {
                    ajax_exe = false;
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: fileUrl,
                        onload: rst => {
                            val_arr[val_arr.length] = rst.response;
                            return rst.response;
                        },
                        async: false,
                        synchronous: true,
                        onerror: () => {
                            console.warn('文件读取错误');
                        }
                    });
                } else {
                    let ajax_timer = setInterval(() => {
                        if (val_arr[val_arr.length - 1]) {
                            ajax_exe = true;
                            get_fileText(fileUrl);
                            clearInterval(ajax_timer);
                        }
                    }, 100);
                }
            }



            $('#autoRes_displayRst').click(function () {
                if (is_Mobile) {
                    $('.com-exam-skill').toggle();
                } else {
                    $('.option-hover ').toggle();
                }
            });

            window.addEventListener('keyup', (e) => {
                if (document.activeElement.tagName == 'INPUT') {} else if (e.keyCode == 72) {
                    /* H 显示/隐藏 菜单 */
                    $('#autoRes_tools_wrap').toggle();
                } else if (e.keyCode == 82) {
                    /* R 显示/隐藏 答案 */
                    $('.option-hover').toggle();
                }
            });

            function getData() {
                let CQ_tit = [];
                let MCQ_tit = [];
                let fill_tit = [];
                let JQ_tit = [];
                CQ_tit = CQ.length ? [
                    ['elem', '\n\t 单选题', [0.96, 800],
                        [
                            ['MB', '0.32rem']
                        ]
                    ]
                ] : [];
                MCQ_tit = MCQ.length ? [
                    ['elem', '\n\t 多选题', [0.96, 800],
                        [
                            ['MB', '0.32rem']
                        ]
                    ]
                ] : [];
                fill_tit = Fill.length ? [
                    ['elem', '\n\t 填空题', [0.96, 800],
                        [
                            ['MB', '0.32rem']
                        ]
                    ]
                ] : [];
                JQ_tit = JQ.length ? [
                    ['elem', '\n\t 判断题', [0.96, 800],
                        [
                            ['MB', '0.32rem']
                        ]
                    ]
                ] : [];
                let space = [
                    ['elem', '\n\n\n\n', [0.96, 400]]
                ];
                let tit = [
                    ['elem', '\n\n' + $('.common-channel-crumb strong').text(),
                        [1.6, 400, '0.32rem'],
                        [
                            ['position', 'relative'],
                            ['left', '10%'],
                            ['textShadow', 'rgb(0 0 255 / 20%) 0.1rem 0.1rem 0.24rem, rgb(51 51 34 / 13%) 0.16rem 0.16rem 0.32rem'],
                            ['addClassName', 'questionsPart']
                        ]
                    ]
                ];
                final = [...tit, ...JQ_tit, ...JQ, ...fill_tit, ...Fill, ...CQ_tit, ...CQ, ...MCQ_tit, ...MCQ, ...space];
                return final;
            }

            function fillText(e, t1, t2) {
                if (e.text() == t1) {
                    e.text(t2)
                } else {
                    e.text(t1)
                }
            }
        }
    });
})();