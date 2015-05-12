(function ($, undefined) {
    'use strict';

    var activity = RC.pages.activity = RC.pages.activity || {};

    //Define provider page global variables
    var opts = {
            urls: {
                query: "/patients/{0}/activities"
            }
        },
        activityTable;

    /**
     * init table with the data which loaded
     * @param data
     * @private
     */
    function _initTable(ele, element, data) {
        //before reload dataTable, destroy the last dataTable
        //$(element).dataTable().fnDestroy();
        var patientId = ele.find("#patientId").val();
        if (activityTable) {
            activityTable.clear();
            activityTable.destroy();
        }

        activityTable = $(element).DataTable(_.extend({}, RC.common.dataTableOptions, {
            //bLengthChange: false,
            //searching: false,
            //ordering: true,
            //info: false,
            //"serverSide": true,
            "columnDefs": [
                {"targets": [0, 1], "orderable": false}],
            //"fnDrawCallback": function () {
            //    $(".previous").text('');
            //    $(".next").text('');
            //    var paginate = $(this).siblings();
            //    var bothDisabled = paginate.find(".previous").hasClass("disabled") && paginate.find(".next").hasClass("disabled");
            //    if (bothDisabled && paginate.find(".current").length === 0) {
            //        paginate.hide();
            //    }
            //},
            //"bAutoWidth": false,
            "ajax": $.fn.dataTable.pipeline({
                url: opts.urls.query.format(patientId),
                pages: 5,// number of pages to cache
                data: data
            }),
            columns: [
                {
                    data: "description",
                    width: "70%"
                },
                {
                    data: "createdBy",
                    width: "14%"
                },
                {
                    data: function (source) {
                        var formatDate = moment(source.dateCreated).tz("America/Vancouver").format('MMM D, YYYY h:mm:ss a');
                        return formatDate;
                    },
                    width: "16%"
                }
            ]
        }));
    }

    /**
     * load Data from server side
     * @params selectLevel
     * @params selectBy
     * @private
     */
    function _loadData(ele, element) {
        var data = {};

        //data.patientId = ele.find("#patientId").val();
        data.medicalRecordId = ele.find("#medicalRecordId").val();
        data.clientId = ele.find("#clientId").val();
        _initTable(ele, element, data);
    }

    /**
     * init selectmenu
     * @private
     */
    //function _initSelect() {
    //    $('#selectStaffs').select2({
    //        ajax: {
    //            transport: function(params){
    //                params.beforeSend = function(){
    //                    RC.common.progress(false);
    //                };
    //                return $.ajax(params);
    //            },
    //            url: opts.urls.getStaffs,
    //            cache: "true",
    //            data: function (term) {
    //                return {
    //                    term: term
    //                };
    //            },
    //            results: function (data) {
    //                var myResults = [];
    //                myResults.push({
    //                    'id' : '',
    //                    'text': 'ALL'
    //                });
    //                $.each(data, function (index, item) {
    //                    myResults.push({
    //                        'id': item.id,
    //                        'text': item.firstName + " " + item.lastName
    //                    });
    //                });
    //                return {
    //                    results: myResults
    //                };
    //            }
    //        }
    //    });
    //
    //    $("#selectStaffs").select2('data', {id: '', text: 'ALL'});
    //}

    function _search(ele, element) {
        var senderId = $('#selectStaffs').val();
        //var patientId = $("#patientId").val();
        var medicalRecordId = $("#medicalRecordId").val();
        var clientId = $("#clientId").val();
        var data = {
            senderId: senderId,
            medicalRecordId: medicalRecordId,
            clientId: clientId
        };
        _initTable(ele, element, data);
    }

    /**
     * bind search event
     * @private
     */
    function _bindSearchEvent(ele, element) {
        $("#refresh-btn").on("click", function (e) {
            e.preventDefault();
            _search(ele, element);
        });
    }

    /**
     * check archived element height. if it can't fill the whole page, we will set it's height.
     * @param ele
     * @private
     */
    function _checkArchivedWindowSize(ele) {
        var content = ele.find('.activity');
        if (content.hasClass('archived') && $('.container').outerHeight() < $(window).height()) {
            var topHeight = ele.offset().top;
            var contentHeight = $(window).height() - topHeight - $('.footer').height();
            content.height(contentHeight);
        }
    }

    /**
     * Provider page Initialization
     * @private
     */
    function _init(ele, element) {
        _loadData(ele, element);
        _bindSearchEvent(ele, element);
        _checkArchivedWindowSize(ele);
        //_initSelect();
    }

    $.extend(activity, {
        init: function (ele, element) {
            _init(ele, element);
        }
    });

})(jQuery);
