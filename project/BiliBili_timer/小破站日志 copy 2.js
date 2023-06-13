// ==UserScript==
// @name         小破站日志
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  记录你在b站的浏览记录！
// @author       U1iz
// @match        https://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function () {
    // 计时间隔 （秒）
    let interval = 1;
    let timer_step = 1;
    window.b_log = {
        /* 日期: {
            标签页历史: {
                名称: [
                     url,
                     持续时间,
                     切换次数,
                     打开时间,
                     关闭时间,
                     [时间戳（打开）,时间戳（关闭）]
                    ]
            },
            待在站内的总时长（秒）:
        } */
    }
    const date = new Date();
    const dt =
        `${fill_zero(date.getFullYear())}${fill_zero(date.getMonth())}${fill_zero(date.getDate())}`;
    if (JSON.parse(localStorage.getItem('bilibili_userLog'))?.[dt]) {
        window.b_log = JSON.parse(localStorage.getItem('bilibili_userLog'));
    }
    window.global_timer = [];
    // 页面切换次数
    window.triggeredTimes = 0;

    // window.addEventListener('DOMContentLoaded', e => {})

    function dct() {
        window.currentDate = dt;
        window.correctTime = new Date();
        /* 创建基本数据格式 */
        if (!window.b_log[dt]) {
            window.b_log[dt] = {
                history: {}
            }
        }

        // console.log(dt);
        /* 保存1 */
        save();
    }

    window.addEventListener('load', () => {
        dct();
        if (!sessionStorage.getItem('load_btn')) {
            sessionStorage.setItem('load_btn', '1')
            const title = document.head.querySelector('title').innerText;
            if (window.b_log[window.currentDate].history[title]) {
                // 已存在
                window.triggeredTimes = window.b_log[window.currentDate].history[title][2];
            } else {
                window.b_log[window.currentDate].history[title] = [
                    location
                    .href,
                    '', 0, get_correctTime(window.correctTime), '', [window.correctTime.getTime(), 0]
                ];
            }
            // console.log(window.b_log);
            /* 10s一加 */
            timer();

            /* 保存2 */
            save();
        }
    })


    /* 页面准备关闭 */
    window.addEventListener('beforeunload', () => {
        user_leave(1);
    })
    /* 页面关闭 */
    window.addEventListener('unload', () => {
        user_leave(1);
    })

    function user_leave(unlock) {
        let local = JSON.parse(localStorage.getItem('bilibili_userLog'));
        let temp = new Date();
        let title = document.head.querySelector('title').innerText;
        let t1 = window.b_log[window.currentDate].history[title][5][0];
        let t2 = temp.getTime();
        local[window.currentDate].history[title][4] =
            get_correctTime(temp);
        local[window.currentDate].history[title][5][1] =
            temp.getTime()
        local[window.currentDate].history[title][1] = ((
            t2 - t1) / 60 / 1000).toFixed(3) + '分钟'
        localStorage.setItem('bilibili_userLog', JSON.stringify(local));
        if (unlock) {
            sessionStorage.removeItem('load_btn')
        }
    }

    /* https://blog.csdn.net/weixin_43617604/article/details/103688344 */
    // 页面的 visibility 属性可能返回三种状态
    // prerender，visible 和 hidden
    // let pageVisibility = document.visibilityState;
    // 监听 visibility change 事件
    document.addEventListener('visibilitychange', () => {
        switch (document.visibilityState) {
            case 'visible':
                if (!sessionStorage.getItem('visible_btn')) {
                    sessionStorage.setItem('visible_btn', '1');
                    window.b_log[window.currentDate].history[document.head.querySelector('title').innerText][2] = window.triggeredTimes;
                    timer();
                }
                break;
            case 'hidden':
            case 'unloaded':
                clearInterval(window.global_timer);
                timer_step = 1;
                user_leave();
                sessionStorage.removeItem('visible_btn');
                break;
            default:
                break;
        }

        /* 保存3 */
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
    }

    function get_correctTime(date) {
        return correct_time(date.getHours(), date.getMinutes(), date.getSeconds(), date
            .getMilliseconds());
    }
    // clearTimer();

    function timer() {
        let step = 1;
        window.global_timer[window.global_timer.length] = setInterval(() => {
            console.log(window.global_timer);
            if (timer_step > step) {
                console.warn('多定时器运行中。',step,timer_step);
                step++;
            } else {
                let local = JSON.parse(localStorage.getItem('bilibili_userLog'));
                if (localStorage.getItem('bilibili_seconds')) {
                    let crt_time = localStorage.getItem('bilibili_seconds').split(',');
                    if (window.currentDate != crt_time[0]) {
                        local[crt_time[0]].BrowseDuration = crt_time[1];
                        localStorage.setItem('bilibili_seconds', [window.currentDate, interval])
                    } else {
                        let seconds = crt_time[1] == Number(crt_time[1]) ? Number(crt_time[1]) + interval : interval
                        local[window.currentDate].BrowseDuration = seconds;
                        localStorage.setItem('bilibili_seconds', [window.currentDate, seconds])
                    }
                    if (!(step % 10)) {
                        localStorage.setItem('bilibili_userLog', JSON.stringify(local))
                    }
                } else {
                    localStorage.setItem('bilibili_seconds', [window.currentDate, interval])
                }

                switch (step % 6) {
                    case 0:
                        console.log(`%c你今日已在b站度过 %c ${(parseInt(localStorage.getItem('bilibili_seconds').split(',')[1])/60).toFixed(2)} %c分钟`, 'background: #9de0ff;color:#297c4e;', 'background: #ff5500;color:#fff;', 'background: #9de0ff;color:#297c4e;', '\n-------------------\n', get_correctTime(new Date()),step,timer_step, '\n===================');
                        break;
                }
                switch (step % 101) {
                    case 90:
                        console.warn('控制台还剩' + 10 * Number(interval) + '秒 被清空');
                        break;
                    case 0:
                        console.clear()
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
            }
            timer_step++;
        }, interval * 1000);
        window.triggeredTimes++;
        user_leave();
    }
    // 数字前补充零
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
})();