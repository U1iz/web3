function call() {} {
    let dir = 'src/Unity0004/';
    LM('Slider 滑动条');
    lst('通过 UI => Slider 创建 Slider 节点');
    SM('通过修改 Slider 不同子节点的属性以修改 滑动条 的样式');
    lst('BackGround => 剩余部分的背景', [111, 'disc', 2]);
    lst('Fill Area/Fill => 划过的背景', [0, 'disc', 2]);
    lst('Handle Slide Area/Handle => 滑动手柄', [0, 'disc', 2]);
    video({
        fullPath: dir + 'video/U0000.mp4',
        width: '60%'
    });
    SL();

    LM('C# 读写组件 与 绑定滑动事件');
    video({
        fullPath: dir + 'video/U0001.mp4',
        width: '60%'
    });
    ajax_fn(dir + 'On_slider.txt', 'On_slider code', fn_01)

    function fn_01() {
        LM('Toggle 复选框');
        lst('通过 UI => Toggle 创建toggle', [111, 'disc', 2]);
        lst('Toggle 节点的 宽高 就是 toggle  的作用域', [0, 'disc', 2]);
        lst('通过修改 Toggle Transition 的值为 “Fade/None” 来指定 Check mark 的渐变与否', [0, 'disc', 2]);
        video({
            fullPath: dir + 'video/U0002.mp4',
            width: '60%'
        });
        SL();
        LM('为 Toggle 绑定 On Value Change 事件');
        video({
            fullPath: dir + 'video/U0003.mp4',
            width: '60%'
        }); 
        ajax_fn(dir + 'OnChange.txt', 'OnChange code', fn_02)

        function fn_02() {
            LM('实现单选框功能');
            SM('场景搭建');
            video({
                fullPath: dir + 'video/U0004.mp4',
                width: '60%'
            });
            SM('脚本设置');
            video({
                fullPath: dir + 'video/U0005.mp4',
                width: '60%'
            });
            ajax_fn(dir + 'Radio_fn.txt', 'Radio_fn code')
        }
    }
}