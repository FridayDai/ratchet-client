var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

function PatientTreatmentCombobox() {
    this.options({
        url: URLs.GET_TREATMENTS,
        requestData: function (val) {
            return {
                treatmentTitle: val,
                groupId: this.getGroupId(),
                max: 1000
            };
        },
        itemFormat: function (data) {
            return {
                label: data.title + ' ' + data.tmpTitle,
                value: data.id,
                surgeryDateRequired: data.surgeryTimeRequired,
                timeStamp: data.sendTimeOffset,
                surgeryDate: data.surgeryDate
            };
        },
        appendTo: ".container"
    });

    this.attributes({
        groupSelectEvent: 'groupSelectEvent',
        groupClearEvent: 'groupClearEvent',
        resetEvent: 'resetEvent'
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

    this.onSelect = function (e, ui) {
        this.trigger(this.attr.selectEvent, {
            surgeryDate: ui.item.surgeryDate,
            surgeryDateRequired: ui.item.surgeryDateRequired
        });
    };

    this.onClear = function () {
        this.trigger(this.attr.clearEvent);
    };

    this.onReset = function () {
        this.clear();
        this.$node.prop("disabled", true);
        this.$node.parent().find('.ui-button').addClass('disable');
        this.setGroupId('');
        this._previousGroupId = null;
    };

    this.after('initialize', function () {
        this.on(document, this.attr.groupSelectEvent, this.onGroupSelected);
        this.on(document, this.attr.groupClearEvent, this.onReset);
        this.on(document, this.attr.resetEvent, this.onReset);
    });
}

module.exports = flight.component(WithCombobox, PatientTreatmentCombobox);
