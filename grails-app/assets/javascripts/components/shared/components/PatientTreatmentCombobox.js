var flight = require('flight');
var WithCombobox = require('../../common/WithCombobox');
var URLs = require('../../../constants/Urls');

var DEFAULT_SELECT_EVENT = 'select';

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
                isAbsoluteEventBased: data.isAbsoluteEventBased,
                timeStamp: data.sendTimeOffset,
                surgeryDate: data.surgeryDate,
                absoluteEventType: data.absoluteEventType
            };
        },
        appendTo: ".container"
    });

    this.attributes({
        groupSelectEvent: 'groupSelectEvent',
        groupClearEvent: 'groupClearEvent',
        resetEvent: 'resetEvent',
        isAbsoluteEventBased: 'isAbsoluteEventBased',
        absoluteEventType: 'absoluteEventType'
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

    this.__onSelect = function (e, ui) {
        this.select(ui.item);
    };

    this.__previousVal = null;

    this.select = function (item) {
        if (_.isUndefined(item)) {
            item = null;
        }

        if (this.__previousVal !== item.value) {
            this.__previousVal = item.value;

            var data = {};

            data[this.attr.selectDataKey] = item.value;
            data[this.attr.isAbsoluteEventBased] =  item.isAbsoluteEventBased;
            data[this.attr.absoluteEventType] =  item.absoluteEventType;

            if (this.beforeSelect) {
                this.beforeSelect.call(this, data);
            }

            if (this.attr.selectEvent !== DEFAULT_SELECT_EVENT) {
                this.trigger(this.attr.selectEvent, data);
            }
        }
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
