'use strict';

/**
 * !resize only width
 * */
var resizeByWidth = true;

var prevWidth = -1;
$(window).resize(function () {
	var currentWidth = $('body').outerWidth();
	resizeByWidth = prevWidth !== currentWidth;
	if (resizeByWidth) {
		$(window).trigger('resizeByWidth');
		prevWidth = currentWidth;
	}
});

/**
 * !device detected
 * */
var DESKTOP = device.desktop();
var MOBILE = device.mobile();
var TABLET = device.tablet();

var prodCardMediaWidth = 992;

/**
 *  Add placeholder for old browsers
 * */
function placeholderInit() {
	$('[placeholder]').placeholder();
}

/**
 * !Show print page by click on the button
 * */
function printShow() {
	$('.view-print').on('click', function (e) {
		e.preventDefault();
		window.print();
	})
}

/**
 * !toggle class for input on focus
 * */
function inputToggleFocusClass() {
	// use for the "focus" state
	var $inputs = $('.field-effects-js');

	if ($inputs.length) {
		var $fieldWrap = $('.input-wrap');
		var $selectWrap = $('.select');
		var classFocus = 'input--focus';

		$inputs.focus(function () {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			// add class on input
			$currentField.addClass(classFocus);
			// add class on label
			$currentField.prev('label').addClass(classFocus);
			$currentField.closest($selectWrap).prev('label').addClass(classFocus);
			// add class on wrapper
			$currentFieldWrap.addClass(classFocus);
			// add class on label in wrapper
			$currentFieldWrap.find('label').addClass(classFocus);

		}).blur(function () {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			// remove class on input
			$currentField.removeClass(classFocus);
			// remove class on label
			$currentField.prev('label').removeClass(classFocus);
			$currentField.closest($selectWrap).prev('label').removeClass(classFocus);
			// remove class on wrapper
			$currentFieldWrap.removeClass(classFocus);
			// remove class on label in wrapper
			$currentFieldWrap.find('label').removeClass(classFocus);

		});
	}
}

function inputHasValueClass() {
	// use for the "has-value" state
	var $inputs = $('.field-effects-js'),
		$fieldWrap = $('.input-wrap'),
		$selectWrap = $('.select'),
		classHasValue = 'input--has-value';

	if ($inputs.length) {

		$.each($inputs, function () {
			switchHasValue.call(this);
		});

		$inputs.on('keyup change', function () {
			switchHasValue.call(this);
		});

	}

	function switchHasValue() {
		var $currentField = $(this);
		var $currentFieldWrap = $currentField.closest($fieldWrap);

		//first element of the select must have a value empty ("")
		if ($currentField.val().length === 0) {
			// remove class on input
			$currentField.removeClass(classHasValue);
			// remove class on label
			$currentField.prev('label').removeClass(classHasValue);
			$currentField.closest($selectWrap).prev('label').removeClass(classHasValue);
			// remove class on wrapper
			$currentFieldWrap.removeClass(classHasValue);
			// remove class on label in wrapper
			$currentFieldWrap.find('label').removeClass(classHasValue);
		} else if (!$currentField.hasClass(classHasValue)) {
			// add class on input
			$currentField.addClass(classHasValue);
			// add class on label
			$currentField.prev('label').addClass(classHasValue);
			$currentField.closest($selectWrap).prev('label').addClass(classHasValue);
			// add class on wrapper
			$currentFieldWrap.addClass(classHasValue);
			// add class on label in wrapper
			$currentFieldWrap.find('label').addClass(classHasValue);
		}
	}
}

/**
 * !Add class on scroll page
 * */
$(function () {
	// external js:
	// 1) resizeByWidth (resize only width);

	var $page = $('html'),
		minScrollTop = 2,
		minShowTop = 100,
		currentScrollTop,
		scrollClass = "page-is-scrolled",
		headerShowClass = 'header-show',
		headerHideClass = 'header-hide';

	var previousScrollTop = $(window).scrollTop();

	addClassScrollPosition();

	$(window).on('scroll resizeByWidth', function () {
		addClassScrollPosition();
	});

	var timeout;

	function addClassScrollPosition() {
		currentScrollTop = $(window).scrollTop();

		$page.toggleClass(scrollClass, (currentScrollTop >= minScrollTop));

		var showHeaderPanel = currentScrollTop < previousScrollTop;

		if(currentScrollTop <= minShowTop) {
			$page.addClass(headerShowClass);
			$page.removeClass(headerHideClass);

			return false;
		}

		clearTimeout(timeout);

		timeout = setTimeout(function () {
			$page.toggleClass(headerShowClass, showHeaderPanel);
			$page.toggleClass(headerHideClass, !showHeaderPanel);

			previousScrollTop = currentScrollTop;
		}, 100);
	}
});

/**
 * !Initial custom select for cross-browser styling
 * */
function customSelect(select) {
	$.each(select, function () {
		var $thisSelect = $(this);
		// var placeholder = $thisSelect.attr('data-placeholder') || '';
		$thisSelect.select2({
			language: "ru",
			width: '100%',
			containerCssClass: 'cselect-head',
			dropdownCssClass: 'cselect-drop'
			// , placeholder: placeholder
		});
	})
}

/**
 * !Initial sliders on the project
 * */
function slidersInit() {
	//images carousel
	var $imagesCarousel = $('.images-slider-js');

	if($imagesCarousel.length){
		var slideCounterTpl = '' +
			'<div class="slider-counter">' +
				'<span class="slide-curr">0</span>/<span class="slide-total">0</span>' +
			'</div>';

		var titleListTpl = $('<div class="flashes"></div>');

		$imagesCarousel.each(function () {
			var $curSlider = $(this);
			var $imgList = $curSlider.find('.images-slider__list');
			var $imgListItem = $imgList.find('.images-slider__item');
			var dur = 200;

			// create titles
			$imgList.after(titleListTpl.clone());
			var $titleList = $curSlider.find('.flashes');
			$.each($imgListItem, function () {
				var $this = $(this);
				$titleList.append($('<div class="flashes__item">' + $this.find('.caption').html() + '</div>'));
			});

			// initialized slider of titles
			$titleList.slick({
				fade: true,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				asNavFor: $imgList,
				dots: false,
				arrows: false,

				swipe: false,
				touchMove: false,
				draggable: false
			});

			// initialized slider of images
			$imgList.on('init', function (event, slick) {
				$(slick.$slider).append($(slideCounterTpl).clone());

				$('.slide-total', $(slick.$slider)).text(slick.$slides.length);
				$('.slide-curr', $(slick.$slider)).text(slick.currentSlide + 1);
			}).slick({
				fade: false,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				asNavFor: $titleList,
				lazyLoad: 'ondemand',
				infinite: true,
				dots: true,
				arrows: true
			}).on('beforeChange', function (event, slick, currentSlide, nextSlider) {
				$('.slide-curr', $(slick.$slider)).text(nextSlider + 1);
			});

		});
	}

	//promo slider
	var $promoSlider = $('.promo-slider-js');

	if($promoSlider.length){
		$promoSlider.each(function () {
			var $curSlider = $(this);
			var dur = 200;

			$curSlider.slick({
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				lazyLoad: 'ondemand',
				infinite: true,
				dots: true,
				arrows: true
			});

		});
	}

	//partners slider
	var $partnersSlider = $('.partners-slider-js');

	if($partnersSlider.length){
		$partnersSlider.each(function () {
			var $curSlider = $(this);
			var dur = 200;

			$curSlider.slick({
				speed: dur,
				slidesToShow: 6,
				slidesToScroll: 2,
				lazyLoad: 'ondemand',
				infinite: true,
				dots: false,
				arrows: true,
				responsive: [
					{
						breakpoint: 1280,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 2,
						}
					},
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 2,
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 2,
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
						}
					}
				]
			});

		});
	}

	//similar slider
	var $similarSlider = $('.similar-slider-js');

	if($similarSlider.length){
		$similarSlider.each(function () {
			var $curSlider = $(this);
			var dur = 200;

			$curSlider.on('init', function (event, slick) {
				$(slick.$slides).matchHeight({
					byRow: true, property: 'height', target: null, remove: false
				});
			}).slick({
				speed: dur,
				slidesToShow: 5,
				slidesToScroll: 2,
				infinite: false,
				dots: false,
				arrows: true,
				responsive: [
					{
						breakpoint: 1600,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 2,
						}
					},
					{
						breakpoint: 1280,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 2,
						}
					},
					{
						breakpoint: 960,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
						}
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
					}
				]
			});

		});
	}

	//events slider
	var $eventsSlider = $('.events-slider-js');
	if ($eventsSlider.length) {
		$eventsSlider.each(function () {
			var $thisSlider = $(this);
			var $thisBtnNext = $('.swiper-button-next', $thisSlider);
			var $thisBtnPrev = $('.swiper-button-prev', $thisSlider);

			new Swiper($thisSlider, {
				slidesPerView: 5,
				slidesPerGroup: 1,
				initialSlide: 2,
				centeredSlides: true,
				spaceBetween: 10,
				loop: true,
				keyboardControl: true,
				longSwipesRatio: 0.1,
				longSwipesMs: 200,
				nextButton: $thisBtnNext,
				prevButton: $thisBtnPrev,
				breakpoints: {
					1399: {
						slidesPerView: 4
					},
					1023: {
						slidesPerView: 3
					},
					767: {
						slidesPerView: 2
					}
				}
			});
		});
	}
}

/**
 * !Select lang
 * */
function selectLang() {
	$('.ms-drop__container-js').msDrop({})
}

/**
 * !multi accordion jquery plugin
 * */
(function ($) {
	var MultiAccordion = function (settings) {
		var options = $.extend({
			collapsibleAll: false, // если установить значение true, сворачиваются идентичные панели НА СТРАНИЦЕ, кроме текущего
			resizeCollapsible: false, // если установить значение true, при ресайзе будут соворачиваться все элементы
			container: null, // общий контейнер
			item: null, // непосредственный родитель открывающегося элемента
			handler: null, // открывающий элемента
			handlerWrap: null, // если открывающий элемент не является непосредственным соседом открывающегося элемента, нужно указать элемент, короный является оберткой открывающего элемета и лежит непосредственно перед открывающимся элементом (условно, является табом)
			panel: null, // открывающийся элемент
			openClass: 'active', // класс, который добавляется при открытии
			currentClass: 'current', // класс текущего элемента
			animateSpeed: 300, // скорость анимации
			collapsible: false // сворачивать соседние панели
		}, settings || {});

		this.options = options;
		var container = $(options.container);
		this.$container = container;
		this.$item = $(options.item, container);
		this.$handler = $(options.handler, container);
		this.$handlerWrap = $(options.handlerWrap, container);
		this._animateSpeed = options.animateSpeed;
		this.$totalCollapsible = $(options.totalCollapsible);
		this._resizeCollapsible = options.resizeCollapsible;

		this.modifiers = {
			active: options.openClass,
			current: options.currentClass
		};

		this.bindEvents();
		this.totalCollapsible();
		this.totalCollapsibleOnResize();

	};

	MultiAccordion.prototype.totalCollapsible = function () {
		var self = this;
		self.$totalCollapsible.on('click', function () {
			self.$panel.slideUp(self._animateSpeed, function () {
				self.$container.trigger('accordionChange');
			});
			self.$item.removeClass(self.modifiers.active);
		})
	};

	MultiAccordion.prototype.totalCollapsibleOnResize = function () {
		var self = this;
		$(window).on('resize', function () {
			if (self._resizeCollapsible) {
				self.$panel.slideUp(self._animateSpeed, function () {
					self.$container.trigger('accordionChange');
				});
				self.$item.removeClass(self.modifiers.active);
			}
		});
	};

	MultiAccordion.prototype.bindEvents = function () {
		var self = this;
		var $container = this.$container;
		var $item = this.$item;
		var panel = this.options.panel;

		$container.on('click', self.options.handler, function (e) {
			var $currentHandler = self.options.handlerWrap ? $(this).closest(self.options.handlerWrap) : $(this);
			// console.log("!!self.options.handlerWrap: ", self.options.handlerWrap);
			// console.log("$currentHandler: ", $currentHandler);
			var $currentItem = $currentHandler.closest($item);

			if ($currentItem.has($(panel)).length) {
				e.preventDefault();

				if ($currentHandler.next(panel).is(':visible')) {
					self.closePanel($currentItem);

					return;
				}

				if (self.options.collapsibleAll) {
					self.closePanel($($container).not($currentHandler.closest($container)).find($item));
				}

				if (self.options.collapsible) {
					self.closePanel($currentItem.siblings());
				}

				self.openPanel($currentItem, $currentHandler);
			}
		})
	};

	MultiAccordion.prototype.closePanel = function ($currentItem) {
		var self = this;
		var panel = self.options.panel;
		var openClass = self.modifiers.active;

		$currentItem.removeClass(openClass).find(panel).filter(':visible').slideUp(self._animateSpeed, function () {
			// console.log('mAccordionAfterClose');
			self.$container.trigger('mAccordionAfterClose').trigger('mAccordionAfterChange');
		});

		$currentItem
			.find(self.$item)
			.removeClass(openClass);
	};

	MultiAccordion.prototype.openPanel = function ($currentItem, $currentHandler) {
		var self = this;
		var panel = self.options.panel;

		$currentItem.addClass(self.modifiers.active);

		$currentHandler.next(panel).slideDown(self._animateSpeed, function () {
			// console.log('mAccordionAfterOpened');
			self.$container.trigger('mAccordionAfterOpened').trigger('mAccordionAfterChange');
		});
	};

	window.MultiAccordion = MultiAccordion;
}(jQuery));

/**
 * !multi accordion initial
 * */
function multiAccordionInit() {

	var navMenu = '.nav-js';

	if ($(navMenu).length) {
		new MultiAccordion({
			container: navMenu,
			item: 'li',
			handler: '.nav-handler-js',
			handlerWrap: '.nav__tab-js',
			panel: '.nav-drop-js',
			openClass: 'is-open',
			animateSpeed: 200,
			collapsible: true
		});
	}
}

/**
 * !Toggle nav
 * */
function toggleNav() {
	var $overlay = $('.shutter-overlay-js'),
		$html = $('html'),
		activeClass = 'active';

	var $nav = $('.shutter--nav-js'),
		$login = $('.shutter--login-js'),
		$reg = $('.shutter--reg-js');

	var $btnNav = $('.btn-nav-js'),
		$btnLogin = $('.btn-login-js'),
		$btnReg = $('.btn-reg-js');

	$btnNav.on('click', function (e) {
		var $curOpener = $(this);
		$curOpener.toggleClass(activeClass);
		$btnLogin.removeClass(activeClass);
		$btnReg.removeClass(activeClass);

		$nav.toggleClass(activeClass);
		$login.removeClass(activeClass);
		$reg.removeClass(activeClass);

		$overlay.toggleClass(activeClass, $curOpener.hasClass(activeClass));
		$html.toggleClass('shutter-after-open css-scroll-fixed', $curOpener.hasClass(activeClass)).addClass('header-show').removeClass('header-hide');
		e.preventDefault();
	});

	$btnLogin.on('click', function (e) {
		var $curOpener = $(this);
		$curOpener.toggleClass(activeClass);
		$btnNav.removeClass(activeClass);
		$btnReg.removeClass(activeClass);

		$login.toggleClass(activeClass);
		$nav.removeClass(activeClass);
		$reg.removeClass(activeClass);

		$overlay.toggleClass(activeClass, $curOpener.hasClass(activeClass));
		$html.toggleClass('shutter-after-open css-scroll-fixed', $curOpener.hasClass(activeClass)).addClass('header-show').removeClass('header-hide');
		e.preventDefault();
	});

	$btnReg.on('click', function (e) {
		var $curOpener = $(this);
		$curOpener.toggleClass(activeClass);
		$btnNav.removeClass(activeClass);
		$btnLogin.removeClass(activeClass);

		$reg.toggleClass(activeClass);
		$nav.removeClass(activeClass);
		$login.removeClass(activeClass);

		$overlay.toggleClass(activeClass, $curOpener.hasClass(activeClass));
		$html.toggleClass('shutter-after-open css-scroll-fixed', $curOpener.hasClass(activeClass)).addClass('header-show').removeClass('header-hide');
		e.preventDefault();
	});

	// close
	$('.js-btn-shutter-close, .shutter-overlay-js').on('click', function (e) {
		$btnNav.removeClass(activeClass);
		$btnLogin.removeClass(activeClass);
		$btnReg.removeClass(activeClass);

		$nav.removeClass(activeClass);
		$login.removeClass(activeClass);
		$reg.removeClass(activeClass);

		$overlay.removeClass(activeClass);
		$html.removeClass('shutter-after-open css-scroll-fixed');

		e.preventDefault();
	})
}

/**
 * !Equal height of blocks by maximum height of them
 */
function equalHeight() {
	// example
	var $equalHeight = $('.equal-height-js');

	if($equalHeight.length) {
		$equalHeight.children().matchHeight({
			byRow: true, property: 'height', target: null, remove: false
		});
	}
}

/**
 * !Product liked
 * */
function productLiked() {
	$('.products-likes-js').on('click', function (e) {
		var $curLikeBtn = $(this),
		classActive = 'active';

		$curLikeBtn.toggleClass(classActive);

		if($curLikeBtn.hasClass(classActive)) {
			$curLikeBtn.attr('title', $curLikeBtn.data('unliked-text'));
		} else {
			$curLikeBtn.attr('title', $curLikeBtn.data('liked-text'));
		}

		e.preventDefault();
	})
}

/**
 * !scroll to top
 * */
$(function () {
	var $btnToTop = $('.btn-to-top-js');

	if ($btnToTop.length) {
		var $page = $('html, body'),
			minScrollTop = 300;

		$(window).on('load scroll resizeByWidth', function () {
			var currentScrollTop = $(window).scrollTop();

			$btnToTop.toggleClass('btn-to-top--show', (currentScrollTop >= minScrollTop));
		});

		$btnToTop.on('click', function (e) {
			e.preventDefault();

			if (!$page.is(':animated')) {
				$page.stop().animate({scrollTop: 0}, 300);
			}
		})
	}
});

/**
 * !Form mask
 * */
function formMaskInit() {
	// var cleaveCard = new Cleave('.input-mask-card-js', {
	// 	creditCard: true,
	// 	blocks: [4, 4, 4, 4]
	// });
	var cleaveTel = new Cleave('.input-mask-tel-js', {
		numericOnly: true,
		blocks: [3, 2, 3, 2, 2],
		delimiters: [' ', ' ', '–', '–'],
		prefix: '375'
	});
}

/**
 * !Testing form validation (for example). Do not use on release!
 * */
function formAccept() {
	var $checkboxAccept = $('.form-accept-js');
	if($checkboxAccept.length) {
		$checkboxAccept.change(function () {
			var accept = $(this).prop('checked');
			$(this).closest('form').find('.form-accept-submit-js').prop('disabled', !accept);
		});
		$checkboxAccept.trigger('change');
	}
}

/**
 * !Sticky element on page
 */
function stickyInit() {
	var $mAside = $('.m-aside-sticky-js'),
	$mContent = $('.m-content-sticky-js');
	if ($mAside.length) {

		// var mAsideSticky = new StickySidebar('.m-aside-sticky-js', {
		// 	containerSelector: '.m-container',
		// 	innerWrapperSelector: '.m-aside-layout',
		// 	topSpacing: $('.header').outerHeight() + 20,
		// 	resizeSensor: false, // recalculation sticky on change size of elements
		// 	minWidth: prodCardMediaWidth - 1
		// });

		// var mContentSticky = new StickySidebar('.m-content-sticky-js', {
		// 	containerSelector: '.m-container-sticky-js',
		// 	innerWrapperSelector: '.m-content-sticky__layout-js',
		// 	topSpacing: $('.header').outerHeight() + 20,
		// 	resizeSensor: false, // recalculation sticky on change size of elements
		// 	minWidth: prodCardMediaWidth - 1
		// });

		$('.p-filters-js').on('dropChange.multiFilters', function () {
			if(window.innerWidth >= prodCardMediaWidth) {
				// mAsideSticky.updateSticky();
				// mContentSticky.updateSticky();
			}
		});

		stickybits('.m-aside', {
			useStickyClasses: true,
			stickyBitStickyOffset: 70
		});
	}
}

/**
 * !multi filters jquery plugin
 * */
(function ($) {
	var MultiFilters = function (settings) {
		var options = $.extend({
			container: null,
			item: null,
			group: null,
			handler: null,
			placeholder: null,
			selected: null,
			drop: null,
			filter: null, // checkbox => filter: checkbox, select or range slider
			labelText: null,
			btnReset: null,
			btnResetAll: null,
			tagsContainer: null,
			resultsPanel: null,
			activatedFilters: '.activated-js',
			tagsItem: ".tags-item-js",
			tagsItemTpl: null,
			tagTextContainer: ".tag-text-js",

			dropOpenClass: 'is-open',
			filtersOnClass: 'filters-on',
			showResultsPanelClass: 'filters-results-show',
			showSelectedClass: 'filters-selected-show',
			showPlaceholderClass: 'filters-placeholder-show',
			filterActiveClass: 'is-active',

			dataGroup: 'data-filter-group',
			dataDefaultValue: 'data-filter-default',
			dataSelect: 'data-filter-select', // добавлять этот атрибут, если можно выбирать из нескольких вариантов, например select или slider
			dataTag: 'data-filter-tag',
			dataName: 'data-filter-name',
			dataType: 'data-filter-type',
			dataPrefix: 'data-filter-value-prefix',
			dataPostfix: 'data-filter-value-postfix'
		}, settings || {});

		this.options = options;
		var container = $(options.container);

		this.$container = container;
		this.$item = $(options.item, container);
		this.$handler = $(options.handler, container);
		this.$placeholder = $(options.placeholder, container);
		this.$selected = $(options.selected, container);
		this.$drop = $(options.drop, container);
		this.$group = $(options.group, container);
		this.$filter = $(options.filter, container);
		this.$labelText = $(options.labelText, container);
		this.$btnReset = $(options.btnReset, container);
		this.$btnResetAll = $(options.btnResetAll, container);
		this.$tagsContainer = $(options.tagsContainer, container);
		this.$resultsPanel = $(options.resultsPanel, container);
		this.$activatedFilters = $(options.activatedFilters, container);
		this.tagsItem = options.tagsItem; // не jq-объект, чтобы можна было искать в DOM после добавления
		this.tagTextContainer = options.tagTextContainer; // не jq-объект, чтобы можна было искать в DOM после добавления
		this.tagsItemTpl = !options.tagsItemTpl ?
			'<div class="' + options.tagsItem.substring(1) + '"><i>Удалить</i><span class="' + options.tagTextContainer.substring(1) + '"></span></div>' :
			options.tagsItemTpl ;

		this.modifiers = {
			dropIsOpened: options.dropOpenClass,
			filtersOn: options.filtersOnClass,
			showResultsPanel: options.showResultsPanelClass,
			showSelected: options.showSelectedClass,
			showPlaceholder: options.showPlaceholderClass,
			filterActive: options.filterActiveClass,
		};

		this.attributes = {
			dataGroup: options.dataGroup,
			dataDefaultValue: options.dataDefaultValue,
			dataSelect: options.dataSelect,
			dataTag: options.dataTag,
			dataName: options.dataName,
			dataType: options.dataType,
			dataPrefix: options.dataPrefix,
			dataPostfix: options.dataPostfix
		};

		this.changeFilters();
		this.bindTagsEvents();
		this.toggleDrop();
		this.resetFiltersInGroup();
		this.resetAllFilters();
		this.initRangeSlider();

	};

	// MultiFilters.prototype.dropIsOpened = false;

	MultiFilters.prototype.initRangeSlider = function () {
		var self = this,
			$rangeSlider = $(".range-slider-js"),
			$rangeSliderValue = $('.range-slider-value-js');

		self.priceSlider = {};

		$.each($rangeSlider, function (i, el) {
			var $curSlider = $(this),
				$curSliderValue = $curSlider.closest('li').find($rangeSliderValue);

			$curSlider.ionRangeSlider({
				onStart: function (data) {
					getValue(data, $curSliderValue)
				},
				onChange: function (data) {
					getValue(data, $curSliderValue);
				}
			});

			self.priceSlider[i] = $curSlider.data('ionRangeSlider');
		});

		function getValue(data, $elem) {
			var from = data.from, to = data.to;

			if (data.input.attr('data-type') === "double") {
				$elem.html(from + " - " + to);
			} else {
				$elem.html(from);
			}
		}
	};

	MultiFilters.prototype.changeFilters = function () {
		var self = this;

		self.$container.on('change', self.options.filter, function () {
			var $curFilter = $(this);
			var $curContainer = $curFilter.closest(self.$container);
			var $curItem = $curFilter.closest(self.$item);
			var $curGroup = $curFilter.closest(self.$group);
			// label text for tag
			var $curLabel = $curFilter.closest('label');
			var $curLabelText = $curLabel.find(self.$labelText);
			// buttons
			var $curBtnReset = $curItem.find(self.$btnReset);
			var $curBtnResetAll = $curContainer.find(self.$btnResetAll);

			// на li добвить класс, если чекбокс отмечен
			$curFilter.is(':checkbox') &&
			$curFilter.closest('li').toggleClass(self.modifiers.filterActive, self.getFilterState($curFilter));

			// отключить кнопку очистки чекбоксов в ГРУППЕ
			self.disabledButton($curBtnReset);

			// удалить класс наличия отмеченных чекбоксов в ГРУППЕ
			self.removeClassCustom($curItem, self.modifiers.filtersOn);

			// отключить кнопку очистки ВСЕХ чекбоксов
			self.disabledButton($curBtnResetAll);

			// удалить класс отображения панели результатов фильтрации
			$curContainer.removeClass(self.modifiers.showResultsPanel);

			// если есть активные фильтры в ГРУППЕ
			if (self.countActivateFilters($curFilter, $curGroup)) {
				// включить кнопку очистки чекбоксов в ГРУППЕ
				self.enabledButton($curBtnReset);
				// добавить класс наличия отмеченных чекбоксов на фильтры в ГРУППЕ
				self.addClassCustom($curItem, self.modifiers.filtersOn);
			}

			// если есть активные фильтры
			// (проверяем ВСЕ группы фильтров)
			if (self.countActivateFilters($curContainer.find(self.$filter), $curContainer.find(self.$group))) {
				// включить кнопку очистки ВСЕХ чекбоксов
				self.enabledButton($curBtnResetAll);
				// добавить класс отображения панели результатов фильтрации
				$curContainer.addClass(self.modifiers.showResultsPanel);
			}

			// определить количество отмеченных фильтров в ГРУППЕ
			// изменить значение в соответствующем элементе DOM
			self.setLengthActiveFilters($curFilter, $curGroup);

			// определить количество ГРУПП, в которых есть отмеченные фильтры
			// изменить значение в соответствующий элемент DOM
			var activeGroupLength = $curContainer.find('.' + self.modifiers.filtersOn).length;
			$curContainer.find(self.$activatedFilters).html(activeGroupLength).toggleClass('hide', !activeGroupLength);

			// attributes
			var curAttrGroup = $curGroup.attr(self.attributes.dataGroup);
			var curAttrSelect = $curFilter.attr(self.attributes.dataSelect);
			var curAttrName = $curFilter.attr(self.attributes.dataName) || $('option:selected', $curFilter).attr(self.attributes.dataName);
			var curAttrTag = $curFilter.attr(self.attributes.dataTag) || $('option:selected', $curFilter).attr(self.attributes.dataTag);
			// console.log("curAttrGroup: ", curAttrGroup);
			// console.log("curAttrSelect: ", curAttrSelect);
			// console.log("curAttrName: ", curAttrName);
			// console.log("curAttrTag: ", curAttrTag);

			// console.log(curAttrName + " (state): ", self.getFilterState($curFilter));
			// console.log(curAttrName + " (defaultValue): ", $curFilter.attr(self.attributes.dataDefaultValue));
			console.log(curAttrName + " (filterType): ", $curFilter.attr(self.attributes.dataType));
			console.log(curAttrName + " (value): ", $curFilter.val());

			var dataGroup = "[" + self.attributes.dataGroup + "=" + curAttrGroup + "]",
				dataName = "[" + self.attributes.dataName + "=" + curAttrName + "]",
				dataSelect = "[" + self.attributes.dataSelect + "=" + curAttrSelect + "]";

			// добавить/удалить тэг
			if(self.getFilterState($curFilter)) {
				// добавить тэг фильтра
				var textInsideTag = curAttrTag || $curLabelText.text() || curAttrName;
				var $tagClone = $(self.tagsItemTpl).clone()
					.find(self.tagTextContainer)
					.html(textInsideTag)
					.end()
					.attr(self.attributes.dataGroup, curAttrGroup)
					.attr(self.attributes.dataName, curAttrName);

				if($curFilter.is(':checkbox')) {
					$tagClone.appendTo($curContainer.find(self.$tagsContainer));
				} else {
					$curContainer.find(self.tagsItem).filter(dataSelect).remove();
					$tagClone
						.attr(self.attributes.dataSelect, curAttrSelect)
						.appendTo($curContainer.find(self.$tagsContainer));
				}
			} else {
				// удалить тэг
				if($curFilter.is(':checkbox')) {
					$curContainer.find(self.tagsItem).filter(dataGroup + dataName).remove();
				} else {
					$curContainer.find(self.tagsItem).filter(dataSelect).remove();
				}
			}
		});

		$.each(self.$filter, function () {
			var $thisFilter = $(this);
			self.getFilterState($thisFilter) && $thisFilter.trigger('change');
		});

		// self.$filter.filter(':checked').trigger('change');
	};

	MultiFilters.prototype.setLengthActiveFilters = function ($filter, $container) {
		var self = this;
		var $curItem = $container.closest(self.$item);

		var lengthChecked = self.countActivateFilters($filter, $container);

		$curItem.find(self.$placeholder).toggleClass(self.modifiers.showPlaceholder, !lengthChecked > 0);
		$curItem.find(self.$selected).toggleClass(self.modifiers.showSelected, lengthChecked > 0);

		var textPrefix = $curItem.find(self.$selected).attr(self.attributes.dataPrefix) || "",
			textPostfix = $curItem.find(self.$selected).attr(self.attributes.dataPostfix) || "";

		$curItem.find(self.$selected).html(textPrefix + " " + lengthChecked + " " + textPostfix);
	};

	// MultiFilters.prototype.checkPropAll = function ($filter, $container) {
	// 	// если отмеченны ВСЕ фильтры в группе, возвращает true, иначе false
	//
	// 	return $container.find(':checkbox').length === this.countActivateFilters($filter, $container);
	// };

	MultiFilters.prototype.countActivateFilters = function ($filter, $container) {
		// возвращает количество отмеченных (активных) фильтров
		self = this;

		// console.log("$filter: ", $filter);

		var $curFilters = $filter.closest($container).find(self.$filter),
			lengthActivateFilters = 0;

		$.each($curFilters, function () {
			var $thisFilter = $(this);
			self.getFilterState($thisFilter) && lengthActivateFilters++
		});

		// console.log("lengthActivateFilters: ", lengthActivateFilters);

		return lengthActivateFilters;

		// if only checkbox
		// return $container.find('input:checkbox:checked').length;
	};

	MultiFilters.prototype.bindTagsEvents = function () {
		var self = this;

		self.$container.on('click', self.tagsItem, function (e) {
			var $curTag = $(this);
			var dataGroup = "[" + self.attributes.dataGroup + "=" + $curTag.attr(self.attributes.dataGroup) + "]",
				dataName = "[" + self.attributes.dataName + "=" + $curTag.attr(self.attributes.dataName) + "]";
			var $curFiltersGroup = $curTag.closest(self.$container).find(self.$group).filter(dataGroup);

			// отключить соответствующий фильтр
			if($curTag.attr(self.attributes.dataSelect)){
				var dataSelect = "[" + self.attributes.dataSelect + "=" + $curTag.attr(self.attributes.dataSelect) + "]";

				$curFiltersGroup
					.find(dataSelect)
					.prop('selectedIndex', 0)
					.trigger('change');
			} else {
				$curFiltersGroup
					.find(dataName)
					.prop('checked', false)
					.trigger('change');
			}

			e.preventDefault();
		});
	};

	MultiFilters.prototype.resetFiltersInGroup = function () {
		var self = this;

		self.$btnReset.on('click', function (e) {
			var $currentBtn = $(this);

			self.resetFilters($currentBtn.closest(self.$item));

			e.preventDefault();

			self.$container.trigger('resetFiltersInGroup');
		});
	};

	MultiFilters.prototype.resetAllFilters = function () {
		var self = this;

		self.$btnResetAll.on('click', function (e) {
			e.preventDefault();

			var $currentBtn = $(this);

			self.resetFilters($currentBtn.closest(self.$container).find(self.$group));

			self.$container.trigger('resetAllFilters');
		});
	};

	MultiFilters.prototype.resetFilters = function ($container) {
		$container.find(':checked').prop('checked', false).trigger('change');
		$container.find('select').prop('selectedIndex', false).trigger('change');

		var priceSliderObj = this.priceSlider, key;
		for (key in priceSliderObj) {
			priceSliderObj[key].reset();
		}
	};

	MultiFilters.prototype.enabledButton = function ($button) {
		$button.prop('disabled', false);
	};

	MultiFilters.prototype.disabledButton = function ($button) {
		$button.prop('disabled', true);
	};

	MultiFilters.prototype.toggleDrop = function () {
		var self = this;
		var $container = self.$container;
		var $item = self.$item;
		var $handler = self.$handler;
		var $drop = self.$drop;
		var dropIsOpenedClass = self.modifiers.dropIsOpened;
		// window.preventAction = true;

		$handler.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();

			var $currentHandler = $(this);
			var $currentItem = $currentHandler.closest($item);

			if($currentItem.hasClass(dropIsOpenedClass)) {
				// closeVisibleDrop();
				closeCurrentDrop($currentItem);

				return;
			}

			// closeVisibleDrop();
			openCurrentDrop($currentItem);
		});

		// $(document).on('click', function () {
		// 	closeVisibleDrop();
		// });

		// $(document).keyup(function(e) {
		// 	// console.log('Is drop opened? - ', self.dropIsOpened);
		// 	if (self.dropIsOpened && e.keyCode === 27) {
		// 		closeVisibleDrop();
		// 		// console.log('Drop closed!');
		// 	}
		// });

		$container.on('closeDrop', function () {
			closeVisibleDrop();
		});

		$($drop).on('click', function (e) {
			e.stopPropagation();
		});

		function openCurrentDrop($elements) {
			self.addClassCustom($elements, dropIsOpenedClass);
			$container.trigger('dropChange.multiFilters');
			$container.trigger('dropOpen.multiFilters');
		}

		function closeCurrentDrop($elements) {
			self.removeClassCustom($elements, dropIsOpenedClass);
			$container.trigger('dropChange.multiFilters');
			$container.trigger('dropClose.multiFilters');
		}

		function closeVisibleDrop() {
			self.removeClassCustom($item, dropIsOpenedClass);
			$container.trigger('dropChange.multiFilters');
			$container.trigger('dropClose.multiFilters');
		}
	};

	MultiFilters.prototype.addClassCustom = function (elements, modifiersClass) {
		$.each(elements, function () {
			$(this).addClass(modifiersClass);
		});
	};

	MultiFilters.prototype.removeClassCustom = function (elements, modifiersClass) {
		$.each(elements, function () {
			$(this).removeClass(modifiersClass);
		});
	};

	MultiFilters.prototype.getFilterState = function ($thisFilter) {
		// возвращает true, если фильтр отмечен, или выбрано значение отличное от дефолтного
		return $thisFilter.prop('checked') || $thisFilter.attr(this.attributes.dataDefaultValue) !== undefined && $thisFilter.val() !== $thisFilter.attr(this.attributes.dataDefaultValue);
	};

	// MultiFilters.prototype.addTag = function ($tagsContainer, attrGroup, attrName, tag) {
	// 	var self = this;
	// 	var attributes = self.attributes;
	//
	// 	$(self.tagsItemTpl).clone()
	// 		.find(self.tagTextContainer)
	// 		.html(tag)
	// 		.end()
	// 		.attr(attributes.group, attrGroup)
	// 		.attr(attributes.name, attrName)
	// 		.appendTo($tagsContainer);
	// };

	// MultiFilters.prototype.removeTag = function ($tagsContainer, attrGroup, attrName) {
	// 	var self = this;
	//
	// 	var dataGroup = "[" + self.attributes.dataGroup + "=" + attrGroup + "]",
	// 		dataName = "[" + self.attributes.dataName + "=" + attrName + "]",
	// 		$currentTag = $tagsContainer.find(self.tagsItem).filter(dataGroup + dataName);
	//
	// 	// отключить соответствующий чекбокс
	// 	$currentTag.closest(self.$container)
	// 		.find(self.$group).filter(dataGroup)
	// 		.find(dataName)
	// 		.find(self.$filter).filter(':checked')
	// 		.prop('checked', false)
	// 		.trigger('change');
	//
	// 	// удалить тэг
	// 	$currentTag.remove();
	// };

	window.MultiFilters = MultiFilters;
}(jQuery));

/**
 * !multi filters initial
 * */
function multiFiltersInit() {
	var productFilters = '.p-filters-js';
	// var catalogMenuChangeTimeout;

	if ($(productFilters).length) {
		new MultiFilters({
			container: productFilters,
			item: '.p-filters-item-js',
			group: '.p-filters-group-js',
			handler: '.p-filters-select-js',
			placeholder: '.p-filters-placeholder-js',
			selected: '.p-filters-selected-js',
			drop: '.p-filters-drop-js',
			filter: '.p-filters-drop-list input[type="checkbox"], .p-filters-drop-list select, .p-filters-drop-list .range-slider-js',
			// filter: '.p-filters-drop-list input[type="checkbox"], .p-filters-drop-list select',
			// filter: '.p-filters-drop-list input[type="checkbox"]',
			labelText: '.p-filters-label-text-js',
			btnReset: '.btn-reset-js',
			btnResetAll: '.btn-clear-filters-js',
			tagsContainer: '.p-filters-tags-js',
			tagsItem: '.p-filters-tags-item-js',
			tagTextContainer: '.p-filters-tag-text-js',
			resultsPanel: '.p-filters-results-js',
			tagsItemTpl: '<div class="p-filters-tags__item p-filters-tags-item-js"><i>Удалить</i><span class="p-filters-tag-text-js"></span></div>',

			dropOpenClass: 'p-filters-is-open',
			filtersOnClass: 'p-filters-on',
			activatedFilters: '.p-filters-activated-js',

			// data attributes
			// dataGroup: 'data-filter-group',
			//
			// dataDefaultValue: 'data-filter-default',
			//
			// dataSelect: 'data-filter-select',
			// dataTag: 'data-filter-tag',
			// dataName: 'data-filter-name',
			//
			// dataPrefix: 'data-filter-value-prefix',
			// dataPostfix: 'data-filter-value-postfix'
		});

		// range slider for price
		/**var $priceSlider = $("#price-slider-js"),
			$priceSliderValue = $('.price-slider-value-js');

		$priceSlider.ionRangeSlider({
			// type: "double",
			onStart: function (data) {
				getValue(data, $priceSliderValue);
			},
			onChange: function (data) {
				getValue(data, $priceSliderValue);
			}
		});

		var priceSlider = $priceSlider.data('ionRangeSlider');*/

		// range slider for sale
		/**var $saleSlider = $("#sale-slider-js"),
			$saleSliderValue = $('.sale-slider-value-js');

		$saleSlider.ionRangeSlider({
			// type: "double",
			// postfix: "%",
			onStart: function (data) {
				getValueSingle(data, $saleSliderValue);
			},
			onChange: function (data) {
				getValueSingle(data, $saleSliderValue);
			}
		});

		var saleSlider = $saleSlider.data('ionRangeSlider');*/

			// $('.range-slider').on('change', function () {
		// 	var $this = $(this),
		// 		value = $this.prop("value").split(';');
		//
		// 	console.log("$this.val(): ", $this.val());
		// 	console.log("value: ", value);
		// });

		// console.log("$('.range-slider').val(): ", $('.range-slider').val());

		// $(productFilters).on('resetFiltersInGroup resetAllFilters', function () {
		// 	saleSlider.reset();
		// 	priceSlider.reset();
		// });
	}

	/**function getValue(data, $elem) {
		var from = data.from, to = data.to;

		$elem.html(from + " - " + to)
	}

	function getValueSingle(data, $elem) {
		var from = data.from;

		$elem.html(from)
	}*/
}

/**
 * !Fixed filters result
 * */

$(function () {
	// fixed filters result

	var $mContainer = $('.m-container');

	if ($mContainer.length) {
		$(window).on('load scroll resize', function () {
			addClassFixed();
		});
	}

	var mContainerOffset = 0,
		currentScrollTop,
		filterResultFixedClass = 'filters-result-fixed';

	function addClassFixed() {
		mContainerOffset = $mContainer.offset().top + $mContainer.outerHeight();
		currentScrollTop = $(window).scrollTop() + window.innerHeight;

		var cond = mContainerOffset < currentScrollTop;

		$('html').toggleClass(filterResultFixedClass, !cond);
	}
});

/**
 * !Testing form validation (for example). Do not use on release!
 * */
function formSuccessExample() {
	var $form = $('.user-form form, .subscribe-from form');

	if ( $form.length ) {

		$form.submit(function (event) {
			var $thisForm = $(this);

			if ($thisForm.parent().hasClass('success-form')) return;

			event.preventDefault();

			testValidateForm($thisForm);
		});

		// $(':text, input[type="email"], textarea', $form).on('keyup change', function () {
		// 	var $form = $(this).closest('form');
		// 	if ($form.parent().hasClass('error-form')) {
		// 		testValidateForm($form);
		// 	}
		// })

	}

	function testValidateForm(form) {
		var $thisFormWrap = form.parent();

		var $inputs = $(':text, input[type="email"], input[type="tel"], input[type="password"], textarea, select', form);

		var inputsLength = $inputs.length;
		var inputsHasValueLength = $inputs.filter(function () {
			return $(this).val().length;
		}).length;

		$thisFormWrap.toggleClass('error-form', inputsLength !== inputsHasValueLength);
		$thisFormWrap.toggleClass('success-form', inputsLength === inputsHasValueLength);

		$.each($inputs, function () {
			var $thisInput = $(this);
			var thisInputVal = $thisInput.val();
			var $thisInputWrap = $thisInput.parent();

			$thisInput.toggleClass('error', !thisInputVal.length);
			$thisInput.toggleClass('success', !!thisInputVal.length);

			$thisInputWrap.toggleClass('error', !thisInputVal.length);
			$thisInputWrap.toggleClass('success', !!thisInputVal.length);
		});
	}
}

/**
 * =========== !ready document, load/resize window ===========
 */

$(window).on('load', function () {
	// add functions
});

$(window).on('debouncedresize', function () {
	// $(document.body).trigger("sticky_kit:recalc");
});

$(document).ready(function () {
	placeholderInit();
	printShow();
	inputToggleFocusClass();
	inputHasValueClass();
	customSelect($('select.cselect'));
	slidersInit();
	selectLang();
	multiAccordionInit();
	toggleNav();
	equalHeight();
	productLiked();
	formMaskInit();
	formAccept();
	stickyInit();
	multiFiltersInit();
	objectFitImages(); // object-fit-images initial

	formSuccessExample();
});