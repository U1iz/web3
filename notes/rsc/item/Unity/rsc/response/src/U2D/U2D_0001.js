function call() {
    let dir = 'src/U2D/U2d_0001/';
    LM('U2D 刚体组件');
    SM('普通 2D 物体');
    video_fn(dir + 'video/none_phy.mp4', '60%');
    SM('添加 RigidBody 2D');
    video_fn(dir + 'video/rigidbody_2d.mp4', '60%');
    SM('通过 Box Collider 添加碰撞效果');
    video_fn(dir + 'video/boxCollider2D.mp4', '60%');

    SM('通过 2D物理 材质改变对象的碰撞效果');
    video_fn(dir + 'video/physics_material_2D.mp4', '60%');
    SL();
    img_fn(dir + 'img/RigidBody&BoxCollider_translation_2.png', '100%');
    img_fn(dir + 'img/RigidBody&BoxCollider_translation.png', '100%');
    LM('Edge Collider 2D');

    space();
}