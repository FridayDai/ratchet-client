var Notifications = require('../../common/Notification');

function EmptyEmailConfirmation() {
    this.attributes({
        emailFieldSelector: '#email',
        declineFieldSelector: '#emailStatus'
    });

    this.beforeSubmitForm = function () {
        var me = this;

        if (this.isEmailFieldBlank() && !this.isDeclined()) {
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
        } else if (this.isEmailFieldBlank() && this.isDeclined()) {
            Notifications.confirm({
                title: 'ARE YOU SURE?',
                message: [
                    'The patient has declined to received any email communication.' +
                    ' This cannot be undone once saved. Are you sure?'
                ]
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
                title: 'ARE YOU SURE?',
                message: [
                    'The patient has declined to received any email communication.' +
                    ' This cannot be undone once saved. Are you sure?'
                ]
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
