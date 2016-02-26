String.prototype.format = function () {
    var str = this;
    if (arguments.length === 0) {
        return str;
    }

    for (var i = 0; i < arguments.length; i++) {
        var re = new RegExp('\\{' + i + '\\}', 'gm');
        if (arguments[i] !== undefined || arguments[i] !== null) {
            str = str.replace(re, arguments[i]);
        } else {
            str = str.replace(re, '');
        }
    }
    return str;
};
