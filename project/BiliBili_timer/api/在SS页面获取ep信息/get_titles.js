// 提取标题信息用于匹配
function get_titles(rst) {
    let tarr = [];
    // 正片部分
    let r1 = rst.result.episodes;
    for (let k of r1.keys()) {
        // text = r1[k].long_title;
        get_title(r1[k])
    }

    let r3 = rst.result.section;
    for (let k of r3.keys()) {
        // console.log(r3[k])
        for (let i of r3[k].episodes.keys()) {
            let r4 = r3[k].episodes[i];
            get_title(r4)
        }
    }

    function get_title(txt) {
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
        tarr[tarr.length] = text;
        return text;
    }

    console.log(tarr)
}