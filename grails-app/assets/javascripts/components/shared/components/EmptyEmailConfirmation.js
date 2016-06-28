var Notifications = require('../../common/Notification');
var STRINGs = require('../../../constants/Strings.js');


function EmptyEmailConfirmation() {
    this.attributes({
        emailFieldSelector: '#email',
        declineFieldSelector: '#emailStatus'
    });

    this.beforeSubmitForm = function () {
        var me = this;

        if (this.isEmailFieldBlank() && !this.isDeclined()) {
            Notifications.confirm({
                title: STRINGs.NO_EMAIL_TITLE,
                message: STRINGs.NO_EMAIL_MESSAGE
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
        } else if (this.isEmailFieldBlank() && this.isDeclined()) {
            Notifications.confirm({
                title: STRINGs.CONFIRM_TITLE,
                message: STRINGs.CONFIRM_MESSAGE
            }, {
                buttons: [
                    {
                        text: "Yes, I'm sure",
                        'class': 'btn-agree',
                        click: function () {
                            // Warning dialog close
                            $(this).dialog("close");

                            // Bulk import dialog close
                            me.submitForm();
                        }
                    }, {
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
            });

            return false;
        } else if ( !this.isEmailFieldBlank() && this.isDeclined()){
            Notifications.confirm({
                title: STRINGs.CONFIRM_TITLE,
                message: STRINGs.CONFIRM_MESSAGE
            }, {
                buttons: [
                    {
                        text: "Yes, I'm sure",
                        'class': 'btn-agree',
                        click: function () {
                            // Warning dialog close
                            $(this).dialog("close");

                            // Bulk import dialog close
                            me.submitForm();
                        }
                    }, {
                        text: 'Cancel',
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

    this.isDeclined = function () {
        return this.select('declineFieldSelector').prop('checked');
    };
}

module.exports = EmptyEmailConfirmation;
