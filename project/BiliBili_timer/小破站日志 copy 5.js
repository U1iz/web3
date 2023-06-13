// ==UserScript== 
// @name         小破站日志 
// @namespace    http://tampermonkey.net/ 
// @version      0.1.0 
// @description  记录你在b站的浏览记录！ 
// @author       U1iz 
// @match        https://www.bilibili.com/* // @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com // @grant        none // ==/UserScript==
(function () {
    /* 计时间隔 （秒） */
    let interval = 1;
    window.b_log = {
        /* 日期: { 标签页历史: { 名称: [ url, 持续时间, 切换次数, 打开时间, 关闭时间, [时间戳打开, 时间戳关闭], [ // 点赞的评论 { 发布者author: [昵称, ID], 内容content: '', 点赞数count: 0, 发布时间time: '' } ] ] }, 待在站内的总秒数: 0 } */
    };
    const date = new Date();
    const dt = `${fill_zero(date.getFullYear())}${fill_zero(date.getMonth())}${fill_zero(date.getDate())}`;
    if (JSON.parse(localStorage.getItem('bilibili_userLog'))?.[dt]) {
        window.b_log = JSON.parse(localStorage.getItem('bilibili_userLog'));
    }
    window.global_timer = null; /* 页面切换次数 */
    window.triggeredTimes = 0;

    function dct(); {
        const dt = `${fill_zero(date.getFullYear())}${fill_zero(date.getMonth())}${fill_zero(date.getDate())}`;
        window.currentDate = dt;
        window.correctTime = new Date(); /* 创建基本数据格式 */
        if (!window.b_log[dt]) {
            window.b_log[dt] = {
                history: {}
            }
        } /* 保存1 */
        save();
        return dt;
    }

    function title_inserter() {
        const title = (document.title).replace(/ /g, '');;
        if (window.b_log[window.currentDate].history[title]) {
            /* 已存在 */
            window.triggeredTimes = window.b_log[window.currentDate].history[title][2];
        } else {
            let local = JSON.parse(localStorage.getItem('bilibili_userLog'));
            local[window.currentDate].history[title] = [location.href, '', 0, get_correctTime(window.correctTime), '', [window.correctTime.getTime(), 0]];
            localStorage.setItem('bilibili_userLog', JSON.stringify(local));
            window.b_log = local;
        }
        return title;
    }
    window.addEventListener('load', () => {
        dct();
        if (!sessionStorage.getItem('load_btn')) {
            sessionStorage.setItem('load_btn', '1'); /* 10s一加 */
            timer();
            title_inserter(); /* 保存2 */
            save();
        }
    }); /* 页面准备关闭 */
    window.addEventListener('beforeunload', () => {
        user_leave(1);
    }); /* 页面关闭 */
    window.addEventListener('unload', () => {
        user_leave(1);
    });

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
    document.addEventListener('visibilitychange', () => {
        dct();
        title_inserter();
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
                user_leave();
                sessionStorage.removeItem('visible_btn');
                console.log('用户离开');
                break;
            default:
                break;
        } /* 保存3 */
        save();
    });

    function save() {
        let local = JSON.parse(localStorage.getItem('bilibili_userLog'));
        if (local?.[window.currentDate]) {
            for (let k in window.b_log[window.currentDate].history) {
                local[window.currentDate].history[k] = window.b_log[window.currentDate].history[k];
            }
        } else {
            local = {
                ...local,
                ...window.b_log
            }
        }
        localStorage.setItem('bilibili_userLog', JSON.stringify(local));
        window.b_log = local;
        return local;
    }

    function get_correctTime(date) {
        return correct_time(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }

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
    } /* 数字前补充零 */
    function fill_zero(num) {
        if (`${num}`.length == 1) {
            return `0${num}`;
        }
        return `${num}`;
    }

    function correct_time() {
        let temp = '';
        for (let i in arguments) {
            temp += fill_zero(arguments[i]) + ':'
        }
        return temp.substr(0, temp.length - 1);
    }

    function insert_liked_comments() {
        let local = save();
        local[dct()].history[title_inserter()][6] = get_liked_comments();
        local = {
            ...local,
            ...window.b_log
        };
        localStorage.setItem('bilibili_userLog', JSON.stringify(local));
        window.b_log = local;
    } /* 获取点赞的评论信息 */
    function get_liked_comments() {
        let likes_arr = []; /* 获取评论容器 */
        let likes = document.querySelectorAll('.liked');

        likes.forEach(e => {
            const elem = e.parentNode.parentNode;
            let liked_count = '',
                replay_time = '',
                src_text = '',
                user_info = [];
            console.log(elem);
            if (contain_class(elem, 'con') || contain_class(elem, 'reply-wrap')) {
                liked_count = e.querySelector('span').innerText;
                replay_time = (elem.querySelector('.time-location') || elem.querySelector('.time')) .innerText;
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
                } else {
                    let elem = e.parentNode;
                    if (elem.className.indexOf('reply-info') != -1) {
                        replay_time = elem.querySelector('.reply-time').innerText;
                        liked_count = elem.querySelector('.reply-like span').innerText;
                        let par = elem.parentNode;
                        if (par.className.indexOf('root-reply') != -1) {
                            src_text = par.querySelector('.reply-content').innerHTML.toString();
                            let root = par.parentNode;
                            if (root.className.indexOf('content-warp') != -1) {
                                let ui = document.querySelector('.user-name');
                                user_info = [ui.innerText, ui.dataset.userId];
                            }
                        }
                    }
                }
            } else {
                console.log(elem, 22222222);
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
            console.log(elem);
            if (elem.className.indexOf(str) != -1) {
                return true;
            } else {
                return false;
            }
        }
        console.log(likes_arr);
        return likes_arr;
    }

})();