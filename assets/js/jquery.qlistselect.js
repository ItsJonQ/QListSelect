(function($) {
	$.fn.qListSelect = function(options) {
		var qLS = {};
		// Continue with Plugin if Selector is a "UL"
		if($(this).find('ul').length) {
			qLS.qClass = 'qListSelect';
			qLS.qCount = 0;

			qLS.obj = $(this)
			qLS.list = qLS.obj.find('ul');
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
				var eleNew,
					ele = qLS.list.find('li:focus');
				if(direction !== null) {
					if(direction === 'next') {
						if(!ele.is(':last-child')) {
							eleNew = ele.next();
						} else {
							eleNew = ele;
						}
					} else if (direction === 'prev' || direction === 'previous' ) {
						if(!ele.is(':first-child')) {
							eleNew = ele.prev();
						} else {
							eleNew = ele;
						}
					}
					eleNew.siblings().removeClass(qLS.selectClass);
					eleNew.focus().addClass(qLS.selectClass);
				} else {
					return false;
				}
			};

			// Adding TabIndex to List Items
			qLS.assignIndex = function() {
				var liCount = 0;
				qLS.listItem.each(function(){
					liCount++;
					$(this).attr('tabindex', liCount);
				});
			};

			// Settings: Initial Focus
			if(settings.initialFocus) {
				var firstItem = qLS.listItem.first();
				firstItem.siblings().removeClass(qLS.selectClass).blur();
				firstItem.addClass(qLS.selectClass);
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
				qLS.assignIndex();
				qLS.list.each(function(){
					qLS.qCount++;
					$(this).addClass(qLS.qClass).addClass('qLS-id-'+qLS.qCount);
					settings.initialFocus ? $('.'+qLS.selectClass).focus() : false;
				});
				qLS.listItem.on('click', function() {
					qLS.actionSelect($(this));
				});	
			});
		}
	}
	console.log('jquery.qlistselect.js loaded.')
}(jQuery));