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
    obj.cStyle_0 = ['1', '1,1,0', 'fw', '800'];
    obj.cStyle_1 = ['2', '1,1,0', 'fw', '800'];
    obj.cStyle = [obj.cStyle_0, obj.cStyle_1, obj.cStyle_2, obj.cStyle_3];
    obj.globalStyle_0 = ['1', '1', [2, 4, 3.2, 3.2], '1', [24]];
    obj.boxShadow = ['1px', '1px', '16px', '2px', '#6666666f'];
    // 写入内容
    obj.c0 = ['名称', '用法', '描述'];
    obj.c1 = ['子代选择器', '$("ul>li")', '使用>号，只获取亲儿子层级的元素；注意，不会获取孙子层级的元素'];
    obj.c2 = ['后代选择器', '$("ul li")', '使用空格，代表后代选择器，获取ul下的所有li元素，包括孙子等'];

    obj.contents = [obj.c1, obj.c2];

    // 写入tr容器属性
    obj.trStyle_0 = ['t', 'bgc', 'rgba(236, 144, 38, 0.6)'];
    obj.trStyle_1 = ['t', 'c', '#233'];
    obj.trStyle_2 = ['2', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_3 = ['1', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle = [obj.trStyle_0, obj.trStyle_1, obj.trStyle_2, obj.trStyle_3];

    add_formNode(obj);
}

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
    obj.cStyle_0 = ['1', '1,1,0', 'fw', '800'];
    obj.cStyle_1 = ['2', '1,1,0', 'fw', '800'];
    obj.cStyle_2 = ['3', '1,1,0', 'fw', '800'];
    obj.cStyle_3 = ['4', '1,1,0', 'fw', '800'];
    obj.cStyle_4 = ['5', '1,1,0', 'fw', '800'];
    obj.cStyle = [obj.cStyle_0, obj.cStyle_1, obj.cStyle_2, obj.cStyle_3, obj.cStyle_4];
    obj.globalStyle_0 = ['1', '1', [2, 4, 3.2, 3.2], '1', [24]];
    obj.boxShadow = ['1px', '1px', '16px', '2px', '#6666666f'];
    // 写入内容
    obj.c0 = ['语法', '用法', '描述'];
    obj.c1 = [':first', '$("elem:first")', '获取第一个elem'];
    obj.c2 = [':last', '$("elem:last")', '获取最后一个元素'];
    obj.c3 = [':eq(index)', '$("elem:eq(2)")', '获取到的元素中，选择第3个元素'];
    obj.c4 = [':odd', '$("elem:odd")', '获取到的元素中，选择索引号为奇数的元素'];
    obj.c5 = [':even', '$("elem:even")', '获取到的元素中，选择索引号为偶数的元素'];

    obj.contents = [obj.c1, obj.c2, obj.c3, obj.c4, obj.c5];

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
    obj.cStyle_0 = ['1', '1,1,0', 'fw', '800'];
    obj.cStyle_1 = ['2', '1,1,0', 'fw', '800'];
    obj.cStyle_2 = ['3', '1,1,0', 'fw', '800'];
    obj.cStyle_3 = ['4', '1,1,0', 'fw', '800'];
    obj.cStyle_4 = ['5', '1,1,0', 'fw', '800'];
    obj.cStyle_5 = ['6', '1,1,0', 'fw', '800'];
    obj.cStyle_6 = ['7', '1,1,0', 'fw', '800'];
    obj.cStyle_7 = ['8', '1,1,0', 'fw', '800'];
    obj.cStyle = [obj.cStyle_0, obj.cStyle_1, obj.cStyle_2, obj.cStyle_3, obj.cStyle_4, obj.cStyle_5, obj.cStyle_6, obj.cStyle_7];
    obj.globalStyle_0 = ['1', '1', [2, 4, 3.2, 3.2], '1', [24]];
    obj.boxShadow = ['1px', '1px', '16px', '2px', '#6666666f'];
    // 写入内容
    obj.c0 = ['语法', '用法', '描述'];
    obj.c1 = ['parent()', '$("li").parent()', '查找父级'];
    obj.c2 = ['children(selector)', '$("ul").children("li")', '相当于$("ul>li")'];
    obj.c3 = ['find(selector)', '$("ul").find("li")', '相当于$("ul li")'];
    obj.c4 = ['siblings(selector)', '$("li:first").siblings("li")', '查找兄弟节点，不包含自身'];
    obj.c5 = ['nextAll([expr])', '$("li:eq(2)").nextAll()', '查找当前元素之后所有同辈元素'];
    obj.c6 = ['prevAll([expr])', '$("li:last").prevAll()', '查找当前元素之前所有同辈元素'];
    obj.c7 = ['hasClass(class)', '$("elem").hasClass("className")', '判断当前元素是否含有某个特定的类，返回true&false'];
    obj.c8 = ['eq(index)', '$("li").eq(2)', '相当于$("li:eq(2)")'];

    obj.contents = [obj.c1, obj.c2, obj.c3, obj.c4, obj.c5, obj.c6, obj.c7, obj.c8];

    // 写入tr容器属性
    obj.trStyle_0 = ['t', 'bgc', 'rgba(236, 144, 38, 0.6)'];
    obj.trStyle_1 = ['t', 'c', '#233'];
    obj.trStyle_2 = ['5', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_3 = ['1', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_4 = ['3', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle_5 = ['7', 'bgc', 'rgba(134, 172, 241,.3)'];
    obj.trStyle = [obj.trStyle_0, obj.trStyle_1, obj.trStyle_2, obj.trStyle_3, obj.trStyle_4, obj.trStyle_5];

    add_formNode(obj);
}