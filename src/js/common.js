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
		scrollClass = "page-is-scrolled",
		headerShowClass = 'header-show',
		headerHideClass = 'header-hide';

	var previousScrollTop = $(window).scrollTop();

	addClass();

	$(window).on('scroll resizeByWidth', function () {
		addClass();
	});

	function addClass() {
		var currentScrollTop = $(window).scrollTop();

		$page.toggleClass(scrollClass, (currentScrollTop >= minScrollTop));

		var showHeaderPanel = currentScrollTop < previousScrollTop || currentScrollTop <= minShowTop;
		$page.toggleClass(headerShowClass, showHeaderPanel);
		$page.toggleClass(headerHideClass, !showHeaderPanel);

		previousScrollTop = currentScrollTop;
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
	let $checkboxAccept = $('.form-accept-js');
	if($checkboxAccept.length) {
		$checkboxAccept.change(function () {
			var accept = $(this).prop('checked');
			$(this).closest('form').find('.form-accept-submit-js').prop('disabled', !accept);
		});
		$checkboxAccept.trigger('change');
	}
}

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
	objectFitImages(); // object-fit-images initial

	formSuccessExample();
});