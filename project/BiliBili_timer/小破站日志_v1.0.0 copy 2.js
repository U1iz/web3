// ==UserScript== 
// @name         小破站日志 
// @namespace    http://tampermonkey.net/ 
// @version      1.0.0
// @description  记录你在b站的浏览记录！ 
// @author       U1iz 
// @match        https://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com 
// @grant        none 
// ==/UserScript==
(function () {

    / 初始化 /
    /* 计时间隔 （秒） */
    const interval = 1;
    /* 数据容器 */
    window.b_log = {};
    /* 如果已存有数据则先获取 */
    if (JSON.parse(localStorage.getItem('bilibili_userLog'))?.[crtDate()]) {
        window.b_log = JSON.parse(localStorage.getItem('bilibili_userLog'));
    }
    /* 全局定时器 */
    window.global_timer = null;
    /* 页面切换次数 */
    window.triggeredTimes = 0;

    // 建立基本结构
    function dct() {
        const dt = crtDate();
        window.currentDate = dt;
        window.correctTime = new Date(); /* 创建基本数据格式 */
        if (!window.b_log[dt]) {
            window.b_log[dt] = {
                history: {}
            }
            save()
            title_inserter();
        }
        return dt;
    }

    // 建立以该页面标题为名的细分条目
    function title_inserter() {
        const title = (document.title).replace(/ /g, '');;
        if (window.b_log[window.currentDate].history[title]) {
            /* 已存在 */
            window.triggeredTimes = window.b_log[window.currentDate].history[title][2];
        } else {
            let local = JSON.parse(localStorage.getItem('bilibili_userLog'));
            local[window.currentDate].history[title] = [location.href, '', 0, get_correctTime(window.correctTime), '', [window.correctTime.getTime(), 0]];
            window.b_log = local;
            localStorage.setItem('bilibili_userLog', JSON.stringify(b_log));
        }
        save();
        return title;
    }

    / 功能类 /
    // 数据存储
    function save() {
        let title = (document.title).replace(/ /g, '');
        let local = JSON.parse(localStorage.getItem('bilibili_userLog'));
        if(JSON.stringify(local) != JSON.stringify(b_log)) {
            if (local?.[window.currentDate]?.history?.[title] && b_log?.[window.currentDate]?.history?.[title]) {} else if (b_log?.[window.currentDate]?.history?.[title]) {
                local[window.currentDate].history[title] = b_log[window.currentDate].history[title]
            } else {
                local = {
                    ...local,
                    ...b_log
                }
            }
            localStorage.setItem('bilibili_userLog', JSON.stringify(local));
            window.b_log = local;
        }
        return local;
    }

    // 存储点赞的评论信息
    function insert_liked_comments() {
        let local = save();
        let log = get_liked_comments();
        if (log.length >= 1) {
            local[dct()].history[title_inserter()][6] = log;
        }
        local = {
            ...window.b_log,
            ...local
        };
        localStorage.setItem('bilibili_userLog', JSON.stringify(local));
        window.b_log = local;
    }

    // 获取点赞的评论信息
    function get_liked_comments() {
        let likes_arr = []; /* 获取评论容器 */
        let likes = document.querySelectorAll('.liked');

        likes.forEach(e => {
            const elem = e.parentNode.parentNode;
            let liked_count = '',
                replay_time = '',
                src_text = '',
                user_info = [];
            if (contain_class(elem, 'con') || contain_class(elem, 'reply-wrap')) {
                liked_count = e.querySelector('span').innerText;
                replay_time = (elem.querySelector('.time-location') || elem.querySelector('.time')).innerText;
                let user_label = elem.querySelector('.user a.name');
                user_info = [user_label.innerText, user_label.dataset.usercardMid];
                if (contain_class(elem, 'con')) {
                    /* 直接获取文字源代码，懒得处理了 */
                    src_text = elem.querySelector('.text').innerHTML.toString();
                } else {
                    src_text = elem.querySelector('.user .text-con').innerHTML.toString()
                }
            } else if (contain_class(elem, 'reply-info')) {
                if (contain_class(elem, 'sub-reply-info')) {
                    replay_time = elem.querySelector('.sub-reply-time').innerText;
                    liked_count = elem.querySelector('.sub-reply-like>span').innerText;
                    const par = elem.parentNode;
                    if (contain_class(par, 'sub-reply-item')) {
                        src_text = par.querySelector('.reply-content').innerHTML.toString();
                        const ui = par.querySelector('.sub-user-info .sub-user-name');
                        user_info = [ui.innerText, ui.dataset.userId];
                    }
                } else {
                    replay_time = elem.querySelector('.reply-time').innerText;
                    liked_count = elem.querySelector('.reply-like span').innerText;
                    const root = elem.parentNode;
                    if (contain_class(root, 'root-reply')) {
                        src_text = root.querySelector('.reply-content').innerHTML.toString();
                        const ui = document.querySelector('.user-name');
                        user_info = [ui.innerText, ui.dataset.userId];
                    }
                }
            } else {
                console.error('无法获取评论详情！', elem);
            }
            let info = {
                author: user_info,
                content: src_text,
                count: liked_count,
                time: replay_time
            };
            likes_arr[likes_arr.length] = info;
        });

        function contain_class(elem, str) {
            if (elem.className.indexOf(str) != -1) {
                return true;
            } else {
                return false;
            }
        }
        console.log(likes_arr);
        return likes_arr;
    }

    // 用户离开
    function user_leave(unlock) {
        console.log('%c用户离开', 'color:orange');
        dct();
        title_inserter();
        let local = JSON.parse(localStorage.getItem('bilibili_userLog'));
        let temp = new Date();
        let title = (document.title).replace(/ /g, '');
        let t1 = window.b_log[window.currentDate].history[title][5][0];
        let t2 = temp.getTime();
        local[window.currentDate].history[title][4] = get_correctTime(temp);
        local[window.currentDate].history[title][5][1] = temp.getTime();
        local[window.currentDate].history[title][1] = ((t2 - t1) / 60 / 1000).toFixed(3) + '分钟';
        localStorage.setItem('bilibili_userLog', JSON.stringify(local));
        if (unlock) {
            sessionStorage.removeItem('load_btn')
        }
        insert_liked_comments();
    }

    // 浏览时间累加定时器
    function timer() {
        let step = 1;
        clearInterval(global_timer);
        window.global_timer = setInterval(() => {
            dct();
            let local = JSON.parse(localStorage.getItem('bilibili_userLog'));
            if (localStorage.getItem('bilibili_seconds')) {
                let crt_time = localStorage.getItem('bilibili_seconds').split(',');
                if (window.currentDate != crt_time[0]) {
                    local[crt_time[0]].BrowseDuration = crt_time[1];
                    localStorage.setItem('bilibili_seconds', [window.currentDate, interval])
                } else {
                    let seconds = crt_time[1] == Number(crt_time[1]) ? Number(crt_time[1]) + interval : interval;
                    local[window.currentDate].BrowseDuration = seconds;
                    localStorage.setItem('bilibili_seconds', [window.currentDate, seconds])
                }
                if (!(step % 10)) {
                    localStorage.setItem('bilibili_userLog', JSON.stringify(local));
                    window.b_log = local;
                }
            } else {
                localStorage.setItem('bilibili_seconds', [window.currentDate, interval])
            }
            switch (step % 6) {
                case 0:
                    console.log(`%c你今日已在b站度过 %c ${(parseInt(localStorage.getItem('bilibili_seconds').split(',')[1])/60).toFixed(2)} %c分钟`, 'background: #9de0ff;color:#297c4e;', 'background: #ff5500;color:#fff;', 'background: #9de0ff;color:#297c4e;', '\n-------------------\n', get_correctTime(new Date()), step, '\n===================');
                    break;
            }
            switch (step % 101) {
                case 90:
                    /* 防止长时间积累导致卡死 */
                    console.warn('控制台还剩' + 10 * Number(interval) + '秒 被清空');
                    break;
                case 0:
                    console.clear();
                    break;
                case 10:
                case 20:
                case 30:
                case 40:
                case 50:
                case 60:
                case 70:
                case 80:
                    console.log('用户数据', window.b_log);
                    break;
            }
            step++;
        }, interval * 1000);
        window.triggeredTimes++;
        user_leave();
    }

    / 监听事件 /
    window.addEventListener('load', () => {
        if (!sessionStorage.getItem('load_btn')) {
            sessionStorage.setItem('load_btn', '1');
            timer();
            dct()
        }
    });

    // 监听其它页面的数据更改，用于数据同步
    window.addEventListener('storage', e => {
        if (e.key == 'bilibili_userLog') {
            window.b_log = {
                ...window.b_log,
                ...JSON.parse(e.newValue)
            }
            save()
        }
    })

    /* 监听用户是否 离开/进入 页面 */
    document.addEventListener('visibilitychange', () => {
        dct();
        switch (document.visibilityState) {
            case 'visible':
                if (!sessionStorage.getItem('visible_btn')) {
                    sessionStorage.setItem('visible_btn', '1');
                    window.b_log[window.currentDate].history[(document.title).replace(/ /g, '')][2] = window.triggeredTimes;
                    timer();
                }
                break;
            case 'hidden':
            case 'unloaded':
                clearInterval(window.global_timer);
                // user_leave();
                sessionStorage.removeItem('visible_btn');
                console.log('用户离开');
                break;
            default:
                break;
        }
    });

    // 检测点赞
    window.addEventListener('click', () => {
        setTimeout(() => {
            user_leave()
        }, 1000)
    });

    // 页面准备关闭
    window.addEventListener('beforeunload', () => {
        user_leave(1);
    });
    // 页面关闭
    window.addEventListener('unload', () => {
        user_leave(1);
    });

    / 工具类 /
    // 获取当前日期
    function crtDate() {
        const date = new Date();
        return `${fill_zero(date.getFullYear())}${fill_zero(date.getMonth()+1)}${fill_zero(date.getDate())}`;
    }

    // 获取具体时间
    function get_correctTime(date) {
        return correct_time(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }

    function correct_time() {
        let temp = '';
        for (let i in arguments) {
            temp += fill_zero(arguments[i]) + ':'
        }
        return temp.substr(0, temp.length - 1);
    }

    // 数字补零
    function fill_zero(num) {
        if (`${num}`.length == 1) {
            return `0${num}`;
        }
        return `${num}`;
    }

    // 对象序列化，undefined和函数丢失问题
    const JSONStringify = (option) => {
        return JSON.stringify(option,
            (key, val) => {
                // 处理函数丢失问题
                if (typeof val === 'function') {
                    return `${val}`;
                }
                // 处理undefined丢失问题
                if (typeof val === 'undefined') {
                    return 'undefined';
                }
                return val;
            },
            2
        )
    }
    // 对象序列化解析
    const JSONParse = (objStr) => {
        return JSON.parse(objStr, (k, v) => {
            if (typeof v === 'string' && v.indexOf && v.indexOf('function') > -1) {
                // eval 可能在eslint中报错，需要加入下行注释
                // eslint-disable-next-line
                return eval(`(function(){return ${v}})()`);
            }
            return v;
        });
    }
})();