(function($) {
	$.fn.qListSelect = function(options) {
		var qLS = {};
		// Continue with Plugin if Selector is a "UL"
		if($(this).is('ul')) {
			qLS.t = $(this);
			qLS.li = qLS.t.find('li');
			qLS.selectClass = 'selected';

			return this.each(function(){
				qLS.li.first().addClass(qLS.selectClass);

				qLS.li.on('click', function() {
					qLS.li.removeClass(qLS.selectClass);
					$(this).addClass(qLS.selectClass);
				});	

			});
		}
	}
	console.log('jquery.qlistselect.js loaded.')
}(jQuery));