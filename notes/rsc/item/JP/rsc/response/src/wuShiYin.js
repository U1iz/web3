function add_wsy() {
    LM('五十音图');
    link('源地址', './src/wuShiYin/index.html');
    $('body').append('<div><iframe id="iframe"></iframe></div>');
    $('#iframe').css({
        width: '100%',
        height: '920px',
        transform: 'scale(0.8)',
        transition: 'all 0.2s',
        userSelect: 'none'
    }).attr({
        src: './src/wuShiYin/index.html?hide_menu=true',
        frameborder: 0
    })
}