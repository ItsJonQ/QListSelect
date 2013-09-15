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
				keyboardActions		: true,
				offsetTop			: 0
			}, options);

			qLS.actionSelect = function(ele){
				qLS.listItem.removeClass(qLS.selectClass);
				ele.addClass(qLS.selectClass);
			};

			qLS.actionSelectFocus = function(direction) {
				var eleNew,
					ele = qLS.list.find('.'+qLS.selectClass);
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
					eleNew.addClass(qLS.selectClass);
					qLS.selectScroll(qLS.obj, direction);
				} else {
					return false;
				}
			};

			qLS.selectScroll = function(list, direction) {
				var a = list.find('.'+qLS.selectClass),
					b = list,
					bR = b.height(),
					n = a.next(),
					nH = n.outerHeight(),
					p = a.prevAll(),
					pH = p.outerHeight(),
					pS = p.size(),
					h = a.outerHeight(),
					pTotal,
					nTotal;
				if(direction === 'prev') {
					pTotal = h;
					$.each(p, function(){
						pTotal += $(this).outerHeight();
					});
					if(a.offset().top - list.offset().top < (h + (pH / 2)) ) {
						b.scrollTop(pTotal - h - pH);
					} else if (pS === 0) {
						b.scrollTop(0);
					}
				} else if (direction === 'next') {
					nTotal = h;
					$.each(p, function(){
						nTotal += $(this).outerHeight();
					});
					if(a.offset().top - list.offset().top + h + (nH / 2)> bR) {
						b.scrollTop(nTotal - h - pH);
					}
				} else if (direction === 'reset') {
					b.scrollTop(pS * a.outerHeight());
				} else {
					return false;
				}				
			}

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
				qLS.list.each(function(){
					qLS.qCount++;
					$(this).addClass(qLS.qClass).addClass('qLS-id-'+qLS.qCount);
					settings.initialFocus ? $('.qLS-id-1').focus() : false;
				});
				qLS.listItem.on('click', function() {
					qLS.actionSelect($(this));
				});	
			});
		}
	}
	console.log('jquery.qlistselect.js loaded.')
}(jQuery));