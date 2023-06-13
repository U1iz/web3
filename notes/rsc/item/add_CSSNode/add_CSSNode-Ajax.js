(function () {
    let head = document.getElementsByTagName('head')[0];
    let style = "* { border: none; outline: none; margin: 0; padding: 0; cursor: default; vertical-align: middle; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; cursor: url(/img/ico/default.cur), default !important; } li { position: relative; font-weight: 400; color: rgb(127, 210, 212); } body { background-color: #e8f5f5 !important; overflow-x: hidden ! important; } ::selection { background-color: rgba(181, 212, 226, 0.24); color: rgba(255, 255, 255, 0.72); } ::-webkit-scrollbar { position: absolute; background-color: transparent; width: 0.24rem; height: 0.25rem } ::-webkit-scrollbar-track { background-color: rgba(49, 231, 156, 0.32); -webkit-border-radius: 2em; -moz-border-radius: 2em; border-radius: 2em } ::-webkit-scrollbar-thumb { background-color: #000; background-color: rgb(223, 118, 20) !important; background-image: linear-gradient(0deg, rgba(227, 202, 255, 0.16), rgba(202, 215, 255, 0.16)); -webkit-border-radius: 2em; -moz-border-radius: 2em; border-radius: 2em } code::selection { background: rgba(245, 198, 205, 0.72); color: rgba(160, 193, 118, 0.96) !important; } code.codeNodes_cmd_addBy_funCode::selection { background: rgba(255, 255, 255, 0.3) !important; color: #fff !important; } code.codeNodes_tArea_addBy_funCode::selection { background: #0078d7 !important; color: #fff !important; } img, video { object-fit: cover; -webkit-object-fit: cover; } a { cursor: url(/img/ico/pointer.cur), pointer !important; }";
    let basic_styleNode = document.createElement('style');
    head.appendChild(basic_styleNode);
    basic_styleNode.innerText += style;
})();
(function () {
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', 'http://res1433223.net3v.net/img/favicon.png');
    head.appendChild(link);
})()