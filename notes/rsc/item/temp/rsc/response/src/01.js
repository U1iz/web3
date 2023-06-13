function call() {} {
    document.body.innerHTML += '<div id="hotkey_wrap"> <h3>获取 “上海市中职校计算机应用专业教育质量监测理论考试平台”中 练习题的题目数据</h3> </div>';
    let dir = 'src/01/';
    
    LM('题目获取脚本简单使用指南');
    SM('操作步骤');
    video_fn(dir + 'bandicam 2022-11-08 18-27-44-687.mp4', '80%');
    SM('源码');
    tip('出bug了，以下脚本不要“隐藏注释”，否则会卡死');
    nor_hlc(`let jNode = document.createElement('script');
    jNode.src = 'https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js';
    jNode.async = false;
    document.head.appendChild(jNode);
    jNode.onload = ()=>{
        $('.span_splitLine').css('width', $('body').width());$('.questionChoices').css('color', '#000');$('*').css('text-shadow', 'none');$('.question_wrap').css('marginLeft', '20px');$('.active_btn').css('width', '100%');
        $('.answers').show();$('.p_show_RW').remove();$('button').remove();$('.choose_wrap').remove();$('#fontSize_changer_wrap').remove();$('#get_top').remove();$('input').remove();
        $('body').css('user-select', 'none');
    }`, '转PDF样式');
    ajax_hlc(dir + '_getQuestionVal.js', '“自动获取”脚本', lfn_01, '“自动获取”脚本');

    function lfn_01() {
        ajax_hlc(dir + 'Q_KVM_lib.js', '最依赖的函数库', lfn_02, '最依赖的函数库');
    }

    function lfn_02() {
        tip('为了减小数据大小，我采用了全列表的数据格式，这就代表解析这些数据就需要大量循环，在题量足够大的时候就会很容易造成卡顿以及内存溢出');
        LM('主要数据介绍');
        nor_hlc(`    // 判断题
        ['JQ', '题目', '0: 错误; 1: 正确', '题目难度']
        ["JQ", "在Dreamweaver中输入文本的方法非常简单， 只要将插入点定位在网页的某个位置然后选择输入法输入文本就可以了，但不可以利用剪贴板将大量的外部文本拷贝到网页文档中。()",
            0, 2
        ]
        
        // 填空题 多空、单空
        ['fill', '题目',
            [
                '多个答案'
            ], '题目难度'
        ]
        ["fill", "只有文字的网页会显得非常单调,而且容易引起视觉疲劳.为增加网页的可看性,一般会适当地在网页中添加一些___、___.",
            [
                "图像",
                "视频"
            ], 2
        ]
        
        // 填空题（淘汰） 单空
        ['题目', '答案', '题目难度']
        
        // 单选
        ['CQ', '题目',
            [
                '选项（数量不限）'
            ],
            '正确选项的index（从1开始）', '题目难度'
        ]
        ["CQ", "在表单中包含性别选项,且默认状态为\"男\"被选中,下列正确的是()",
            [
                "‹input type=radio name=sex checked›男",
                "‹input type=radio name=sex enabled›男",
                "‹input type=checkbox name=sex checked›男",
                "‹input type=checkbox name=Sex enabled›男"
            ], 1, 2
        ]
        
        // 多选
        // 类似于单选
        ["MCQ", "网页构成要素有()",
            [
                "站标",
                "导航条",
                "广告条",
                "标题栏",
                "按钮"
            ],
            [1, 2, 3, 4, 5], 2
        ]
        
        // elem 元素 用于添加题目外的节点
        ["elem", "\\n\\n网页设计与制作", [1.6, 400, "0.32rem"],
            [
                ["position", "relative"],
                ["left", "10%"],
                ["textShadow", "rgb(0 0 255 / 20%) 0.1rem 0.1rem 0.24rem, rgb(51 51 34 / 13%) 0.16rem 0.16rem 0.32rem"],
                ["addClassName", "questionsPart"]
            ]
        ]`, '判断题');


    }
}