function WithElementValidation() {
    this.setElementValidation = function (element, rules) {
        if (element) {
            var $form = element.closest('form');

            if ($form.length > 0) {
                var validator = $form.data('validator');
                if (validator) {
                    element.rules('add', rules);
                } else {
                    var componentRules = $form.data('componentRules') || [];

                    componentRules.push({
                        element: element,
                        rules: rules
                    });

                    $form.data('componentRules', componentRules);
                }
            }
        }
    };
}

module.exports = WithElementValidation;
