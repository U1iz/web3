function call() {} {
    let dir = 'src/Unity0000/';
    LM('循环滚动の背景');
    SM('最终效果');
    video({
        fullPath: dir + 'video/u0000.mp4',
        width: '60%',
        ctrl: true
    });
    SL();
    SM('一. 导入图片');
    // lst('将图片的 Texture 设为 Sprite (2D and UI)');
    lst('将图片的 Wrap Mode 设为 "Repeat"');
    SM('二. 创建 UI: Canvas => RawImage');
    SM('三. 创建C#脚本, 并添加至 RawImage');
    img({
        fullPath: dir + 'img/u0001.jpg',
        width: '60%'
    });
    SM('四. 编写代码'); {
        let href = dir + 'loop_img.txt';
        ajax({
            url: href,
            success: (rst) => {
                link('源文件', href);
                cSharp({
                    text: rst,
                    dataAttr: 'loop code',
                    later: true
                });
                SL('6rem', '12rem');
                fn_1();
            }
        });
    }

    function fn_1() {
        LM('UGUI Button:');
        SM('创建 btn');
        img({
            fullPath: dir + 'img/U0002.png',
            width: '60%'
        });
        SL('4rem');
        LM('Button 效果(颜色过渡)');
        SM('效果');
        video({
            fullPath: dir + 'video/U0001.mp4'
        });
        SM('属性设置');
        img({
            fullPath: dir + 'img/U0003.png',
            width: '60%'
        });
        SL('4rem');
        LM('Button 效果(图片过渡)');
        SM('效果');
        video({
            fullPath: dir + 'video/U0002.mp4'
        });
        SM('属性设置');
        img({
            fullPath: dir + 'img/U0003.png',
            width: '60%'
        });
        SL('5rem');
        LM('绑定点击事件');
        SM('效果');
        video({
            fullPath: dir + 'video/U0003.mp4',
            width: '50%'
        });
        SM('一. 创建脚本');
        lst('我这里命名为 Btn_click');
        tip('需要被绑定事件的函数需要被 public 出来', 3); {
            let href = dir + 'Btn_click.txt';
            ajax({
                url: href,
                success: (rst) => {
                    link('源文件', href);
                    cSharp({
                        text: rst,
                        dataAttr: 'Btn_click code',
                        later: true
                    });
                    SL('2rem');
                    SM('三. 绑定事件');
                    lst('游戏对象 选择带有该脚本组件的对象');
                    lst('函数选择顺序依次为 脚本文件有 => 需要执行的函数名');
                    img({
                        fullPath: dir + 'img/U0004.png',
                        width: '60%'
                    });
                    SL('6rem', '12rem');
                    fn_2();
                }
            });
        }
    }

    function fn_2() {
        LM('禁用 Button');
        SM('效果');
        video({
            fullPath: dir+'video/U0004.mp4'
        });
        img({
            fullPath: dir+'img/U0005.png',
            width: '40%'
        });
        {
            let href = dir + 'Unable_btn.txt'
            link('源码', href);
            ajax({
                url: href,
                success: (rst)=>{
                    cSharp({
                        text: rst,
                        dataAttr: 'Unable_btn code',
                        later: true
                    });
                    SL('2rem');
                }
            });
        }
    }
}