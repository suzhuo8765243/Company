// 公用代码

/**
 * jquery实现的滚动条滑动封装
 * @param {Number} top 滚动条距离上方的距离
 */
function setScroll(top) {
    $(document.documentElement).animate({"scrollTop": top}, 500);
    $(window).on("mousewheel", function() {
        $(document.documentElement).stop();
    })
}

/**
 * 获取地址中的get值
 */
function getLocation() {
    var _str_ = location.search;
    var _obj_ = {};
    var _strArr_ = _str_.slice(1, _str_.length).split("&");
    for (let i = 0; i < _strArr_.length; i++) {
        var _key_ = _strArr_[i].split("=")[0];
        var _val_ = _strArr_[i].split("=")[1];
        _obj_[_key_] = _val_;
    }
    return _obj_;
}

/**
 * 设置参数并且跳转
 */
function setLocation(url, obj) {

    if (Object.keys(obj).length > 0) {
        var _objStr_ = "?";
        for (const key in obj) {
            _objStr_ += `${key}=${obj[key]}&`;
        }
        _objStr_ = _objStr_.slice(0, -1);
    }
    location.href = url + _objStr_;
}


/**
 * 消息框函数
 * @param {String} state 消息框类型     (def默认，true成功，error错误，warn警告)
 * @param {String} str 消息框内容
 * @param {Number} time 消息框延迟消失的时间    (单位毫秒)
 */
function msgBox(state, str, time) {
    var div = document.createElement("div");
    var span = document.createElement("span");
    var div_arrt = document.createAttribute("class");
    var text = document.createTextNode(str);
    div_arrt.value = `su_main_box`;
    div_arrt.value += ` su_main_style_${state}`
    div.setAttributeNode(div_arrt);
    span.appendChild(text);
    div.appendChild(span);
    document.querySelectorAll("body")[0].appendChild(div);
    setTimeout(function () {
        document.querySelectorAll(".su_main_box")[0].style.right = 10 + "px";
    }, 0);
    setTimeout(function () {
        document.querySelectorAll(".su_main_box")[0].style.right = -320 + "px";
    }, time);
    setTimeout(function () {
        document.querySelectorAll(".su_main_box")[0].remove();
    }, time + 100);
}



/**
 * 获取cookie
 * @param {String} itme 要获取cookie的键
 */
function getCookie(itme) {
    var _obj_ = {};
    var _cookie_ = document.cookie;
    var _itmes_ = _cookie_.split(";");
    for (let i = 0; i < _itmes_.length; i++) {
        let _key_ = _itmes_[i].trim().split("=")[0];
        let _value_ = _itmes_[i].trim().split("=")[1];
        _obj_[_key_] = _value_;
    }
    return _obj_[itme];
}

/**
 * 设置cookie
 * @param {Object} obj 要设置的数据
 * @param {Number} time cookie的有效期      (单位毫秒)
 */
function setCookie(obj, time) {
    var _date_ = new Date();
    var _ms_ = _date_.getTime() + time;
    var _dateNew_ = new Date(_ms_).toUTCString();
    document.cookie = Object.keys(obj)[0] + "=" + Object.values(obj)[0] + ";" + "expires=" + _dateNew_;
}