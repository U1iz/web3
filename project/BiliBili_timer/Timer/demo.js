// ==UserScript==
// @name         计时器 单组件
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*.bilibili.com/*
// @exclude      *://api.bilibili.com/*
// @exclude      *://api.*.bilibili.com/*
// @exclude      *://*.bilibili.com/api/*
// @exclude      *://member.bilibili.com/studio/bs-editor/*
// @exclude      *://t.bilibili.com/h5/dynamic/specification
// @exclude      *://bbq.bilibili.com/*
// @exclude      *://message.bilibili.com/pages/nav/header_sync
// @exclude      *://s1.hdslb.com/bfs/seed/jinkela/short/cols/iframe.html
// @exclude      *://open-live.bilibili.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    // docLoaded visitTime
    /* basic = {
        页面类型: {
            进入时间: '时间戳',
            离开时间: '时间戳',
            累计停留时长: ''
        }
    } */

    window.global_timer = null;
    window.interval = 200;
    window.saveInterval = 10;
    window.storageKeySet = ['docLoaded_forBL', 'visitTime_forBL', 'currentDate_forBL']
    window.onload = () => {
        userEnter()
    }
        const pageType = location.href.slice(-3);
    // 临时数据存储，用于减轻存取压力同时提升精度
    window.temp_data = {};
    window.temp_step = 0;

    function timer_start() {
        window.global_timer = setInterval(() => {
            tData_build();
            temp_step++;
            if (temp_step >= 10) {
                temp_step = 0;
                console.log(temp_data);
                localStorage.setItem('visitTime', JSON.stringify(temp_data))
            }
        }, interval);

        // 用于建立、更新时长数据
        function tData_build() {
            let local = localStorage.getItem(storageKeySet[1]);
            if (local && local.length > 3) {
                local = JSON.parse(local);
            } else {
                local = {}
            }
            if (temp_data?.[pageType]) {
                temp_data[pageType].duration = local[pageType].duration + interval
                temp_data[pageType].leave = CDT();
                _sync()
            } else {
                temp_data[pageType] = {
                    enter: CDT(),
                    leave: CDT(),
                    duration: interval
                }
                _sync()
                localStorage.setItem(storageKeySet[1], JSON.stringify(temp_data))
            }

            function _sync() {
                temp_data = {
                    ...local,
                    ...temp_data
                }
            }
        }

    }
    // 获取时间
    function CDT() {
        return arguments.length ? [crtDate(), crtTime()] : new Date().getTime()
    }
    // 获取当前日期
    function crtDate(date) {
        date = !date ? new Date() : date;
        return `${fill_zero(date.getFullYear())}${fill_zero(date.getMonth()+1)}${fill_zero(date.getDate())}`;
    }

    // 获取具体时间
    function crtTime(date) {
        date = !date ? new Date() : date;

        function joinTime() {
            let temp = '';
            for (let i in arguments) {
                temp += fill_zero(arguments[i]) + ':'
            }
            return temp.substr(0, temp.length - 1);
        }
        return joinTime(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }

    function fill_zero(num) {
        if (`${num}`.length == 1) {
            return `0${num}`;
        }
        return `${num}`;
    }

    function userLeave() {
        console.log('%c用户离开', 'color:orange');
        sync(JSON.parse(localStorage.getItem(storageKeySet[1])), temp_data, storageKeySet[1])
        clearInterval(window.global_timer)
        sessionStorage.removeItem(storageKeySet[0])
    }

    function userEnter() {
        // 判断是否二次加载，防止脚本多次执行
        if (!sessionStorage.getItem(storageKeySet[0])) {
            console.log('用户进入');
            sessionStorage.setItem(storageKeySet[0], 1);
            timer_start();
            localStorage.setItem(storageKeySet[1], JSON.stringify(window.temp_data))
        }
    }
    document.addEventListener('visibilitychange', () => {
        switch (document.visibilityState) {
            case 'visible':
                userEnter()
                break;
            case 'hidden':
            case 'unloaded':
                userLeave();
                break;
            default:
                break;
        }
    });

    // 页面准备关闭
    window.addEventListener('beforeunload', () => {
        userLeave()
    });
    // 页面关闭
    window.addEventListener('unload', () => {
        userLeave()
    });

    window.addEventListener('storage', e => {
        if (e.key == storageKeySet[1] && e.url != location.href) {
            const ns = JSON.parse(e.newValue)
            if (Object.keys(ns).length != Object.keys(temp_data).length) {
                sync(temp_data, ns, storageKeySet[1])
            }
        }
    })

    
    function sync(data_1, data_2, lss) {
        let temp = {
            ...data_1,
            ...data_2
        }
        localStorage.setItem(lss, JSON.stringify(temp));
        console.log('%c数据更改', 'color:red')
        return temp
    }
})();