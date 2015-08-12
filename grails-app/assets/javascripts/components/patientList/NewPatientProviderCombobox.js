var flight = require('flight');
var WithCombobox = require('../common/WithCombobox');
var URLs = require('../../constants/Urls');

function NewPatientProviderCombobox() {
    this.options({
        url: URLs.GET_PROVIDER,
        requestData: function (val) {
            return {
                name: val,
                type: 9,
                groupId: this.getGroupId(),
                max: 1000
            }
        },
        itemFormat: function (data) {
            return {
                label: data.firstName + " " + data.lastName,
                value: data.id
            }
        },
        appendTo: ".container"
    });

    this._previousGroupId = null;

    this.onGroupSelected = function (e, data) {
        if (!this._previousGroupId) {
            this.$node.prop("disabled", false);
            this.$node.parent().find('.ui-button').removeClass('disable');
        }

        if (data.groupId !== this._previousGroupId) {
            this.clear();
            this.setGroupId(data.groupId);
            this._previousGroupId = data.groupId;
        }
    };

    this.setGroupId = function (id) {
        this._groupId = id;
    };

    this.getGroupId = function () {
        return this._groupId;
    };

    this.clear = function () {
        $(this.$node)
            .val('')
            .data("id", '');
    };

    this.onReset = function () {
        this.clear();
        this.$node.prop("disabled", true);
        this.$node.parent().find('.ui-button').addClass('disable');
        this.setGroupId('');
        this._previousGroupId = null;
    };

    this.after('initialize', function () {
        this.on(document, 'newPatientGroupSelected', this.onGroupSelected);
        this.on(document, 'newPatientGroupClear', this.onReset);
        this.on(document, 'newPatientReset', this.onReset);
    });
}

module.exports = flight.component(WithCombobox, NewPatientProviderCombobox);
