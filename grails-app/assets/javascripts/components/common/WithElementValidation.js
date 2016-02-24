function WithElementValidation() {
    this.__setValidation = function (rules) {
        if (this.$node) {
            var $form = this.$node.closest('form');

            if ($form.length > 0) {
                var componentRules = $form.data('componentRules') || [];

                componentRules.push({
                    element: this.$node,
                    rules: rules
                });

                $form.data('componentRules', componentRules);
            }
        }
    };
}

module.exports = WithElementValidation;
