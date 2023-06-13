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
    obj.cStyle = [obj.cStyle_0, obj.cStyle_1, obj.cStyle_2, obj.cStyle_3, obj.cStyle_4, obj.cStyle_5];
    obj.globalStyle_0 = ['1', '1', [2, 4, 3.2, 3.2], '1', [24]];
    obj.boxShadow = ['1px', '1px', '16px', '2px', '#6666666f'];
    // 写入内容
    obj.c0 = ['形状', '名称', '描述'];
    obj.c1 = ['圆角矩形', '端点，中断', '标准流程的开始与结束，每一个流程图只有一个起点'];
    obj.c2 = ['矩形', '进程', '要执行的处理'];
    obj.c3 = ['菱形', '判断', '决策或判断'];
    obj.c4 = ['箭头', '流向', '表示执行的方向与顺序'];
    obj.c5 = ['平行四边形', '数据', '表示数据的输入/输出'];
    obj.c6 = ['正圆', '联系', '同一流程图中从一个进程到另一个进程的交叉引用'];

    obj.contents = [obj.c1, obj.c2, obj.c3, obj.c4, obj.c5, obj.c6];

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
    let obj = {
        c0: [],
        contents: [
            ['16进制', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D'],
            ['10进制', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13],
            ['2进制', '0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', 1000, 1001, 1010, 1011, 1100, 1101]
        ],
    };
    add_formNode(obj);
    form_ini_03();
}

function form_ini_03() {
    let obj = {
        c0: [],
        contents: [
            ['16进制', '0E', '0F', 10, 11, 12, 13, 14],
            ['10进制', 14, 15, 16, 17, 18, 19, 20],
            ['2进制', 1110, 1111, 10000, 10001, 10010, 10011, 10100]
        ]
    };
    add_formNode(obj);
}