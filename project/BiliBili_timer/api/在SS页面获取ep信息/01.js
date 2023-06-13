// / 数据容器 /
// 视频信息
let animation = {};
const local = localStorage.getItem('bLog_ani');
if (local) {
    animation = JSON.parse(local);
}
// 番剧信息



// / 函数调用 /
get_epId(GET);

function GET(epi) {
    get_json('https://api.bilibili.com/pgc/view/web/season', {
        ep_id: epi[2]
    }, compare);
}


// / 函数库 /

window.get_epId = (callBack) => {
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

    function link(elem, key) {
        let t = '';
        let a = elem.href.split('/');
        a.forEach(e => {
            if (!e.indexOf(key)) {
                t = e.slice(2)
            }
        })
        if (t != '') {
            classTable.rst = s_par(elem);
            // console.log(elem, classTable.rst);
            if ($(elem).is($(classTable.rst[0]))) {
                epId = t;
            } else {
                // throw '获取EP号失败 link(1)'
            }
            return t;
        } else {
            return false;
        }
    }

    get_only('par')
    get_only('crt')
    let epId = '';


    if (merge(classArr)) {
        epId = link(classArr[0], 'ep');
    } else {
        let t = [],
            l = []
        classArr.forEach(e => {
            l = link(e, 'ep');
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


function get_json(url, data, call) {
    console.log(arguments);
    $.ajax({
        url: url,
        data: data,
        success: rst => {
            call(rst)
        },
        error: err => {
            console.log(err);
        }
    })
}

function compare(json) {
    let epIndex = epInfo[1];
    let t1 = epInfo[0].innerText.replace(/[\n].*/g, '').replace(/ /g, '');
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
                tit = e[0].replace(/ /g, '');
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
        title: title,
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
                history: [video_info]
            },
            ['mid_'+upi.mid]: {
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
        } finally {
            if (!visited) {
                animation[ss].history[animation[ss].history.length] = video_info;
            }
        }
    }


    sync(animation, ani, 'bLog_ani');
    return video_info;
}

function sync(data_1, data_2, lss) {
    let temp = {
        ...data_1,
        ...data_2
    }

    localStorage.setItem(lss, JSON.stringify(temp));
    return temp
}