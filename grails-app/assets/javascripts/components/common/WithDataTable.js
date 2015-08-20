require('dataTable');

var flight = require('flight');
var WithOptions = require('./WithOptions');

function withDataTable() {

    /* jshint ignore:start */
    $.fn.dataTable.pipeline = function (opts) {
        // Configuration options
        var conf = $.extend({
            pages: 5,     // number of pages to cache
            url: '',      // script url
            data: null,   // function or object with parameters to send to the server
                          // matching how `ajax.data` works in DataTables
            method: 'GET' // Ajax HTTP method
        }, opts);

        // Private variables for storing the cache
        var cacheLower = -1;
        var cacheUpper = null;
        var cacheLastRequest = null;
        var cacheLastJson = null;

        return function (request, drawCallback, settings) {
            var ajax = false,
                requestStart = request.start,
                drawStart = request.start,
                requestLength = request.length,
                requestEnd = requestStart + requestLength;

            if (settings.clearCache) {
                // API requested that the cache be cleared
                ajax = true;
                settings.clearCache = false;
            } else if (cacheLower < 0 || requestStart < cacheLower || requestEnd > cacheUpper) {
                // outside cached data - need to make a request
                ajax = true;
            } else if (settings.aoData.length < settings._iDisplayLength ||
                settings.aoData.length > settings._iDisplayLength
            ) {
                ajax = true;
            } else if (JSON.stringify(request.order) !== JSON.stringify(cacheLastRequest.order) ||
                JSON.stringify(request.columns) !== JSON.stringify(cacheLastRequest.columns) ||
                JSON.stringify(request.search) !== JSON.stringify(cacheLastRequest.search)
            ) {
                // properties changed (ordering, columns, searching)
                ajax = true;
            }

            // Store the request for checking next time around
            cacheLastRequest = $.extend(true, {}, request);

            if (ajax) {
                // Need data from the server
                if (requestStart < cacheLower) {
                    requestStart = requestStart - (requestLength * (conf.pages - 1));

                    if (requestStart < 0) {
                        requestStart = 0;
                    }
                }

                cacheLower = requestStart;
                cacheUpper = requestStart + (requestLength * conf.pages);

                request.start = requestStart;
                request.length = requestLength * conf.pages;

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
                if ($.isFunction(conf.data)) {
                    // As a function it is executed with the data object as an arg
                    // for manipulation. If an object is returned, it is used as the
                    // data object to submit
                    var d = conf.data(request);
                    if (d) {
                        $.extend(request, d);
                    }
                } else if ($.isPlainObject(conf.data)) {
                    // As an object, the data given extends the default
                    $.extend(request, conf.data);
                }

                settings.jqXHR = $.ajax({
                    "type": conf.method,
                    "url": conf.url,
                    "data": request,
                    "dataType": "json",
                    "cache": false,
                    "success": function (json) {
                        cacheLastJson = $.extend(true, {}, json);

                        if (cacheLower !== drawStart) {
                            json.data.splice(0, drawStart - cacheLower);
                        }
                        json.data.splice(requestLength, json.data.length);

                        drawCallback(json);
                    }
                });
            } else {
                var json;
                json = $.extend(true, {}, cacheLastJson);
                json.draw = request.draw; // Update the echo for each response
                json.data.splice(0, requestStart - cacheLower);
                json.data.splice(requestLength, json.data.length);

                drawCallback(json);
            }
        };
    };
    /* jshint ignore:end */

    // Register an API method that will empty the pipelined data, forcing an Ajax
    // fetch on the next draw (i.e. `table.clearPipeline().draw()`)
    $.fn.dataTable.Api.register('clearPipeline()', function () {
        return this.iterator('table', function (settings) {
            settings.clearCache = true;
        });
    });

    flight.compose.mixin(this, [
        WithOptions
    ]);

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
            drawCallback: _.bind(this.drawCallback, this),
            ajax: this.getPipeline(),
            deferLoading: this.getTotalCount(),
            order: [[0, 'desc']],
            rowCallback: _.bind(this._rowCallback, this)
        };
    };

    this.initDataTable = function () {
        this.tableEl = $(this.$node).DataTable(this.initOptions());
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

    this.getPipeline = function () {
        var url;

        if (!(url = this.attr.url) && this.getUrl) {
            url = this.getUrl();
        }

        return $.fn.dataTable.pipeline({
            url: url,
            pages: 2
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

    this.reload = function () {
        this.tableEl.ajax.reload();
    };

    this.search = function (data) {
        this._searchData = _.assign({}, this._searchData, data);
        this.reload();
    };

    this._onPreXhr = function (e, settings, data) {
        _.extend(data.search, this._searchData);
    };

    this.isDataTableInitialized = function () {
        return !!this.tableEl;
    };

    this.after('initialize', function () {
        if (!this.attr.initWithoutRender) {
            this.initDataTable();
        }

        if (this.attr.initWithLoad) {
            this.reload();
        }

        this.on('preXhr.dt', this._onPreXhr);
    });
}

module.exports = withDataTable;
