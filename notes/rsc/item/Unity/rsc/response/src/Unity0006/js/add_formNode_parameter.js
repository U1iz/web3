var win_w = document.body.clientWidth;
var win_h = document.body.clientHeight;

// Initialization
function form_ini_01() {
    let obj = new Object();
    obj.ctrSize = ['100%'];
    obj.setTitLabelType = 'all';
    obj.titLabel = 'h2';
    obj.setTexLabelType = 'all';
    obj.texLabel = 'h3';
    obj.setLabelType = 'part';
    obj.sLl_00 = ['0', 'h3,h3,h3'];
    obj.setLabel = [obj.sLl_00];
    obj.cStyle_0 = ['1', '1,0', 'fw', '800'];
    obj.cStyle_1 = ['2', '1,0', 'fw', '800'];
    obj.cStyle_2 = ['3', '1,0', 'fw', '800'];
    obj.cStyle_3 = ['4', '1,0', 'fw', '800'];
    obj.cStyle = [obj.cStyle_0, obj.cStyle_1, obj.cStyle_2, obj.cStyle_3];
    obj.globalStyle_0 = ['1', '1', [2, 4, 3.2, 3.2], '1', [24]];
    obj.boxShadow = ['1px', '1px', '16px', '2px', '#6666666f'];
    // 写入内容
    obj.c0 = ['成员', '作用', '触发条件'];
    obj.c1 = ['anyKey', '获取鼠标当前位置', '每帧'];
    obj.c2 = ['anyKeyDown', '判断鼠标按下', '长按及点击,每帧'];
    obj.c3 = ['inputString', '获取用户传入的 ASCII 字符', '长按及点击,每帧'];
    obj.c4 = ['acceleration', '获取重力传感器的值', '每帧'];

    obj.contents = [obj.c1, obj.c2, obj.c3, obj.c4];

    // 写入tr容器属性
    obj.trStyle_0 = ['t', 'bgc', 'rgba(236, 144, 38, 0.6)'];
    obj.trStyle_1 = ['t', 'c', '#233'];
    obj.trStyle_2 = ['5', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_3 = ['1', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_4 = ['3', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle = [obj.trStyle_0, obj.trStyle_1, obj.trStyle_2, obj.trStyle_3, obj.trStyle_4];

    add_formNode(obj);
}

function form_ini_02() {
    let obj = new Object();
    obj.ctrSize = ['100%'];
    obj.setTitLabelType = 'all';
    obj.titLabel = 'h2';
    obj.setTexLabelType = 'all';
    obj.texLabel = 'h3';
    obj.setLabelType = 'part';
    obj.sLl_00 = ['0', 'h3,h3,h3'];
    obj.setLabel = [obj.sLl_00];
    obj.cStyle_0 = ['1', '1,0', 'fw', '800'];
    obj.cStyle_1 = ['2', '1,0', 'fw', '800'];
    obj.cStyle = [obj.cStyle_0, obj.cStyle_1];
    obj.globalStyle_0 = ['1', '1', [2, 4, 3.2, 3.2], '1', [24]];
    obj.boxShadow = ['1px', '1px', '16px', '2px', '#6666666f'];
    // 写入内容
    obj.c0 = ['成员', '作用', '触发条件'];
    obj.c1 = ['getAxis', '获取虚拟轴的值（有插值）', '相应键鼠事件,每帧'];
    obj.c2 = ['getAxisRaw', '获取虚拟轴的值（无插值）', '相应键鼠事件,每帧'];

    obj.contents = [obj.c1, obj.c2];

    // 写入tr容器属性
    obj.trStyle_0 = ['t', 'bgc', 'rgba(236, 144, 38, 0.6)'];
    obj.trStyle_1 = ['t', 'c', '#233'];
    obj.trStyle = [obj.trStyle_0, obj.trStyle_1];

    add_formNode(obj);
}