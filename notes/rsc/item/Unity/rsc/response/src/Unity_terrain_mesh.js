function call() {
    let dir = 'src/Unity_terrain_mesh/'
    LM('问题一：');
    SM('如何给外部导入的模型添加 Collider ？');
    lst('直接在模型导入的时候在属性的 Model 页面 勾选上 Generate Colliders 再 apply 就能自动为模型添加 Mesh Collider 组件，并自动得到其 mesh 数据');
    video_fn(dir + 'U_MeshCollider.mp4', '60%');
    SL();

    LM('问题二：');
    SM('如何在unity内建立一个地形？');
    img_fn(dir + 'U_Terrain_01.png', '60%');
    video_fn(dir + 'U_Terrain.mp4', '60%');

    tip('关于 Terrain 更多的姿势将会在未来的某一天更新', 3);
    SL('4rem');
}