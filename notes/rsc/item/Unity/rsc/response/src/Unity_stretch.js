function call() {
    let dir = 'src/Unity_stretch/'
    LM('Rect Transform 中的 Anchor锚点 作用');
    lst('Anchors => 锚点');
    lst('Pivot => 支点');
    img({
        fullPath: dir + 'img/U0000.png',
        width: '60%'
    })
    img({
        fullPath: dir + 'img/U0001.png',
        width: '60%'
    })
    img({
        fullPath: dir + 'img/U0002.png',
        width: '60%'
    })
    LM('四点合并, 相对位置');
    SM('当 四个 Anchor值相同时会聚在一起, 可以通过将其放置于某处后 修改 Pivot 的值来达到相对坐标的效果(相对于锚点，锚点又相对于父节点)');
    video({
        fullPath: dir + 'video/U0001.mp4',
        width: '70%'
    });
    video({
        fullPath: dir + 'video/U0002.mp4',
        width: '70%'
    });

    SL('3rem');
    LM('锚点分开, 等比缩放');
    SM('当 四个 Anchor 的值不同时，锚点便会分开');
    lst('当父节点缩放时，子节点便会根据四点相对于父级等比缩放');
    lst('此时的 Pivot 的值则会相对于 左下 的锚点');
    video({
        fullPath: dir + 'video/U0000.mp4',
        width: '70%'
    });
    video({
        fullPath: dir + 'video/U0003.mp4',
        width: '70%'
    });
    SL('6rem');
}