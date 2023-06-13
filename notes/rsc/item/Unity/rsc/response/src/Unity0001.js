function call() {} {
    let dir = 'src/Unity0001/';
    LM('Mask 遮罩');
    SM('效果');
    video({
        fullPath: dir + 'video/U0000.mp4'
    });
    SL();
    SM('一. 创建空 Canvas 对象');
    lst('在 Canvas 下创建空节点, 我这里命名成了 Mask', [111, 'demical', 2]);
    lst('在 Mask节点下创建 img', [0, 'demical', 2]);
    img({
        fullPath: dir + 'img/U0000.png',
        width: '40%'
    });
    img({
        fullPath: dir + 'img/U0001.png',
        width: '40%'
    });
    SM('此时的效果');
    tip('Mask 节点的宽高就是将要显示的内容大小');
    img({
        fullPath: dir + 'img/U0003.png',
        width: '60%'
    });
    SM('二. 为 Mask节点 添加 Rect Mask 2D 组件');
    img({
        fullPath: dir + 'img/U0002.png',
        width: '40%'
    });
    SM('此时的效果');

    img({
        fullPath: dir + 'img/U0004.png',
        width: '60%'
    });


    SL('6rem', '8rem');
    LM('图片 Mask');
    SM('效果');
    img({
        fullPath: dir + 'img/U0005.png',
        width: '60%'
    });
    SM('一. 在 Canvas 节点下创建 Img 节点, 我这里命名成了 Img_Mask');
    SM('二. 在 Img_Mask 节点下创建 img UI, 并拖入图片（步骤同上）');
    tip('图片必须是 png 格式, 且需要将 Texture 设为 Sprite (2D and UI)');
    img({
        fullPath: dir + 'img/U0006.png',
        width: '60%'
    });
    SM('三. 为 Img_Mask 节点添加 Mask 组件');
    img({
        fullPath: dir + 'img/U0007.png',
        width: '60%'
    });
}