(function($) {
	$.fn.qListSelect = function(options) {
		var qLS = {};
		// Continue with Plugin if Selector is a "UL"
		if($(this).is('ul')) {
			qLS.qClass = 'qListSelect';
			qLS.qCount = 0;

			qLS.list = $(this);
			qLS.listItem = qLS.list.find('li');
			qLS.selectClass = 'selected';
			qLS.select = qLS.listItem.hasClass(qLS.selectClass);

			var settings = $.extend({
				initialFocus		: true,
				keyboardActions		: true
			}, options);

			qLS.actionSelect = function(ele){
				qLS.listItem.removeClass(qLS.selectClass);
				ele.addClass(qLS.selectClass).focus();
			};

			qLS.actionSelectFocus = function(direction) {
				var ele = qLS.list.find('li:focus');
				if(direction !== null) {
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
					}
					// Scroll To Function
					// http://jsfiddle.net/coma/9KvhL/25/
					// qLS.list.scrollTo('.'+qLS.selectClass);
				} else {
					return false;
				}
			};

			// Adding TabIndex to List Items
			var liCount = 0;
			qLS.listItem.each(function(){
				liCount++;
				$(this).attr('tabindex', liCount);
			});

			// Settings: Initial Focus
			if(settings.initialFocus) {
				qLS.listItem.first().focus().addClass(qLS.selectClass);
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
				qLS.list.each(function(){
					qLS.qCount++;
					$(this).addClass(qLS.qClass).addClass('qLS-id-'+qLS.qCount);
				});
				qLS.listItem.on('click', function() {
					qLS.actionSelect($(this));
				});	
			});
		}
	}
	console.log('jquery.qlistselect.js loaded.')
}(jQuery));