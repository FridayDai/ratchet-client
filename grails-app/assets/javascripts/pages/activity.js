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
        //$(element).dataTable().fnDestroy();

        if (activityTable) {
            activityTable.clear();
            activityTable.destroy();
        }

        activityTable = $(element).DataTable({
            bLengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            "serverSide": true,
            "columnDefs": [
                {"targets": [0,1], "orderable": false}],
            "fnDrawCallback": function() {
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
                    return formatDate;
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
    function _loadData(element) {
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

    function _search(element) {
        var senderId = $('#selectStaffs').val();
        var patientId = $("#patientId").val();
        var medicalRecordId = $("#medicalRecordId").val();
        var clientId = $("#clientId").val();
        var data = {
            senderId: senderId,
            patientId: patientId,
            medicalRecordId: medicalRecordId,
            clientId: clientId
        };
        _initTable(element, data);
    }

    /**
     * bind search event
     * @private
     */
    function _bindSearchEvent(element) {
        $("#refresh-btn").on("click", function (e) {
            e.preventDefault();
            _search(element);
        });
    }



    /**
     * Provider page Initialization
     * @private
     */
    function _init(element) {
        _loadData(element);
        _bindSearchEvent(element);
        _initSelect();
    }

    $.extend(activity, {
        init: function(element){
            _init(element);
        }
    });

})(jQuery);
