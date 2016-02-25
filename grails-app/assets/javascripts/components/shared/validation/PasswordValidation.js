require('../../../libs/jquery-validation/jquery.validate.js');
require('tooltipster');


var CONTENT = [
    '<div class="password-rules-tooltip">',
        '<div class="desc">Password must meet the following requirements:</div>',
        '<div class="rule 1-capital-letter">',
            '<i class="fa fa-check-square"></i> At least <strong>one capital letter</strong>',
        '</div>',
        '<div class="rule 1-lowercase-letter">',
            '<i class="fa fa-check-square"></i> At least <strong>one lowercase letter</strong>',
        '</div>',
        '<div class="rule 1-number">',
            '<i class="fa fa-check-square"></i> At least <strong>one number</strong>',
        '</div>',
        '<div class="rule 8-characters">',
            '<i class="fa fa-check-square"></i> At least <strong>8 characters</strong>',
        '</div>',
    '</div>'
].join('');

var RULES = {
    '1-capital-letter': '[A-Z]',
    '1-lowercase-letter': '[a-z]',
    '1-number': '\\d',
    '8-characters': '.{8,}'
};

function addPassClasses($tooltip, passed) {
    _.each(passed, function (key) {
        var $key = $tooltip.find('.' + key);
        if (!$key.hasClass('pass')) {
            $key.addClass('pass');
        }
    });
}

$.validator.addMethod('PasswordSecurityCheck', function (value, element) {
    var $element = $(element);

    if (!$element.data('tooltipsterNs')) {
        $(element).tooltipster({
            content: CONTENT,
            contentAsHTML: true,
            position: 'right',
            autoClose: false,
            trigger: 'custom'
        });
    }

    var notPassed = [];
    var passed = [];

    _.each(RULES, function (rule, key) {
        var regexp = new RegExp(rule, 'g');
        if (!regexp.test(value)) {
            notPassed.push(key);
        } else {
            passed.push(key);
        }
    });

    if (notPassed.length > 0) {
        $(element).tooltipster('show');

        var $tooltip = $($element.tooltipster('elementTooltip'));

        _.each(notPassed, function (key) {
            $tooltip.find('.' + key).removeClass('pass');
        });

        addPassClasses($tooltip, passed);

        return false;
    } else {
        addPassClasses($($element.tooltipster('elementTooltip')), passed);

        $(element).tooltipster('hide');
        return true;
    }
}, null);


module.exports = {
    rules: {
        PasswordSecurityCheck: true
    }
};
