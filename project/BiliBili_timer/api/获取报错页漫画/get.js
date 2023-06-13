function getErrManga() {
    // 存储图片的容器
    let linkSet = [];
    // 图片与库中图片连续重复的次数
    let repeatTime = 0;
    getImgSrc()

    function getImgSrc() {
        // 获取图片链接
        let src = $('.error-manga>img')[0].src.replace('https://i0.hdslb.com/bfs/activity-plat/static/', '');
        try {
            switch (linkSet.length) {
                case 0:
                    linkSet[0] = src;
                    throw 1;
                default:
                    let different = true;
                    linkSet.forEach(link => {
                        link == src ? (function () {
                            repeatTime++;
                            console.log('重复次数 +1', linkSet);
                            if (repeatTime >= 100) {
                                // 当连续重复次数大于100，结束脚本
                                throw 2;
                            }
                            different = false;
                            throw 0;
                        }()) : null;
                    })

                    if (different) {``
                        linkSet[linkSet.length] = src;
                        throw 1;
                    }
                    break;
            }
        } catch (msg) {
            switch (msg) {
                case 0:
                case 1:
                    $('.change-img-btn')[0].click();
                    setTimeout(() => {
                        getImgSrc();
                    }, 100);
                    break;
                case 2:
                    console.log('%c程序结束', 'color:#eee;background:orange', linkSet);
                    break;
            }
        } finally {

        }
    }
}
getErrManga()