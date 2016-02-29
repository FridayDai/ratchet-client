require('../../../libs/jquery-validation/jquery.validate.js');

var STRINGs = require('../../../constants/Strings');

$.validator.addMethod("comboboxValueCheck", function(value, elem) {
    if (value === '') {
        return true;
    } else {
        return !!$(elem).data('id');
    }
}, STRINGs.COMBOBOX_EMPTY_VALUE);

module.exports = {
    get: function () {
        return function ($form) {
            $form.find('.ui-combobox-input').filter(function(index, elem) {
                return !$(elem).data('groupValidation');
            }).each(function() {
                $(this).rules('add', {
                    comboboxValueCheck: true
                });
            });
        };
    }
};
