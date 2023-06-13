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

    let au = [],
        bu = []


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

get_pageType()