// /*系统默认菜单被禁用*/-webkit-user-select:none;/*webkit浏览器*/-khtml-user-select:none;/*早期浏览器*/-moz-user-select:none;/*火狐*/-ms-user-select:none;/*IE10*/user-select:none;
(function () {
        let head=document.getElementsByTagName('head')[0];
        let basic_styleDoc="*{border:none;outline:none;margin:0;padding:0;cursor:default;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;}::selection{background-color:rgba(189,198,198,0.4);color:#234234;}::-webkit-scrollbar{position:absolute;background-color:rgba(189,198,198,0.4);width:0.25rem;height:0.25rem}::-webkit-scrollbar-track{background-color:transparent;-webkit-border-radius:2em;-moz-border-radius:2em;border-radius:2em}::-webkit-scrollbar-thumb{/*background-color:#3549ff3b;*/background-image:linear-gradient(0deg,rgba(134,84,226,0.205),rgba(150,90,218,0.199));-webkit-border-radius:2em;-moz-border-radius:2em;border-radius:2em}li{position:relative;}";
        let basic_styleNode=document.createElement('style');
        let cur=' * { /* cursor: url(https://files-cdn.cnblogs.com/files/miluluyo/cursor.ico),auto; */ /* 指针来源自: https://zhutix.com/ico/simplify-mint-cuu */ cursor: url(/img/ico/default.cur), default !important; } a { cursor: url(/img/ico/pointer.cur), pointer !important; }';
        let external='li{font-weight: 400;color: #cb724c; text-shadow: 0.06rem 0.06rem 0.12rem #ccc;}body{background-color: #fff;}'
        let limited='.selectUnable{ moz-user-select: -moz-none; -moz-user-select: none; -o-user-select:none; -khtml-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none;}';
        head.appendChild(basic_styleNode);
        basic_styleNode.innerText +=basic_styleDoc;
        basic_styleNode.innerText +=external;
        basic_styleNode.innerText +=cur;
        basic_styleNode.innerText +=limited;
    }

)();

(function () {
        let head=document.getElementsByTagName('head')[0];
        let link=document.createElement('link');
        link.setAttribute('rel', 'shortcut icon');
        link.setAttribute('href', 'http://res1433223.net3v.net/img/favicon.png');
        head.appendChild(link);
    }
)();