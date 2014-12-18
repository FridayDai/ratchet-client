/**
 * Created by sid on 12/12/14.
 */
;
(function ($, undefined) {
    'use strict';
    var login = RC.pages.login = RC.pages.login || {};

    function _init(){
        RC.common.progress(true);
    }
    $.extend(login, {
        init : function(){
            _init();
        }
    });
})(jQuery);

//RC.pages.login.init();