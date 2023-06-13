(() => {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/notes/rsc/item/add_CSSNode/page_normalize.css';
    document.head.appendChild(link);
})();
(() => {
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', '/favicon.png');
    head.appendChild(link);
})()