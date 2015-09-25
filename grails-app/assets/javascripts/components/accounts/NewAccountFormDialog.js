var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var WithChildren = require('../common/WithChildren');
var URLs = require('../../constants/Urls');
var Utility = require('../../utils/Utility');

var AccountEmailValidation = require('../shared/validation/AccountEmailValidation');
var AccountGroupSelectbox = require('./AccountGroupSelectbox');

function NewAccountFormDialog() {
    this.attributes({
        groupFieldSelector: '#selectGroup',
        providerCheckboxSelector: '#provider',
        groupRequireMarkSelector: '.group-require-mark'
    });

    this.options({
        title: 'NEW ACCOUNT',
        width: 620,
        buttons: ['Save']
    });

    this.children({
        groupFieldSelector: {
            child: AccountGroupSelectbox,
            attributes: {
                clearEvent: 'newAccountReset'
            }
        }
    });

    this.initValidation = function () {
        return AccountEmailValidation.get();
    };

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        //this.prepareToShow(data);
        this.show();
    };

    this.prepareToShow = function (data) {
        if (data.check !== 'false') {
            this.setPatientExisting(data);
            this.select('patientIdStaticSelector').text(data.patientId);
        } else {
            this.setPatientNotExisting();
            this.select('patientIdStaticSelector').text(data.identify);
        }
    };

    this.onClose = function () {
        this.trigger('newAccountReset');
    };

    this.onAddAccountSuccess = function (e, data) {
        //window.location.href = URLs.PAGE_PATIENT_DETAIL.format(data.id);
    };

    this.onProviderCheckboxClick = function () {
        var isProvider = this.select('providerCheckboxSelector').prop('checked') === true;
        var $groupField = this.select('groupFieldSelector');
        var $requireMark = this.select('groupRequireMarkSelector');

        if (isProvider) {
            $groupField.attr('required', true);

            if ($requireMark.hasClass('hidden'))
                $requireMark.removeClass('hidden');
        } else {
            $groupField.attr('required', false);
            $groupField.valid();

            if (!$requireMark.hasClass('hidden'))
                $requireMark.addClass('hidden');
        }
    };

    this.after('initialize', function () {
        this.on('dialogclose', this.onClose);
        this.on('formSuccess', this.onAddAccountSuccess);

        this.on('click', {
            providerCheckboxSelector: this.onProviderCheckboxClick
        });
    });
}

module.exports = flight.component(
    WithChildren,
    WithFormDialog,
    NewAccountFormDialog
);
