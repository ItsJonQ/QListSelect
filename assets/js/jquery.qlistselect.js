(function($) {
	$.fn.qListSelect = function(options) {
		var qLS = {};
		// Continue with Plugin if Selector is a "UL"
		if($(this).is('ul')) {
			qLS.t = $(this);
			qLS.li = qLS.t.find('li');
			qLS.selectClass = 'selected';
			qLS.select = qLS.li.hasClass(qLS.selectClass);

			var settings = $.extend({
				initialFocus		: true,
				keyboardActions		: true
			});

			qLS.actionSelect = function(ele){
				qLS.li.removeClass(qLS.selectClass);
				ele.addClass(qLS.selectClass).focus();
			};

			qLS.actionSelectFocus = function(direction) {
				var ele = qLS.t.find('li:focus');
				ele.removeClass(qLS.selectClass);
				if(direction === 'next') {
					if(!ele.is(':last-child')) {
						ele.next().focus().addClass(qLS.selectClass);
					} else {
						ele.addClass(qLS.selectClass);
					}
				} else if (direction === 'prev' || direction === 'previous' ) {
					if(!ele.is(':first-child')) {
						ele.prev().focus().addClass(qLS.selectClass);
					} else {
						ele.addClass(qLS.selectClass);
					}
				} else {
					return false;
				}
			};

			// Adding TabIndex to List Items
			var liCount = 0;
			qLS.li.each(function(){
				liCount++;
				$(this).attr('tabindex', liCount);
			});

			// Settings: Initial Focus
			if(settings.initialFocus) {
				qLS.li.first().focus();
			}

			// Settings: Keyboard Actions
			if(settings.keyboardActions) {
				$(document).on('keydown', function(e) {
					if(e.keyCode === 38 || e.keyCode === 87) {
						e.preventDefault();
						qLS.actionSelectFocus('prev');
					}
					if(e.keyCode === 9 || e.keyCode === 40 || e.keyCode === 83) {
						e.preventDefault();
						qLS.actionSelectFocus('next');
					}
				});				
			}

			return this.each(function(){
				qLS.li.first().addClass(qLS.selectClass);

				qLS.li.on('click', function() {
					qLS.actionSelect($(this));
				});	
			});
		}
	}
	console.log('jquery.qlistselect.js loaded.')
}(jQuery));