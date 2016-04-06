//
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;";
}
//是否记住密码
function setCookie(name, value, isChecked) {
    if (isChecked == true) {
        var Days = 30;
        var exp = new Date();
        exp.setDate(exp.getDate() + Days);
        //exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;";
    } else {
        var exp = new Date();
        //exp.setTime(exp.getTime() + 1 * 60 * 60 * 1000);
        exp.setHours(exp.getHours() + 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;";
    }
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/;";
}

function formatDate(dateStr) {
    var date = new Date(dateStr);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '.' + m + '.' + d;
};