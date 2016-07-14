require('multiple-select');

var flight = require('flight');
var URLs = require('../../constants/Urls');

function columnFilterCombobox (){

    this.init = function () {

        var me = this;

        function onCheckOption() {
            var status = me.$node.multipleSelect("getSelects");
            me.setColumnPlaceholder();
            var configValue = status.toString();

            $.ajax({
                url: URLs.SET_CONFIGS,
                type: 'POST',
                dataType: 'json',
                data: {
                    "configKey": "columnArray",
                    "configValue": configValue
                },
                success: function(){
                    me.trigger("columnFilterSelected", {status: status});
                }
            });

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

    this.setColumnPlaceholder = function (){
        $(".ms-choice").find('span').html('<i class="fa fa-columns" aria-hidden="true"></i>');
    };

    this.setColumnFilterFromConfig = function (){
        var me = this;
        var columnArray;

        $.ajax({
            type: "POST",
            url: URLs.GET_CONFIGS,
            dataType: 'json',
            data : {
                "configKey": "columnArray"
            },
            success: function (data) {
                var column = data.columnArray;

                function toggleColumns(columnArray){
                    me.$node.multipleSelect('setSelects', columnArray);
                    me.setColumnPlaceholder();
                    me.trigger("columnFilterSelected", {status: columnArray});
                }

                if(column) {
                    columnArray = column.split(",");
                    toggleColumns(columnArray);
                } else {
                    columnArray = ['emailAddress', 'phoneNumber', 'surgery', 'taskStatus'];
                    toggleColumns(columnArray);
                }
            }
        });
    };

    this.after('initialize', function () {
        this.init();
        this.setColumnFilterFromConfig();
        this.setColumnPlaceholder();
    });
}

module.exports = flight.component(columnFilterCombobox);
