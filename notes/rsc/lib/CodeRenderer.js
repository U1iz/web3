let annotationArr = ['//', '#', '::'];
// let python_AnnotationArr = ['#'];
// let cmd_AnnotationArr = ['::'];
let BlockAnnotationArr = [
    ['/*', '*/'],
    ['<!--', '-->']
];
let functionArr = ['const', 'function', 'let', 'if', 'else', 'var', 'for', 'new', 'return', '=&gt;', '{', '}'];
let reservedWordArr = ['length', 'document', 'window', 'console'];
let HTMLreservedWordArr = ['src', 'href'];
let FunArr = [
    'extname', 'basename', 'join', 'createServer',
    'require', 'writeFile', 'addClass', 'removeClass', 'toggleClass', 'hide', 'show',
    'log', 'index', 'siblings', 'click', 'querySelectorAll', 'querySelector', 'addEventListener',
    'getAttribute', 'appendChild', 'jQuery',
    'lineTo', 'moveTo',
    'closePath', 'stroke', 'arc', 'addPath',
    'Path2D', 'bezierCurveTo', 'beginPath',
    'quadraticCurveTo'
];
let stringArr = ["'stylesheet'", '"stylesheet"', "'request'", '"request"'];

let phpFnArr = ['array', 'echo', 'print_r', 'var_dump', 'json_encode'];

let HTMLLabel = [
    rtnLabel('html'),
    'readFile',
    '&lt;!DOCTYPE', 'html&gt;',
    rtnLabel('p'),
    rtnLabel('div'),
    rtnLabel('meta'),
    rtnLabel('head'),
    rtnLabel('title'),
    rtnLabel('script'),
    rtnLabel('style'),
    rtnLabel('h1'),
    rtnLabel('h2'),
    rtnLabel('h3'),
    rtnLabel('h4'),
    rtnLabel('h5'),
    rtnLabel('h6'),
    rtnLabel('span'),
    rtnLabel('link'),
    rtnLabel('img'),
    rtnLabel('video'),
    rtnLabel('body'),
    rtnLabel('button'),
    rtnLabel('ul'),
    rtnLabel('ol'),
    rtnLabel('li'),
    rtnLabel('a'),
]
HTMLLabel = HTMLLabel.toString().split(',');

let cmd_reservedWordArr = ['node', 'cd', 'dir', 'tree', 'cnpm', 'http-server', 'npm', 'ipconfig'];

let cSharp_reservedWordArr = ['Input', 'transform', 'KeyCode'];
let cSharp_deepOrangeArr = ['true', 'false'];
let cSharp_lightBlue = ['{', '}'];
let cSharp_functionArr = [
    'Update', 'Start', 'AddForce', 'GetAxis', 'GetComponent', 'SetBool', 'GetKeyDown'
]
let cSharp_fnArr = [
    'class', 'void', 'private', 'public'
];

window.addEventListener('load', function () {
    StartRender('.codeNodes_addBy_funCode', {
        'RWA': [reservedWordArr, 'ContainReservedWordNode', '#ddc17a'],
        'HTMLLabel': [HTMLLabel.toString().split(','), 'ContainHTMLLabelNode', '#cf6a54'],
        'functionArr': [functionArr, 'ContainFunctionNode', '#bc7ddf'],
        'FnArr': [FunArr, 'ContainFunNode', '#64a2f0'],
        'stringArr': [stringArr, 'ContainStringArrNode', '#a0c176'],
        'blueFnArr': [phpFnArr, 'ContainPHPFnArrNode', '#72b4c2'] /* 8fdeff */
    });
    StartRender('.codeNodes_cmd_addBy_funCode', {
        'RWA': [cmd_reservedWordArr, 'Contain_cmd_ReservedWordNode', '#ddc17a']
    });
    StartRender('.codeNodes_cSharp_addBy_funCode', {
        'RWA': [cSharp_reservedWordArr, 'Contain_cSharp_ReservedWordNode', '#ddc17a'],
        'deepOrange': [cSharp_deepOrangeArr, 'Contain_cSharp_deepOrangeNode', '#C79C65'],
        'lightBlue': [cSharp_lightBlue, 'Contain_cSharp_lightBlueNode', '#88d7e8'],
        'functionArr': [cSharp_functionArr, 'Contain_cSharp_FunctionNode', '#78aef0'],
        'FnArr': [cSharp_fnArr, 'Contain_cSharp_FnNode', '#bc7ddf']
    });
})

function rtnLabel(str) {
    return '&lt;' + str + '&gt;,' + '&lt;/' + str + '&gt;';
    // return str;
}

function StartRender(className, obj) {
    let codeNodeArr = document.querySelectorAll(className);

    // 函数库
    clear_addNode('ContainHTMLLabelNode');
    clear_addNode('ContainStringArrNode');

    lfn_exe_obj(obj.HTMLLabel);
    lfn_exe_obj(obj.stringArr);
    lfn_exe_obj(obj.blueFnArr);
    lfn_exe_obj(obj.FnArr);
    lfn_exe_obj(obj.functionArr, 'fn');
    lfn_exe_obj(obj.HTML_RWA);
    lfn_exe_obj(obj.RWA);
    lfn_exe_obj(obj.deepOrange);
    lfn_exe_obj(obj.lightBlue);

    function lfn_exe_obj(obj, sn) {
        obj && (function () {
            LibMatcher(obj[0], obj[1], obj[2], sn);
        }());
    }

    function LibMatcher(lib, Class, Color, ID) {
        let SN = document.createElement('style');
        document.querySelector('head').appendChild(SN);
        SN.innerText = '.' + Class + '{' + 'color:' + Color + ';}';
        for (let i = 0; i < codeNodeArr.length; i++) {
            /* let temp = codeNodeArr[i].innerHTML;
            codeNodeArr[i].innerHTML = '';
            let span = document.createElement('span');
            codeNodeArr[i].appendChild(span);
            span.innerHTML = temp; */
            for (let j = 0; j < lib.length; j++) {
                let mt = '-0.07rem';
                mt = '0';
                if (ID == 'fn' && codeNodeArr[i].innerText == lib[j]) {
                    replaceVal();
                } else {
                    replaceVal();
                }

                function replaceVal() {
                    codeNodeArr[i].innerHTML =
                        codeNodeArr[i].innerHTML.toString().replace(new RegExp(lib[j], 'g'),
                            "<span class=" + '"' + Class + '"' + "style=" + '"position:relative;top: ' + mt + ';"' + ">" + lib[j] + '</span>');
                }
                /* let texNodes = codeNodeArr[i].childNodes;
                for (let k = 0; k < texNodes.length; k++) {
                    texNodes[k].nodeValue != null && (function () {
                        let value = texNodes[k].nodeValue.toString();
                        texNodes[k].nodeValue = '<span>' + value + '</span>';
                    })();
                } */
            }
        }
    }

    function clear_addNode(className) {
        let elem = document.getElementsByClassName(className);
        for (let i = 0; i < elem.length; i++) {
            let cn = elem[i].children;
            cn.length > 0 && (function () {
                // console.log(elem[i].childNodes);
                let text = elem[i].innerText;
                elem[i].innerHTML = '';
                let span = document.createElement('span');
                span.style.class = className;
                span.innerText = text;
                elem[i].appendChild(span);
            })();
        }
    }

    // 单行注释 // 的情况下所有小于其index包括其自身的统一color 必须要有空格
    for (let i = 0; i < codeNodeArr.length; i++) {
        for (let j = 0; j < annotationArr.length; j++) {
            if (codeNodeArr[i].innerText == annotationArr[j]) {
                let currentIndex = parseInt(codeNodeArr[i].getAttribute('index'));
                let currentNodePar = codeNodeArr[i].parentNode;
                codeNodeArr[i].style.color = '#80848e';
                let otherNodeArr = currentNodePar.querySelectorAll(className);
                for (let k = 0; k < otherNodeArr.length; k++) {
                    let otherNodeIndex = parseInt(otherNodeArr[k].getAttribute('index'));
                    if (otherNodeIndex > currentIndex) {
                        otherNodeArr[k].innerHTML = otherNodeArr[k].innerText;
                        otherNodeArr[k].style.color = codeNodeArr[i].style.color;
                    }
                }
            }
        }
    }

    // 待完善
    // 多行注释
    // 先获取第一字符
    // 后将所有大于此索引的
    for (let i = 0; i < codeNodeArr.length; i++) {
        let gIndex = parseInt(codeNodeArr[i].getAttribute('gIndex'));
        for (let j = 0; j < BlockAnnotationArr.length; j++) {
            let fst_gIndex;
            let snd_gIndex;
            // 获取与第一个字符匹配的gIndex
            if (codeNodeArr[i].innerText == BlockAnnotationArr[j][0]) {
                // codeNodeArr[i].style.color = 'red';
                fst_gIndex = parseInt(codeNodeArr[i].getAttribute('gIndex'));
            }
            // 获取与第二个字符匹配的gIndex
            if (codeNodeArr[i].innerText == BlockAnnotationArr[j][1]) {
                // codeNodeArr[i].style.color = 'green';
                snd_gIndex = parseInt(codeNodeArr[i].getAttribute('gIndex'));
            }
            // 暂无法应用到中间的元素
            if (gIndex >= fst_gIndex || gIndex <= snd_gIndex) {
                codeNodeArr[i].style.color = '#80848e';
            }
            // 暂有bug
            /* for (let k = 0; k < codeNodeArr.length; k++) {
                let gIndex = parseInt(codeNodeArr[k].getAttribute('gIndex'));
                if (gIndex >= fst_gIndex || gIndex <= snd_gIndex) {
                    codeNodeArr[k].style.color = '#80848e';
                }
            } */
        }
    }
}