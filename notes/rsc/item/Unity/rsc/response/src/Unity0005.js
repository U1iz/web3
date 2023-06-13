function call() {} {
    let dir = 'src/Unity0005/';
    LM('InputField 输入栏');
    lst('Placeholder > Text 输入提示', [111, 'disc', 2]);
    lst('Interactable 是否可编辑', [0, 'disc', 2]);
    lst('readonly 是否只读', [0, 'disc', 2]);
    lst('ContentType (normal/password)', [0, 'disc', 2]);
    lst('当编辑改变: value change', [0, 'disc', 2]);
    lst('当回车: input end', [0, 'disc', 2]);
    video({
        fullPath: dir + 'video/U0000.mp4',
        width: '70%'
    });

}