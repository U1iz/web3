window.get_epId = () => {
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

    function s_par(elem, label = [elem.tagName], call) {
        // 获取同级
        console.log('第' + label.length + '层');

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
            let p = s_par(elem);
            console.log(elem, p);
            if ($(elem).is($(p[0]))) {
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
        console.error(err, classArr);
        let t = []
        classArr.forEach(e => {
            let l = link(e, 'ep');
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
    return epId;
}

console.log(get_epId());