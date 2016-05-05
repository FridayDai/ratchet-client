var flight = require('flight');
var WithSelectbox = require('../../common/WithSelectbox');
var URLs = require('../../../constants/Urls');

function GroupSelectbox() {
    this.options({
        tags: true,
        ajax: {
            transport: function (params) {
                return $.ajax(_.assign(params, {dropProcess: true}));
            },
            url: URLs.GET_GROUPS,
            data: function (name) {
                return {
                    name: name,
                    length: 1000
                };
            },
            results: function (data) {
                var myResults = [];
                $.each(data.data, function (index, item) {
                    myResults.push({
                        id: item.id,
                        text: item.name
                    });
                });

                return {
                    results: myResults
                };
            }
        }
    });

    this.onClear = function () {
        this.clear();
    };

    this.after('initialize', function () {
        this.on(document, this.attr.clearEvent, this.onClear);
    });
}

module.exports = flight.component(WithSelectbox, GroupSelectbox);
