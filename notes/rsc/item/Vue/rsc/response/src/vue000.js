function call() {
    let dir = 'src/MySQL0002/';
    ajax({
        url: 'src/vue000/vue.js.md',
        success: r => {
            $('#md_wrap').html(marked.parse(r));
            $('pre code').addClass('hljs');
            hljs.initHighlighting();
        },
    });
}
cdom({
    '/node_modules/highlight.js/styles/base16/onedark.css': 'css',
    '/node_modules/marked/marked.min.js': 'js',
    '/notes/rsc/lib/highlight.js/highlight.min.js': 'js',
}, 'simpleObj');