function call() {} {
    let dir = 'src/temp/';
    LM('游戏类型');
    lst('鉴于目前我们的实力跟精力，目前我们的游戏类型是 <b>动作类</b>');
    LM('分工');
    lst(`由 ${bu('徐洋洋')} 跟 ${bu('郁志良')} 负责程序部分的设计`);
    lst(`由 ${bu('姚谢')} 跟 ${bu('张培庆')} 负责游戏地形的搭建`);
    lst(`由 ${bu('徐睿琦')} 担任项目策划`);
    lst(`由 ${bu('叶豪杰')} 负责收集整合可用的网络资源`);
    // lst(`<del>由 ${bu('吴昌辉')} 担任UI设计</del>`);
    lst(`由 ${bu('吴昌辉')} 担任UI设计`);
    LM('项目进度');
    lst('目前我们重点做的是主角的这边的动作动画，其他的NPC的话会在期中之后着手制作');
    SM('首先跟其他键鼠游戏一样');
    lst('可以通过 ' + bu('WASD') + ' 来控制角色', [111, 'disc', 3]);
    lst(`利用 ${bu('移动鼠标')} 的位置来转动视角`, [0, 'disc', 3]);
    lst(`按下 ${bu('space')} 键让角色跳跃`, [0, 'disc', 3]);
    lst('...', [0, 'none', 3]);
    window.addEventListener('click', () => {
        SM('此外...');
        lst('技能部分目前由 ' + bu('徐洋洋') + ' 负责');
        tip('画面交给' + bu('徐洋洋'));
    })

    function bu(str) {
        return '<u><b>' + str + '</b></u>';
    }
}

01
08
15 
22
29
13
20