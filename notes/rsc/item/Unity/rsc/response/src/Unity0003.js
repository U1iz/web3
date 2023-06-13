function call() {} {
    LM('Text 组件');
    form_ini_01();
    tip('Font 字体可直接拖入字体文件');
    SL('4rem');
    SM('C# 设置部分字体样式');
    code(`Text txt;
    void Start()
    {
        txt = transform.GetComponent<Text>();
        txt.text = "Hello World";
        txt.fontSize = 24;;
        txt.fontStyle = FontStyle.Bold;
    }`);
    SL('6rem');
}