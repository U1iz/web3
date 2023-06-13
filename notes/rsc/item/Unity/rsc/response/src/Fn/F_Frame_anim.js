function call() {
    let dir = 'src/Fn/F_Frame_anim/'
    LM('帧动画播放脚本');
    video_fn(dir + 'F_Frame_anim.mp4', '70%');
    ajax_fn(dir + 'Frame_anim.txt', 'Frame_anim 源代码', fn_01)

    function fn_01() {}
}