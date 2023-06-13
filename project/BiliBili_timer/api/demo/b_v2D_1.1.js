// ==UserScript==
// @name         阿b日志V2
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  更详细地记录下你的b站生活。
// @author       U1iz
// @match        *://*.bilibili.com/*
// @match        *://www.biligame.com
// @exclude      *://api.bilibili.com/*
// @exclude      *://api.*.bilibili.com/*
// @exclude      *://*.bilibili.com/api/*
// @exclude      *://member.bilibili.com/studio/bs-editor/*
// @exclude      *://t.bilibili.com/h5/dynamic/specification
// @exclude      *://bbq.bilibili.com/*
// @exclude      *://message.bilibili.com/pages/nav/header_sync
// @exclude      *://s1.hdslb.com/bfs/seed/jinkela/short/cols/iframe.html
// @exclude      *://open-live.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @require      https://cdn.bootcss.com/jquery/3.6.0/jquery.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    const apis = [
        'https://api.bilibili.com/x/web-interface/view',
        'https://api.bilibili.com/x/article/viewinfo',
        'https://api.bilibili.com/pgc/web/season/stat',
        'https://api.bilibili.com/pgc/view/web/season'
    ]
    window.global_timer = null;
    window.interval = 200;
    window.saveInterval = 10;
    window.storageKeySet = ['docLoaded', 'visitTime']
    window.onload = () => {
        window.pageInfo = get_pageType() || '其它';
        /* chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var url = tabs[0].url;
            console.log(url);
            // 处理url
          }); */
          const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
              if (mutation.type === 'childList') {
                const url = window.location.href;
                console.log(url);
              }
            });
          });
          
          observer.observe(document.querySelector('body'), { childList: true, subtree: true });
        
        // console.log(window.location.origin + window.location.pathname);
        /* console.log(location.href + location.hash);
        console.log(window.location.toString());
        console.log(document.URL);
        console.log(window.location.href, location.href); */
        window.pageType = typeof pageInfo == 'string' ? pageInfo : pageInfo[0];
        const dir = {
            '视频': () => {

            },
            '专栏': () => {

            },
            '番剧': () => {
                get_epId(GetEp, pageInfo);
            },
            '漫画': () => {

            },
            '搜索': () => {

            },
            '消息': () => {

            },
            '活动': () => {

            },
            '动态': () => {

            },
            '直播': () => {

            },
            '课堂': () => {

            },
            '话题': () => {

            },
            '音频': () => {

            },
            '小黑屋': () => {

            },
            '会员购': () => {

            },
            '排行榜': () => {

            },
            '历史记录': () => {

            },
            '个人中心': () => {

            },
            '创作中心': () => {

            },
            '游戏中心': () => {

            },
            '风纪委员会': () => {

            },
            '其它': () => {

            }
        }
        dir[pageType]()
        // 开始计时
        userEnter()
    }

    //#region 主要方法
    // 获取页面类型
    function get_pageType() {
        const url = location.href;

        const dir = {
            '视频': 0,
            '专栏': 1,
            '番剧': 2,
            '漫画': 3,
            '搜索': 4,
            '消息': 5,
            '活动': 6,
            '动态': 7,
            '直播': 8,
            '课堂': 9,
            '话题': 10,
            '音频': 11,
            '小黑屋': 12,
            '会员购': 13,
            '排行榜': 14,
            '历史记录': 15,
            '个人中心': 16,
            '创作中心': 17,
            '游戏中心': 18,
            '风纪委员会': 19
        }

        let piece = url.toLowerCase().split('/');
        piece.splice(0, 2);
        try {
            try {
                let h = piece.shift().split('.')
                h.forEach(k => {
                    switch (k) {
                        case 't':
                            throw '动态';
                        case 'live':
                            throw '直播';
                        case 'search':
                            throw '搜索';
                        case 'message':
                            throw '消息';
                        case 'manga':
                            throw ['漫画', 'mc'];
                        case 'show':
                            throw '会员购';
                        case 'member':
                            throw '创作中心';
                        case 'account':
                            throw '个人中心';
                        case 'biligame':
                            throw '游戏中心';
                    }
                })
            } catch (err) {
                throw err;
            }

            let set = [false, false];
            piece.forEach(k => {
                switch (k) {
                    case 'video':
                        throw ['视频', link(url, ['av', 'bv'])];
                    case 'read':
                        throw ['专栏', link(url, 'cv')];
                    case 'bangumi':
                        throw ['番剧', link(url, ['ep', 'ss', 'md'])];
                    case 'cheese':
                        throw '课堂';
                    case 'blackboard':
                        throw '活动';
                    case 'topic':
                        throw '话题';
                    case 'popular':
                        throw '排行榜';
                    case 'history':
                        throw '历史记录';
                    case 'judgement':
                        throw '风纪委员会';
                    case 'blackroom':
                        throw '小黑屋';
                    case 'v':
                        set[0] = true;
                        break;
                    case 'account':
                        set[1] = true;
                        break;
                    case 'audio':
                        throw ['音频', link(url, 'au')];
                }
            })

        } catch (err) {
            return err;
        }


        function link(str, key, call) {
            if (str) {
                let reg = /[?].*/;
                // let para = reg.exec(str)[0].slice(1)
                str = str.replace(reg, '').toLowerCase().split('/');
                key = typeof key == 'object' ? key : [key];
                try {
                    key.forEach(k => {
                        k = k.toLowerCase();
                        /* 反向循环，避免域名同名 */
                        for (let i = str.length - 1; i >= 0; i--) {
                            if (!str[i].indexOf(k)) {
                                throw [k, str[i].replace(k, '')]
                            }
                        }
                    })
                } catch (err) {
                    return err;
                }
            } else {
                if (call) {
                    return call;
                }
            }
        }
    }

    // ajax
    function get_json(url, data, call, para) {
        $.ajax({
            url: url,
            data: data,
            success: rst => {
                call(rst, para)
            },
            error: err => {
                console.log(err);
            }
        })
    }

    // 简单数据同步
    function sync(data_1, data_2, lss) {
        let temp = {
            ...data_1,
            ...data_2
        }
        // console.log(temp);
        localStorage.setItem(lss, JSON.stringify(temp));
        console.log('%c数据更改', 'color:red')
        return temp
    }
    //#endregion

    //#region  页面计时
    window.global_timer = null;
    window.interval = 200;
    window.saveInterval = 10;
    window.storageKeySet = ['docLoaded_forBL', 'visitTime_forBL', 'currentDate_forBL']
    window.currentTime = CDT[1]
    // 临时数据存储，用于减轻存取压力同时提升精度
    window.temp_data = {};
    window.temp_step = 0;

    function timer_start() {
        window.global_timer = setInterval(() => {
            tTime_build();
            temp_step++;
            switch (temp_step % 100) {
                case 0:
                    // console.clear();
                    break;
                default:
                    if (!(temp_step % 10)) {
                        console.log(temp_data, temp_step);
                        localStorage.setItem(storageKeySet[1], JSON.stringify(temp_data))
                        if (temp_step % 100 >= 70) {
                            console.warn(`控制台还剩${(100 - temp_step % 100) / 10}秒清空`);
                        }
                    }
                    break;
            }
        }, interval);

        // 用于建立、更新时长数据
        function tDate_build() {
            if (!temp_data[window.currentTime[0]]) {
                temp_data[window.currentTime[0]] = {}
            }
        }
        function tTime_build() {
            window.currentTime = CDT(1);
            let local = localStorage.getItem(storageKeySet[1]);
            if (local && local.length > 3) {
                local = JSON.parse(local);
            } else {
                local = {}
            }
            if (temp_data[window.currentTime[0]]?.[pageType]) {
                temp_data[window.currentTime[0]][pageType].duration = local[window.currentTime[0]][pageType].duration + interval
                temp_data[window.currentTime[0]][pageType].leave = CDT();
                _sync()
            } else {
                tDate_build();
                temp_data[window.currentTime[0]][pageType] = {
                    enter: CDT(),
                    leave: CDT(),
                    duration: interval
                }
                _sync()
                localStorage.setItem(storageKeySet[1], JSON.stringify(temp_data))
            }

            function _sync() {
                temp_data[window.currentTime[0]] = {
                    ...local[window.currentTime[0]],
                    ...temp_data[window.currentTime[0]]
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
            let raw = localStorage.getItem(storageKeySet[1]);
            if (raw && raw.length > 3) {
                temp_data = JSON.parse(raw);
            }
            timer_start();
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
            try {
                if (Object.keys(ns[window.currentTime[0]]).length != Object.keys(temp_data[window.currentTime[0]]).length) {
                    sync(temp_data, ns, storageKeySet[1])
                }
            } catch (err) {
                console.error(err, ns);
            }
        }
    })
    //#endregion

    //#region 在SS页面下获取ep_id
    // / 数据容器 /
    // 视频信息
    let animation = {};
    const local = localStorage.getItem('bLog_ani');
    if (local) {
        animation = JSON.parse(local);
    }

    function GetEp(epi) {
        // console.log(epi);
        get_json(apis[3], {
            ep_id: epi[2]
        }, compare, epi);
    }

    // / 函数库 /
    function _tc() {
        /* 
         * 当无法筛选出当前选项的a元素
         * 页面为ep/ss时
         * 作为最后的筛选方法
         */
        console.log(pageInfo);
        const as = $('a').get(),
            tit = document.title;
        let set = {},
            crt_tit = ''
        as.forEach((e, i) => {
            const _r = choose_links([e, 'ep']);
            if (_r) {
                set[_r] = as[i];
            }
        })

        if (!pageInfo[1][0] == 'ep') {
            for (let k in set) {
                if (k == pageInfo[1][1]) {
                    set = {
                        [k]: set [k]
                    }
                }
            }
        } else {
            for (let k in set) {
                if ($(set[k]).children('span')[0]) {
                    const _t = $(set[k]).children('span').attr('title') || $(set[k]).children('span').text();
                    if (tit.indexOf(_t) != -1) {
                        set = {
                            [k]: set [k]
                        }
                        break;
                    }
                }
            }
        }

        set = [Object.keys(set)[0], set[Object.keys(set)]]
        $(set[1].parentNode.parentNode).children(set[1].parentNode.tagName).get().forEach((e, i) => {
            e.dataset.epIndex = i;
        })

        console.log([set[1], set[1].parentNode.dataset.epIndex, set[0]]);
        return [set[1], set[1].parentNode.dataset.epIndex, set[0]];
    }

    function choose_links(arg) {
        const elem = arg[0],
            key = arg[1];
        let t = false,
            a = elem.href.split('/');
        a.forEach(e => {
            if (!e.indexOf(key)) {
                t = e.slice(key.length).replace(/\?.*/, '')
            }
        })
        return t;
    }

    function get_epId(callBack, ext) {
        try {
            if (ext[1][0] == 'ep') {
                let elem = null,
                    index = null;
                let table = [
                    ['a', 'div.numberListItem_select__ar1X5'],
                    ['a', 'li.epitem_cursor__gOquw']
                ]
                table.forEach(e => {
                    if ($(e[1])[0]) {
                        let ele = $(e[1]).children(e[0])[0];
                        if (ele.href.indexOf(ext[1][1])) {
                            elem = ele;
                        }

                    }
                })
                let inner = elem.parentNode.title || elem.innerText.replace(/[\n].*/g, '').replace(/ /g, '');
                if (Number(inner) == inner) {
                    index = inner - 1;
                }
                $(elem.parentNode.parentNode).children(elem.parentNode.tagName).get().forEach((e, i) => {
                    e.dataset.epIndex = i;
                })
                if (elem.parentNode.dataset.epIndex != index) {
                    index = elem.parentNode.dataset.epIndex;
                }
                const rst = [elem, index, ext[1][1]]
                callBack && callBack(rst)
                return rst;
            } else if (ext[1][0] == 'md') {
                console.log('md号');
            } else {
                let classTable = {
                    crt: {},
                    par: {},
                    rst: ''
                };
                let classArr = []
                $('a').get().forEach(e => {
                    // let current = null;
                    if (e.href.indexOf('play/ep') != -1) {
                        class_sum('crt', e.className, e)
                        class_sum('par', e.parentNode.className, e)
                    }
                })

                function class_sum(node, d, e) {
                    if (!classTable[node]?.[d]) {
                        classTable[node][d] = [1, e];
                    } else {
                        classTable[node][d][0]++;
                    }
                }

                function get_only(node) {
                    for (let k in classTable[node]) {
                        let c = classTable[node][k];
                        if (c[0] == 1) {
                            let elem = c[1];
                            if (classArr[classArr.length - 2] != elem) {
                                classArr[classArr.length] = elem;
                            }
                        }
                    }
                }

                function s_par(elem, label = [elem.tagName], call) {
                    // 获取同级
                    // console.log('第' + label.length + '层');

                    let t = ''
                    for (let i = label.length - 1; i >= 0; i--) {
                        t += label[i] + '>';
                    }
                    t = t.slice(0, t.length - 1)
                    // const ep = $(elem).siblings(elem.tagName).get();
                    const ep = $(elem).parent().children(elem.tagName).get();
                    let ce = []
                    if (ep.length <= 1) {
                        if (label.length <= 10 && elem.tagName != 'HTML') {
                            label[label.length] = elem.parentNode.tagName;
                            return s_par(elem.parentNode, label)
                        } else {
                            return false;
                        }
                    } else {
                        let ca = {}
                        t = t.split('>')
                        t.shift();
                        ep.forEach((e, i) => {
                            let c = e.id || e.className;
                            if (ca[c]) {
                                ca[c][0]++;
                            } else {
                                ca[c] = [0, e]
                            }
                            e.dataset.ep_index = i;
                        })
                        for (let k in ca) {
                            if (ca[k][0] == 0) {
                                ce[ce.length] = $(ca[k][1]).children(t)[0];
                            }
                        }
                        if (ce.length >= 1) {
                            ce.forEach(e => {
                                if (e.href.indexOf('play/ep') != -1) {
                                    ce[ce.length] = e;
                                }
                            })
                            if (merge(ce)) {
                                ce = ce[0];
                            } else {
                                throw '无法筛选出ep号 s_par(1)'
                            }
                        } else if (merge(ce)) {
                            ce = ce[0];
                        } else {
                            throw '无法筛选出ep号 s_par(2)'
                        }

                        let par_q = ''
                        if (t.length >= 1) {
                            t.forEach(e => {
                                par_q += '.parentNode'
                            })
                        }
                        let ci = ''
                        eval(`ci=ce${par_q}`)
                        ce = [ce, ci.dataset.ep_index];
                        call && call(ce)
                        return ce
                    }

                }

                function merge(arr) {
                    let allSame = arr.length ? arr[0] : false;
                    try {
                        $(arr).forEach((e, i) => {
                            if (i == 1 && e.is(arr[i - 1])) {
                                allSame = e;
                            } else {
                                allSame = false;
                                throw false;
                            }
                        })
                    } finally {
                        // console.log(allSame);
                        return allSame;
                    }

                }

                get_only('par')
                get_only('crt')
                let epId = '';

                function get_links(elem, key) {
                    let t = choose_links(arguments)
                    if (t) {
                        classTable.rst = s_par(elem);
                        // console.log(elem, classTable.rst);
                        if ($(elem).is($(classTable.rst[0]))) {
                            epId = t;
                        } else {
                            // throw '获取EP号失败 get_links(1)'
                        }
                        return t;
                    } else {
                        return false;
                    }
                }

                if (merge(classArr)) {
                    epId = get_links(classArr[0], 'ep');
                } else {
                    let t = [],
                        l = []
                    classArr.forEach(e => {
                        l = get_links(e, 'ep');
                        if (l) {
                            t[t.length] = l;
                        }
                    })

                    if (!l.length) {
                        throw '获取EP号失败 (2)'
                    } else if (l.length > 1) {
                        throw '过多的EP号 (3)'
                    } else {
                        epId = l[0];
                    }
                }
                classTable.rst[2] = epId
                console.log(classTable);
                callBack && callBack(classTable.rst)
                return classTable.rst;
            }
        } catch (err) {
            console.error(err);
            let last = _tc()
            callBack && callBack(last)
        }
    }

    // 提取标题信息用于匹配
    let tarr = [];

    function get_titles(rst) {
        tarr = [];
        // 正片部分
        let r1 = rst.result.episodes;
        for (let k of r1.keys()) {
            // text = r1[k].long_title;
            get_title(r1[k], k)
        }

        let r3 = rst.result.section;
        for (let k of r3.keys()) {
            // console.log(r3[k])
            for (let i of r3[k].episodes.keys()) {
                let r4 = r3[k].episodes[i];
                get_title(r4, [k, i])
            }
        }
        return tarr;
    }

    function get_title(txt, index) {
        let text = ''
        if (txt.report?.ep_title) {
            text = txt.report?.ep_title;
            // console.log(00000000)
        } else if (txt.title && txt.long_title) {
            text = txt.title + ' ' + txt.long_title;
            // console.log(11111111)
        } else if (txt.share_copy) {
            text = txt.share_copy.replace(/《[^《》]*》/, '');
            // console.log(22222222)
        } else {
            text = txt.title;
            // console.log(33333333)
        }
        if (text == '') {
            console.error(txt)
            // console.log(444444444)
        }
        text = text.replace(/\s{2,}|\t/g, ' ');
        if (index != undefined) {
            tarr[tarr.length] = [text, index];
        }
        return text;
    }

    function compare(json, epi) {
        let epIndex = epi[1];
        let t1 = $(epi[0]).children('span').attr('title') || epi[0].children('span').text() || epi[0].innerText.replace(/[\n].*/g, '').replace(/ /g, '');
        let t2 = json.result.episodes[epIndex].title.replace(/ /g, '');
        console.log(t1, t2);
        if (t1 == t2) {
            get_epData(json.result.episodes[epIndex], json.result.episodes[epIndex].title, json);
            console.log('%c数据匹配', 'background:green;color:#eee');
        } else if (t2.length > 1 && (t1.indexOf(t2) != -1 || t2.indexOf(t1) != -1)) {
            console.warn('%c数据应该匹配', 'background:blue;color:#eee');
            get_epData(json.result.episodes[epIndex], json.result.episodes[epIndex].title, json);
        } else {
            console.error('%c数据不匹配', 'background:red;color:#eee');
            let _r = _c();
            console.log(_r);
            if (_r) {
                if (_r[1].length == 1) {
                    let r1 = json.result.episodes[_r[1]];
                    get_epData(r1, _r[0], json);
                } else {
                    let r3 = json.result.section[_r[1][0]].episodes[_r[1][1]];
                    get_epData(r3, _r[0], json);
                }
            } else {
                console.error('未找到');
            }
        }

        function _c() {
            let is_find = false;
            let arr = get_titles(json)
            try {
                arr.forEach(e => {
                    const tit = e[0].replace(/ /g, '');
                    if (t1 == tit) {
                        console.log('找到了');
                        is_find = e
                        throw new error(true)
                    } else if (t1.indexOf(tit) != -1 || tit.indexOf(t1) != -1) {
                        console.warn('应该是找到了');
                        is_find = e
                        throw new error(true)
                    }
                })
            } finally {
                return is_find;
            }
        }
    }

    function get_epData(json, title, origin) {
        if (!title) {
            title = get_title(json);
        }
        origin = origin.result;
        let upi = origin.up_info;
        let ss = ['ss_' + origin.season_id];
        let ani = {}
        let video_info = {
            toggle_times: 0,
            title: [title, json.title, json.long_title],
            badge: json.badge,
            duration: json.duration,
            dimension: json.dimension,
            id: [json.aid, json.bvid, json.cid],
            skip: json.skip,
        }
        if (!animation[ss]) {
            ani = {
                [ss]: {
                    name: origin.season_title || origin.title,
                    staff: origin.staff,
                    stat: origin.stat,
                    styles: origin.styles,
                    total: origin.total,
                    history: [video_info],
                    subtitle: json.subtitle,
                    up: upi.mid
                },
                ['mid_' + upi.mid]: {
                    face: upi.avatar,
                    uname: upi.uname,
                    follower: upi.follower,
                    vip: upi.vip_label.text,
                    is_follow: upi.is_follow
                }
            }
        } else {
            let hist = animation[ss].history;
            let visited = false;
            try {
                hist.forEach((e, i) => {
                    if (e.id[1] == video_info.id[1]) {
                        visited = true;
                        animation[ss].history[i].toggle_times++;
                        throw ''
                    }
                })
            } catch {} finally {
                if (!visited) {
                    animation[ss].history[animation[ss].history.length] = video_info;
                }
            }
        }

        sync(animation, ani, 'bLog_ani');
        return video_info;
    }
    //#endregion

})()

String.prototype.url = function(startIndex) {
    return 'http://' + this;
};