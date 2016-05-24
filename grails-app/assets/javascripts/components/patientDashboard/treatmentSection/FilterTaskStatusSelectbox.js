require('select2');

var flight = require('flight');

function FilterTaskStatusSelectbox() {

    this.formatState = function (data) {
        var $res = $('<span></span>');
        var $check = $('<input type="checkbox" />');

        $res.text(data.text);
        if (data.element) {
            $res.prepend($check);
            $check.prop('checked', data.element[0].selected);
        }

        return $res;
    };

    this.init = function () {

        this.$node.select2({
            allowClear: false,
            placeholder: "Task: ALL",
            formatResult: this.formatState,
            closeOnSelect: false
        });
    };

    this.after('initialize', function () {
        this.init();
    });
}

module.exports = flight.component(FilterTaskStatusSelectbox);

