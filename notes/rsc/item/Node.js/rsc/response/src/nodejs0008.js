let Data = '模块化 基本概念';
// main execute
window.addEventListener('load', function () {
  switch (sessionStorage.getItem(document.querySelector('title').innerText + 'execute.js_hadRun')) {
    case 'false':
      sessionStorage.setItem(document.querySelector('title').innerText + 'execute.js_hadRun', 'true');
      call(Data);
      setTimeout(function () {
        //手动触发窗口resize事件
        if (document.createEvent) {
          var event = document.createEvent("HTMLEvents");
          event.initEvent("resize", true, true);
          window.dispatchEvent(event);
        } else if (document.createEventObject) {
          window.fireEvent("onresize");
        }
      }, 100);
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.backgroundColor = '#c6d7ff';
      document.documentElement.style.width = '100%';
      document.body.style.width = '100%';
      if (localStorage.getItem('equipmentType') == 1) {
        document.body.style.width = window.screen.availWidth + 'px';
        document.body.style.overflowX = 'hidden';
        setTimeout(function () {
          document.body.style.overflowX = 'auto';
        }, 3600)
      }
      break;
  }
})

window.addEventListener('DOMContentLoaded', function () {
  setDocTitle(Data);
  sessionStorage.setItem(document.querySelector('title').innerText + 'execute.js_hadRun', 'false');
});

function call(Data) {
  function span(str, color) {
    let c = 'red';
    if (color) {
      c = color;
    }
    return '<span style="color:' + c + ';position:relative;top:-0.12rem;">' + str + '</span>';
  }
  topic(Data, '#24272e');

  add_normalNode('', ['p', 'normal', '6% 5% 0 5%']);

  LM('模块化 基本概念');
  lst(span('模块化') + '是指解决一个' + span('复杂问题', '#047ffd') + '时，自顶向下逐层把' + span('系统划分成若干模块的过程') + '。对于整个系统来说，' + span('模块是可组合、分解和更换的单元。', '#047ffd') + '');

  lst('编程领域中的模块化，就是' + span('遵守固定的规则') + '，把一个' + span('大文件') + '拆成' + span('独立并互相依赖', '#047ffd') + '的' + span('多个小模块。') + '');

  SM('把代码进行模块化拆分的好处：');

  lst('提高了代码的' + span('复用性'));
  lst('提高了代码的' + span('可维护性'));
  lst('可以实现' + span('按需加载'));

  add_normalNode('', ['p', 'normal', '4rem 0']);

  lst(span('模块化规范') + '就是对代码进行模块化的拆分与组合时， 需要遵守的那些规则。');

  SM('例如：');
  lst('使用什么样的语法格式来' + span('引用模块', '#047ffd'), [111, 'disc', 2]);
  lst('在模块中使用什么样的语法格式' + span('向外暴露成员', '#047ffd'), [0, 'disc', 2]);

  add_normalNode('', ['p', 'normal', '2rem 0']);
  lst(span('模块化规范的好处：') + ' 大家都遵守同样的模块化规范写代码， 降低了沟通的成本， 极大方便了各个模块之间的相互调用， 利人利己。');


  add_normalNode('', ['p', 'normal', '32rem 0']);
}