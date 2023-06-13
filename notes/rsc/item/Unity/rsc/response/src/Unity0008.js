function call() {} {
    let dir = 'src/Unity0008/';
    LM('节点操作');
    SM('删除、显示、隐藏');
    video_fn(dir + 'U_Node_operate.mp4', '70%');

    tip('所有的鼠标事件响应的坐标都是以屏幕的左下为原点建立的象限', 2);
    ajax_fn(dir + 'Node_operate.txt', 'Node_operate.cs 代码');
}