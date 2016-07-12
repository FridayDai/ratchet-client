require('multiple-select');

var flight = require('flight');
var URLs = require('../../constants/Urls');
var WithCombobox = require('../common/WithCombobox');

function columnFilterCombobox (){

    this.init = function () {

        var me = this;

        function onCheckOption() {
            var status = me.$node.multipleSelect("getSelects");
            me.setColumnPlaceholder();

            var _list = [];
            for (var i = 0; i < status.length; i++) {
                _list[i] = status[i];
            }

            $.ajax({
                url: URLs.SET_CONFIGS,
                type: 'post',
                dataType: 'json',
                data: {
                    configKey: 'columnArray',
                    configValue: _list
                }
            });

            me.trigger("columnFilterSelected", {status: status});
        }

        this.$node.multipleSelect({
            width: "auto",
            dropWidth: '140px',
            selectAll: false,
            placeholder: '<i class="fa fa-columns" aria-hidden="true"></i>',
            position: "left",
            allSelected: false,
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

    this.setColumnPlaceholder = function (){
        $(".ms-choice").find('span').html('<i class="fa fa-columns" aria-hidden="true"></i>');
    };

    this.after('initialize', function () {
        this.init();
        this.$node.multipleSelect('setSelects', ['emailAddress', 'phoneNumber', 'surgery', 'taskStatus']);
        this.setColumnPlaceholder();
    });
}

module.exports = flight.component(columnFilterCombobox);
