function call() {
    tip('此套笔记的第一原则：写给自己，第二原则：别人能看懂，第三原则：难以讲好的地方最多会抛砖引玉地浅出而不会深入', 1);
    tip('考虑到服务器带宽及容量问题，所有的视频一律采用 av1.1080p.无音轨.12fps', 2);
    tip('部分浏览器不支持av1编码, 请移步 Chrome', 3)
    $('head').append('<link rel="stylesheet" href="/notes/rsc/item/Ajax/rsc/CSS/page_style.css">');
    add_title('unity 同步笔记', [
        ['addClass', 'black'],
        ['label', 'h1'],
        ['backgroundColor', 'transparent'],
        ['whiteSpace', 'nowrap'],
        ['font', '800 1.6rem "MicroSoft YaHei"'],
        ['boxShadow', '1px 1px 1rem 0.125rem transparent'],
        ['padding', '0.6rem 0 0.6rem 0'],
        ['borderRadius', '64px 0 0 64px'],
        ['margin', '1rem -0.6rem 0.4rem 12rem'],
        ['transition', 'all 0.4s'],
    ]);

    add_req('UGUI 部分:');
    add_req('循环图片', 'Unity0000');
    add_req('Mask', 'Unity0001');
    add_req('UI布局', 'Unity0002');
    add_req('Text组件', 'Unity0003');
    add_req('Slider滑动条_|_Toggle复选框', 'Unity0004');
    add_req('InputFiled输入栏', 'Unity0005');
    add_req('Input输入', 'Unity0006');
    add_req('常规部分');
    add_req('事件委托', 'Unity0007')
    add_req('节点操作(删除,显示,隐藏)', 'Unity0008');
    add_req('U2D <i>暂停更新</i>');
    add_req('2D物理', 'U2D/U2D_0001');
    add_req('2D碰撞检测', 'Collision/Collision_0001');
    add_req('U3D');
    add_req('3D物理', 'U3D/U3D_0001');
    SL();
    add_req('<span>疑难</span><del>杂症</del>');
    add_req('RectTransform中Anchor锚点的作用?', 'Unity_stretch');
    add_req('如何给复杂的地形添加Collider?', 'Unity_terrain_mesh');
    add_req('public属性面板太单调?如何扩展?', "Unity_InspectorExt");
    add_req('扩展编辑器?', "Unity_EditorExtension");
    add_req('自制脚本');
    add_req('帧动画播放脚本', "Fn/F_Frame_anim");
    add_req('外部插件');
    add_req('DynamicBone 动态骨骼插件', 'null');
    add_req('PostProcessing 渲染插件', 'null');
}