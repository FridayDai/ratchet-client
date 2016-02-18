var flight = require('flight');
var WithFormDialog = require('../../common/WithFormDialog');
var PhoneNumberValidation = require('../../shared/validation/PhoneNumberValidation');
var PatientEmailValidation = require('../../shared/validation/PatientEmailValidation');
var PatientIdentifyValidation = require('../../shared/validation/PatientIdentifyValidation');
var PatientBirthdayValidation = require('../../shared/validation/PatientBirthdayValidation');

var EmptyEmailConfirmation = require('../../shared/components/EmptyEmailConfirmation');

var EditPatientBirthdayDayCombobox = require('../../shared/components/PatientBirthdayDayCombobox');
var EditPatientBirthdayMonthCombobox = require('../../shared/components/PatientBirthdayMonthCombobox');
var EditPatientBirthdayYearCombobox = require('../../shared/components/PatientBirthdayYearCombobox');
var PatientPhoneInputField = require('../../shared/components/PatientPhoneInputField');

var Utility = require('../../../utils/Utility');

var FOOTER_PANEL = [
    '<div class="dialog-footer-panel ui-dialog-content ui-widget-content">',
        '<a href="#" class="delete-patient-btn">Delete Patient</a>',
    '</div>'
].join('');

function EditPatientFormDialog() {
    flight.compose.mixin(this, [
        EmptyEmailConfirmation
    ]);

    this.attributes({
        identifyFieldSelector: '#identify',
        firstNameFieldSelector: '#firstName',
        lastNameFieldSelector: '#lastName',
        phoneNumberFieldSelector: '#phone',
        emailFieldSelector: '#email',
        birthdayMonthFieldSelector: '#birthdayMonth',
        birthdayDayFieldSelector: '#birthdayDay',
        birthdayYearFieldSelector: '#birthdayYear'
    });

    this.children({
        phoneNumberFieldSelector: PatientPhoneInputField,
        birthdayMonthFieldSelector: EditPatientBirthdayMonthCombobox,
        birthdayDayFieldSelector: EditPatientBirthdayDayCombobox,
        birthdayYearFieldSelector: EditPatientBirthdayYearCombobox
    });

    this.options({
        title: 'EDIT PATIENT',
        width: 620,
        buttons: ['Save']
    });

    this.onShow = function (e, data) {
        this.$node.removeClass('ui-hidden');
        this.prepareForShow(data);
        this.show();
    };

    this.footerRendered = false;

    this.prepareForShow = function (data) {
        var me = this;

        this.select('identifyFieldSelector').val(data.identify);
        this.select('firstNameFieldSelector').val(data.firstName);
        this.select('lastNameFieldSelector').val(data.lastName);
        this.select('phoneNumberFieldSelector').intlTelInput('setNumber', data.phoneNumber);
        this.select('emailFieldSelector').val(data.email);

        if (data.birthday) {
            var momentBirthDay = Utility.toBirthdayMoment(data.birthday);
            var $birthdayMonth = this.select('birthdayMonthFieldSelector');
            var $birthdayDay = this.select('birthdayDayFieldSelector');
            var $birthdayYear = this.select('birthdayYearFieldSelector');

            $birthdayMonth.val(momentBirthDay.format('MMM'));
            $birthdayDay.val(momentBirthDay.date());
            $birthdayYear.val(momentBirthDay.year());
        }

        this._originalEmail = data.email;
        this._originalIdentify = data.identify;

        this.patientId = data.patientId;
        this.clientId = data.clientId;

        if (!this.footerRendered && data.accountIsAdmin) {
            this.footerRendered = true;

            $(FOOTER_PANEL)
                .find('.delete-patient-btn')
                .click(_.bind(me.onDeletePatientClicked, me))
                .end()
                .appendTo(this.$node.parent());
        }
    };

    this.onDeletePatientClicked = function (e) {
        e.preventDefault();

        this.trigger('showDeletePatientDialog');

        this.close();
    };

    this.originalEmailCheck = function () {
        return this._originalEmail === this.select('emailFieldSelector').val().trim();
    };

    this.originalIdentifyCheck = function () {
        return this._originalIdentify === this.select('identifyFieldSelector').val().trim();
    };

    this.initValidation = function () {
        return [
            PatientIdentifyValidation.get(this.originalIdentifyCheck, this),
            PhoneNumberValidation.get(),
            PatientEmailValidation.get(this.originalEmailCheck, this),
            PatientBirthdayValidation.get()
        ];
    };

    this.setExtraData = function () {
        var rawNumber = this.select('phoneNumberFieldSelector').val();
        var phoneNumber = rawNumber.replace(/[\s\(\)-]/g, '');
        var $birthdayMonth = this.select('birthdayMonthFieldSelector');
        var $birthdayDay = this.select('birthdayDayFieldSelector');
        var $birthdayYear = this.select('birthdayYearFieldSelector');

        var result = {
            patientId: this.patientId,
            id: this.select('identifyFieldSelector').val(),
            phoneNumber: phoneNumber,
            clientId: this.clientId
        };

        if ($birthdayMonth.val()) {
            result.birthday =
                Utility.toVancouverTime(
                    $birthdayMonth.val() + ' ' + $birthdayDay.val() + ', ' + $birthdayYear.val()
                );
        }

        return result;
    };

    this.onEditPatientSuccess = function () {
        var rawNumber = this.select('phoneNumberFieldSelector').val();
        var phoneNumber = rawNumber.replace(/[\s\(\)-]/g, '');
        var $birthdayMonth = this.select('birthdayMonthFieldSelector');
        var $birthdayDay = this.select('birthdayDayFieldSelector');
        var $birthdayYear = this.select('birthdayYearFieldSelector');

        this.trigger('updatePatientSuccess', {
            patientId: this.patientId,
            id: this.select('identifyFieldSelector').val(),
            firstName: this.select('firstNameFieldSelector').val(),
            lastName: this.select('lastNameFieldSelector').val(),
            email: this.select('emailFieldSelector').val(),
            number: rawNumber,
            phoneNumber: phoneNumber,
            clientId: this.clientId,
            birthday: $birthdayMonth.val() ?
                Utility.parseBirthdayFromSeparate(
                    $birthdayMonth.val() + ' ' + $birthdayDay.val() + ', ' + $birthdayYear.val()
                ) : null
        });
    };

    this.after('initialize', function () {
        this.on('formSuccess', this.onEditPatientSuccess);
    });

    this.before('teardown', function () {
        this.$node.parent()
            .find('.delete-patient-btn')
            .off('click');
    });
}

module.exports = flight.component(WithFormDialog, EditPatientFormDialog);
