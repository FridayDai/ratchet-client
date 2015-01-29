(function ($, undefined) {
    'use strict';

    //Define provider page global variables
    var opts = {
            defaultConfirmArguments: {
                confirmFormArguments: {
                    title: RC.constants.confirmTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 400
                },
                waringArguments: {
                    title: RC.constants.warningTipTitle,
                    message: RC.constants.warningTip
                }
            },
            urls: {
                query: "{0}/getProvider".format(RC.constants.baseUrl)
            }
        },
        provideTable,
        provideData;

    /**
     * init overview chart
     * @private
     */
    function _initChart() {
        //Width and height
        var w = 500;
        var h = 300;
        var padding = 30;

        var scores = [
            {
                name: "grape",
                score: 12,
                time: 1
            },
            {
                name: "kiwi",
                score: 98,
                time: 2
            },
            {
                kind: "banana",
                score: 60,
                time: 10
            },
            {
                kind: "banana",
                score: 50,
                time: 12
            }
        ];


        //Create scale functions
        var xScale = d3.scale.linear()
            .domain([0, d3.max(scores, function(d) { return d.time; })])
            .range([padding, w - padding * 2]);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(scores, function(d) { return d.score; })])
            .range([h - padding, padding]);

        var rScale = d3.scale.linear()
            .domain([0, d3.max(scores, function(d) { return d.score; })])
            .range([2, 5]);

        //Define X axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(5);

        //Define Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(5);

        //Create SVG element
        var svg = d3.select("#charts")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "chart");

        //Create circles
        svg.selectAll("circle")
            .data(scores)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return xScale(d.time);
            })
            .attr("cy", function(d) {
                return yScale(d.score);
            })
            .attr("r", function(d) {
                return rScale(d.score);
            });

        //Create labels
        svg.selectAll("text")
            .data(scores)
            .enter()
            .append("text")
            .text(function(d) {
                return d.time + "," + d.score;
            })
            .attr("x", function(d) {
                return xScale(d.time);
            })
            .attr("y", function(d) {
                return yScale(d.score);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");

        //Create X axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

        //Create Y axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

    }

    /**
     * init table with the data which loaded
     * @param data
     * @private
     */
    function _initTable(data) {
        provideTable = $("#provideTable").DataTable({
            paging: false,
            searching: false,
            ordering: false,
            info: false,
            data: data,
            columns: [
                {data: "image"},
                {
                    data: function (source) {
                        return '<label class="tr-label"> ' + source.name + '</label>';
                    }
                },
                {data: "agent"},
                {data: "email"},
                {
                    data: function (source) {
                        return '<a  href="" data-id ="' + source.id + '" class="editor_edit">Edit</a>'
                            + '&nbsp;&nbsp;<a href="" data-id ="' + source.id + '" class="editor_remove">Delete</a>';
                    },
                    className: "center"
                }
            ]
        });

    }

    /**
     * load Data from server side
     * @private
     */
    function _loadData() {
        $.ajax({
            dataType: 'json',
            url: opts.urls.query
        })
            .done(function (data) {
                provideData = data;
                _initTable(provideData);
            })
            .fail(function () {
            });
    }

    /**
     * data table add a roe
     * @private
     */
    function _add() {
        var name = $("#provider").val();
        var agent = $("#agent").val();
        var email = $("#email").val();
        var id = Math.floor((Math.random() * 1000) + 1).toString();

        provideTable.row.add({
            "image": name,
            "name": name,
            "agent": agent,
            "email": email,
            "id": id
        }).draw();

        provideData.push({
            "image": name,
            "name": name,
            "agent": agent,
            "email": email,
            "id": id
        });

    }

    /**
     * modify data
     * @param cell
     * @private
     */
    function _modify(cell) {
        var d = cell.data();
        var name = $("#provider").val();
        var agent = $("#agent").val();
        var email = $("#email").val();
        d.name = name;
        d.agent = agent;
        d.email = email;
        provideTable.row(cell).data(d).draw();

    }

    /**
     * remove a row
     * @param dataId
     * @param tr
     * @private
     */
    function _remove(dataId, tr) {
        var rowData = _.findWhere(provideData, {id: dataId});
        provideData = _.without(provideData, rowData);
        tr.remove().draw();
    }

    /**
     * set validate
     * @private
     */
    function _setValidate() {
        $("#table-form").validate({
                messages: {
                    provider: RC.constants.waringMessageProvider,
                    agent: RC.constants.waringMessageAgent,
                    email: RC.constants.waringMessageEmail
                }
            }
        );
    }

    /**
     * bind add event
     * @private
     */
    function _bindAddEvent() {
        // new a record
        $("#add-provider").on("click", function (e) {
            e.preventDefault();
            $(".form")[0].reset();

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmFormArguments, {
                element: $(".form"),
                okCallback: function () {
                    if ($("#table-form").valid()) {
                        _add();
                        return true;
                    }
                    return false;
                }
            }));
        });
    }

    /**
     * bind modify event
     * @private
     */
    function _bindModifyEvent() {
        // Edit record
        $('#provideTable').on('click', 'a.editor_edit', function (e) {
            e.preventDefault();

            var dataId = $(this).data('id').toString();
            var rowData = _.findWhere(provideData, {id: dataId});
            $("#provider").val(rowData.name);
            $("#agent").val(rowData.agent);
            $("#email").val(rowData.email);

            var cell = provideTable.row($(this).closest('tr'));

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmFormArguments, {
                element: $(".form"),
                okCallback: function () {
                    _modify(cell);
                    return true;
                }
            }));
        });
    }

    /**
     * bind remove event
     * @private
     */
    function _bindRemoveEvent() {
        // Delete a record
        $('#provideTable').on('click', 'a.editor_remove', function (e) {
            e.preventDefault();

            var dataId = $(this).data('id').toString();
            var tr = provideTable.row($(this).closest('tr'));

            RC.common.warning(_.extend({}, opts.defaultConfirmArguments.waringArguments, {
                element: $(".warn"),
                closeCallback: function () {
                    _remove(dataId, tr);
                }
            }));
        });
    }

    function _initSelect2() {
        $('#selectTreatment').select2({
            tags: true,
            ajax: {
                url: opts.urls.query,
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
                            'text': item.name
                        });
                    });
                    return {
                        results: myResults
                    };
                }
            }
        });
    }
    /**
     * Provider page Initialization
     * @private
     */
    function _init() {

        _loadData();
        _setValidate();
        _bindAddEvent();
        _bindModifyEvent();
        _bindRemoveEvent();
        _initSelect2();
        _initChart();

    }

    _init();

})
(jQuery);
