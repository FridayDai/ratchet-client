(function ($, undefined) {
    'use strict';

    //Define provider page global variables
    var opts = {
            urls: {
                query: "{0}/getActivities".format(RC.constants.baseUrl)
            }
        },
        activityTable;

    /**
     * init table with the data which loaded
     * @param data
     * @private
     */
    function _initTable(data) {
        //before reload dataTable, destroy the last dataTable
        $("#activityTable").dataTable().fnDestroy();

        activityTable = $('#activityTable').dataTable({
            bLengthChange: false,
            searching: false,
            ordering: true,
            info: false,
            "serverSide": true,
            "ajax": $.fn.dataTable.pipeline({
                url: opts.urls.query,
                pages: 5,// number of pages to cache
                data: data
            }),
            columns: [
                {data: "description"},
                {data: "level"},
                {data: "organization"},
                {data: "surgeryDate"}
            ]
        });
    }

    /**
     * load Data from server side
     * @params selectLevel
     * @params selectBy
     * @private
     */
    function _loadData(selectLevel, selectBy) {
        var data = {};
        data.selectLevel = selectLevel || 'all';
        data.selectBy = selectBy || 'all';
        _initTable(data);
    }

    /**
     * init selectmenu
     * @private
     */
    function _initSelect() {
        $("#activities").selectmenu();
        $("#organization").selectmenu();
    }

    /**
     * change seleceLevel value
     * @private
     */
    function _changeSelectLevel() {
        $("#activities").change(function () {
            var selectLevel = $(this).val();
            var selectBy = $("#organization").val();
            _loadData(selectLevel, selectBy);
        });
    }

    /**
     * change selectBy value
     * @private
     */
    function _changeSelectBy() {
        $("#organization").change(function () {
            var selectLevel = $("#activities").val();
            var selectBy = $(this).val();
            _loadData(selectLevel, selectBy);
        });
    }

    /**
     * Provider page Initialization
     * @private
     */
    function _init() {
        _loadData();
        _changeSelectLevel();
        _changeSelectBy();
        //_initSelect();
    }

    _init();
})(jQuery);
