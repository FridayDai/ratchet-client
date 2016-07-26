require('multiple-select');

var flight = require('flight');
var URLs = require('../../constants/Urls');
var COLUMN_FILTER_ICON = '<i class="fa fa-columns" aria-hidden="true"></i>';
var COLUMN_ARRAY = ['emailAddress', 'phoneNumber', 'surgery', 'taskStatus'];

function ColumnFilterCombobox (){
    this.init = function () {
        var me = this;
        function sendConfigToServer() {
            me.setColumnPlaceholder();

            $.ajax({
                url: URLs.SET_CONFIGS,
                dropProcess: true,
                type: 'POST',
                dataType: 'json',
                data: {
                    "configKey": "columnArray",
                    "configValue": me.getStatus().toString()
                }
            });
        }

        function onCheckOption() {
            me.setColumnPlaceholder();
            me.trigger("columnFilterSelected", {status: me.getStatus()});
        }

        this.$node.multipleSelect({
            width: "auto",
            dropWidth: '140px',
            selectAll: false,
            placeholder: COLUMN_FILTER_ICON,
            position: "left",
            allSelected: false,
            minimumCountSelected: 5,
            textTemplate: function ($elm) {
                return '<span class={0}>{1}</span>'.format($elm.attr('class'), $elm.text());
            },
            onClick: onCheckOption,
            onClose: sendConfigToServer
        });

        this.$node.multipleSelect('checkAll');
    };

    this.setColumnPlaceholder = function () {
        this.$node.next().find(".ms-choice").find('span').html(COLUMN_FILTER_ICON);
    };

    this.getStatus = function () {
        return this.$node.multipleSelect("getSelects");
    };

    this.setColumnFilterSelectFromConfig = function (){
        var me = this;
        var columnArray;
        var configData = $("#patientsTable").data('config');
        if (configData) {
            columnArray = configData.split(",");
        } else {
            columnArray = COLUMN_ARRAY;
        }

        setTimeout( function() {
            me.$node.multipleSelect('setSelects', columnArray);
            me.setColumnPlaceholder();
            me.trigger("columnFilterSelected", {status: columnArray});
        }, 0);
    };

    this.after('initialize', function () {
        this.init();
         this.setColumnFilterSelectFromConfig();
        this.setColumnPlaceholder();
    });
}

module.exports = flight.component(ColumnFilterCombobox);
