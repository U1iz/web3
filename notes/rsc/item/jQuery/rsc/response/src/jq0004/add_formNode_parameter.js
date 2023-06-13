var win_w = document.body.clientWidth;
var win_h = document.body.clientHeight;

// Initialization

function form_ini_00() {
    let obj = new Object();
    obj.ctrSize = ['100%'];
    obj.setTitLabelType = 'all';
    obj.titLabel = 'h2';
    obj.setTexLabelType = 'all';
    obj.texLabel = 'h3';
    obj.setLabelType = 'part';
    obj.sLl_00 = ['0', 'h3,h3,h3'];
    obj.setLabel = [obj.sLl_00];
    obj.cStyle_0 = ['1', '1,1', 'fw', '800'];
    obj.cStyle_1 = ['2', '1,1', 'fw', '800'];
    obj.cStyle_2 = ['3', '1,1', 'fw', '800'];
    obj.cStyle_3 = ['4', '1,1', 'fw', '800'];
    obj.cStyle = [obj.cStyle_0, obj.cStyle_1, obj.cStyle_2, obj.cStyle_3];
    obj.globalStyle_0 = ['1', '1', [2, 4, 3.2, 3.2], '1', [24]];
    obj.boxShadow = ['1px', '1px', '16px', '2px', '#6666666f'];
    // 写入内容
    obj.c0 = ['用途', '名称'];
    obj.c1 = ['显示隐藏', 'show()</br>hide()</br>toggle()'];
    obj.c2 = ['滑动', 'slideDown()</br>slideUp()</br>slideToggle()'];
    obj.c3 = ['淡入淡出',
        `fadeIn()
    fadeOut()
    fadeToggle()
    fadeTo()`
    ];
    obj.c4 = ['自定义动画', 'animate()'];

    obj.contents = [obj.c1, obj.c2, obj.c3, obj.c4];

    // 写入tr容器属性
    obj.trStyle_0 = ['t', 'bgc', 'rgba(236, 144, 38, 0.6)'];
    obj.trStyle_1 = ['t', 'c', '#233'];
    obj.trStyle_2 = ['1', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_3 = ['2', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_4 = ['3', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_5 = ['4', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle = [obj.trStyle_0, obj.trStyle_1, obj.trStyle_2, obj.trStyle_3, obj.trStyle_4, obj.trStyle_5];

    add_formNode(obj);
}