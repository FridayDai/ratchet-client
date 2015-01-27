(function($, undefined) {
    'use strict';

    /**
     * go back to previous page
     * @private
     */
    function _goBackToPrePage() {
        $('.btn-back').on('click', function (e) {
            e.preventDefault();

            parent.history.back();
            return false;
        });
    }

    /**
     * page Initialization
     * @private
     */
    function _init() {
        _goBackToPrePage();
    }

    _init();

})(jQuery);
