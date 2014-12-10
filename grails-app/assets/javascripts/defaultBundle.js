
//= require libs/jquery-1.9.0.min
//= require libs/jquery.validate.min.js
//= require libs/underscore

if (typeof jQuery !== 'undefined') {
	(function($) {
		$('#spinner').ajaxStart(function() {
			$(this).fadeIn();
		}).ajaxStop(function() {
			$(this).fadeOut();
		});
	})(jQuery);
}
