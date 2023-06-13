function call() {} {
    let dir = 'src/Unity0007/';
    LM('事件委托');
    video_fn(dir + 'U_Event_trigger.mp4', '70%');

    tip('所有的鼠标事件响应的坐标都是以屏幕的左下为原点建立的象限', 2);
    ajax_fn(dir + 'Event.txt', 'Event.cs 代码', fn_01);

    function fn_01() {
        ajax_fn(dir + 'Event_another.txt', 'Event_another.cs 代码', fn_02, true);
    }

    function fn_02() {
        LM('如果允许委托在外部访问或修改，但不希望事件在外部触发，可以使用 event修饰');
        ajax_fn(dir + 'Event_1.txt', 'Event.cs 代码', fn_03);
    }

    function fn_03() {
        ajax_fn(dir + 'Event_another_1.txt', 'Event_another.cs 代码', fn_04, true);
    }

    function fn_04() {
        LM("使用自带的 Action 完成事件委托");
        video_fn(dir + 'U_Action_event.mp4', '70%');
        ajax_fn(dir + 'Action_event.txt', 'Action_event.cs 代码', fn_05);
    }

    function fn_05() {
        ajax_fn(dir + 'Action_event_another.txt', 'Action_event_another.cs 代码', false, true);
    }
}