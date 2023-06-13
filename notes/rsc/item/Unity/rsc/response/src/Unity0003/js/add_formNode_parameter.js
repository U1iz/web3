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
    obj.cStyle_4 = ['5', '1,0', 'fw', '800'];
    obj.cStyle_5 = ['6', '1,0', 'fw', '800'];
    obj.cStyle_6 = ['7', '1,0', 'fw', '800'];
    obj.cStyle_7 = ['8', '1,0', 'fw', '800'];
    obj.cStyle_8 = ['9', '1,0', 'fw', '800'];
    obj.cStyle = [obj.cStyle_0, obj.cStyle_1, obj.cStyle_2, obj.cStyle_3, obj.cStyle_4, obj.cStyle_5, obj.cStyle_6, obj.cStyle_7, obj.cStyle_8];
    obj.globalStyle_0 = ['1', '1', [2, 4, 3.2, 3.2], '1', [24]];
    obj.boxShadow = ['1px', '1px', '16px', '2px', '#6666666f'];
    // 写入内容
    obj.c0 = ['成员', '描述'];
    obj.c1 = ['Text', '显示的文本'];
    obj.c2 = ['Font', '使用的文字字体'];
    obj.c3 = ['FontStyle', '字体样式'];
    obj.c4 = ['LineSpacing', '行间距'];
    obj.c5 = ['Alignment', '对齐方式'];
    obj.c6 = ['Horizontal', '水平溢出'];
    obj.c7 = ['Vertical', '竖向溢出'];
    obj.c8 = ['RichText', '多格式文本: \n<div style="line-height: 1.2rem;">&lt;color=red&gt;<span style="color:red;">文本</span>&lt;/color&gt;</div>'];
    obj.c9 = ['Best Fit', '最佳匹配方式\n文字自动适配节点的宽高大小'];

    obj.contents = [obj.c1, obj.c2, obj.c3, obj.c4, obj.c5, obj.c6, obj.c7, obj.c8, obj.c9];

    // 写入tr容器属性
    obj.trStyle_0 = ['t', 'bgc', 'rgba(236, 144, 38, 0.6)'];
    obj.trStyle_1 = ['t', 'c', '#233'];
    obj.trStyle_2 = ['5', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_3 = ['1', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_4 = ['3', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_5 = ['7', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_6 = ['9', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle = [obj.trStyle_0, obj.trStyle_1, obj.trStyle_2, obj.trStyle_3, obj.trStyle_4, obj.trStyle_5, obj.trStyle_6];

    add_formNode(obj);
}