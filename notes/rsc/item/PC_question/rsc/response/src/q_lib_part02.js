function call() {}
let js_path = [
    '文字录入',
    '网页设计与制作',
    '数据库应用',
    '软件设计',
    '平面图像处理',
    '计算机组装与维护',
    '计算机网络基础',
    '多媒体制作技术',
    '电子商务应用',
    '常用工具软件',
    '办公软件应用',
    '职业素养'

]
for (let i in js_path) {
    let js = document.createElement('script');
    js.src = 'src/' + js_path[i] + '.js';
    js.async = false;
    document.body.appendChild(js);
    if (i == js_path.length - 1) {
        let style = document.createElement('style');
        style.innerHTML = 'body { overflow-x: hidden; padding-right: 1rem !important; } ::-webkit-scrollbar-track { border-radius: 0; z-index: -1; background-color: #fff; } ::-webkit-scrollbar-thumb { background-image: linear-gradient(10deg, #ff00b3, #965ada, #ff7700); } ::-webkit-scrollbar { position: absolute; background-color: rgba(189, 198, 198, 0.4); width: 3rem; height: 0.25rem } .wrong_bank_wrap { overflow-x: hidden !important; } .wrong_bank_wrap::-webkit-scrollbar { width: 0.6rem; } .wrong_bank_wrap::-webkit-scrollbar-thumb { background: #b4ebdb; } #get_top { right: 0rem !important; } #get_top, #get_top svg { width: 2.4rem !important; }';
        document.head.appendChild(style);
    }
}