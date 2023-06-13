function call() {
    add_title('', [
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
    var nq = '有效期至：2022.10.23_16:00';
    add_req('<em>参考资料</em>', 'exam', '参考资料', 'ref');
    add_req('-----分割线-----');
    add_req('文字录入 10题 2022.09.08', 'PC0000', '2022-09-08');
    add_req('文字录入综合练习 180题 2022.09.15', 'PC0001', '2022-09-15');
    add_req('软件设计_01 50题 2022.09.19', 'PC0002', '2022-09-19');
    add_req('软件设计_02 50题 2022.09.22', 'PC0003', '2022-09-22');
    add_req('计算机硬件与维护 120题 2022.09.29', 'PC0004', '2022-09-29');
    add_req('10.1 文字录入综合练习1要求达到80分以上', 'PC0005', '2022-10-01');
    add_req('10.2 软件设计综合练习1要求达到80分以上', 'PC0006', '2022-10-02');
    add_req('10.3 计算机组装与维护综合练习1要求达到80分以上', 'PC0007', '2022-10-03');
    add_req('数据库应用课堂练习 2022.10.08', 'PC0008', '2022-10-08');
    add_req('数据库应用多选填空判断 2022.10.10', 'PC0009', '2022-10-10');
    add_req('1-3单元综合练习1 2022.10.10', 'PC0010', '2022-10-10');
    add_req('1-3单元综合练习2 2022.10.11', 'PC0011', '2022-10-11');
    add_req('<b>题库 part 01</b>', 'q_lib_part01', '题库_p1');
    add_req('-----分割线-----');
    add_req('文字录入', '文字录入', nq);
    add_req('网页设计与制作  ', '网页设计与制作', nq);
    add_req('数据库应用', '数据库应用', nq);
    add_req('软件设计', '软件设计', nq);
    add_req('平面图像处理', '平面图像处理', nq);
    add_req('计算机组装与维护', '计算机组装与维护', nq);
    add_req('计算机网络基础', '计算机网络基础', nq);
    add_req('多媒体制作技术', '多媒体制作技术', nq);
    add_req('电子商务应用', '电子商务应用', nq);
    add_req('常用工具软件', '常用工具软件', nq);
    add_req('办公软件应用', '办公软件应用', nq);
    add_req('职业素养', '职业素养', '有效期至：2022.11.15_09:00');
    // add_req('format', 'format');
    add_req('<b>题库 part 02</b>', 'q_lib_part02', '题库_p2');
    add_req('-----分割线(纯试题)-----');
    add_req('平面图像处理练习1', 'exam', '平面图像处理练习1', 221018);
    add_req('-----分割线-----');
    add_req('汇总', '汇总');
    add_req('汇总_ajax（有些负优化）', '汇总_ajax');
    add_req('<b>全题库（小心崩溃）</b>', 'q_lib', '全题库');
    
    add_req('单项（题量减少，相对不容易卡死）');
    add_req('单选', 'part/cq');
    add_req('多选', 'part/mcq');
    add_req('填空', 'part/fill');
    add_req('判断', 'part/jq');
 {
        let div = document.createElement('div');
        div.style.width = '100%';
        div.style.height = '10rem';
        document.body.appendChild(div);
    }
}