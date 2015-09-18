var Notifications = require('../common/Notification');

function EmptyEmailConfirmation() {
    this.attributes({
        emailFieldSelector: '#email'
    });

    this.beforeSubmitForm = function () {
        var me = this;

        if (this.isEmailFieldBlank()) {
            Notifications.confirm({
                title: 'NO EMAIL ADDRESS',
                message: [
                    'Patient without email address will not receive any automated task reminder.',
                    'Do you want to proceed?'
                ]
            }, {
                buttons: [
                    {
                        text: 'Yes',
                        'class': 'btn-agree',
                        click: function () {
                            // Warning dialog close
                            $(this).dialog("close");

                            // Bulk import dialog close
                            me.submitForm();
                        }
                    }, {
                        text: 'No',
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
            });

            return false;
        }
    };

    this.isEmailFieldBlank = function () {
        var $email = this.select('emailFieldSelector');

        return $email.is(':visible') && $email.val() === '';
    };
}

module.exports = EmptyEmailConfirmation;
