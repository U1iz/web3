if (!sessionStorage.getItem('addTarget')) {
    sessionStorage.setItem('addTarget', 0);
    addTarget();
} else {
    sessionStorage.setItem('addTarget', 1);
};
window.addEventListener('load', function () {
    sessionStorage.removeItem('addTarget');
    if (!document.getElementById('targetToHonePageCtr')) {
        addTarget();
    };
});

function addTarget() {
    window.addEventListener('DOMContentLoaded', function () {
        let sn = document.createElement('style');
        document.head.appendChild(sn);
        sn.innerText = "body{height: 100%;}#targetToHonePageCtr{position:sticky;bottom:0;background-color:rgba(0,0,0,0.1);padding:0;display:flex;justify-content:space-around;transition:all 0.3s;}#targetToHonePageCtr:hover{padding:0.6rem 0;background-color:rgba(0,0,0,.3);}.targetToHonePageLink{cursor:pointer!important;padding:0.6rem 2.4rem;transition:all 0.3s;}.targetToHonePageLink:hover{background-color:#fff;}";
        let div = document.createElement("div");
        div.id = 'targetToHonePageCtr';
        document.body.appendChild(div);
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        p1.innerHTML = '主页';
        p2.innerHTML = '主站';
        p1.className = 'targetToHonePageLink';
        p2.className = 'targetToHonePageLink';
        div.appendChild(p1);
        div.appendChild(p2);
        document.body.style.minHeight = document.documentElement.clientHeight + "px";
        let lnk = document.querySelectorAll('.targetToHonePageLink');
        lnk[0].onclick = function () {
            window.open('http://96yzl.usa3v.vip/HTML/project');
        };
        lnk[1].onclick = function () {
            window.open('http://res1433223.net3v.net/');
        };
    })
};