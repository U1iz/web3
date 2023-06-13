function call() {} {
    let dir = 'src/Unity0006/';
    LM('Input 输入');
    SM('Input 主要事件');
    tip('所有的鼠标事件响应的坐标都是以屏幕的左下为原点建立的象限', 2);
    form_ini_01();
    ajax_fn(dir + 'InputEvent.txt', 'InputEvent 代码', fn_01);

    function fn_01() {
        SM('虚拟轴');
        lst('通过 Edit => Project Settings =. Input Manager 打开虚拟轴设置页面');
        lst('虚拟轴可以通过增加 Size 后自定义');
        img_fn(dir + 'img/U0000.png', '20%');
        img_fn(dir + 'img/U0002.png', '80%');
        SM('键鼠虚拟轴');
        form_ini_02();
        lst('获取鼠标在x轴上距离上一帧鼠标X轴的距离');
        cSharp(`float[] mouse = new float[2];
mouse[0] = Input.GetAxis("Mouse X");
mouse[1] = Input.GetAxis("Mouse Y");
Debug.Log("鼠标在X轴距离上一帧的位置偏离了 " + mouse[0] + "\\n" + "Y轴偏离了" + mouse[1]);`);
        img_fn(dir + 'img/U0004.png', '40%')
        SL('4rem');
        SM('获取左右方向虚拟轴 Horizontal');
        lst('有插值 GetAxis');
        video_fn(dir + 'video/U_GetAxis.mp4', '60%');
        lst('无插值 GetAxisRaw');
        video_fn(dir + 'video/U_GetAxisRaw.mp4', '60%');
        ajax_fn(dir + 'InputEvent_part02.txt', 'InputEvent_part02 代码', fn_02);
    }

    function fn_02() {
        SM('虚拟按钮');
        ajax_fn(dir + 'InputEvent_part03.txt', 'InputEvent_part03 代码', fn_03);
    }

    function fn_03() {
        SM('键鼠事件');
        ajax_fn(dir + 'InputEvent_part04.txt', 'InputEvent_part04 代码');
    }
}