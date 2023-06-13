// const url = location.href;
const url = [
    'https://www.bilibili.com/video/BV1NL411R757/',
    'https://www.bilibili.com/read/cv22968840?from=search&spm_id_from=..0.0',
    'https://www.bilibili.com/bangumi/play/ss38693',
    'https://www.bilibili.com/bangumi/play/ep702596',
    'https://www.bilibili.com/bangumi/media/md28234382',

    'https://account.bilibili.com/account/home',
    'https://search.bilibili.com/article?keyword=%E6%96%B0',
    'https://member.bilibili.com/platform/upload/video/frame',
    'https://t.bilibili.com/',
    'https://message.bilibili.com/#/reply',
    'https://live.bilibili.com/27088194?live_from=85002',
    'https://manga.bilibili.com/detail/mc28176',
    'https://show.bilibili.com/platform/home.html?spm_id_from=..0.0',
    'https://www.biligame.com/detail/?id=105667&sourceFrom=2000040011&spm_id_from=333.337.0.0',

    'https://www.bilibili.com/cheese/play/ss1459?',
    'https://www.bilibili.com/blackboard/activity-6uXJus95Fh.html?spm_id_from=..0.0',
    'https://www.bilibili.com/blackroom/ban',

    'https://www.bilibili.com/account/history',
    'https://www.bilibili.com/judgement/index?spm_id_from=888.58624.b_4d394447385570426a4f74.6',

    'https://www.bilibili.com/v/popular/rank/all/?spm_id_from=..0.0',
    'https://www.bilibili.com/v/topic/detail/?topic_id=1029203',
    'https://www.bilibili.com/audio/au6'
]

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

let au = [],
    bu = []


url.forEach(e => {
    let piece = e.toLowerCase().split('/');
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
                    throw ['视频', link(e, ['av', 'bv'])];
                case 'read':
                    throw ['专栏', link(e, 'cv')];
                case 'bangumi':
                    throw ['番剧', link(e, ['ep', 'ss', 'md'])];
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
                    throw ['音频', link(e, 'au')];
            }
        })

    } catch (err) {
        au[au.length] = err;
    }
    bu[bu.length] = piece;
})
// console.log(au.length, bu.length, url.length);
console.log(au);
// console.log(bu);
// console.log(url);

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

/*
 *重点记录页面
 * https://www.bilibili.com/video/BV1NL411R757/
 * https://www.bilibili.com/read/cv22968840?from=search&spm_id_from=..0.0
 * https://www.bilibili.com/bangumi/play/ss38693
 * https://www.bilibili.com/bangumi/play/ep702596
 * https://www.bilibili.com/bangumi/media/md28234382
 * 
 * 个人中心
 * https://account.bilibili.com/account/home
 * 搜索页
 * https://search.bilibili.com/article?keyword=%E6%96%B0
 * 投稿页面
 * https://member.bilibili.com/platform/upload/video/frame
 * 动态页
 * https://t.bilibili.com/
 * 消息页
 * https://message.bilibili.com/#/reply
 * 直播
 * https://live.bilibili.com/27088194?live_from=85002
 * 漫画页
 * https://manga.bilibili.com/detail/mc28176
 * 课堂页
 * https://www.bilibili.com/cheese/play/ss1459?
 * 会员购
 * https://show.bilibili.com/platform/home.html?spm_id_from=..0.0
 * 全站排行榜
 * https://www.bilibili.com/v/popular/rank/all/?spm_id_from=..0.0
 * 活动页
 * https://www.bilibili.com/blackboard/activity-6uXJus95Fh.html?spm_id_from=..0.0
 * 历史记录
 * https://www.bilibili.com/account/history
 * 话题页
 * https://www.bilibili.com/v/topic/detail/?topic_id=1029203
 * 游戏
 * https://www.biligame.com/detail/?id=105667&sourceFrom=2000040011&spm_id_from=333.337.0.0
 * 当前在线人数排行
 * https://www.bilibili.com/video/online.html
 * 小黑屋
 * https://www.bilibili.com/blackroom/ban
 */