require('dataTable');

var flight = require('flight');
var WithOptions = require('./WithOptions');

function withDataTable() {
    flight.compose.mixin(this, [
        WithOptions
    ]);

    this.setAjaxDefualtConfig = function () {
        this._ajaxConf = {
            method: 'GET',
            url: '',
            page: 5,
            data: null,

            cacheLower: -1,
            cacheUpper: null,
            cacheLastRequest: null,
            cacheLastJson: null
        };
    };

    /* jshint ignore:start */
    this.ajaxRequest = function (request, drawCallback, settings) {
        var me = this,
            ajax = false,
            requestStart = request.start,
            drawStart = request.start,
            requestLength = request.length,
            requestEnd = requestStart + requestLength;

        request.search = settings.aaRHSearch;

        if (settings.clearCache) {
            // API requested that the cache be cleared
            ajax = true;
            settings.clearCache = false;
        } else if (this._ajaxConf.cacheLower < 0
            || requestStart < this._ajaxConf.cacheLower
            || requestEnd > this._ajaxConf.cacheUpper) {
            // outside cached data - need to make a request
            ajax = true;
        } else if (settings.aoData.length < settings._iDisplayLength ||
            settings.aoData.length > settings._iDisplayLength
        ) {
            ajax = true;
        } else if (JSON.stringify(request.order) !== JSON.stringify(this._ajaxConf.cacheLastRequest.order) ||
            JSON.stringify(request.columns) !== JSON.stringify(this._ajaxConf.cacheLastRequest.columns) ||
            JSON.stringify(request.search) !== JSON.stringify(this._ajaxConf.cacheLastRequest.search)
        ) {
            // properties changed (ordering, columns, searching)
            ajax = true;
        }

        // Store the request for checking next time around
        this._ajaxConf.cacheLastRequest = $.extend(true, {}, request);

        if (ajax) {
            // Need data from the server
            if (requestStart < this._ajaxConf.cacheLower) {
                requestStart = requestStart - (requestLength * (me._ajaxConf.pages - 1));

                if (requestStart < 0) {
                    requestStart = 0;
                }
            }

            this._ajaxConf.cacheLower = requestStart;
            this._ajaxConf.cacheUpper = requestStart + (requestLength * me._ajaxConf.pages);

            request.start = requestStart;
            request.length = requestLength * me._ajaxConf.pages;

            // TODO: Custom request params
            if (request.search) {
                _.each(request.search, function (value, key) {
                    if (key !== 'value' && key !== 'regex') {
                        request[key] = value;
                    }
                });

                delete request.search;
            }

            if (request.order) {
                _.each(request.order, function (obj) {
                    var column = request.columns[obj.column];
                    var name = column.name || column.data;

                    request.sortField = name;
                    request.sortDir = obj.dir;
                });

                delete request.order;
            }

            _.each(request.columns, function (column) {
                if (column.search.value) {
                    var name = column.name || column.data;

                    request[name] = column.search.value;
                }
            });

            delete request.columns;
            delete request.draw;

            // Provide the same `data` options as DataTables.
            if ($.isFunction(me._ajaxConf.data)) {
                // As a function it is executed with the data object as an arg
                // for manipulation. If an object is returned, it is used as the
                // data object to submit
                var d = me._ajaxConf.data(request);
                if (d) {
                    $.extend(request, d);
                }
            } else if ($.isPlainObject(me._ajaxConf.data)) {
                // As an object, the data given extends the default
                $.extend(request, me._ajaxConf.data);
            }

            settings.jqXHR = $.ajax({
                "type": me._ajaxConf.method,
                "url": me._ajaxConf.url,
                "data": request,
                "dataType": "json",
                "cache": false,
                "success": function (json) {
                    me._ajaxConf.cacheLastJson = $.extend(true, {}, json);

                    if (me._ajaxConf.cacheLower !== drawStart) {
                        json.data.splice(0, drawStart - me._ajaxConf.cacheLower);
                    }

                    if (me._optionsDef.paging) {
                        json.data.splice(requestLength, json.data.length);
                    }

                    drawCallback(json);
                }
            });
        } else {
            var json;
            json = $.extend(true, {}, me._ajaxConf.cacheLastJson);
            json.draw = request.draw; // Update the echo for each response
            json.data.splice(0, requestStart - me._ajaxConf.cacheLower);
            json.data.splice(requestLength, json.data.length);

            drawCallback(json);
        }
    };
    /* jshint ignore:end */

    this.tableEl = null;

    this.attributes({
        initWithLoad: false,

        pageSizeField: 'pagesize',
        totalCountField: 'total'
    });

    this.defaultOptions = function () {
        return {
            autoWidth: false,
            lengthChange: false,
            serverSide: true,
            pageLength: this.getPageSize(),
            drawCallback: this.drawCallback,
            ajax: this.ajaxRequest,
            deferLoading: this.getTotalCount(),
            order: [[0, 'desc']],
            rowCallback: this._rowCallback
        };
    };

    this.initDataTable = function () {
        this._setAjaxConfig();
        this.tableEl = this.$node.DataTable(this.initOptions());
    };

    this.getPageSize = function () {
        return this.$node.data(this.attr.pageSizeField);
    };

    this.getTotalCount = function () {
        return this.$node.data(this.attr.totalCountField);
    };

    this.drawCallback = function (tableSetting) {
        var $parent = this.$node.parent();

        this.$node.show();
        $parent.find('.previous').text('');
        $parent.find('.next').text('');

        var $pagination = $parent.find('.dataTables_paginate');

        if (!tableSetting._iRecordsTotal) {
            $pagination.hide();
        } else {
            $pagination.show();
        }

        this.trigger('drawCallback');
    };

    this._setAjaxConfig = function () {
        var url;

        if (!(url = this.attr.url) && this.getUrl) {
            url = this.getUrl();
        }

        _.assign(this._ajaxConf, {
           url: url,
            pages: 1
        });
    };

    this._rowCallback = function (rawRow, data) {
        var that = this;

        if (_.isFunction(this.setRowClickUrl)) {
            $(rawRow)
                .click(function () {
                    var data = that.getRowData(rawRow);

                    location.href = that.setRowClickUrl(data);
                });
        }

        if (_.isFunction(this.rowCallback)) {
            this.rowCallback(rawRow, data);
        }
    };

    this.getRowData = function (rawRow) {
        return this.tableEl.row(rawRow).data();
    };

    this.addRow = function (data) {
        this.tableEl.row.add(data).draw();
    };

    this.updateRow = function (rowSelector, data) {
        this.tableEl.row(rowSelector).data(data).draw();
    };

    this.deleteRow = function (rowSelector) {
        this.tableEl.row(rowSelector).remove().draw();
    };

    this.reload = function (cb) {
        if (_.isFunction(cb)) {
            this.tableEl.ajax.reload(function () {
                cb.call(this);
            });
        } else {
            this.tableEl.ajax.reload();
        }
    };

    this.getSetting = function () {
        return this.tableEl.settings()[0];
    };

    this.loadData = function (data) {
        var setting = this.getSetting();
        setting.bAjaxDataGet = false;

        this.tableEl
            .clear()
            .rows
            .add(data.data);

        setting.aiDisplay = setting.aiDisplayMaster.slice();
        setting._iDisplayLength = data.pageInfo.length;
        setting._iDisplayStart = data.pageInfo.start;
        setting._iRecordsDisplay = data.pageInfo.recordsDisplay;
        setting._iRecordsTotal = data.pageInfo.recordsTotal;
        setting.aaSorting = data.sorting;
        setting.aaRHSearch = data.search;

        this.tableEl.draw(false);

        setting.bAjaxDataGet = true;
    };

    this.getCurrentState = function () {
        return {
            data: this.tableEl.rows().data().splice(0),
            pageInfo: this.tableEl.page.info(),
            sorting: this.tableEl.order(),
            search: this.getSetting().aaRHSearch
        };
    };

    this.search = function (data) {
        var setting = this.getSetting();
        setting.aaRHSearch = setting.aaRHSearch || {};

        _.assign(setting.aaRHSearch, data);

        this.reload();
    };

    this.isDataTableInitialized = function () {
        return !!this.tableEl;
    };

    this.after('initialize', function () {
        this.setAjaxDefualtConfig();

        if (_.isFunction(this.prepareInit)) {
            this.prepareInit();
        }

        if (!this.attr.initWithoutRender) {
            this.initDataTable();
        }

        if (this.attr.initWithLoad) {
            this.reload();
        }
    });

    this.before('teardown', function () {
        if (!this.attr.initWithoutRender) {
            this.tableEl.destroy();
            this.tableEl = null;
        }
    });
}

module.exports = withDataTable;
