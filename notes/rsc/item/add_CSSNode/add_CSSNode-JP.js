// /*系统默认菜单被禁用*/-webkit-user-select:none;/*webkit浏览器*/-khtml-user-select:none;/*早期浏览器*/-moz-user-select:none;/*火狐*/-ms-user-select:none;/*IE10*/user-select:none;
(function () {
    let head = document.getElementsByTagName('head')[0];
    let basic_styleDoc = "*{border:none;outline:none;margin:0;padding:0;cursor:default;vertical-align: middle;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;} li{position:relative;}li{font-weight: 400;color: rgb(127, 210, 212);}body{background-color: rgba(137, 155, 153, 0.12);}";
    let scrollASelection = '::selection{background-color:rgba(189,198,198,0.4);color:#234234;}::-webkit-scrollbar { position: absolute; background-color: transparent; width: 0.24rem; height: 0.25rem } ::-webkit-scrollbar-track { background-color: rgba(49, 231, 156, 0.32); -webkit-border-radius: 2em; -moz-border-radius: 2em; border-radius: 2em } ::-webkit-scrollbar-thumb { background-color: #000; background-color: rgb(223, 118, 20) !important; background-image: linear-gradient(0deg, rgba(227, 202, 255, 0.16), rgba(202, 215, 255, 0.16)); -webkit-border-radius: 2em; -moz-border-radius: 2em; border-radius: 2em }';
    let basic_styleNode = document.createElement('style');
    let external = 'body{overflow-x: hidden ! important;} ::selection { background-color: rgba(181, 212, 226, 0.24) !important; color: rgba(255, 255, 255, 0.72) !important; } code::selection { background:rgba(245, 198, 205, 0.72); /* color:rgba(255, 255, 255, 0.72); */ color: rgba(160, 193, 118, 0.96) !important; }'
    let font = " @font-face { font-family: Amaranth; src: url(../../font/Amaranth.otf); } @font-face { font-family: 'KimsGirlType'; src: url(./font/KimsGirlType.ttf); } @font-face { font-family: '爱心流星体'; src: url(./font/爱心流星体.ttf); } @font-face { font-family: '新蒂小丸子小学版'; src: url(./font/新蒂小丸子小学版.ttf); } @font-face { font-family: '新蒂小丸子字体高级版'; src: url(./font/新蒂小丸子字体高级版.ttf); } @font-face { font-family: '杨任东竹石体'; src: url(./font/杨任东竹石体-Regular.ttf); } @font-face { font-family: '站酷快乐体'; src: url(./font/站酷快乐体.TTF); } @font-face { font-family: 'Amaranth'; src: url(../../font/Amaranth.otf); }";
    let cur = ' * { /* cursor: url(https://files-cdn.cnblogs.com/files/miluluyo/cursor.ico),auto; */ /* 指针来源自: https://zhutix.com/ico/simplify-mint-cuu */ cursor: url(/img/ico/default.cur), default !important; } a { cursor: url(/img/ico/pointer.cur), pointer !important; }';
    head.appendChild(basic_styleNode);
    basic_styleNode.innerText += scrollASelection;
    basic_styleNode.innerText += font;
    basic_styleNode.innerText += basic_styleDoc;
    basic_styleNode.innerText += external;
    basic_styleNode.innerText += cur;
})();
(function () {
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', 'http://res1433223.net3v.net/img/favicon.png');
    head.appendChild(link);
})();