function call() {} {
    ajax({
        url: 'text.txt',
        success: rst => {
            let para;
            para = rst.replace(/[\r\n]/g, '');
            para = para.replace(/单选题/g, '!==|CQ|*|*|');
            para = para.replace(/多选题/g, '!==|MCQ|*|*|');
            para = para.replace(/填空题/g, '!==|fill|*|*|');
            para = para.replace(/判断题/g, '!==|JQ|*|*|');
            para = para.replace(/正确答案： /g, '|*|*|');
            para = para.split('!==|');
            let CQ = [];
            let MCQ = [];
            let fill = [];
            let JQ = [];
            let final = [];
            for (let i in para) {
                para[i] = para[i].split('|*|*|');
                if (para[i][0] == 'CQ' || para[i][0] == 'MCQ') {
                    para[i][1] = para[i][1].split('|！》》|');
                    para[i][1][1] = para[i][1][1].split('|》》|');
                    para[i] = para[i].flat();
                    para[i][4] = 2;
                    if (para[i][0] == 'MCQ') {
                        para[i][3] = para[i][3].split('');
                        for (let j in para[i][3]) {
                            para[i][3][j] = para[i][3][j].charCodeAt(0) - 64;
                        }
                        MCQ[MCQ.length] = para[i];
                    } else {
                        para[i][3] = para[i][3].charCodeAt(0) - 64;
                        CQ[CQ.length] = para[i];
                    }
                } else if (para[i][0] == 'JQ') {
                    para[i][2] == '错误' ? para[i][2] = 0 : para[i][2] = 1;
                    para[i][3] = 2;
                    JQ[JQ.length] = para[i];
                } else if (para[i][0] == 'fill') {
                    para[i][1] = para[i][1].split('正确答案：');
                    para[i] = para[i].flat();
                    para[i][2] = para[i][2].split('填空 ');
                    para[i][1] = para[i][1].replace(/填空 /g, '_|__|_');
                    para[i][1] = para[i][1].split('|__|');
                    for (let j in para[i][1]) {
                        if (para[i][1][j] != '_' && para[i][1][j].indexOf('_') == 0) {
                            para[i][1][j] = para[i][1][j].substr(2, para[i][1][j].length);
                        }
                    }
                    para[i][1] = para[i][1].join('__');
                    for (let j in para[i][2]) {
                        para[i][2][j] = para[i][2][j].substr(2, para[i][2][j].length);
                    }
                    para[i][2].shift();
                    para[i][3] = 2;
                    fill[fill.length] = para[i];
                }
            }

            let space = [
                ['elem', '\n\n\n\n', [0.96, 400]]
            ];
            let tit = [
                ['elem', '\n\n' + para[0],
                    [1.6, 400, '0.32rem'],
                    [
                        ['position', 'relative'],
                        ['left', '10%'],
                        ['textShadow', 'rgb(0 0 255 / 20%) 0.1rem 0.1rem 0.24rem, rgb(51 51 34 / 13%) 0.16rem 0.16rem 0.32rem'],
                        ['addClassName', 'questionsPart']
                    ]
                ]
            ];
            let CQ_tit = [];
            let MCQ_tit = [];
            let fill_tit = [];
            let JQ_tit = [];
            CQ_tit = CQ.length ? [
                ['elem', '\n\t 单选题', [0.96, 800],
                    [
                        ['MB', '0.32rem']
                    ]
                ]
            ] : [];
            MCQ_tit = MCQ.length ? [
                ['elem', '\n\t 多选题', [0.96, 800],
                    [
                        ['MB', '0.32rem']
                    ]
                ]
            ] : [];
            fill_tit = fill.length ? [
                ['elem', '\n\t 填空题', [0.96, 800],
                    [
                        ['MB', '0.32rem']
                    ]
                ]
            ] : [];
            JQ_tit = JQ.length ? [
                ['elem', '\n\t 判断题', [0.96, 800],
                    [
                        ['MB', '0.32rem']
                    ]
                ]
            ] : [];
            para.shift();
            let question_length = 0;
            question_length += CQ.length;
            question_length += MCQ.length;
            question_length += JQ.length;
            question_length += fill.length;
            console.log(CQ);
            console.log(MCQ);
            console.log(JQ);
            console.log(fill);
            console.log(tit);
            console.log(question_length);
            final = [...tit, ...JQ_tit, ...JQ, ...fill_tit, ...fill, ...CQ_tit, ...CQ, ...MCQ_tit, ...MCQ, ...space];
            console.log(final);
        }
    });
}

['elem', '\n\nstring', [1.6, 400, '0.32rem'],
    [
        ['position', 'relative'],
        ['left', '10%'],
        ['textShadow', 'rgb(0 0 255 / 20%) 0.1rem 0.1rem 0.24rem, rgb(51 51 34 / 13%) 0.16rem 0.16rem 0.32rem'],
        ['addClassName', 'questionsPart']
    ]
],

[]