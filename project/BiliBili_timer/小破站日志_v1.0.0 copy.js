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

    function dct() {
        const dt = `${fill_zero(date.getFullYear())}${fill_zero(date.getMonth()+1)}${fill_zero(date.getDate())}`;
        window.currentDate = dt;
        window.correctTime = new Date(); /* 创建基本数据格式 */
        if (!window.b_log[dt]) {
            window.b_log[dt] = {
                history: {}
            }
            title_inserter();
        }
        console.log(b_log);
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
            window.b_log = local;
            localStorage.setItem('bilibili_userLog', JSON.stringify(b_log));
            console.log(b_log, localStorage.getItem('bilibili_userLog'));
        }
        save();
        return title;
    }
    window.addEventListener('load', () => {
        dct();
        if (!sessionStorage.getItem('load_btn')) {
            sessionStorage.setItem('load_btn', '1'); /* 10s一加 */
            // timer();
            title_inserter();
        }

    });

    window.addEventListener('storage', e => {
        if (e.key == 'bilibili_userLog') {
            /* window.b_log = {
                ...window.b_log,
                ...JSON.parse(e.newValue)
            }
            // console.log(e);
            save() */
            console.log(e);
        }
    })

    document.addEventListener('visibilitychange', () => {
        // dct();
        // title_inserter();
        switch (document.visibilityState) {
            case 'visible':
                if (!sessionStorage.getItem('visible_btn')) {
                    sessionStorage.setItem('visible_btn', '1');
                    window.b_log[window.currentDate].history[(document.title).replace(/ /g, '')][2] = window.triggeredTimes;
                    // timer();
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
        } /* 保存3 */
        // save();
    });

    function save() {
        let title = (document.title).replace(/ /g, '');
        // title == 'Correspond' ? title = '哔哩哔哩(゜-゜)つロ干杯~-bilibili' : null;
        let local = JSON.parse(localStorage.getItem('bilibili_userLog'));
        console.log(local);
        console.log(currentDate, title);
        if (local?.[currentDate]?.history?.[title] && b_log?.[currentDate]?.history?.[title]) {} else if (b_log?.[currentDate]?.history?.[title]) {
            local[currentDate].history[title] = b_log[currentDate].history[title]
        } else {
            console.error(local);
            local = {
                ...local,
                ...b_log
            }
        }
        console.log(local, b_log, JSON.stringify(local));
        localStorage.setItem('bilibili_userLog', JSON.stringify(local));
        window.b_log = local;
        return local;
    }
    function get_correctTime(date) {
        return correct_time(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }

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