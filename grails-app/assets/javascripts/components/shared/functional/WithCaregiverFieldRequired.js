function CaregiverFieldRequired() {
    this.attributes({
        caregiverFieldSelector: '.caregiver-field',
        caregiverPermissionSelector: '.permission-confirm',
        caregiverPermissionCheckSelector: '.permission-confirm-check',
        caregiverRequiredMarkSelector: '.caregiver-required'
    });

    this._caregiverRequired = false;
    this.onCaregiverFieldInput = function (e) {
        var $target = $(e.target);

        if ($target.val() !== '' && !this._caregiverRequired) {
            this.setCaregiverRequired(true);
        }

        if ($target.val() === '') {
            var isAllEmpty = _.every(this.select('caregiverFieldSelector'), function (element) {
                return $(element).val() === '';
            });

            if (isAllEmpty) {
                this.setCaregiverRequired(false);
            }
        }
    };

    this.setCaregiverRequired = function (isRequired) {
        if (isRequired) {
            this._caregiverRequired = true;

            this.select('caregiverFieldSelector')
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

            this.select('caregiverPermissionSelector')
                .addClass('visible');

            this.select('caregiverPermissionCheckSelector')
                .attr('required', true);

            this.select('caregiverRequiredMarkSelector')
                .show();
        } else {
            this._caregiverRequired = false;

            this.select('caregiverFieldSelector')
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

            this.select('caregiverPermissionCheckSelector')
                .attr('required', false);
            this.select('caregiverPermissionCheckSelector').valid();

            this.select('caregiverPermissionSelector')
                .removeClass('visible');

            this.select('caregiverRequiredMarkSelector')
                .hide();
        }
    };

    this._onClose = function () {
        this.setCaregiverRequired(false);
    };

    this.after('initialize', function () {
        this.on('dialogclose', this._onClose);

        this.on(this.attr.relationshipSelectEvent, this.onCaregiverFieldInput);
        this.on(this.attr.relationshipClearEvent, this.onCaregiverFieldInput);
        this.on('keyup', {
            'caregiverFieldSelector': this.onCaregiverFieldInput
        });
    });
}

module.exports = CaregiverFieldRequired;
