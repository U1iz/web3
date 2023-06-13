function call() {} {
    let dir = 'src/Unity0002/';
    LM('Grid Layout');
    form_ini_01();
    SL('4rem');
    LM('UGUI 布局 (垂直)');
    video({
        fullPath: dir + 'video/U0000.mp4',
        width: '60%'
    });
    SL();
    SM('一. 在 Canvas 节点下创建 空对象, 我这里命名成了 Layout');
    SM('在 Layout 下可放置多个UI对象');
    img({
        fullPath: dir + 'img/U0001.png',
        width: '50%'
    });
    SM('二. 为 layout 添加 “Vertical Layout Group” 组件');
    tip('padding 的用法与 css 完全一致, 即内间距');
    img({
        fullPath: dir + 'img/U0000.png',
        width: '50%'
    });
    SL('6rem', '8rem');
    LM('UGUI 布局 (水平)');
    video({
        fullPath: dir + 'video/U0001.mp4',
        width: '60%'
    });

    SM('使用方法同上');
    video({
        fullPath: dir + 'video/U0001.mp4',
        width: '60%'
    });
    SL('6rem', '8rem');

    LM('Grid 多行 布局');
    video({
        fullPath: dir + 'video/U0002.mp4',
        width: '60%'
    });
    SL();
    SM('为 Layout 添加 “Grid Layout Group” 组件');
    img({
        fullPath: dir + 'img/U0002.png',
        width: '50%'
    });

    lst('Fixed Column Count 固定行数', [111, 'disc', 2]);
    lst('Fixed Row Count 固定列数', [0, 'disc', 2]);
    video({
        fullPath: dir + 'video/U0003.mp4',
        width: '60%'
    });

    SL('6rem');
}