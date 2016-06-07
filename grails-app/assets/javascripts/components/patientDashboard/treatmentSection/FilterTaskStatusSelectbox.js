require('multiple-select');

var flight = require('flight');

function FilterTaskStatusSelectbox() {

    this.init = function () {

        var me = this;

        function onCheckOption() {
            var status = me.$node.multipleSelect("getSelects");
            me.trigger("taskStatusFilterSelected", {status: status});
        }

        this.$node.multipleSelect({
            width: "auto",
            dropWidth: '180px',
            selectAllText: "ALL",
            allSelected: "Task: ALL",
            selectAllDelimiter: ['', ''],
            minimumCountSelected: 5,
            textTemplate: function ($elm) {
                return '<span class={0}>{1}</span>'.format($elm.attr('class'), $elm.text());
            },
            onClick: onCheckOption,
            onCheckAll: onCheckOption,
            onUncheckAll: onCheckOption
        });

        this.$node.multipleSelect('checkAll');
        $('#filter-count').hide();
    };

    this.clearAllFilter = function () {
        this.$node.multipleSelect('checkAll');
        $('#filter-count').hide();
    };

    this.after('initialize', function () {
        this.init();
        this.on(document, 'taskStatusClearFilter', this.clearAllFilter);
    });
}

module.exports = flight.component(FilterTaskStatusSelectbox);
