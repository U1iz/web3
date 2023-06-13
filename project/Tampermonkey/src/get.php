<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php echo '<title>' . $_GET['title'] . '</title>' ?>
    <script src="/notes/lib/jQuery.min.js"></script>
    <script src="/notes/rsc/lib/lib.min.js"></script>
    <script src="/notes/rsc/lib/local_lib.min.js"></script>
    <script src="/notes/rsc/lib/highlight.js/highlight.min.js"></script>
    <script src="/notes/rsc/item/add_CSSNode/add_CSSNode.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        li {
            list-style-type: none;
        }
    </style>
</head>

<body>
    <script>
        ajax({
            url: '<?php echo $_GET['name'] ?>',
            success: (rst) => {
                LM('<?php echo  $_GET['title'] ?>');
                hlc({
                    text: rst,
                    code_type: 'javascript'
                });
                space();
            },
            async: false
        });
    </script>
    <script src="/notes/rsc/lib/beforeLoading.js"></script>
    <script src="/notes/rsc/lib/toggle.js"></script>
    <script src="/notes/rsc/lib/CodeRenderer.js"></script>
</body>

</html>