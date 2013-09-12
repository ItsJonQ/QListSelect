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
				keyboardActions		: true
			});

			qLS.actionSelect = function(ele){
				qLS.li.removeClass(qLS.selectClass);
				ele.addClass(qLS.selectClass).focus();
			};

			qLS.actionSelectNext = function(ele) {
				qLS.t.find('li:focus').removeClass(qLS.selectClass);
				qLS.t.find('li:focus').next().focus().addClass(qLS.selectClass);
			}

			// Adding TabIndex to List Items
			var liCount = 0;
			qLS.li.each(function(){
				liCount++;
				$(this).attr('tabindex', liCount);
			});

			// Settings: Keyboard Actions
			if(settings.keyboardActions) {
				$(document).on('keydown', function(e) {
					if(e.keyCode === 9) {
						e.preventDefault();
						console.log('Tab is Pressed');
						qLS.actionSelectNext();
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