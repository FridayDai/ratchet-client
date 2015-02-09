(function ($, undefined) {
    'use strict';

    var activity = RC.pages.activity = RC.pages.activity || {};

    //Define provider page global variables
    var opts = {
            urls: {
                query: "/getActivities",
                getStaffs: "/getStaffs"
            }
        },
        activityTable;

    /**
     * init table with the data which loaded
     * @param data
     * @private
     */
    function _initTable(element, data) {
        //before reload dataTable, destroy the last dataTable
        $(element).dataTable().fnDestroy();

        activityTable = $(element).dataTable({
            bLengthChange: false,
            searching: false,
            ordering: false,
            info: false,
            "serverSide": true,
            "fnDrawCallback": function(oSettings, json) {
                $(".previous").text('');
                $(".next").text('');
            },
            "bAutoWidth": false,
            "ajax": $.fn.dataTable.pipeline({
                url: opts.urls.query,
                pages: 5,// number of pages to cache
                data: data
            }),
            columns: [
                {data: "description"},
                {data: "createdBy"},
                {data: function(source){
                    var formatDate = moment(source.dateCreated).format('MMM D, YYYY h:mm:ss a');
                    return "Last Update: "+ formatDate;
                }}
            ]
        });
    }

    /**
     * load Data from server side
     * @params selectLevel
     * @params selectBy
     * @private
     */
    function _loadData(element ,selectLevel, selectBy) {
        var data = {};

        data.patientId = $("#patientId").val();
        data.medicalRecordId = $("#medicalRecordId").val();
        data.clientId = $("#clientId").val();
        _initTable(element, data);
    }

    /**
     * init selectmenu
     * @private
     */
    function _initSelect() {
        $('#selectStaffs').select2({
            ajax: {
                transport: function(params){
                    params.beforeSend = function(){
                        RC.common.progress(false);
                    };
                    return $.ajax(params);
                },
                url: opts.urls.getStaffs,
                cache: "true",
                data: function (term) {
                    return {
                        term: term
                    };
                },
                results: function (data) {
                    var myResults = [];
                    $.each(data, function (index, item) {
                        myResults.push({
                            'id': item.id,
                            'text': item.firstName + " " + item.lastName
                        });
                    });
                    return {
                        results: myResults
                    };
                }
            }
        });
    }

    function _search() {
        $('#selectStaffs').on("change", function (data) {

        });
    }
    /**
     * change seleceLevel value
     * @private
     */
    function _changeSelectLevel(element) {
        $("#activities").change(function () {
            var selectLevel = $(this).val();
            var selectBy = $("#organization").val();
            _loadData(element, selectLevel, selectBy);
        });
    }

    /**
     * change selectBy value
     * @private
     */
    function _changeSelectBy(element) {
        $("#organization").change(function () {
            var selectLevel = $("#activities").val();
            var selectBy = $(this).val();
            _loadData(element, selectLevel, selectBy);
        });
    }

    /**
     * Provider page Initialization
     * @private
     */
    function _init(element) {
        _loadData(element);
        _changeSelectLevel(element);
        _changeSelectBy(element);
        _initSelect();
    }

    $.extend(activity, {
        init: function(element){
            _init(element);
        }
    });

})(jQuery);
