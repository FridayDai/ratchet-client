function AccountFormDialog() {
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
        this.on('click', {
            providerCheckboxSelector: this.onProviderCheckboxClick
        });
    });
}

module.exports = AccountFormDialog;
