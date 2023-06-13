rst = rst.data;
account = {
    // https://api.bilibili.com/x/space/wbi/acc/info
    name: rst.name,
    mid: rst.mid,
    sex: rst.sex,
    sign: rst.sign,
    level: rst.level,
    vip: rst.vip.label.text,

    official: rst.official.title,
    is_followed: rst.is_followed,

    face: rst.face,

    // https://api.bilibili.com/x/relation/stat
    following: rst.following,
    follower: rst.follower
}

console.log(account);

rst = rst.data.replies[0];
replies = [{
    // https://api.bilibili.com/x/v2/reply/main
    content: rst.content.message,
    ctime: rst.ctime,
    like: rst.like,
    name: rst.member.uname,
    mid: rst.member.mid,
    sex: rst.member.sex,
    sign: rst.member.sign,
    avatar: rst.member.avatar,
    level: rst.member.level_info.current_level,
    vip: rst.member.vip.label.text,
}]

console.log(replies);

// 视频tags

// https://api.bilibili.com/x/web-interface/view/detail/tag
rst = rst.data
let tags = []
rst.forEach(e => {
    let t = e.tag_name;
    t ? (() => {
        tags[tags.length] = t;
    })() : null;
})

// 视频信息
rst = rst.data
delete rst.stat.aid;
data = {
    // https://api.bilibili.com/x/web-interface/view
    pic: rst.pic,
    desc: rst.desc,
    dynamic: rst.dynamic,
    stat: rst.stat,
    first_frame: rst.pages[0].first_frame,

    duration: rst.duration,
    dimension: rst.dimension,

    pubdate: rst.pubdate,
    ctime: rst.ctime,
    id: [rst.aid, rst.bvid, rst.cid]
}

console.log(data);




// https://api.bilibili.com/pgc/web/season/stat
info = {
    stat: rst.result
}


rst = rst.result.media;
info = {
    // https://api.bilibili.com/pgc/review/user
    cover: rst.cover,
    area: rst.areas.name,
    type: rst.type_name,


    media_id: rst.media_id
}



let classTable = {
    crt: {},
    par: {}
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

function par(elem, label = [elem.tagName]) {
    // 获取同级
    console.log('第' + label.length + '层');
    console.log(arguments);

    let t = ''
    for (let i = label.length - 1; i >= 0; i--) {
        t += label[i] + '>';
    }
    t = t.slice(0, t.length - 1)
    const ep = $(elem).siblings(elem.tagName).get();
    let ce = []
    if (ep.length <= 1) {
        if (label.length <= 10 && elem.tagName != 'HTML') {
            label[label.length] = elem.parentNode.tagName;
            par(elem.parentNode, label)
        } else {
            return false;
        }
    } else {
        let ca = {}
        ep.forEach(e => {
            let c = e.className;
            if (ca[c]) {
                ca[c][0]++;
            } else {
                ca[c] = [0, e]
            }
        })
        for (let k in ca) {
            if (ca[k][0] == 0) {
                t = t.split('>')
                t.shift();

                ce[ce.length] = $(ca[k][1]).children(t)[0];
            }
        }
        if (ce.length == 1) {
            ce = ce[0]
        }
        return ce;
    }
}

function link(l, key) {
    let t = '';
    let a = l.split('/');
    a.forEach(e => {
        if (!e.indexOf(key)) {
            t = e.slice(2)
        }
    })
    if (t != '') {
        let ps = par();
        return t;
    } else {
        return false;
    }
}

get_only('par')
get_only('crt')
let epId = '';
try {
    if (!classArr.length || classArr.length > 1) {
        throw '未成功获取到 EP号';
    } else {
        epId = link(classArr[0].href, 'ep');
    }
} catch (err) {
    console.error(err, classArr);
    let t = []
    classArr.forEach(e => {
        let l = link(e.href, 'ep');
        if (l) {
            t[t.length] = l;
        }
    })

    if (!l.length) {
        throw '获取EP号失败'
    } else if (l.length > 1) {
        throw '过多的EP号'
    } else {
        epId = l[0];
    }
}


console.log(epId);



a = {
    "crt_id": {},
    "crt": {
        "message-inner-list__item": 1,
        "": 211
    },
    "par_id": {},
    "par": {
        "message-inner-list": 1,
        "": 106,
        "numberListItem_number_list_item__wszA4": 27,
        "epitem_ep_item__CPdZy": 76,
        "epitem_ep_item__CPdZy epitem_cursor__gOquw": 1,
        "message-entry": 1
    }
}

video_info = {
    title: '',
    badge: rst.badge,
    duration: rst.duration,
    dimension: rst.dimension,
    id: [rst.aid, rst.bvid, rst.cid],
    skip: rst.skip,
}