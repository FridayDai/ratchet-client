var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');
var WithChildren = require('../common/WithChildren');
var PARAMs = require('../../constants/Params');

var AccountEmailValidation = require('../shared/validation/AccountEmailValidation');
var AccountGroupSelectbox = require('./AccountGroupSelectbox');

function NewAccountFormDialog() {
    this.attributes({
        doctorCheckboxSelector: '#doctor',
        groupFieldSelector: '#selectGroup',
        providerCheckboxSelector: '#provider',
        npiFieldSelector: '#npi',
        administratorCheckboxSelector: '#accountManagement',
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
        return _.defaultsDeep({
            rules: {
                npi: {
                    'number': true
                }
            }
        }, AccountEmailValidation.get());
    };

    this.onShow = function () {
        this.$node.removeClass('ui-hidden');
        this.show();
    };

    this.onClose = function () {
        this.trigger('newAccountReset');

        var $groupField = this.select('groupFieldSelector');
        var $requireMark = this.select('groupRequireMarkSelector');
        var $npiParent = this.select('npiFieldSelector').parent();

        $groupField.attr('required', false);
        if (!$requireMark.hasClass('hidden')) {
            $requireMark.addClass('hidden');
        }

        if (!$npiParent.hasClass('hidden')) {
            $npiParent.addClass('hidden');
        }
    };

    this.setExtraData = function () {
        var isDoctor = this.select('doctorCheckboxSelector').prop('checked') === true;
        var isAccountManagement = this.select('administratorCheckboxSelector').prop('checked') === true;
        var isProvider = this.select('providerCheckboxSelector').prop("checked") === true;

        return {
            doctor: isDoctor,
            accountManagement: isAccountManagement,
            type: isProvider ? PARAMs.ACCOUNT_TYPE.PROVIDER : PARAMs.ACCOUNT_TYPE.NON_PROVIDER
        };
    };

    this.onAddAccountSuccess = function () {
        this.trigger('addAccountSuccess');
    };

    this.onProviderCheckboxClick = function () {
        var isProvider = this.select('providerCheckboxSelector').prop('checked') === true;
        var $groupField = this.select('groupFieldSelector');
        var $requireMark = this.select('groupRequireMarkSelector');
        var $npiParent = this.select('npiFieldSelector').parent();

        if (isProvider) {
            $groupField.attr('required', true);
            $npiParent.removeClass('hidden');

            if ($requireMark.hasClass('hidden')) {
                $requireMark.removeClass('hidden');
            }
        } else {
            $groupField.attr('required', false);
            $groupField.valid();

            $npiParent.addClass('hidden');

            if (!$requireMark.hasClass('hidden')) {
                $requireMark.addClass('hidden');
            }
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
