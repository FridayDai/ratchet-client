function EmergencyContactFieldRequired() {
    this.attributes({
        emergencyContactFieldSelector: '.emergency-field',
        emergencyContactPermissionSelector: '.permission-confirm',
        emergencyContactPermissionCheckSelector: '.permission-confirm-check',
        emergencyContactRequiredMarkSelector: '.emergency-required'
    });

    this._emergencyContactRequired = false;
    this.onEmergencyContactFieldInput = function (e) {
        var $target = $(e.target);

        if ($target.val() !== '' && !this._emergencyContactRequired) {
            this.setEmergencyContactRequired(true);
        }

        if ($target.val() === '') {
            var isAllEmpty = _.every(this.select('emergencyContactFieldSelector'), function (element) {
                return $(element).val() === '';
            });

            if (isAllEmpty) {
                this.setEmergencyContactRequired(false);
            }
        }
    };

    this.setEmergencyContactRequired = function (isRequired) {
        if (isRequired) {
            this._emergencyContactRequired = true;

            this.select('emergencyContactFieldSelector')
                .attr('required', true)
                .each(function () {
                    var placeholder = $(this).attr('placeholder');
                    var dataPlaceholder = $(this).data('placeholder');

                    if (placeholder.indexOf(' (Optional)') >= 0) {
                        $(this).attr('placeholder', placeholder.replace(' (Optional)', ''));
                    }

                    if (dataPlaceholder && dataPlaceholder.indexOf(' (Optional)') >= 0) {
                        $(this).data('placeholder', dataPlaceholder.replace(' (Optional)', ''));
                    }
                });

            this.select('emergencyContactPermissionSelector')
                .addClass('visible');

            this.select('emergencyContactPermissionCheckSelector')
                .attr('required', true);

            this.select('emergencyContactRequiredMarkSelector')
                .show();
        } else {
            this._emergencyContactRequired = false;

            this.select('emergencyContactFieldSelector')
                .attr('required', false)
                .each(function () {
                    var placeholder = $(this).attr('placeholder');
                    var dataPlaceholder = $(this).data('placeholder');

                    if (placeholder.indexOf(' (Optional)') === -1 && !$(this).is(':focus')) {
                        $(this).attr('placeholder', placeholder + ' (Optional)');
                    }

                    if (dataPlaceholder && dataPlaceholder.indexOf(' (Optional)') === -1) {
                        $(this).data('placeholder', dataPlaceholder + ' (Optional)');
                    }
                })
                .valid();

            this.select('emergencyContactPermissionCheckSelector')
                .attr('required', false);
            this.select('emergencyContactPermissionCheckSelector').valid();

            this.select('emergencyContactPermissionSelector')
                .removeClass('visible');

            this.select('emergencyContactRequiredMarkSelector')
                .hide();
        }
    };

    this._onClose = function () {
        this.setEmergencyContactRequired(false);
    };

    this.after('initialize', function () {
        this.on('dialogclose', this._onClose);

        this.on(this.attr.relationshipSelectEvent, this.onEmergencyContactFieldInput);
        this.on(this.attr.relationshipClearEvent, this.onEmergencyContactFieldInput);
        this.on('keyup', {
            'emergencyContactFieldSelector': this.onEmergencyContactFieldInput
        });
    });
}

module.exports = EmergencyContactFieldRequired;
