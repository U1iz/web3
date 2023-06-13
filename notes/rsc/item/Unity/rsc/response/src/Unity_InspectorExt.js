function call() {
    let dir = 'src/Unity_InspectorExt/'
    LM('挖坑页面');
    SM('可参考的博客');
    link('这位作者是位大佬', 'https://zhuanlan.zhihu.com/p/27294281?utm_id=0');
    link('Unity编辑器扩展', 'https://blog.csdn.net/such_so/article/details/119823337');
    link('【参考页面】unity Inspector 面板扩展', 'https://blog.csdn.net/weixin_45023328/article/details/116712189');
    img_fn(dir + 'Unity_InspectorExt_Test.png', '70%');
    ajax_fn(dir + 'Player.txt', 'Player 需要添加的组件', fn_01)

    function fn_01() {
        ajax_fn(dir + 'PlayerInspector.txt', 'PlayerInspector')
    }
}