let step = 0;

function addCav(num) {
    num != undefined ? step = num : null;
    let s;
    window.addEventListener('DOMContentLoaded', () => {
        step == 0 ? s = '' : s = step;
        document.querySelectorAll('.canvas_wrap')[step].innerHTML += `<canvas id="cav` + s +
            `" width="640" height="400"><img src="img.png" alt=""></canvas>`;
        step++;
    });
}

function c(str) {
    return '<span class="paragraphCode">' + str + '</span>'
}

window.addEventListener('load', () => {
    const base = parseFloat(document.documentElement.style.fontSize);
    window.addEventListener('keyup', e => {
        if (e.keyCode >= 49 && e.keyCode <= 57) {
            let multiplier = e.keyCode - 49;
            document.documentElement.style.fontSize = multiplier * 3.2 + base + 'px';
        } else if (e.keyCode == 48) {
            document.documentElement.style.fontSize = '16px';
        }
    });

    sessionStorage.getItem('sp') != 'true' &&(() => {
        let p = document.createElement('p');
        p.className = 'fontInfo';
        p.style.transition = 'all 0.3s';

        p.innerHTML = '字母数字键：0 ~ 9<br />更改页面文本基数大小： <span></span><span>&#x2718;</span>';
        p.querySelector('span').style.color = '#233';
        p.querySelectorAll('span')[1].className = 'closeBtn';
        p.querySelectorAll('span')[1].onclick = () => {
            p.querySelectorAll('span')[1].style.color = 'transparent';
            setTimeout(() => {
                p.className += ' fontInfo_leave';
                setTimeout(() => {
                    p.remove();
                }, 420)
            }, 420)
        };
        p.onselectstart = function () {
            return false;
        };

        document.body.appendChild(p);

        function showFontInfo() {
            let info = document.querySelector('p').querySelector('span');
            info.innerHTML = document.documentElement.style.fontSize;
        }
        showFontInfo();
        window.addEventListener('keydown', () => {
            showFontInfo();
            setTimeout(() => {
                showFontInfo();
            }, 200);
        });
    })();
});