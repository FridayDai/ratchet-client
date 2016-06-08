require('multiple-select');

var flight = require('flight');

function FilterTaskStatusSelectbox() {

    this.init = function () {

        var me = this;

        function onCheckOption() {
            var status = me.$node.multipleSelect("getSelects");
            me.trigger("taskStatusFilterSelected", {status: status});
        }

        function onCheckAll() {
            me.trigger("taskStatusFilterSelected", {status: 'ALL'});
        }

        this.$node.multipleSelect({
            width: "auto",
            dropWidth: '180px',
            selectAllText: "<span>ALL</span>",
            allSelected: "Task: ALL",
            selectAllDelimiter: ['', ''],
            minimumCountSelected: 5,
            textTemplate: function ($elm) {
                return '<span class={0}>{1}</span>'.format($elm.attr('class'), $elm.text());
            },
            onClick: onCheckOption,
            onCheckAll: onCheckAll,
            onUncheckAll: onCheckOption
        });

        this.$node.multipleSelect('checkAll');
    };

    this.clearAllFilter = function () {
        this.$node.multipleSelect('checkAll');
    };

    this.after('initialize', function () {
        this.init();
        this.on(document, 'taskStatusClearFilter', this.clearAllFilter);
    });
}

module.exports = flight.component(FilterTaskStatusSelectbox);

