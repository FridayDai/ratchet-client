require('multiple-select');

var flight = require('flight');

function columnFilterCombobox (){
    this.init = function () {

        var me = this;

        function onCheckOption() {
            var status = me.$node.multipleSelect("getSelects");
            me.trigger("columnFilterSelected", {status: status});
        }

        this.$node.multipleSelect({
            width: "auto",
            dropWidth: '180px',
            selectAll: false,
            placeholder: '<i class="fa fa-columns" aria-hidden="true"></i>',
            position: "left",
            allSelected: false,
            selectAllDelimiter: ['', ''],
            minimumCountSelected: 5,
            textTemplate: function ($elm) {
                return '<span class={0}>{1}</span>'.format($elm.attr('class'), $elm.text());
            },
            onClick: onCheckOption
        });

        this.$node.multipleSelect('checkAll');
    };

    this.clearAllFilter = function () {
        this.$node.multipleSelect('checkAll');
    };

    this.after('initialize', function () {
        this.init();
        //this.on(document, 'columnFilterSelected', this.clearAllFilter);
    });
}

module.exports = flight.component(columnFilterCombobox);
