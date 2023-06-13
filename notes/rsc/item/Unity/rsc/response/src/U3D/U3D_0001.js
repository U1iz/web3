function call() {} {
    let dir = 'src/U3D/U3d_0001/';

    LM('刚体组件');

    img_fn(dir + 'img/Rigidbody_ins.jpg', '70%'); {
        let obj = {
            c0: ['名称', '描述'],
            contents: [
                ['Mass(质量)', '[0, 10], 默认为1'],
                ['Drag(阻力)', '物体移动时的阻力'],
                ['AngularDrag(旋转阻力)', '旋转时的衰减'],
                ['UseGravity(使用重力)', '是否受重力影响'],
                ['IsKinematic\n(是否受牛顿运动学影响)', 'false\n正常的物理计算，\ntrue\n运动只会受代码和动画影响，普通的碰撞等都不会改变它的运动状态'],
                ['Interpolate(物体运动插值模式)', 'None(最近计算值)\nInterpolate(内插值)\nextrapolate(外插值)'],
                ['CollisionDiscrete', 'Discrete(离散模式 资源少 静止/低速)\nContinuous(连续检测， 高速 体积小\n被使用了Continuous检测撞击的模式，使用 ContinuousDynamic 模式)']
            ]
        };
        add_formNode(obj);
    }
    lst('刚体先移动而后同步物体的transform，所以刚体的位置与物体的坐标大致相等');
    ajax_hlc(dir + 'code/[metadata]Rigidbody.txt', '<i>Rigidbody</i> 下的数据成员', fn_01());

    function fn_01() {
        space();
    }
}