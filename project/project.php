<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>项目集合</title>
    <style>
        * {
            border: none;
            outline: none;
            margin: 0;
            padding: 0;
            cursor: default;
            vertical-align: middle;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            cursor: url(http://96yzl.usa3v.vip/HTML/project/Unity/rsc/img/ico/default.cur), default !important;
        }

        li {
            position: relative;
            font-weight: 400;
            color: rgb(127, 210, 212);
        }

        body {
            background-color: #e8f5f5 !important;
            overflow-x: hidden ! important;
        }

        ::selection {
            background-color: rgba(181, 212, 226, 0.24) !important;
            color: rgba(255, 255, 255, 0.72) !important;
        }

        ::-webkit-scrollbar {
            position: absolute;
            background-color: transparent;
            width: 0.24rem;
            height: 0.25rem
        }

        ::-webkit-scrollbar-track {
            background-color: rgba(49, 231, 156, 0.32);
            -webkit-border-radius: 2em;
            -moz-border-radius: 2em;
            border-radius: 2em
        }

        ::-webkit-scrollbar-thumb {
            background-color: #000;
            background-color: rgb(223, 118, 20) !important;
            background-image: linear-gradient(0deg, rgba(227, 202, 255, 0.16), rgba(202, 215, 255, 0.16));
            -webkit-border-radius: 2em;
            -moz-border-radius: 2em;
            border-radius: 2em
        }

        code::selection {
            background: rgba(245, 198, 205, 0.72);
            color: rgba(160, 193, 118, 0.96) !important;
        }

        code.codeNodes_cmd_addBy_funCode::selection {
            background: rgba(255, 255, 255, 0.3) !important;
            color: #fff !important;
        }

        code.codeNodes_tArea_addBy_funCode::selection {
            background: #0078d7 !important;
            color: #fff !important;
        }

        img,
        video {
            object-fit: cover;
            -webkit-object-fit: cover;
        }

        a {
            cursor: url(http://96yzl.usa3v.vip/HTML/project/Unity/rsc/img/ico/pointer.cur), pointer !important;
        }
    </style>
    <style>
        * {
            padding: 0.6rem;
            margin: 0.3rem;
        }

        html {
            font-size: 24px;
        }

        .btn {
            display: block;
            transition: all 0.3s;
        }

        .btn:hover {
            background: #eee;
            text-indent: 3em;
        }
    </style>
    <script src="/notes/lib//jQuery.min.js"></script>
    <script src="/notes/rsc/lib/lib.min.js"></script>
    <script src="/notes/rsc/lib/local_lib.min.js"></script>
</head>

<body>
    <script>
        // let para = <?php echo '"' . $_GET['projects'] . '"' ?>;
        let para = getURL('projects') ? getURL('projects').split(',') : [];
        $.each(para, function(i, e) {
            add_elem(e);
        });

        function add_elem(tex) {
            let t = tex.split(':');
            ($(document.body)).append('<div class="btn">' + t[0] + '</div>')
            $('.btn').on('click', function() {
                if (t[1] != 'php') {
                    window.open(t[0] + '/' + t[1], '_blank');
                }
            });
        }
    </script>
</body>

</html>