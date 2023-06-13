// jquery ajax
function get_json(url, data, call) {
    $.ajax({
        url: url,
        data: data,
        success: rst => {
            call(rst)
        },
        error: err => {
            console.log(err);
        }
    })
}