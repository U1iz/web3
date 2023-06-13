function call() {} {
    let dir = 'src/Collision/Collision_0001/';
    LM('当 <b>碰撞器</b> 与 <b>碰撞器</b> 发生 碰撞');
    nor_hlc('void OnCollisionEnter2D(Collision2D other) { }', '');
    nor_hlc('void OnCollisionExit2D(Collision2D other) { }', '');
    nor_hlc('void OnCollisionStay2D(Collision2D other) { }', '持续碰撞');
    SL();
    LM('当 <b>碰撞器</b> 与 <b>触发器</b> 碰撞');
    nor_hlc('void OnTriggerEnter2D(Collider2D other) { }', '开始碰撞');
    nor_hlc('void OnTriggerExit2D(Collider2D other) { }', '结束碰撞');
    nor_hlc('void OnTriggerStay2D(Collider2D other) { }', '持续碰撞');
    space();
    lst('<b>Collider2D</b> 是碰撞信息');

    ajax_hlc(dir + 'code/[metadata]Collision2D.txt', '<i>Collision2D</i> 下的数据成员', fn_01());

    function fn_01() {
        ajax_hlc(dir + 'code/[metadata]Collider2D.txt', '<i>Collider2D</i> 下的数据成员');
    }
}