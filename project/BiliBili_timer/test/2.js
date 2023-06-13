const ERR_NONE = 0;
const ERR_ISE = 10;
const ERR_INVALID_LINK_OR_ID = 20;
const ERR_INVALID_CMD = 30;
const ERR_NOTHING = 40;
const ERR_CRITICAL = 50;
const ERR_NO_COVER = 60;
const ERR_NEED_REFRESH = 70;
const ERR_RISK_CONTROL = 80;
const ERR_REQUEST_FAILED = 90;

function getErrMsg(b) {
    switch (b) {
        case ERR_ISE:
            return "服务器内部错误！";
        case ERR_INVALID_LINK_OR_ID:
            return "无效的链接或ID！";
        case ERR_INVALID_CMD:
            return "无效的命令！";
        case ERR_NOTHING:
            return "啥都木有";
        case ERR_CRITICAL:
            return "严重错误，请刷新本页面重试！";
        case ERR_NO_COVER:
            return "没有找到封面！";
        case ERR_NEED_REFRESH:
            return "服务端已更新，请刷新本页面重试！";
        case ERR_RISK_CONTROL:
            return "请求太频繁, 请稍后重试！";
        case ERR_REQUEST_FAILED:
            return "请求出错，请稍后重试！";
        default:
            return "错误"
    }
}

function errorLyr(d, g, f, h, e, c, b) {
    layer.closeAll("loading");
    var i;
    if (isNumber(d)) {
        i = getErrMsg(d)
    } else {
        if (isString(d)) {
            i = (d == "" ? "错误" : d)
        } else {
            i = "错误"
        }
    }
    if (g) {
        f = ['<i class="layui-icon">&#xe669;</i> 刷新'];
        h = e = c = b = _refresh
    }
    layui.use(["layer"], function () {
        layui.layer.alert(i || "错误", {
            btn: f || ["确认"],
            title: "错误",
            icon: 2,
            cancel: h,
            btn1: function (k, j) {
                e ? e(k) : layer.close(k)
            },
            btn2: function (k, j) {
                c ? c(k) : layer.close(k)
            },
            btn3: function (k, j) {
                b ? b(k) : layer.close(k)
            }
        })
    })
}

function infoLyr(c, b) {
    layer.closeAll("loading");
    b = b || "信息";
    layui.use(["layer"], function () {
        layui.layer.alert(c, {
            title: b
        })
    })
}

function critical(b) {
    var c = getErrMsg(ERR_CRITICAL);
    if (b) {
        c += "<br>[code = " + b + "]"
    }
    errorLyr(c, true)
}

function errorContactAdmin(b) {
    errorLyr("请点击页面右上角“反馈”按钮，联系管理员！<br>错误代码：" + b)
}

function _check(f, e, b) {
    if (f == null || b == null) {
        return false
    }
    if (!(e instanceof Array)) {
        e = [e]
    }
    if (!(b instanceof Array)) {
        b = [b]
    }
    for (var d = 0; d < e.length; ++d) {
        for (var c = 0; c < b.length; ++c) {
            if (!(b[c](f, e[d]))) {
                return false
            }
        }
    }
    return true
}

function _in(c, b) {
    return (b in c)
}

function _not_null(c, b) {
    return _in(c, b) && c[b] != null
}

function _not_empty(c, b) {
    return _not_null(c, b) && c[b].length != 0
}

function checkIN(c, b) {
    return _check(c, b, [_in])
}

function checkNN(c, b) {
    return _check(c, b, [_not_null])
}

function checkNE(c, b) {
    return _check(c, b, [_not_empty])
}

function isArray(b) {
    return Array.isArray(b)
}

function isObject(b) {
    return (b instanceof Object)
}

function isBool(b) {
    return (typeof b == "boolean")
}

function isString(b) {
    return (typeof b == "string")
}

function isNumber(b) {
    return (typeof b == "number") && !isNaN(b)
}
var check = checkNN;

function formatImageUrlHttps(b) {
    if (b.substr(0, 5) == "http:") {
        b = "https:" + b.substr(5)
    } else {
        if (b.substr(0, 2) == "//") {
            b = "https:" + b
        } else {
            if (b.substr(0, 4) != "http") {
                b = "https://" + b
            }
        }
    }
    return b
}

function formatImageUrlHttp(b) {
    if (b.substr(0, 6) == "https:") {
        b = "http:" + b.substr(6)
    } else {
        if (b.substr(0, 2) == "//") {
            b = "http:" + b
        } else {
            if (b.substr(0, 4) != "http") {
                b = "http://" + b
            }
        }
    }
    return b
}

function visit(b) {
    if (b.substr(0, 2) == "//") {
        b = "http:" + b
    } else {
        if (b.substr(0, 4) != "http") {
            b = "http://" + b
        }
    }
    window.open(b)
}

function U(b) {
    if (!b || b == "") {
        return "#"
    } else {
        if (b.substr(0, 1) == "/") {
            return INDEX + b
        } else {
            return INDEX + "/" + b
        }
    }
}

function S(b) {
    if (!b || b == "") {
        return "#"
    } else {
        if (b.substr(0, 1) == "/") {
            return STATIC + b
        } else {
            return STATIC + "/" + b
        }
    }
}

function unixtime() {
    return Math.round(new Date().getTime() / 1000)
}

function unixtime_ms() {
    return new Date().getTime()
}

function min(d, c) {
    return d < c ? d : c
}

function max(d, c) {
    return d > c ? d : c
}

function formatUri(b) {
    return (b.substr(0, 1) == "/") ? b : "/" + b
}

function _show(b, c) {
    $(b).css("display", (c == false) ? "none" : "block")
}
$.fn.textWidth = function (c, b) {
    if (!$.fn.textWidth.fakeEl) {
        $.fn.textWidth.fakeEl = $("<span>").hide().appendTo(document.body)
    }
    $.fn.textWidth.fakeEl.text(c || this.val() || this.text() || this.attr("placeholder")).css("font", b || this.css("font"));
    return $.fn.textWidth.fakeEl.width()
};

function merge(d) {
    if (!isArray(d)) {
        return null
    }
    var c = new Object();
    for (var b = 0; b < d.length; ++b) {
        $.extend(c, d[b])
    }
    return c
}

function getUrlParam(b) {
    var e = window.location.search.substring(1);
    var d = e.split("&");
    for (var c = 0; c < d.length; c++) {
        var f = d[c].split("=");
        if (f[0] === b) {
            return f[1] === undefined ? null : decodeURIComponent(f[1])
        }
    }
    return null
}

function setCookie(b, c) {
    $.cookie(b, c, {
        expires: 365,
        domain: "bilibiliq.com",
        path: "/"
    })
}

function getCookie(b) {
    return $.cookie(b)
}

function removeCookie(b) {
    $.removeCookie(b, {
        domain: "bilibiliq.com",
        path: "/"
    })
}

function _ajax_get(d, e, c, b) {
    $.ajax({
        type: "get",
        cache: false,
        timeout: 8000,
        headers: {
            UID: BQ_UID
        },
        url: d,
        success: function (f) {
            IS_ADMIN && console.log(f);
            e && e(this, f)
        },
        error: function (f, h, g) {
            c && c(this)
        },
        complete: function (g, f) {
            layer.closeAll("loading");
            b && b(this)
        }
    })
}

function __ajax_post(d, e, g, f, c, b) {
    $.ajax({
        type: "post",
        processData: false,
        contentType: g,
        cache: false,
        timeout: 8000,
        headers: {
            UID: BQ_UID
        },
        url: d,
        data: e,
        success: function (h) {
            IS_ADMIN && console.log(h);
            f && f(this, h)
        },
        error: function (h, j, i) {
            c && c(this)
        },
        complete: function (i, h) {
            layer.closeAll("loading");
            b && b(this)
        }
    })
}

function _ajax_post(d, f, g, c, b) {
    var e = $.param(f);
    __ajax_post(d, e, "application/x-www-form-urlencoded", g, c, b)
}

function _ajax_post_json(d, e, f, c, b) {
    __ajax_post(d, e, "application/json", f, c, b)
}

function _api_get_helper_1(d, e, f, c, b) {
    _ajax_get(d, function (h, g) {
        if (_process_api_response(h, g, e)) {
            f && f(h, g)
        }
    }, function (g) {
        errorLyr(ERR_REQUEST_FAILED, e);
        c && c(g)
    }, b)
}

function _api_post_helper_1(d, f, e, g, c, b) {
    _ajax_post(d, f, function (i, h) {
        if (_process_api_response(i, h, e)) {
            g && g(i, h)
        }
    }, function (h) {
        errorLyr(ERR_REQUEST_FAILED, e);
        c && c(h)
    }, b)
}

function _api_post_json_helper_1(d, f, e, g, c, b) {
    _ajax_post_json(d, f, function (i, h) {
        if (_process_api_response(i, h, e)) {
            g && g(i, h)
        }
    }, function (h) {
        errorLyr(ERR_REQUEST_FAILED, e);
        c && c(h)
    }, b)
}

function _api_get_helper_2(i, f, h, e, g, d, b) {
    var c = i + formatUri(f);
    if (h) {
        c += "?" + $.param(h)
    }
    return _api_get_helper_1(c, e, g, d, b)
}

function _api_post_helper_2(i, f, g, e, h, d, b) {
    var c = i + formatUri(f);
    return _api_post_helper_1(c, g, e, h, d, b)
}

function _api_post_json_helper_2(i, f, g, e, h, d, b) {
    var c = i + formatUri(f);
    return _api_post_json_helper_1(c, g, e, h, d, b)
}

function _api_get(e, g, d, f, c, b) {
    return _api_get_helper_2(URL_API, e, g, d, f, c, b)
}

function _api_post(e, f, d, g, c, b) {
    return _api_post_helper_2(URL_API, e, f, d, g, c, b)
}

function _api_post_json(e, f, d, g, c, b) {
    return _api_post_json_helper_2(URL_API, e, f, d, g, c, b)
}

function _bq_api_get(e, g, d, f, c, b) {
    return _api_get_helper_2(URL_BILIBILIQ_API, e, g, d, f, c, b)
}

function _bq_api_post(e, f, d, g, c, b) {
    return _api_post_helper_2(URL_BILIBILIQ_API, e, f, d, g, c, b)
}

function _bq_api_post_json(e, f, d, g, c, b) {
    return _api_post_json_helper_2(URL_BILIBILIQ_API, e, f, d, g, c, b)
}
var g_last_flag = null;

function _process_api_response(e, b, c) {
    IS_ADMIN && console.log(b);
    if (b == null || !check(b, ["code", "msg", "_"])) {
        errorLyr(ERR_ISE, c);
        return false
    }
    if (g_last_flag == null) {
        g_last_flag = b._
    } else {
        if (b._ != g_last_flag) {
            errorLyr(ERR_NEED_REFRESH, true);
            return false
        }
    }
    var d = b.code;
    if (d != 0) {
        if (d < 0 || d == 100 || d == 101) {
            report_ajax(e, b);
            critical(d);
            return false
        } else {
            if (d >= 300 && d < 310) {
                errorLyr(ERR_RISK_CONTROL, c);
                return false
            } else {
                if (d == 500) {
                    report_ajax(e, b);
                    errorLyr(ERR_ISE, c);
                    return false
                }
            }
        }
    }
    return true
}

function bqApiGet(f, h, e, g, d, b) {
    var c = {
        fp: g_fp
    };
    if (isObject(h)) {
        $.extend(c, h)
    } else {
        if (isBool(h)) {
            b = d;
            d = g;
            g = e;
            e = h
        } else {
            return critical()
        }
    }
    return _bq_api_get(f, c, e, function (j, i) {
        if (bqProcessResponse(j, i, e)) {
            g && g(j, i)
        }
    }, d, b)
}

function bqApiPost(f, g, e, h, c, b) {
    var d = {
        fp: g_fp
    };
    if (isObject(g)) {
        $.extend(d, g)
    } else {
        if (isBool(g)) {
            b = c;
            c = h;
            h = e;
            e = g
        } else {
            return critical()
        }
    }
    _bq_api_post(f, d, e, function (j, i) {
        if (bqProcessResponse(j, i, e)) {
            h && h(j, i)
        }
    }, c, b)
}

function bqProcessResponse(e, b, c) {
    var d = b.code;
    if (d != 0) {
        if (d == 1005) {
            critical();
            return false
        }
    }
    return true
}

function resetUserSetting(c, b) {
    g_setting.intro_space = false;
    g_setting.intro_video_archive = false;
    g_setting.intro_article_archive = false;
    g_setting.intro_audio_archive = false;
    g_setting.intro_share_link = false;
    g_setting.intro_others = false;
    g_setting.i_know_about_downloading = false;
    g_setting.i_know_about_title_url = false;
    g_setting.i_know_about_search_image = false;
    updateUserSetting(g_setting, c, b)
}

function updateUserSetting(c, d, b) {
    if (!isObject(c)) {
        return
    }
    bqApiPost("/user/setting/update", c, false, function (g, e) {
        var f = e.code;
        if (f != 0) {
            return b && b()
        }
        return d && d()
    })
}

function enableUserHistory(b, d) {
    var c = {
        enabled: b
    };
    bqApiPost("/user/history/enable", c, false, function (h, e) {
        var f = e.code,
            i = e.msg,
            g = e.data;
        if (f != 0) {
            return errorLyr(ERR_ISE, false)
        }
        d && d(g)
    })
}

function clearUserHistory(b) {
    bqApiPost("/user/history/clear", false, function (f, c) {
        var d = c.code,
            g = c.msg,
            e = c.data;
        if (d != 0) {
            return errorLyr(ERR_ISE, false)
        }
        b && b(e)
    })
}
var get_global_variables = null;

function _report(b) {
    StackTrace.get().then(function (d) {
        var c = d.map(function (f) {
            return f.toString()
        }).join("\n\n");
        var e = {
            fp: g_fp,
            env: JSON.stringify(b),
            stack: c
        };
        _ajax_post(URL_BILIBILIQ_API + "/report/new", e)
    })
}

function report(c) {
    var b = get_global_variables ? get_global_variables() : {
        get_global_variables: null
    };
    _report(merge([c, b]))
}

function report_ajax(d, c, b) {
    report({
        Ajax: !d ? null : {
            contentType: d.contentType,
            data: d.data,
            type: d.type,
            url: d.url
        },
        Ajax_res: c,
        Ajax_zinfo: b
    })
}

function report_msg(b) {
    report({
        _err_msg: b
    })
}

function prepareReturnTop() {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            $("#return-top").fadeIn(300)
        } else {
            $("#return-top").fadeOut(200)
        }
    });
    $(document).on("click", "#return-top", function () {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 1000)
    })
}

function collaspeNav() {
    $(".navbar-collapse").collapse("hide")
}

function prepareAutoCollaspeNav() {
    $(window).scroll(function () {
        if ($(window).width() < 768) {
            collaspeNav()
        }
    });
    $(window).click(function () {
        if ($(window).width() < 768) {
            collaspeNav()
        }
    })
}

function _log(i, d, e, b, h) {
    var c = '<img class="log-icon va-mid-item-left" src="' + S(e) + '"/><span class="log-msg va-mid-item-right"><font color="' + b + '">&nbsp;' + h + "</font></span>";
    var g = $("#" + i + " div[name=" + d + "]");
    if (g.length > 0) {
        g.html(c)
    } else {
        var f = '<div class="log" name="' + d + '">' + c + "</div>";
        $("#" + i).append(f)
    }
}

function _clear_log(b) {
    $("#" + b).empty()
}

function clearLogs() {
    _clear_log("info");
    _clear_log("error")
}

function info(c, d, b) {
    b = b || "green";
    _log("info", c, "img/info.svg", b, d)
}

function clearInfo(b) {
    $("#info div[name=" + b + "]").remove()
}

function clearInfos() {
    _clear_log("info")
}

function error(b, c) {
    _log("error", b, "img/error.svg", "red", c)
}

function clearError(b) {
    $("#error div[name=" + b + "]").remove()
}

function clearErrors() {
    _clear_log("error")
}

function getLink() {
    var b = $("#link-input").val();
    if (!isString(b)) {
        b = ""
    }
    return b.trim()
}

function _set_link(b) {
    if (!isString(b)) {
        b = ""
    }
    $("#link-input").val(b)
}

function setLink(b) {
    if (isString(b) && b != "") {
        _set_link(b);
        doParseLink(b)
    }
}

function clearLink() {
    _set_link("");
    focusLinkInput(true)
}

function focusLinkInput(b) {
    if (b == false) {
        $("#link-input").blur()
    } else {
        $("#link-input").focus()
    }
}

function parseLink() {
    showGuide(false);
    removeCookie("_link_");
    try {
        var d = getLink();
        if (d == "") {
            return
        }
        var b = unixtime();
        var e = b - g_last_request_time;
        if (!IS_ADMIN && (d == g_link && e < 2) || (d != g_link && e < 1)) {
            return errorLyr("技能冷却中，请稍后重试！")
        }
        focusLinkInput(false);
        clearChoiceList();
        doParseLink(d)
    } catch (c) {
        console.log(c);
        errorContactAdmin("015");
        report({
            _err_msg_desc: "parseLink throw error",
            _err_msg: c.message
        })
    }
}

function initBeforeParseLink() {
    g_stdlink = "";
    g_upload_key = "";
    clearImages();
    clearShareLink();
    clearDesc();
    clearErrors();
    clearInfos();
    clearOptArea();
    showHelp(false);
    showUploadBtn(false);
    showButtonShowMore(0)
}

function doParseLink(c) {
    if (g_is_parse_link) {
        console.log("task:ParseLink is running, please wait...");
        return
    }
    g_is_parse_link = true;
    g_curr_id_parse_link++;
    try {
        if (!_do_parse_link(c)) {
            g_is_parse_link = false
        }
    } catch (b) {
        g_is_parse_link = false;
        errorContactAdmin("035");
        report({
            _err_msg_desc: "doParseLink failed",
            _err_msg: b.message
        })
    }
}

function _do_parse_link(c) {
    showGuide(false);
    removeCookie("_link_");
    if (!isString(c)) {
        return false
    }
    c = c.trim();
    if (!c || c == "") {
        return false
    }
    g_link = c;
    g_use_cache = isUseCache();
    g_last_request_time = unixtime();
    try {
        initBeforeParseLink()
    } catch (b) {
        errorContactAdmin("025");
        report({
            _err_msg_desc: "_do_parse_link init failed",
            _err_msg: b.message
        });
        return false
    }
    var e = g_curr_id_parse_link;
    setTimeout(function () {
        if (g_is_parse_link && e == g_curr_id_parse_link) {
            layer.load()
        }
    }, 2000);
    var d = {
        device: DEVICE,
        from: INDEX,
        link: c,
        use_cache: g_use_cache
    };
    bqApiPost("/parse-link", d, false, function (g, f) {
        processParseLinkResponse(g, f)
    }, function (g, f) {}, function (f) {
        g_is_parse_link = false
    });
    return true
}

function processParseLinkResponse(e, b) {
    useCache(true);
    var c = b.code,
        f = b.msg,
        d = b.data;
    if (c != 0) {
        if (c == 1001) {
            showHelp(true);
            return errorLyr(ERR_INVALID_LINK_OR_ID)
        } else {
            report_ajax(e, b, "invalid code=" + c);
            return errorLyr(ERR_ISE)
        }
    }
    if (!d || !check(d.result, ["code", "msg"])) {
        report_ajax(e, b, "missing data[result][code/msg]");
        return errorLyr(ERR_ISE)
    }
    if (!check(d, ["type", "subtype", "id_std", "stdlink", "upload_key"])) {
        report_ajax(e, b, "missing data[type/subtype/id_std/...]");
        return errorLyr(ERR_ISE)
    }
    processParseLinkResponseByType(e, b)
}

function processParseLinkResponseByType(l, j) {
    var h = j.data;
    var k = h.type,
        i = h.subtype,
        c = h.id_std,
        e = h.stdlink,
        g = h.upload_key;
    g_stdlink = e;
    g_upload_key = g;
    foldChoiceList(true);
    if ($.inArray(k, ["video", "article", "audio", "live", "space", "game", "dynamic", "readlist", "bangumi_media", "bangumi_play", "picture", "archive"]) >= 0) {
        var b = j.data.result;
        var d = b.code,
            f = b.msg;
        if (b.data && b.data.has_related) {
            info("related", "下方有原图或相关图片")
        }
        switch (d) {
            case 0:
                break;
            case 404:
                return errorLyr(ERR_NOTHING);
            default:
                report_ajax(l, j);
                return errorLyr(ERR_ISE)
        }
        g_setting.count++;
        if (k == "video") {
            return processAsVideo(l, j)
        } else {
            if (k == "article") {
                return processAsArticle(l, j)
            } else {
                if (k == "audio") {
                    return processAsAudio(l, j)
                } else {
                    if (k == "live") {
                        return processAsLive(l, j)
                    } else {
                        if (k == "space") {
                            return processAsSpace(l, j)
                        } else {
                            if (k == "game") {
                                return processAsGame(l, j)
                            } else {
                                if (k == "dynamic") {
                                    return processAsDynamic(l, j)
                                } else {
                                    if (k == "readlist") {
                                        return processAsReadList(l, j)
                                    } else {
                                        if (k == "bangumi_media") {
                                            return processAsBangumiMedia(l, j)
                                        } else {
                                            if (k == "bangumi_play") {
                                                return processAsBangumiPlay(l, j)
                                            } else {
                                                if (k == "archive") {
                                                    if (i == "video") {
                                                        return processAsArchiveVideo(l, j)
                                                    } else {
                                                        if (i == "article") {
                                                            return processAsArchiveArticle(l, j)
                                                        } else {
                                                            if (i == "audio") {
                                                                return processAsArchiveAudio(l, j)
                                                            } else {
                                                                report_ajax(l, j, "invalid subtype=" + i);
                                                                return errorLyr(ERR_INVALID_LINK_OR_ID)
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    if (k == "picture") {
                                                        return processAsPicture(l, j)
                                                    } else {
                                                        report_ajax(l, j, "invalid type=" + k);
                                                        return errorLyr(ERR_ISE)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (k == "number") {
            return processAsNumber(l, j)
        } else {
            if (k == "cmd") {
                return processAsCmd(l, j)
            } else {
                if (k == "search") {
                    return processAsSearch(l, j)
                } else {
                    if (k == "share") {
                        return processAsShareLink(l, j)
                    } else {
                        if (k == "probable") {
                            if (i == "video_bv") {
                                return processAsProbableVideoBv(l, j)
                            } else {
                                report_ajax(l, j, "invalid subtype=" + i);
                                return errorLyr(ERR_INVALID_LINK_OR_ID)
                            }
                        } else {
                            report_ajax(l, j, "invalid type=" + k);
                            return errorLyr(ERR_INVALID_LINK_OR_ID)
                        }
                    }
                }
            }
        }
    }
}
const URL_BILIBILI_HOMEPAGE = "https://www.bilibili.com/";
const URL_BILIBILI_VIDEO = "https://www.bilibili.com/video/";
const URL_BILIBILI_AUDIO = "https://www.bilibili.com/audio/";
const URL_BILIBILI_SPACE = "https://space.bilibili.com/";
const URL_BILIBILI_LIVE = "https://live.bilibili.com/";
const URL_BILIBILI_ARTICLE = "https://www.bilibili.com/read/";
const URL_BILIBILI_GAME = "https://www.biligame.com/detail/?id=";
const URL_BILIBILI_BANGUMI_PLAY = "https://www.bilibili.com/bangumi/play/";
const URL_BILIBILI_BANGUMI_MEDIA = "https://www.bilibili.com/bangumi/media/";
const URL_BILIBILI_DYNAMIC = "https://t.bilibili.com/";
const URL_BILIBILI_READLIST = "https://www.bilibili.com/read/readlist/";
const SRC_LOAD_IMAGE_FAILED = S("/img/reload_image.png");

function loadIndexImages() {
    bqApiGet("/index/get", false, function (g, d) {
        var e = d.code,
            h = d.msg,
            f = d.data;
        if (e != 0) {
            if (e != 404) {
                report_msg(g, d)
            }
            return
        }
        if (!check(f, ["description", "images", "title", "title_url"])) {
            report_msg(g, d);
            return
        }
        setDescTitle(f.title, f.title_url);
        if (f.description != "") {
            setDesc("index-description", f.description)
        }
        for (var c = 0; c < f.images.length; ++c) {
            var b = f.images[c];
            if (IS_MOBILE) {
                b.img_url = b.image_url_mobile
            } else {
                b.img_url = b.image_url_pc
            }
        }
        setImages(f.images);
        showImages(6, 6)
    })
}

function showHelp(b) {
    _show("#help", b)
}

function showGuide(b) {
    _show("#guide", b)
}

function showHistory() {
    setLink("{历史记录}")
}

function showExtension() {
    setLink("{扩展功能}")
}

function useCache(b) {
    return $("#cb-disable-cache").prop("checked", b == false)
}

function isUseCache() {
    return $("#cb-disable-cache").prop("checked") == false
}

function showPromptForDownloading() {
    if (!g_setting.i_know_about_downloading) {
        var b = IS_PC ? "如果点击按钮“下载图片”失败，请右键点击图片，然后“另存为”。" : "长按图片下载";
        b += '<a href="javascript:void(0);" onclick="iKnowAboutDownloading()" style="color:#6899E2;">【已阅】</a>';
        info("download", b, "green")
    }
}

function iKnowAboutDownloading() {
    clearInfo("download");
    g_setting.i_know_about_downloading = true;
    var b = {
        i_know_about_downloading: true
    };
    updateUserSetting(b)
}

function showPromptForSearchImage() {
    if (!g_setting.i_know_about_search_image) {
        var b = "双击图片可以“以图搜图”";
        b += '<a href="javascript:void(0);" onclick="iKnowAboutSearchImage()" style="color:#6899E2;">【已阅】</a>';
        info("search-image", b, "green")
    }
}

function iKnowAboutSearchImage() {
    clearInfo("search-image");
    g_setting.i_know_about_search_image = true;
    var b = {
        i_know_about_search_image: true
    };
    updateUserSetting(b)
}

function searchImg(c) {
    if (c >= g_imgs.length) {
        report_msg("Search img error: id>=g_imgs.length");
        return errorLyr("出错啦！请稍后重试！")
    }
    var b = g_imgs[c].img_url;
    if (b.indexOf("hdslb.com") != -1) {
        b += "@1920w_1920h.jpg"
    }
    layer.open({
        id: 1,
        type: 1,
        shadeClose: true,
        title: "请选择搜图平台",
        area: ["280px", "auto"],
        content: getHtmlOfSearchImage(b),
        btn: []
    })
}

function addSearchBtn(e, b, d) {
    e = formatImageUrlHttp(e);
    var c = '<div style="width:180px; margin:0;">  <button type="button" class="layui-btn layui-btn-primary layui-btn-fluid search-btn" onclick="' + d + "('" + e + "')\">" + b + "</button></div>";
    return c
}

function getHtmlOfSearchImage(c) {
    var b = ($("#upload").is(":hidden") ? "" : '<div id="searchimg-prompt" style="padding:10px;font-size:14px;">&nbsp;&nbsp找到原图或相关图片，可以点击底部的“上传图片”按钮上传，方便他人查看。</div>') + '<p style="padding:10px;font-size:14px;">&nbsp;&nbsp;点击查看<a href="' + U("ris") + '" target="_blank">以图搜图使用技巧</a></p><div style="margin:0 0; text-align:center; padding:0 50px 5px;">' + addSearchBtn(c, "百度", "searchImageByBaidu") + addSearchBtn(c, "Google", "searchImageByGoogle") + addSearchBtn(c, "Yandex", "searchImageByYandex") + "<br>" + addSearchBtn(c, "TinEye", "searchImageByTinEye") + addSearchBtn(c, "SauceNAO", "searchImageBySauceNAO") + addSearchBtn(c, "WhatAnime", "searchImageByWhatAnime") + addSearchBtn(c, "IQDB", "searchImageByIqdb") + "</div>";
    return b
}

function checkBs(b) {
    if (DEVICE == 1) {
        layer.confirm("请使用浏览器访问，获得更好的体验！<br><br>是否仍要继续？", {
            title: "温馨提示",
            btn: ["否", "是"]
        }, function (c) {
            layer.close(c)
        }, function (c) {
            layer.msg("请耐心等待，正在上传图片...");
            visit(b);
            layer.close(c)
        })
    } else {
        visit(b)
    }
}

function searchImageByBaidu(c) {
    var b = "https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shituindex&extUiData%5bisLogoShow%5d=1&image=" + c;
    checkBs(b)
}

function searchImageByGoogle(c) {
    var b = "https://www.google.com/searchbyimage?site=search&sa=X&image_url=" + c;
    checkBs(b)
}

function searchImageByYandex(c) {
    var b = "https://yandex.com/images/search?rpt=imageview&url=" + c;
    checkBs(b)
}

function searchImageByTinEye(c) {
    var b = "https://tineye.com/search?url=" + c;
    checkBs(b)
}

function searchImageBySauceNAO(c) {
    var b = "https://saucenao.com/search.php?url=" + c;
    checkBs(b)
}

function searchImageByWhatAnime(c) {
    var b = "https://trace.moe/?url=" + c;
    checkBs(b)
}

function searchImageByIqdb(c) {
    var b = "http://iqdb.org/?url=" + c;
    checkBs(b)
}

function clearFrontOptArea() {
    $("#front-opt-area").empty()
}

function clearBackOptArea() {
    $("#back-opt-area").empty()
}

function clearOptArea() {
    clearFrontOptArea();
    clearBackOptArea()
}

function setHtmlOfOptArea(b) {
    setHtmlOfFrontOptArea(b);
    setHtmlOfBackOptArea(b)
}

function setHtmlOfFrontOptArea(b) {
    $("#front-opt-area").html(b)
}

function setHtmlOfBackOptArea(b) {
    $("#back-opt-area").html(b)
}

function qrcode_ready() {}

function normal_ready() {
    if (DEVICE != 1) {
        checkNewNotification();
        setInterval(checkNewNotification, 180000)
    }
}

function document_ready() {
    setCookie("fp", g_fp);
    prepareReturnTop();
    prepareAutoCollaspeNav();
    get_global_variables = bq_get_global_variables;
    prepareUpload();
    setInterval(function () {
        if (!g_is_parse_link) {
            layer && layer.closeAll("loading")
        }
    }, 1500);
    var b = new ClipboardJS("#copy-share-link");
    b.on("success", function (c) {
        layer.tips("复制成功", "#share-link", {
            tips: [1, "#1abc9c"],
            tipsMore: false,
            time: 1500
        })
    });
    b.on("error", function (c) {
        report_msg("copy share link failed");
        layer.tips("复制失败", "#share-link", {
            tips: [1, "#1abc9c"],
            tipsMore: false,
            time: 1500
        })
    });
    $(window).resize(function () {
        var f = $("#img-list").width() - 12;
        for (var e = g_idx - 1; e >= 0; e--) {
            var c = g_imgs[e];
            var d = g_imgs_elem[e];
            if (c && d) {
                d.width = c.width > f ? f : c.width;
                d.width = (d.width < 100) ? 100 : d.width
            }
        }
    })
}

function prepareUpload() {
    if (DEVICE == 1) {
        $("#btn-upload-related").click(function () {
            layer.alert("使用浏览器访问，才能上传图片！")
        });
        return
    }
    var b, c;
    layui.use(["upload", "layer"], function () {
        var d = layui.upload,
            e = layui.layer;
        var f = d.render({
            elem: "#btn-upload-related",
            auto: false,
            field: "image",
            data: {
                fp: "",
                link: "",
                title: "",
                title_url: "",
                filename: "",
                md5: "",
                upload_key: ""
            },
            accept: "images",
            acceptMime: "image/*",
            headers: {
                UID: BQ_UID
            },
            url: URL_BILIBILIQ_API + "/related/upload",
            exts: "jpg|jpeg|bmp|png|webp|tif|tiff|gif|svg",
            size: 10240,
            choose: function (h) {
                f.config.elem.next()[0].value = "";
                var g = this.files = h.pushFile();
                h.preview(function (j, k, i) {
                    b = g[j].name;
                    getFileMD5(k, function (l) {
                        c = l;
                        preUpload(b, c, function () {
                            IS_ADMIN && console.log("need upload");
                            h.upload(j, k)
                        }, function (m) {
                            IS_ADMIN && console.log("not need upload");
                            processUploadResponse(m)
                        })
                    })
                })
            },
            before: function (g) {
                this.data.filename = b;
                this.data.md5 = c;
                this.data.fp = g_fp;
                this.data.link = g_stdlink;
                this.data.upload_key = g_upload_key;
                e.load()
            },
            done: function (h, g) {
                delete this.files[g];
                e.closeAll("loading");
                processUploadResponse(h)
            },
            error: function (h, g) {
                delete this.files[h];
                e.closeAll("loading");
                e.alert("上传失败，请稍后重试");
                report_msg("上传图像失败")
            }
        })
    })
}

function getFileMD5(c, d, b) {
    let spark = new SparkMD5.ArrayBuffer();
    let fileReader = new FileReader();
    fileReader.onload = function (f) {
        spark.append(f.target.result);
        let md5 = spark.end();
        d && d(md5)
    };
    fileReader.onerror = function (f) {
        report_msg("Get file md5 failed");
        b && b(f)
    };
    fileReader.readAsArrayBuffer(c)
}

function processUploadResponse(b) {
    IS_ADMIN && console.log(b);
    if (b == null || !check(b, ["code", "msg", "_"])) {
        report_msg("上传图像失败: missing [code/msg]");
        return errorLyr(ERR_ISE, false)
    }
    var c = b.code;
    if (c != 0 || !check(b, ["data"])) {
        report_msg("上传图像失败：code=");
        return errorLyr("上传失败，请稍后重试", false)
    }
    var d = b.data;
    if (!check(d, ["key", "title", "title_url"])) {
        report_msg("上传图像失败: missing [key/title/title_url]");
        return errorLyr("上传失败，请稍后重试", false)
    }
    addDescForImage(d.key, d.title, d.title_url)
}

function addDescForImage(b, c, d) {
    layer.open({
        type: 1,
        title: "描述一下该图片~",
        area: ["300px", "auto"],
        content: getHtmlOfDescForImage(c, d),
        btn: ["确认", "删除"],
        btn1: function (f, e) {
            var g = $("#upload-img-title").val();
            var i = $("#upload-img-title-url").val();
            if (g == c && i == d) {
                layer.close(f);
                return layer.alert("上传成功，请等待管理员审核。")
            }
            var h = {
                key: b,
                title: g,
                title_url: i
            };
            bqApiPost("/related/desc", h, false, function (m, j) {
                var k = j.code,
                    n = j.msg,
                    l = j.data;
                layer.close(f);
                layer.alert("上传成功，请等待管理员审核。")
            })
        },
        btn2: function (f, e) {
            var g = {
                key: b
            };
            bqApiPost("/related/delete", g, false, function (k, h) {
                var i = h.code,
                    l = h.msg,
                    j = h.data;
                layer.close(f);
                layer.alert("删除成功")
            })
        },
        cancel: function (f, e) {
            layer.close(f);
            layer.alert("上传成功，请等待管理员审核。")
        }
    })
}

function getHtmlOfDescForImage(b, c) {
    return ' <div class="row" style="width:280px; margin-left:7px; margin-top:10px;"><div class="col-sm-12" style="padding:0 5px;"><div class="input-group"><span class="input-group-addon" style="padding: 6px 6px;">标题:</span><input id="upload-img-title" type="text" maxlength="128" class="form-control" placeholder="图片标题(可选)" value="' + (b || "") + '" style="padding: 6px 6px;"></div></div><div class="col-sm-12" style="padding:0 5px; margin-top:10px;"><div class="input-group"><span class="input-group-addon" style="padding: 6px 6px;">链接:</span><input id="upload-img-title-url" type="text" maxlength="255" class="form-control" placeholder="点击标题跳转(可选)" value="' + (c || "") + '" style="padding: 6px 6px;"></div></div></div>'
}

function preUpload(b, f, d, c) {
    var e = {
        filename: b,
        link: g_stdlink,
        md5: f,
        upload_key: g_upload_key,
        pre: true
    };
    bqApiPost("/related/upload", e, false, function (j, g) {
        var h = g.code,
            k = g.msg,
            i = g.data;
        if (h == 0) {
            c && c(g)
        } else {
            if (h == 404) {
                d && d()
            } else {
                report_ajax(j, g);
                return errorLyr(ERR_ISE)
            }
        }
    })
}

function showUploadBtn(b) {
    _show("#upload", b)
}

function setImages(b) {
    if (!isArray(b) || b.length == 0) {
        return errorLyr(ERR_NO_COVER)
    }
    for (var c = 0; c < b.length; ++c) {
        var d = b[c];
        d.img_url = formatImageUrlHttps(d.img_url)
    }
    g_imgs = b
}

function showImages(c, b) {
    foldChoiceList(true);
    if (c && c > 0) {
        while (c > 0 && g_idx < g_imgs.length) {
            showImage(g_idx);
            c--;
            g_idx++
        }
    } else {
        while (g_idx < g_imgs.length) {
            showImage(g_idx);
            g_idx++
        }
    }
    if (b) {
        if (b > 0 && b < 20) {
            g_more_count = b
        } else {
            g_more_count = 5
        }
    }
    if (b == 0) {
        showButtonShowMore(0)
    } else {
        showButtonShowMore(g_imgs.length - g_idx)
    }
}

function showImage(c) {
    var d = document.getElementById("img-list");
    if (d == null) {
        return critical()
    }
    if (c >= g_imgs.length) {
        return critical()
    }
    var g = g_imgs[c];
    var b = document.createElement("div");
    b.setAttribute("id", "img-container-" + c);
    b.setAttribute("class", "img-container");
    var j = (g.title_url == "") ? g.title : (g.show_icon ? '<img src="' + S("img/href_link.svg") + '"> ' : "") + '<a href="' + g.title_url + '" target="_blank">' + g.title + "</a>";
    var h = '<p class="sub-title" id="sub-title-' + c + '">' + j + "</p>";
    if (IS_PC) {
        h += '<button id="btn-down-img-' + c + '" class="img-btn img-btn-download" onclick="downloadImg(' + c + ')"><span>下载图片 </span></button>';
        h += '<button id="btn-search-img-' + c + '" class="img-btn img-btn-search" onclick="searchImg(' + c + ')"><span>以图搜图 </span></button>';
        h += '<button class="img-btn img-btn-qr-code" onmouseover="displayImg(' + c + ')" onmouseout="vanishImg(' + c + ')" onmousemove="displayImg(' + c + ')" style="vertical-align:middle"><span>手机查看 </span></button>';
        h += '<div id="qrcode-' + c + '" class="qrcode"></div>';
        if (g.is_related && IS_ADMIN) {
            h += '<button id="btn-delete-img-' + c + '" class="img-btn img-btn-delete" onclick="deleteImg(' + c + ')"><span>删除 </span></button>'
        }
    }
    h += '<img src="' + S("img/loading.gif") + '" id="loading-img-' + c + '" />';
    b.innerHTML = h;
    d.appendChild(b);
    var i = g_imgs_elem[c] = new Image();
    i.setAttribute("crossOrigin", "*");
    i.setAttribute("class", "img");
    i.setAttribute("id", "img-" + c);
    var e = b.clientWidth || b.offsetWidth;
    var k = e - 12;
    if (c == 0) {
        showPromptForDownloading();
        showPromptForSearchImage()
    }
    i.onload = function () {
        g.width = i.naturalWidth || i.width;
        g.height = i.naturalHeight || i.height;
        i.width = (g.width > k) ? k : g.width;
        i.width = (i.width < 100) ? 100 : i.width;
        $("#loading-img-" + c).remove();
        b.appendChild(i);
        g.ok = true;
        if (i.src == SRC_LOAD_IMAGE_FAILED) {
            i.onclick = function () {
                i.src = g.img_url
            }
        } else {
            i.onclick = null
        }
    };
    i.onerror = function () {
        if (i.src != SRC_LOAD_IMAGE_FAILED) {
            i.src = SRC_LOAD_IMAGE_FAILED
        }
    };
    i.ondblclick = function () {
        if (i.src != SRC_LOAD_IMAGE_FAILED) {
            searchImg(c)
        }
    };
    i.src = g.img_url;
    if (IS_PC) {
        var f = $.param({
            _img_: g.img_url,
            _link_: encodeURIComponent(g_link)
        });
        generateQRcode(c, INDEX + "?" + f)
    }
}

function clearImages() {
    $("#img-list").empty();
    g_idx = 0;
    g_imgs.length = 0;
    g_imgs_elem.length = 0
}

function showButtonShowMore(b) {
    var c = $("#btn-show-more");
    if (b && b > 0) {
        c.html("查 看 更 多 (" + b + ") . . .");
        c.css("display", "block")
    } else {
        c.html("");
        c.css("display", "none")
    }
}

function deleteImg(b) {
    layer.confirm("确认删除该图片吗？", {
        icon: 3,
        title: "确认",
        btn: ["确认", "取消"]
    }, function (c) {
        layer.close(c);
        doDeleteImg(b)
    }, function (c) {
        layer.close(c)
    })
}

function doDeleteImg(d) {
    if (d >= g_imgs.length || d >= g_imgs_elem.length) {
        return false
    }
    var b = g_imgs[d];
    if (!b) {
        return false
    }
    var c = {
        id: b.related_id,
        enable: false
    };
    bqApiPost("/related/enable", c, false, function (h, e) {
        var f = e.code,
            i = e.msg,
            g = e.data;
        if (f != 0) {
            report_ajax(h, e);
            return errorLyr("服务器内部错误，请稍后重试！")
        }
        infoLyr("删除成功！");
        $("#img-container-" + d).hide()
    })
}

function showChoiceList(e, j, b, l, m, c) {
    $("#choice-list > .log span font").html(e);
    $("#choice-list > .opt").html(c || "");
    var h = $("#choice-list ol");
    h.empty();
    for (var f = 0; f < j.length; f++) {
        var d = j[f];
        if (check(d, [b, l])) {
            var o = d[l];
            var k = "";
            if (m && m != "") {
                k = d[m] || ""
            }
            var n = '<li><a href="javascript:void(0);" ' + (k == "" ? "" : 'title="' + k + '"') + " onclick=\"setLink('" + d[b] + "');return false;\">" + (f + 1) + ". " + o + "</a></li>";
            h.append(n)
        }
    }
    var g = $("#choice-list .log a");
    is_choice_list_folded = false;
    g.html("【收起】");
    g.show();
    $("#choice-list ol").show();
    $("#choice-list .opt").show();
    $("#choice-list").show()
}
var is_choice_list_folded = true;

function foldChoiceList(b) {
    if (b === true) {
        is_choice_list_folded = true
    } else {
        if (b === false) {
            is_choice_list_folded = false
        } else {
            is_choice_list_folded = !is_choice_list_folded
        }
    }
    if (is_choice_list_folded) {
        $("#choice-list ol").hide();
        $("#choice-list .opt").hide();
        $("#choice-list .log a").html("【展开】")
    } else {
        $("#choice-list ol").show();
        $("#choice-list .opt").show();
        $("#choice-list .log a").html("【收起】")
    }
}

function clearChoiceList() {
    $("#choice-list").hide();
    $("#choice-list ol").empty();
    $("#choice-list .opt").empty();
    $("#choice-list .log span font").empty()
}

function setDesc(b, c, d) {
    var f = $("#desc div[name=" + b + "]");
    if (f.length > 0) {
        f.html(c)
    } else {
        var e;
        if (d && d != "") {
            e = '<div name="' + b + '" class="' + d + '">' + c + "</div>"
        } else {
            e = '<div name="' + b + '">' + c + "</div>"
        }
        $("#desc").append(e)
    }
}

function setDescTitle(d, b) {
    var c = "";
    if (!b || b == "") {
        c = d
    } else {
        c = '<a href="' + b + '" target="_blank">' + d + "</a>"
    }
    setDesc("title", c)
}

function setDescId(d, b) {
    var c = '<a href="' + b + '" target="_blank">' + d + "</a>";
    setDesc("id", c)
}

function setDescUp(b, d, e, f, h) {
    if (!b) {
        return
    }
    console.log(" up: " + b.name);
    console.log("uid: " + b.uid);
    var g = "";
    if (b.name == "小太") {
        g = ' class="up_xt" '
    }
    var c = '<span style="vertical-align:middle;">UP主：<a href="' + URL_BILIBILI_SPACE + b.uid + '" target="_blank" ' + g + ">" + b.name + '</a></span><div style="display:inline;">';
    if (d) {
        c += '&nbsp;&nbsp;<a href="javascript:void(0);" onclick="setLink(\'UID' + b.uid + '\');"><img id="icon-space" class="icon icon-up icon-space" src="' + S("img/user-space.svg") + '" title="UP个人空间头图"/></a>'
    }
    if (e) {
        if (b.video > 0) {
            c += '&nbsp;&nbsp;<a href="javascript:void(0);" onclick="setLink(\'UID' + b.uid + ' {v:1}\');"><img id="icon-va" class="icon icon-up icon-archive" src="' + S("img/video-archive.svg") + '" title="UP主所有视频封面"/></a>'
        } else {
            e = false
        }
    }
    if (f) {
        if (b.article > 0) {
            c += '&nbsp;&nbsp;<a href="javascript:void(0);" onclick="setLink(\'UID' + b.uid + ' {a:1}\');"><img id="icon-aa" class="icon icon-up icon-archive" src="' + S("img/article-archive.svg") + '" title="UP主所有专栏封面"/></a>'
        } else {
            f = false
        }
    }
    if (h) {
        if (b.audio > 0) {
            c += '&nbsp;&nbsp;<a href="javascript:void(0);" onclick="setLink(\'UID' + b.uid + ' {m:1}\');"><img id="icon-ma" class="icon icon-up icon-archive" src="' + S("img/audio-archive.svg") + '" title="UP主所有歌曲封面"/></a>'
        } else {
            h = false
        }
    }
    c += "</div>";
    setDesc("up", c);
    $(".icon-up").fadeIn(500);
    setTimeout(function () {
        showIntro(d, e, f, h)
    }, 800)
}

function setDescKeyValue(c, e, b) {
    var d = e + "：" + b;
    setDesc(c, d)
}

function clearDesc() {
    $("#desc div").each(function () {
        var b = $(this);
        var c = b.attr("name");
        if (c == "id" || c == "title" || c == "up") {
            b.empty()
        } else {
            b.remove()
        }
    })
}

function showIntro(d, e, g, h) {
    var c = [];
    d = d && !g_setting.intro_space;
    e = e && !g_setting.intro_video_archive;
    g = g && !g_setting.intro_article_archive;
    h = h && !g_setting.intro_audio_archive;
    if (d) {
        c.push({
            element: document.querySelector("#icon-space"),
            intro: "点击提取<br>UP主【<b>个人主页</b>】封面"
        })
    }
    if (e) {
        c.push({
            element: document.querySelector("#icon-va"),
            intro: "点击提取<br>UP主【<b>所有视频</b>】封面"
        })
    }
    if (g) {
        c.push({
            element: document.querySelector("#icon-aa"),
            intro: "点击提取<br>UP主【<b>所有专栏</b>】封面和头图"
        })
    }
    if (h) {
        c.push({
            element: document.querySelector("#icon-ma"),
            intro: "点击提取<br>UP主上传的【<b>所有歌曲</b>】封面"
        })
    }
    var b = !g_setting.intro_share_link;
    if (b) {
        var f = document.getElementById("share-link");
        if (f == null || f.offsetParent === null || f.value == "") {
            b = false
        } else {
            c.push({
                element: f,
                intro: '1. 点击即可复制该链接<br>2. 评论到B站相关页面下<br>3. 其他用户点击即可直达当前页面<br><br>查看相关<a href="' + INDEX + '/help#sharelink" target="_blank">【帮助】</a>'
            })
        }
    }
    if (g_setting.count < 2 || c.length == 0 || g_is_notify) {
        return
    }
    g_is_intro = true;
    introJs().setOptions({
        prevLabel: "上一步",
        nextLabel: "下一步",
        skipLabel: "跳过",
        doneLabel: "结束",
        exitOnOverlayClick: false,
        showStepNumbers: false,
        scrollToElement: false,
        keyboardNavigation: false,
        positionPrecedence: ["top", "bottom", "right", "left"],
        steps: c
    }).oncomplete(function () {
        g_is_intro = false;
        var i = new Object();
        if (d && !g_setting.intro_space) {
            i.intro_space = g_setting.intro_space = true
        }
        if (e && !g_setting.intro_video_archive) {
            i.intro_video_archive = g_setting.intro_video_archive = true
        }
        if (g && !g_setting.intro_article_archive) {
            i.intro_article_archive = g_setting.intro_article_archive = true
        }
        if (h && !g_setting.intro_audio_archive) {
            i.intro_audio_archive = g_setting.intro_audio_archive = true
        }
        if (b && !g_setting.intro_share_link) {
            i.intro_share_link = g_setting.intro_share_link = true
        }
        updateUserSetting(i)
    }).onexit(function () {
        g_is_intro = false
    }).start()
}

function generateQRcode(c, b) {
    $("#qrcode-" + c).html("");
    $("#qrcode-" + c).qrcode({
        render: "canvas",
        text: b,
        width: 150,
        height: 150,
        background: "#ffffff",
        foreground: "#000000",
        correctLevel: 1
    })
}

function displayImg(i) {
    var c = document.getElementById("qrcode-" + i);
    var f = event || window.event;
    var g = document.documentElement.scrollLeft || document.body.scrollLeft;
    var d = document.documentElement.scrollTop || document.body.scrollTop;
    var b = f.pageX || f.clientX + g;
    var h = f.pageY || f.clientY + d;
    c.style.left = b + 20 + "px";
    c.style.top = h + 20 + "px";
    c.style.display = "block"
}

function vanishImg(e) {
    if (typeof (HTMLElement) != "undefined") {
        HTMLElement.prototype.contains = function (f) {
            while (f != null && typeof (f.tagName) != "undefind") {
                if (f == this) {
                    return true
                }
                f = f.parentNode
            }
            return false
        }
    }
    var d = arguments.callee.caller.arguments[0] || window.event;
    if (d) {
        var c = navigator.userAgent;
        if (c.indexOf("Firefox") > 0) {
            if (document.getElementById("qrcode-" + e).contains(d.relatedTarget)) {
                return
            }
        }
    }
    var b = document.getElementById("qrcode-" + e);
    b.style.display = "none"
}

function showShareLink(b) {
    if (!b || b == "") {
        clearShareLink();
        return
    }
    var d = "https://bilibiliq.com/s/" + b;
    var f = $("#share-link");
    f.show();
    f.val(d);
    var c = $("#copy-share-link");
    c.attr("data-clipboard-text", d);
    var e = f.textWidth() + 8;
    f.css({
        width: e
    })
}

function clearShareLink() {
    var b = $("#share-link");
    b.val("");
    b.hide()
}

function copyShareLink() {
    $("#copy-share-link").trigger("click")
}

function checkNewNotification() {
    if (document.hidden == true) {
        IS_ADMIN && console.log("tab is hidden");
        return
    }
    if (g_is_notify || g_is_intro) {
        return
    }
    bqApiGet("/notification/has-new", false, function (h, d) {
        var f = d.code,
            i = d.msg,
            g = d.data;
        if (f != 0 || !g) {
            return
        }
        var c = g.instant;
        var b = g.personal;
        var e = g.system;
        if (check(c, ["subject", "content"])) {
            return showInstantNotificationWindow(c.subject, c.content, function () {
                showPersonalAndSystemNotification(b, e)
            })
        } else {
            return showPersonalAndSystemNotification(b, e)
        }
    })
}

function showInstantNotificationWindow(c, d, b) {
    if (g_is_intro) {
        return
    }
    if (c && c != "") {
        d = "【" + c + "】" + d
    }
    d = '<div style="padding: 20px; line-height: 28px; font-weight: 300;">' + d + "</div>";
    g_is_notify = true;
    layer.open({
        type: 1,
        title: "公告",
        area: "300px",
        shade: 0.3,
        id: "InstantNotification",
        btn: ["已阅"],
        btnAlign: "c",
        moveType: 1,
        content: d,
        end: function () {
            g_is_notify = false;
            b && b()
        }
    })
}

function showPersonalAndSystemNotification(b, d) {
    if (g_is_intro) {
        return
    }
    var c = "";
    if (check(b, "subject")) {
        c += "【个人通知】" + b.subject + "<br>"
    }
    if (check(d, "subject")) {
        c += "【系统通知】" + d.subject
    }
    if (c == "") {
        return
    }
    c = '<div style="padding: 20px; line-height: 32px; font-weight: 300;">你有新的通知待查看：<br>' + c + "</div>";
    g_is_notify = true;
    layer.open({
        type: 1,
        title: "通知",
        area: "300px",
        shade: 0.3,
        id: "PersonalAndSysNotification",
        btn: ["查看", "关闭"],
        moveType: 1,
        content: c,
        yes: function (f, e) {
            visit(U("/notification"));
            layer.close(f)
        },
        btn2: function (f, e) {
            layer.close(f)
        },
        end: function () {
            g_is_notify = false
        }
    })
}

function _refresh() {
    var b = $("#link-input").val();
    if (b && b != "") {
        setCookie("_link_", b)
    }
    window.location.reload()
}

function bq_get_global_variables() {
    return {
        INDEX: INDEX,
        STATIC: STATIC,
        URL: window.location.href,
        URL_API: URL_API,
        URL_BILIBILIQ_API: URL_BILIBILIQ_API,
        IS_DEBUG: IS_DEBUG,
        is_intro: g_is_intro,
        is_notify: g_is_notify,
        cookie: document.cookie,
        device: {
            IS_PC: IS_PC,
            IS_MOBILE: IS_MOBILE,
            DEVICE: DEVICE
        },
        flag: g_last_flag,
        idx: g_idx,
        imgs: g_imgs,
        user: {
            fp: {
                global: g_fp,
                cookie: $.cookie("fp")
            },
            setting: g_setting,
            uid: BQ_UID
        },
        link: g_link,
        request_time: g_last_request_time,
        stdlink: g_stdlink,
        use_cache: g_use_cache,
        more_count: g_more_count,
        user_agent: navigator.userAgent
    }
}

function processAsVideo(h, d) {
    var g = d.data.result.data;
    var f = g.avid,
        b = g.bvid,
        c = g.key,
        e = g._403;
    if (g._403) {
        setDescTitle(g.title, URL_BILIBILI_VIDEO + g.bvid);
        setDescId("av" + g.avid, URL_BILIBILI_VIDEO + "av" + g.avid);
        setDescUp(g.up, true, true, true, true);
        setImages(g.images);
        showImages(6, 6)
    } else {
        _getCoverOfVideoUsingBiliApi(f, b, c)
    }
}

function _getCoverOfVideoUsingBiliApi(d, b, c) {
    $.ajax({
        type: "get",
        dataType: "jsonp",
        cache: false,
        url: "https://api.bilibili.com/x/web-interface/view?jsonp=jsonp&bvid=" + b,
        success: function (e) {
            processResponse_BiliApiVideo(d, b, c, this, e)
        },
        error: function (e, g, f) {
            report_ajax(this, g);
            errorLyr(ERR_REQUEST_FAILED)
        }
    })
}

function processResponse_BiliApiVideo(f, b, d, h, c) {
    if (!check(c, ["code", "message"])) {
        report_ajax(h, c);
        return errorLyr(ERR_ISE)
    }
    var e = c.code;
    if (e != 0) {
        if (e == -403) {
            if (getLink().indexOf("_403") < 0) {
                return doParseLink(b + " {_403}")
            }
            report_ajax(h, c, "访问权限不足");
            return errorLyr(ERR_ISE)
        } else {
            e == -404 || e == 62002 || report_ajax(h, c);
            return errorLyr(c.message)
        }
    }
    var g = c.data;
    if (!check(g, ["title", "bvid", "aid", "owner", "pic"])) {
        report_ajax(h, c);
        return errorLyr(ERR_ISE)
    }
    getVideoDetail(f, b, d, g.title, g.owner.mid, g.pic)
}

function getVideoDetail(e, b, d, h, c, g) {
    var f = {
        bvid: b,
        key: d,
        uid: c,
        cover: g
    };
    bqApiPost("/video/detail", f, false, function (l, i) {
        var j = i.code,
            m = i.msg,
            k = i.data;
        if (j != 0) {
            report_ajax(l, i, "invalid code=" + j);
            return errorLyr(ERR_ISE)
        }
        if (k.has_related) {
            info("related", "下方有原图或相关图片")
        }
        setDescTitle(h, URL_BILIBILI_VIDEO + b);
        setDescId("av" + e, URL_BILIBILI_VIDEO + "av" + e);
        setDescUp(k.up, true, true, true, true);
        showShareLink(k.share_key);
        setImages(k.images);
        showImages(6, 6);
        showUploadBtn(true)
    })
}

function processAsArticle(e, c) {
    var d = c.data.result.data;
    var f = "cv" + d.cvid;
    var b = URL_BILIBILI_ARTICLE + f;
    setDescTitle(d.title, b);
    setDescId(f, b);
    setDescUp(d.up, true, true, true, true);
    showReadList(d.readlist);
    showShareLink(d.share_key);
    setImages(d.images);
    showImages(6, 8);
    showUploadBtn(true)
}

function showReadList(c) {
    if (check(c, ["id", "name"])) {
        var b = '<button class="opt-btn" onclick="setLink(\'RL' + c.id + "')\">文集：" + c.name + "</button>";
        setHtmlOfFrontOptArea(b)
    }
}

function processAsAudio(e, c) {
    var d = c.data.result.data;
    var f = "au" + d.auid;
    var b = URL_BILIBILI_AUDIO + f;
    setDescTitle(d.title, b);
    setDescId(f, b);
    setDescUp(d.up, true, true, true, true);
    setDescKeyValue("author", "歌手", d.author);
    showShareLink(d.share_key);
    setImages(d.images);
    showImages(6, 6);
    showUploadBtn(true)
}

function processAsBangumiMedia(e, c) {
    var d = c.data.result.data;
    var g = d.media;
    var f = d.section;
    var h = "md" + g.md_id;
    var b = URL_BILIBILI_BANGUMI_MEDIA + h;
    if (!g.is_start) {
        info("not_start", "番剧未开播，敬请期待...")
    }
    showBangumiSectionCount(f.type, f.total);
    showBangumiSections(g.md_id, f.type, g.sections, d.prev, d.next);
    setDescTitle(g.title, b);
    setImages(d.images);
    if (g_imgs.length == 31) {
        showImages(11, 10)
    } else {
        showImages(10, 10)
    }
}

function processAsBangumiPlay(e, c) {
    var d = c.data.result.data;
    var f = d.media;
    var g = "md" + f.md_id;
    var b = URL_BILIBILI_BANGUMI_MEDIA + g;
    if (!f.is_start) {
        info("not_start", "番剧未开播，敬请期待...")
    }
    showBangumiSections(f.md_id, "", f.sections, d.prev, d.next);
    setDescTitle(f.title, b);
    setImages(d.images);
    showImages(6, 8)
}

function showBangumiSectionCount(b, c) {
    var d = "共提取到&nbsp;" + c + "&nbsp;张「" + b + "」封面";
    info("section-count", d)
}

function showBangumiSections(b, k, m, c, g) {
    var d = "";
    if (isArray(m)) {
        for (var f = 0; f < m.length; ++f) {
            if (m[f] == k) {
                continue
            }
            var l = m[f];
            var h = "md" + b + " {" + l + "}";
            var j = "提取所有「" + l + "」封面";
            d += '<button class="opt-btn" title="' + j + '" onclick="showBangumiMediaPage(\'' + h + "')\">" + l + "</button>"
        }
    }
    var e = "";
    if (c || g) {
        if (c) {
            e += '<button class="opt-btn" onclick="showBangumiMediaPage(\'' + c + "')\">上一页</button>"
        }
        if (g) {
            e += '<button class="opt-btn" onclick="showBangumiMediaPage(\'' + g + "')\">下一页</button>"
        }
    }
    if (d == "") {
        if (e != "") {
            setHtmlOfOptArea(e)
        }
    } else {
        if (e == "") {
            setHtmlOfFrontOptArea(d)
        } else {
            setHtmlOfFrontOptArea(d + "<br>" + e);
            setHtmlOfBackOptArea(e)
        }
    }
}

function showBangumiMediaPage(b) {
    clearChoiceList();
    setLink(b)
}

function processAsDynamic(e, c) {
    var d = c.data.result.data;
    var b = URL_BILIBILI_DYNAMIC + d.tid;
    if (d.type == 2) {
        b += "?type=2"
    }
    var f = d.title;
    if (f.length > 128) {
        f = f.substr(0, 128) + "..."
    }
    setDescTitle(f, b);
    setDescUp(d.up, true, true, true, true);
    showShareLink(d.share_key);
    setImages(d.images);
    showImages(3, 3);
    showUploadBtn(true)
}

function processAsReadList(f, c) {
    var e = c.data.result.data;
    var d = e.readlist;
    var g = "rl" + d.rl_id;
    var b = URL_BILIBILI_READLIST + g;
    showReadListArticlsCount(d.total);
    showReadListLaypage(d.rl_id, e.prev, e.next);
    setDescTitle(d.title, b);
    setImages(e.images);
    if (g_imgs.length == 31) {
        showImages(11, 10)
    } else {
        showImages(10, 10)
    }
}

function showReadListArticlsCount(b) {
    var c = "共提取到&nbsp;" + b + "&nbsp;张封面";
    info("articles-count", c)
}

function showReadListLaypage(c, e, d) {
    var b = "";
    if (e || d) {
        if (e) {
            b += '<button class="opt-btn" onclick="showReadListPage(\'' + e + "')\">上一页</button>"
        }
        if (d) {
            b += '<button class="opt-btn" onclick="showReadListPage(\'' + d + "')\">下一页</button>"
        }
    }
    setHtmlOfOptArea(b)
}

function showReadListPage(b) {
    clearChoiceList();
    setLink(b)
}

function processAsGame(d, b) {
    var c = b.data.result.data;
    setDescTitle(c.title, URL_BILIBILI_GAME + c.gid);
    setImages(c.images);
    showImages(6, 6)
}

function processAsLive(e, c) {
    var d = c.data.result.data;
    var b = URL_BILIBILI_LIVE + d.lid;
    setDescTitle(d.title, b);
    setDescUp(d.up, true, true, true, true);
    showShareLink(d.share_key);
    setImages(d.images);
    showImages(6, 6);
    showUploadBtn(true)
}

function processAsSpace(d, b) {
    var c = b.data.result.data;
    setDescUp(c.up, false, true, true, true);
    setImages(c.images);
    showImages(6, 6);
    showUploadBtn(true)
}

function processAsArchiveVideo(g, e) {
    var f = e.data.result.data;
    var d = f.up,
        c = f.pages,
        b = f.images;
    showArchiveCountInfo("视频", d.video, c.max);
    setDescUp(d, true, false, true, true);
    laypage("UID" + d.uid + " {v:%}", c.curr, c.prev, c.next, true);
    setImages(b);
    showImages(10, 10)
}

function processAsArchiveArticle(g, e) {
    var f = e.data.result.data;
    var d = f.up,
        c = f.pages,
        b = f.images;
    showArchiveCountInfo("专栏文章", d.article, c.max);
    setDescUp(d, true, true, false, true);
    laypage("UID" + d.uid + " {a:%}", c.curr, c.prev, c.next, true);
    setImages(b);
    showImages(10, 10)
}

function processAsArchiveAudio(g, e) {
    var f = e.data.result.data;
    var d = f.up,
        c = f.pages,
        b = f.images;
    showArchiveCountInfo("音频", d.audio, c.max);
    setDescUp(d, true, true, true, false);
    laypage("UID" + d.uid + " {m:%}", c.curr, c.prev, c.next, true);
    setImages(b);
    showImages(10, 10)
}

function showArchiveCountInfo(c, d, b) {
    var e = "共提取到 " + d + " 张「" + c + "」封面 (" + b + "页）";
    info("archive-count", e)
}

function laypage(b, h, d, g, n) {
    var c = "";
    if (d && d > 0) {
        var l = "gotoPage('" + b + "', " + d + ")";
        c += '<button class="opt-btn" onclick="' + l + '">上一页</button>'
    }
    if (g && g > 0) {
        var l = "gotoPage('" + b + "', " + g + ")";
        c += '<button class="opt-btn" onclick="' + l + '">下一页</button>'
    }
    if (c == "") {
        return
    }
    var f = "",
        e = "";
    if (n) {
        var m = '<input id="';
        var k = '" class="page-input" autocomplete="off" maxlength="4" value="' + h + '" onkeyup="value=value.replace(/^(0+)|[^\\d]+/g,\'\')"/>';
        var j = '<button class="opt-btn" onclick="parseJumpPage(\'';
        var i = "', '" + b + "')\">跳转</button>";
        f = c + m + "page1" + k + j + "page1" + i;
        e = c + m + "page2" + k + j + "page2" + i
    } else {
        f = e = c
    }
    setHtmlOfFrontOptArea(f);
    setHtmlOfBackOptArea(e)
}

function gotoPage(b, c) {
    clearChoiceList();
    setLink(b.replace("%", c))
}

function parseJumpPage(d, b) {
    var c = $("#" + d).val();
    if (c && c != "") {
        gotoPage(b, c.trim())
    }
}

function processAsNumber(d, b) {
    var f = b.data.id_std;
    console.log(f);
    var e = "你输入的是纯数字" + f + "&nbsp;(请选择)";
    var c = [{
        i: "LID" + f,
        j: "直播间ID"
    }, {
        i: "UID" + f,
        j: "用户ID"
    }, {
        i: "GID" + f,
        j: "游戏ID"
    }, {
        i: "cv" + f,
        j: "专栏cv号"
    }, {
        i: "av" + f,
        j: "视频av号"
    }, {
        i: "au" + f,
        j: "音频au号"
    }, {
        i: "ep" + f,
        j: "番剧ep号"
    }, {
        i: "ss" + f,
        j: "番剧ss号"
    }, {
        i: "md" + f,
        j: "番剧md号"
    }];
    return showChoiceList(e, c, "i", "j")
}

function processAsPicture(d, b) {
    var c = b.data.result.data;
    setImages(c.images);
    showImages(6, 6)
}

function processAsProbableVideoBv(e, d) {
    var c = d.data.stdlink;
    var b = '<a href="javascript:void(0);" onclick="setLink(\'' + c + "')\">这里</a>";
    error("probable_bv", "你输入的可能是一个BV号，如果是，请点击&nbsp;" + b)
}

function processAsSearch(l, h) {
    var e = h.data.result.data;
    var c = e.bangumi || [];
    var d = e.bili_user || [];
    var g = [];
    for (var f = 0; f < c.length; ++f) {
        var j = c[f];
        var k = j.title;
        if (k.length > 60) {
            k = k.substr(0, 60) + "..."
        }
        g.push({
            link: j.stdlink,
            text: '<span class="search-result-type">番剧</span>&nbsp;' + k,
            title: j.title
        })
    }
    return showChoiceList("搜索结果：", g, "link", "text", "title")
}

function processAsShareLink(d, b) {
    var c = b.data.result.data;
    layer.confirm("这是一个分享链接<br>是否在新标签页打开该链接？", {
        icon: 3,
        title: "确认",
        btn: ["是", "否"]
    }, function (e) {
        layer.close(e);
        visit(U("/s/" + c.key));
        _set_link("")
    }, function (e) {
        layer.close(e);
        setLink(c.ori_link)
    })
}

function processAsCmd(g, e) {
    var f = e.data;
    var b = f.subtype,
        d = f.id_std,
        c = f.stdlink,
        h;
    if (f.result && f.result.code == 0) {
        _set_link(f.stdlink)
    }
    if (b == "扩展功能") {
        processAsCmd_Extension(g, e)
    } else {
        if (b == "历史记录") {
            processAsCmd_History(g, e)
        } else {
            if (b == "image_set") {
                processAsCmd_ImageSet(g, e)
            } else {
                return errorLyr(ERR_ISE)
            }
        }
    }
}

function processAsCmd_Extension(k, h) {
    var b = h.data.result;
    var d = b.code,
        e = b.msg,
        f = b.data;
    switch (d) {
        case 0:
            break;
        default:
            report_ajax(k, h);
            return errorLyr(ERR_ISE)
    }
    var j = f.extensions;
    for (var g = 0; g < j.length; ++g) {
        var c = j[g].name;
        j[g].link = "{" + c + "}"
    }
    return showChoiceList("扩展功能", j, "link", "title", "title")
}

function processAsCmd_History(k, j) {
    var b = j.data.result;
    var d = b.code,
        e = b.msg,
        f = b.data;
    switch (d) {
        case 0:
            break;
        default:
            report_ajax(k, j);
            return errorLyr(ERR_ISE)
    }
    var h = f.history;
    if (!isArray(h)) {
        h = []
    }
    if (h.length == 0) {
        infoLyr("历史记录为空")
    }
    for (var g = 0; g < h.length; ++g) {
        var l = h[g].link;
        if (l.length > 60) {
            l = l.substr(0, 60) + "..."
        }
        h[g].text = l
    }
    var c = "";
    if (g_setting.is_record_history) {
        c += '<button class="opt-btn" onclick="enableHistory(false);">停止记录</button>'
    } else {
        c += '<button class="opt-btn" onclick="enableHistory(true);">开启记录</button>'
    }
    c += "&nbsp;&nbsp;";
    c += '<button class="opt-btn" onclick="clearHistory();">清空记录</button>';
    return showChoiceList("历史记录", h, "link", "text", "link", c)
}

function enableHistory(b) {
    if (b) {
        enableUserHistory(b, function () {
            g_setting.is_record_history = true;
            infoLyr("历史记录已开启！");
            $("#choice-list > ol").empty();
            var c = $("#choice-list > .opt button").eq(0);
            c.html("停止记录");
            c.removeAttr("onclick");
            c.attr("onclick", "enableHistory(false)")
        })
    } else {
        layer.confirm("确认要停止历史记录吗？<br>该操作将会清空所有历史记录，<br>之后将不再产生任何历史记录。", {
            icon: 3,
            title: "确认",
            btn: ["确认", "取消"]
        }, function (c) {
            layer.close(c);
            enableUserHistory(b, function () {
                g_setting.is_record_history = false;
                infoLyr("历史记录已停止！");
                $("#choice-list > ol").empty();
                var d = $("#choice-list > .opt button").eq(0);
                d.html("开启记录");
                d.removeAttr("onclick");
                d.attr("onclick", "enableHistory(true)")
            })
        }, function (c) {
            layer.close(c)
        })
    }
}

function clearHistory() {
    if ($("#choice-list > ol li").length == 0) {
        return infoLyr("历史记录已清空！")
    }
    layer.confirm("确认要清空历史记录吗？", {
        icon: 3,
        title: "确认",
        btn: ["确认", "取消"]
    }, function (b) {
        layer.close(b);
        clearUserHistory(function () {
            infoLyr("历史记录已清空！");
            $("#choice-list > ol").empty()
        })
    }, function (b) {
        layer.close(b)
    })
}

function processAsCmd_ImageSet(k, i) {
    var b = i.data.result;
    var c = b.code,
        f = b.msg,
        h = b.data;
    switch (c) {
        case 0:
            break;
        default:
            report_ajax(k, i);
            return errorLyr(ERR_ISE)
    }
    var g = h.cmd,
        j = h.images,
        e = h.pages;
    showImageSetPagesCount(e.max);
    setDescTitle(g.title, g.title_url);
    setImages(j);
    showImages(5, 10);
    var d = "{" + g.name + " %}";
    laypage(d, e.curr, e.prev, e.next, true)
}

function showImageSetPagesCount(b) {
    if (b && b > 1) {
        var c = "共 " + b + " 页";
        info("image-set-pages", c)
    }
}

function myBrowser() {
    var b = navigator.userAgent;
    if (b.indexOf("OPR") > -1) {
        return "Opera"
    }
    if (b.indexOf("Firefox") > -1) {
        return "FF"
    }
    if (b.indexOf("Trident") > -1) {
        return "IE"
    }
    if (b.indexOf("Edge") > -1) {
        return "Edge"
    }
    if (b.indexOf("Chrome") > -1) {
        return "Chrome"
    }
    if (b.indexOf("Safari") > -1) {
        return "Safari"
    }
}

function convertImageToDataURL(f, e, b, h) {
    var c = document.createElement("canvas");
    if (c == null) {
        setErrMsgType(ERR_CRITICAL);
        return false
    }
    c.width = e;
    c.height = b;
    var d = c.getContext("2d");
    d.drawImage(f, 0, 0, e, b);
    var g = c.toDataURL(h, 0.95);
    return g
}

function getMimeType(b) {
    if (b == "jpg" || b == "jpeg") {
        return "image/jpeg"
    } else {
        if (b == "webp") {
            return "image/webp"
        } else {
            return "image/png"
        }
    }
}

function convertBase64UrlToBlob(b) {
    var g = b.dataURL.split(";base64,");
    var h = g[0].split(":")[1];
    var c = window.atob(g[1]);
    var f = c.length;
    var e = new Uint8Array(f);
    for (var d = 0; d < f; d++) {
        e[d] = c.charCodeAt(d)
    }
    return new Blob([e], {
        type: h
    })
}

function getImgName(b) {
    return b.substr(b.lastIndexOf("/") + 1)
}

function getImgExt(b) {
    return b.substring(b.lastIndexOf(".") + 1).toLowerCase()
}

function downloadImg(c) {
    try {
        _downloadImg(c)
    } catch (b) {
        report({
            _err_msg: "点击按钮下载图像失败",
            _err_msg_stack: b.stack
        });
        if (IS_PC) {
            errorLyr("下载图像失败，请右键点击图片，选择“另存为”进行下载！", false)
        } else {
            errorLyr("下载图像失败，请长按图片进行下载！", false)
        }
    }
}

function _downloadImg(c) {
    if (c >= g_imgs.length || c >= g_imgs_elem.length) {
        return false
    }
    var f = g_imgs[c];
    if (!f || !f.ok) {
        return false
    }
    var i = g_imgs_elem[c];
    var j = getImgName(f.img_url);
    var k = getImgExt(f.img_url);
    if (k == "gif") {
        return infoLyr(IS_PC ? "gif动图，请右键点击图片，选择“另存为”进行下载。" : "gif动图，请长按图片下载")
    }
    var h = getMimeType(k);
    var d = convertImageToDataURL(i, f.width, f.height, h);
    var g = {
        dataURL: d,
        type: h,
        ext: k
    };
    var b = convertBase64UrlToBlob(g);
    var e = myBrowser();
    if (e == "IE" || e == "Edge") {
        window.navigator.msSaveBlob(b, j)
    } else {
        if (e == "FF") {
            let a = document.createElement("a");
            let event = new MouseEvent("click");
            a.download = j;
            a.href = d;
            a.dispatchEvent(event)
        } else {
            let a = document.createElement("a");
            a.download = j;
            a.href = URL.createObjectURL(b);
            a.click()
        }
    }
};