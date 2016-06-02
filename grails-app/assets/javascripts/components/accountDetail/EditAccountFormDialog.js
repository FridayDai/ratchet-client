var flight = require('flight');
var WithFormDialog = require('../common/WithFormDialog');

var PARAMs = require('../../constants/Params');

var AccountGroupSelectbox = require('../shared/components/AccountGroupSelectbox');
var AccountFormDialog = require('../shared/components/AccountFormDialog');

var AccountNPIValidation = require('../shared/validation/AccountNPIValidation');

function EditAccountFormDialog() {
    this.attributes({
        doctorCheckboxSelector: '#doctor',
        firstNameFieldSelector: '#firstName',
        lastNameFieldSelector: '#lastName',
        emailFieldSelector: '#email',
        providerCheckboxSelector: '#accountProvider',
        adminCheckboxSelector: '#accountManagement',
        enableAlertCheckboxSelector: '#alert',
        npiFieldSelector: '#npi',
        groupFieldSelector: '#groupSelect',
        groupRequireMarkSelector: '.group-require-mark'
    });

    this.options({
        title: 'EDIT ACCOUNT',
        width: 620,
        buttons: ['Save']
    });

    this.children({
        groupFieldSelector: {
            child: AccountGroupSelectbox,
            attributes: {
                clearEvent: 'editAccountReset'
            }
        }
    });

    this.initValidation = function () {
        return AccountNPIValidation.get(this.originalNPICheck, this);
    };

    this.originalNPICheck = function () {
        return this._originalnpi === this.select('npiFieldSelector').val().trim();
    };

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepareForShow(data);
        this.show();
    };

    this.prepareForShow = function (data) {
        this.select('doctorCheckboxSelector').prop('checked', data.isDoctor);
        this.select('firstNameFieldSelector').val(data.firstName);
        this.select('lastNameFieldSelector').val(data.lastName);
        this.select('emailFieldSelector').val(data.email);
        this.select('providerCheckboxSelector').prop('checked', data.isProvider);
        this.select('adminCheckboxSelector').prop('checked', data.isAdmin);
        this.select('enableAlertCheckboxSelector').prop('checked', data.enableAlert);

        if (data.isProvider) {
            this.select('npiFieldSelector')
                .parent()
                .removeClass('hidden')
                .end()
                .val(data.npi === 'null' ? '' : data.npi);

            this.select('groupFieldSelector').attr('required', true);
            this.select('groupRequireMarkSelector').removeClass('hidden');

            this._originalnpi = data.npi;
        }

        var groupItems = [];
        $.each(data.groups, function (index, item) {
            groupItems.push({
                id: item.id,
                text: item.name
            });
        });

        this.select('groupFieldSelector').select2('data', groupItems);
    };

    this.onClose = function () {
        this.select('groupFieldSelector')
            .attr('required', false);

        var $npi = this.select('npiFieldSelector');
        var $npiParent = $npi.parent();

        $npi.val('');

        if (!$npiParent.hasClass('hidden')) {
            $npiParent.addClass('hidden');
        }

        this.trigger('editAccountReset');
    };

    this.setExtraData = function () {
        var isDoctor = this.select('doctorCheckboxSelector').prop('checked') === true;
        var isAccountManagement = this.select('adminCheckboxSelector').prop('checked') === true;
        var isProvider = this.select('providerCheckboxSelector').prop("checked") === true;
        var enableAlert = this.select('enableAlertCheckboxSelector').prop("checked") === true;

        return {
            doctor: isDoctor,
            accountManagement: isAccountManagement,
            type: isProvider ? PARAMs.ACCOUNT_TYPE.PROVIDER : PARAMs.ACCOUNT_TYPE.NON_PROVIDER,
            enableAlert: enableAlert
        };
    };

    this.onUpdateAccountSuccess = function () {
        var isProvider = this.select('providerCheckboxSelector').prop("checked") === true;
        var data = {
            isDoctor: this.select('doctorCheckboxSelector').prop('checked') === true,
            firstName: this.select('firstNameFieldSelector').val().trim(),
            lastName: this.select('lastNameFieldSelector').val().trim(),
            email: this.select('emailFieldSelector').val().trim(),
            isProvider: isProvider,
            isAdmin: this.select('adminCheckboxSelector').prop('checked') === true,
            enableAlert: this.select('enableAlertCheckboxSelector').prop('checked') === true
        };

        var groups = [];
        $.each(this.select('groupFieldSelector').select2('data'), function (index, item) {
            groups.push({
                'id': item.id,
                'name': item.text
            });
        });

        data.groups = groups;

        if (isProvider) {
            data.npi = this.select('npiFieldSelector').val().trim();
        }

        this.trigger('updateAccountSuccess', data);
    };

    this.after('initialize', function () {
        this.on('dialogclose', this.onClose);
        this.on('formSuccess', this.onUpdateAccountSuccess);
    });
}

module.exports = flight.component(
    WithFormDialog,
    AccountFormDialog,
    EditAccountFormDialog
);
