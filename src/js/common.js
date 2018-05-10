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
 * !debouncedresize only width
 * */
var debouncedresizeByWidth = true;

var debouncedPrevWidth = -1;
$(window).on('debouncedresize', function () {
	var currentWidth = $('body').outerWidth();
	debouncedresizeByWidth = debouncedPrevWidth !== currentWidth;
	if (resizeByWidth) {
		$(window).trigger('debouncedresizeByWidth');
		debouncedPrevWidth = currentWidth;
	}
});

/**
 * !device detected
 * */
var DESKTOP = device.desktop();
var MOBILE = device.mobile();
var TABLET = device.tablet();

var mediaWidth = 992;
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
			// add class on search form
			$currentField.closest('.search-form').addClass(classFocus);

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
			// remove class on search form
			$currentField.closest('.search-form').removeClass(classFocus);

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
			// add class on search form
			$currentField.closest('.search-form').removeClass(classHasValue);

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
			// remove class on search form
			$currentField.closest('.search-form').addClass(classHasValue);

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

	// addClassScrollPosition();

	$(window).on('scroll resizeByWidth', function () {
		// addClassScrollPosition();
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
	/**images carousel*/
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
				$titleList.append($('<div class="gallery-thumbs__item">' + $this.find('.caption').html() + '</div>'));
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

	/**card gallery*/
	var $cardGallery = $('.card__gallery-js');

	if($cardGallery.length){
		var cardGalleryThumbsTpl = $('<div class="p-card__gallery-thumbs"></div>');

		$cardGallery.each(function () {
			var $curSlider = $(this);
			var $imgList = $curSlider.find('.card__gallery-images-js');
			var $imgListItem = $imgList.children();
			var dur = 200;

			// create thumbs
			$imgList.after(cardGalleryThumbsTpl.clone());
			var $galleryThumbs = $curSlider.find('.p-card__gallery-thumbs');
			$.each($imgListItem, function () {
				var $this = $(this);
				$galleryThumbs.append($('<div class="flashes__item"><img src="' + $this.find('img').attr('data-lazy') + '"></div>'));
			});
			// object-fit for non-support browsers
			objectFitImages($('.p-card__gallery-thumbs img'));

			// initialized slider of thumbs
			$galleryThumbs.slick({
				fade: false,
				vertical: true,
				speed: dur,
				slidesToShow: 5,
				slidesToScroll: 1,
				infinite: false,
				asNavFor: $imgList,
				dots: false,
				arrows: true,
				centerMode: false,
				focusOnSelect: true,

				accessibility: false,
				draggable: false,
				swipe: false,
				touchMove: false,

				responsive: [
					{
						breakpoint: 992,
						settings: {
							vertical: false,
						}
					}
				]

			});

			// initialized slider of main images
			$imgList.slick({
				fade: true,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				asNavFor: $galleryThumbs,
				lazyLoad: 'ondemand',
				infinite: false,
				dots: false,
				arrows: false,

				accessibility: false,
				draggable: false,
				swipe: false,
				touchMove: false
			}).on('lazyLoaded', function (event, slick, image, imageSource) {
				$(image).addClass('loaded');
				objectFitImages($(image));
			});

		});
	}

	/**history slider*/
	var $historySlider = $('.h-slider-js');

	if($historySlider.length){
		$historySlider.each(function () {
			var $curSlider = $(this),
				$years = $curSlider.find('.h-slider-years-js'),
				$descriptions = $curSlider.find('.h-slider-desc-js'),
				$images = $curSlider.find('.h-slider-images-js'),
				dur = 700;

			var goToSlide = function(slider, index) {
				slider.slick('slickGoTo', index);
			};

			// initialized slider of images (background images)
			$images.slick({
				fade: true,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				// asNavFor: $years,
				infinite: false,
				dots: false,
				arrows: false,
				accessibility: false,
				draggable: false,
				swipe: false,
				touchMove: false
			});

			// initialized slider of years (thumbs)
			$years.on('init', function (e, slick) {
				goToSlide($images, slick.currentSlide);
			}).slick({
				fade: false,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: false,
				asNavFor: $descriptions,
				dots: false,
				arrows: true,
				centerMode: true,
				focusOnSelect: true,
				variableWidth: true,
				centerPadding: '0px',
				responsive: [
					{
						breakpoint: 640,
						settings: {
							arrows: false
						}
					}
				]

				// accessibility: false,
				// draggable: false,
				// swipe: false,
				// touchMove: false
			}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
				goToSlide($images, nextSlide);
			});

			// initialized slider of descriptions
			$descriptions.slick({
				fade: true,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				asNavFor: $years,
				infinite: false,
				dots: false,
				arrows: false,
				accessibility: false,
				draggable: false,
				swipe: false,
				touchMove: false,
				responsive: [{
					breakpoint: 992,
					settings: {
						swipe: true,
						touchMove: true
					}
				}]
			});
		});
	}

	/**promo slider*/
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
				arrows: true,
				responsive:[
					{
						breakpoint: 768,
						settings: {
							arrows: false
						}
					}
				]
			});

		});
	}

	/**partners slider*/
	var $partnersSlider = $('.partners-slider-js');

	if($partnersSlider.length){
		$partnersSlider.each(function () {
			var $curSlider = $(this);
			var dur = 600;

			$curSlider.slick({
				speed: dur,
				slidesToShow: 6,
				slidesToScroll: 1,
				// lazyLoad: 'ondemand',
				pauseOnHover: true,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 2500,
				cssEase: 'linear',
				dots: false,
				arrows: true,

				accessibility: false,
				draggable: false,
				swipe: false,
				touchMove: false,

				responsive: [
					{
						breakpoint: 1280,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
					}
				]
			});

		});
	}

	/**similar slider*/
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
				dots: true,
				arrows: true,
				responsive: [
					{
						breakpoint: 1440,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 1100,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 560,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});
		});
	}

	/**events slider*/
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
				// centeredSlides: true,
				spaceBetween: 10,
				loop: true,
				keyboardControl: true,
				// longSwipesRatio: 0.1,
				// longSwipesMs: 200,
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

	/**about promo slider*/
	var $aboutPromoSlider = $('.about-promo-slider-js');
	if ($aboutPromoSlider.length) {
		$.each($aboutPromoSlider, function () {
			var $currentSlider = $(this);

			$currentSlider.slick({
				fade: false,
				speed: 200,
				slidesToShow: 1,
				slidesToScroll: 1,
				lazyLoad: 'ondemand',
				autoplay: false,
				// autoplaySpeed: 8000,
				infinite: true,
				dots: true,
				arrows: true,
				responsive: [
					{
						breakpoint: 640,
						settings: {
							arrows: false
						}
					}
				]
			}).on('lazyLoaded', function (event, slick, image, imageSource) {
				$(image).addClass('loaded');
				objectFitImages($(image));
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
 * !Plugin collapse and expand blocks by fire events on the title of these blocks
 * !Extended capabilities
 * */
(function ($) {
	var JsAccordion = function (settings) {
		var options = $.extend(true, {
			accordionContainer: null,
			accordionItem: null,
			accordionHeader: null, // wrap for accordion's switcher
			accordionHand: null, // accordion's switcher
			accordionContent: null,
			indexInit: 0, // if "false", all accordion are closed
			showFromHash: true, // if "false", all accordion are closed
			animateSpeed: 300,
			scrollToTop: false, // if true, scroll to current accordion;
			scrollToTopSpeed: 300,
			scrollToTopOffset: 0,
			clickOutside: false, // if true, close current accordion's content on click outside accordion;
			collapseInside: true, // collapse attachments,
			modifiers: {
				activeItem: 'is-open',
				activeHeader: 'is-open',
				activeHand: 'is-open',
				activeContent: 'is-open',
				noHoverClass: 'is-open'
			}
		}, settings || {});

		this.options = options;
		var container = $(options.accordionContainer);

		this.$accordionContainer = container;
		this.$accordionItem = $(options.accordionItem, container);
		this.$accordionHeader = $(options.accordionHeader, container);
		this.$accordionHand = $(options.accordionHand, container);
		this.$accordionContent = options.accordionContent ?
			$(options.accordionContent, container) :
			this.$accordionHeader.next();

		this.scrollToTop = options.scrollToTop;
		this._scrollToTopSpeed = options.scrollToTopSpeed;
		this._scrollToTopOffset = options.scrollToTopOffset;
		this.clickOutside = options.clickOutside;
		this._indexInit = options.indexInit;
		this._animateSpeed = options.animateSpeed;
		this._collapseInside = options.collapseInside;

		this.modifiers = options.modifiers;

		this.bindEvents();
		if (options.indexInit !== false) {
			this.activeAccordion();
		}
		this.hashAccordion();
	};

	JsAccordion.prototype.bindEvents = function () {
		var self = this,
			$accordionContent = self.$accordionContent,
			animateSpeed = self._animateSpeed,
			modifiers = self.modifiers;

		self.$accordionHand.on('click', 'a', function (e) {
			e.stopPropagation();
		});

		self.$accordionHand.on('mouseenter', 'a', function () {
			$(this).closest(self.$accordionHand).addClass(modifiers.noHoverClass);
		}).on('mouseleave', 'a', function () {
			$(this).closest(self.$accordionHand).removeClass(modifiers.noHoverClass);
		});

		self.$accordionHand.on('click', function (e) {
			e.preventDefault();

			var $currentHand = $(this),
				$currentHeader = $currentHand.closest(self.$accordionHeader),
				$currentItem = $currentHand.closest(self.$accordionItem),
				$currentItemContent = $currentHeader.next();

			if ($accordionContent.is(':animated')) return;

			if ($currentHeader.hasClass(modifiers.activeHeader)){

				$currentItem.removeClass(modifiers.activeItem);
				$currentHeader.removeClass(modifiers.activeHeader);
				$currentHand.removeClass(modifiers.activeHand);
				$currentItemContent.removeClass(modifiers.activeContent);

				$currentItemContent.slideUp(animateSpeed, function () {

					if (self._collapseInside) {
						var $internalContent = $currentItem.find(self.$accordionHeader).next();

						$.each($internalContent, function () {
							if ($(this).hasClass(self.modifiers.activeContent)) {

								// self.scrollPosition($currentItem);

								$(this).slideUp(self._animateSpeed, function () {
									self.scrollPosition($currentItem);
								});
							}
						});


						$currentItem.find(self.$accordionItem).removeClass(self.modifiers.activeItem);
						$currentItem.find(self.$accordionHeader).removeClass(self.modifiers.activeHeader);
						$currentItem.find(self.$accordionHand).removeClass(self.modifiers.activeHand);
						$internalContent.removeClass(self.modifiers.activeContent);
					}
				});

				return;
			}

			var $siblings = $currentItem.siblings();

			$siblings.find(self.$accordionHeader).next().slideUp(self._animateSpeed);

			$siblings.removeClass(modifiers.activeItem);
			$siblings.find(self.$accordionHeader).removeClass(modifiers.activeHeader);
			$siblings.find(self.$accordionHand).removeClass(modifiers.activeHand);
			$siblings.find(self.$accordionHeader).next().removeClass(modifiers.activeContent);

			$currentItemContent.slideDown(animateSpeed, function () {
				self.scrollPosition($currentItem);
			});

			$currentItem.addClass(modifiers.activeItem);
			$currentHeader.addClass(modifiers.activeHeader);
			$currentHand.addClass(modifiers.activeHand);
			$currentItemContent.addClass(modifiers.activeContent);

			e.stopPropagation();
		});

		$(document).click(function () {
			if (self.clickOutside) {
				self.closeAllAccordions();
			}
		});

		$accordionContent.on('click', function(e){
			e.stopPropagation();
		});
	};

	// show accordion's content from hash tag
	JsAccordion.prototype.hashAccordion = function() {
		var self = this;
		var modifiers = self.modifiers,
			hashTag = window.location.hash;

		if ( !hashTag ) return false;

		var activeItemClass = modifiers.activeItem;
		var activeHeaderClass = modifiers.activeHeader;
		var activeHandClass = modifiers.activeHand;
		var activeContentClass = modifiers.activeContent;

		var $accordionHeader = self.$accordionHeader;
		var $accordionItem = self.$accordionItem;

		var $currentItem = $(hashTag);
		var $currentItemParents = $currentItem.parents().filter($accordionItem);

		// open parents accordion

		if ($currentItemParents.length) {
			var $currentHeaderParents = $currentItemParents.children($accordionHeader),
				$currentHandParents = $currentItemParents.children($accordionItem),
				$currentItemContentParents = $currentHeaderParents.next();

			$currentItemContentParents.slideDown(0);

			$currentItemParents.addClass(activeItemClass);
			$currentHeaderParents.addClass(activeHeaderClass);
			$currentHandParents.addClass(activeHandClass);
			$currentItemContentParents.addClass(activeContentClass);
		}

		// open current accordion

		var $currentHeader = $currentItem.children($accordionHeader),
			$currentHand = $currentHeader.children($accordionItem),
			$currentItemContent = $currentHeader.next();

		$currentItemContent.slideDown(0, function () {
			self.scrollPosition($currentItem);
		});

		$currentItem.addClass(activeItemClass);
		$currentHeader.addClass(activeHeaderClass);
		$currentHand.addClass(activeHandClass);
		$currentItemContent.addClass(activeContentClass);
	};

	// show current accordion's content
	JsAccordion.prototype.activeAccordion = function() {
		var self = this;
		var indexInit = self._indexInit;

		if ( indexInit === false ) return false;

		$.each(self.$accordionContainer, function () {
			var $currentItem = $(this).children().eq(indexInit);

			$currentItem.addClass(self.modifiers.activeItem);
			$currentItem.children(self.$accordionHeader).addClass(self.modifiers.activeHeader);
			$currentItem.children(self.$accordionHeader).find(self.$accordionHand).addClass(self.modifiers.activeHand);

			// self.scrollPosition($currentItem);

			$currentItem.children(self.$accordionHeader).next().addClass(self.modifiers.activeContent).slideDown(self._animateSpeed);
		});
	};

	// close all accordions
	JsAccordion.prototype.closeAllAccordions = function() {
		var self = this;

		self.$accordionHeader.next().slideUp(self._animateSpeed);

		var modifiers = self.modifiers;

		self.$accordionItem.removeClass(modifiers.activeItem);
		self.$accordionHeader.removeClass(modifiers.activeHeader);
		self.$accordionHand.removeClass(modifiers.activeHand);
		self.$accordionHeader.next().removeClass(modifiers.activeContent);
	};

	// open all accordions
	JsAccordion.prototype.openAllAccordions = function() {
		var self = this;

		self.$accordionHeader.next().slideDown(self._animateSpeed);

		var modifiers = self.modifiers;

		self.$accordionItem.addClass(modifiers.activeItem);
		self.$accordionHeader.addClass(modifiers.activeHeader);
		self.$accordionHand.addClass(modifiers.activeHand);
		self.$accordionHeader.next().addClass(modifiers.activeContent);
	};

	JsAccordion.prototype.scrollPosition = function (element) {
		var self = this;
		if (self.scrollToTop && !$('html, body').is('animated')) {
			$('html, body').animate({ scrollTop: element.offset().top - self._scrollToTopOffset }, self._scrollToTopSpeed);
		}
	};

	window.JsAccordion = JsAccordion;
}(jQuery));

/**
 * Initial accordion
 * */
function accordionInit() {
	// accordion default
	var $accordion = $('.accordion__container-js');

	if($accordion.length){
		new JsAccordion({
			accordionContainer: '.accordion__container-js',
			accordionItem: '.accordion__item-js',
			accordionHeader: '.accordion__header-js',
			accordionHand: '.accordion__hand-js',
			// scrollToTop: true,
			// scrollToTopSpeed: 300,
			// scrollToTopOffset: $('.header').outerHeight(),
			indexInit: false,
			clickOutside: false,
			animateSpeed: 200
		});
	}
}

/**
 * Filter job
 * */
function filterJob() {
	$('.filter-job-selects-js').on('change', 'select', function () {

		var $this = $(this),
			name = $this.attr('name'),
			classNoItem = 'filter-job-no-items';

		var tags = {};

		$this.closest('.filter-job-selects-js').find('select').each(function () {
			tags [$(this).attr('name')] = $(this).val();
		});

		tags [name] = $this.val();

		var $filterItem = $this.closest('.filter-job-container-js').find('.filter-job-item-js');

		var $noItemTemplate = $('<div />', {
			class: classNoItem,
			text: 'Извините, подходящих вакансий не найдено'
		});

		var dataFilters = concatObject(tags);

		$filterItem.parent().find('.'+ classNoItem).remove();
		$filterItem.show(0);

		if (dataFilters) {

			$filterItem.hide(0);
			$filterItem.filter(dataFilters).show(0);

			if (!$filterItem.is(':visible')) {
				$filterItem.parent().append($noItemTemplate.clone());
			}
		}
	});

	function concatObject(obj) {
		var arr = [];

		for ( var prop in obj ) {
			var thisKey = prop,
				thisProp = obj[ thisKey ];

			if (thisProp == 0) continue;

			arr.push('[data-property-' + thisKey + '*="' + thisProp + '"]');
		}

		return arr.join('');
	}
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
 * !Toggle shutters
 * */
function toggleShutters() {
	var $overlay = $('.shutter-overlay-js'),
		$html = $('html'),
		activeClass = 'active',
		shutterAfterOpenFilters = 'shutter-after-open--filters';

	var $nav = $('.shutter--nav-js'),
		$login = $('.shutter--login-js'),
		$reg = $('.shutter--reg-js'),

		$filters = $('.shutter--filters-js');

	var $btnNav = $('.btn-nav-js'),
		$btnLogin = $('.btn-login-js'),
		$btnReg = $('.btn-reg-js'),

		$btnFilters = $('.btn-filters-js');

	var $filtersResult = $('.p-filters-results-js');

	$btnNav.on('click', function (e) {
		var $curOpener = $(this);
		$curOpener.toggleClass(activeClass);
		$btnLogin.removeClass(activeClass);
		$btnReg.removeClass(activeClass);
		$btnFilters.removeClass(activeClass);

		$nav.toggleClass(activeClass);
		$login.removeClass(activeClass);
		$reg.removeClass(activeClass);
		$filters.removeClass(activeClass);

		$filtersResult.removeClass(activeClass);

		$overlay.toggleClass(activeClass, $curOpener.hasClass(activeClass));
		$html.toggleClass('shutter-after-open css-scroll-fixed', $curOpener.hasClass(activeClass)).addClass('header-show').removeClass('header-hide');
		$html.removeClass(shutterAfterOpenFilters);

		e.preventDefault();
	});

	$btnLogin.on('click', function (e) {
		var $curOpener = $(this);
		$curOpener.toggleClass(activeClass);
		$btnNav.removeClass(activeClass);
		$btnReg.removeClass(activeClass);
		$btnFilters.removeClass(activeClass);

		$login.toggleClass(activeClass);
		$nav.removeClass(activeClass);
		$reg.removeClass(activeClass);
		$filters.removeClass(activeClass);

		$filtersResult.removeClass(activeClass);

		$overlay.toggleClass(activeClass, $curOpener.hasClass(activeClass));
		$html.toggleClass('shutter-after-open css-scroll-fixed', $curOpener.hasClass(activeClass)).addClass('header-show').removeClass('header-hide');
		$html.removeClass(shutterAfterOpenFilters);

		e.preventDefault();
	});

	$btnReg.on('click', function (e) {
		var $curOpener = $(this);
		$curOpener.toggleClass(activeClass);
		$btnNav.removeClass(activeClass);
		$btnLogin.removeClass(activeClass);
		$btnFilters.removeClass(activeClass);

		$reg.toggleClass(activeClass);
		$nav.removeClass(activeClass);
		$login.removeClass(activeClass);
		$filters.removeClass(activeClass);

		$filtersResult.removeClass(activeClass);

		$overlay.toggleClass(activeClass, $curOpener.hasClass(activeClass));
		$html.toggleClass('shutter-after-open css-scroll-fixed', $curOpener.hasClass(activeClass)).addClass('header-show').removeClass('header-hide');
		$html.removeClass(shutterAfterOpenFilters);

		e.preventDefault();
	});

	$btnFilters.on('click', function (e) {
		var $curOpener = $(this);
		$curOpener.toggleClass(activeClass);
		$btnNav.removeClass(activeClass);
		$btnLogin.removeClass(activeClass);
		$btnReg.removeClass(activeClass);

		$filters.toggleClass(activeClass);
		$filtersResult.toggleClass(activeClass);
		$nav.removeClass(activeClass);
		$login.removeClass(activeClass);
		$reg.removeClass(activeClass);

		$overlay.toggleClass(activeClass, $curOpener.hasClass(activeClass));
		$html.toggleClass('shutter-after-open ' + shutterAfterOpenFilters, $curOpener.hasClass(activeClass)).addClass('header-show').removeClass('header-hide');

		e.preventDefault();
	});

	// close
	$('.js-btn-shutter-close, .shutter-overlay-js, .btn-filters-apply').on('click', function (e) {
		$btnNav.removeClass(activeClass);
		$btnLogin.removeClass(activeClass);
		$btnReg.removeClass(activeClass);
		$btnFilters.removeClass(activeClass);

		$nav.removeClass(activeClass);
		$login.removeClass(activeClass);
		$reg.removeClass(activeClass);
		$filters.removeClass(activeClass);

		$filtersResult.removeClass(activeClass);

		$overlay.removeClass(activeClass);
		$html.removeClass('shutter-after-open css-scroll-fixed ' + shutterAfterOpenFilters);

		e.preventDefault();
	})
}

/**
 * !Equal height of blocks by maximum height of them
 */
function equalHeight() {
	// equel height
	var $equalHeight = $('.equal-height-js');

	if($equalHeight.length) {
		$equalHeight.children().matchHeight({
			byRow: true, property: 'height', target: null, remove: false
		});
	}
	// product list
	var $productList = $('.products__list__holder');

	if($productList.length) {
		$productList.children().matchHeight({
			byRow: true, property: 'height', target: null, remove: false
		});
	}
}

/**
 * !Product liked
 * */
function productLiked() {
	$('.toggle-state-js').on('click', function (e) {
		var $btn = $(this),
			classActive = 'active',
			activeText = $btn.data('active-text'),
			unactiveText = $btn.data('unactive-text');

		$btn.toggleClass(classActive);

		if($btn.hasClass(classActive)) {
			$('span', $btn).text(activeText);
			if($btn.attr('title') !== undefined){
				$btn.attr('title', activeText);
			}
			if($btn.attr('data-title') !== undefined){
				$btn.attr('data-title', activeText);
			}
		} else {
			$('span', $btn).text(unactiveText);
			if($btn.attr('title') !== undefined){
				$btn.attr('title', unactiveText);
			}
			if($btn.attr('data-title') !== undefined){
				$btn.attr('data-title', unactiveText);
			}
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
	var offsetTop = (window.innerWidth < 1366) ? 50 : 70;

	// aside sticky
	var $mAside = $('.m-aside-sticky-js');

	if ($mAside.length) {
		stickybits('.m-aside', {
			useStickyClasses: true,
			stickyBitStickyOffset: offsetTop
		});
	}

	// tags sticky
	var $tags = $('.tags-sticky-js');

	if ($tags.length) {
		stickybits('.tags-sticky-js', {
			useStickyClasses: false,
			stickyBitStickyOffset: offsetTop
		});
	}

	// options sticky
	var $tags = $('.options-sticky-js');

	if ($tags.length) {
		stickybits('.options-sticky-js', {
			useStickyClasses: false,
			stickyBitStickyOffset: offsetTop
		});
	}
}
// if sticky is stuck

/**
 * !Add class if a sticky is stuck
 * */
$(function () {
	var $optionsPanel = $('.m-content__body__options');

	var optionsOffset = 0,
		parentOffset = 0,
		currentScrollTop,
		optionsFixedClass = 'options-stuck-js';

	if ($optionsPanel.length) {
		$(window).on('load scroll resize', function () {
			addClassFixed();
		});
	}

	function addClassFixed() {
		optionsOffset = $optionsPanel.offset().top;
		// console.log("optionsOffset: ", optionsOffset);
		parentOffset = $optionsPanel.parent().offset().top;
		// console.log("parentOffset: ", parentOffset);
		currentScrollTop = $(window).scrollTop();

		var cond = optionsOffset > parentOffset;

		$('html').toggleClass(optionsFixedClass, cond);
	}
});

$(function () {
	var $optionsTags = $('.m-content__body__tags');
	var $products = $('.products');

	var optionsOffset = 0,
		productsOffset = 0,
		currentScrollTop,
		optionsFixedClass = 'tags-stuck-js';

	if ($optionsTags.length) {
		$(window).on('load scroll resize', function () {
			addClassFixed();
		});
	}

	function addClassFixed() {
		optionsOffset = $optionsTags.offset().top + $optionsTags.outerHeight();
		console.log("optionsOffset: ", optionsOffset);
		productsOffset = $products.offset().top;
		console.log("productsOffset: ", productsOffset);
		currentScrollTop = $(window).scrollTop();

		var cond = optionsOffset > productsOffset;

		$('html').toggleClass(optionsFixedClass, cond);
	}
});

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

				switch (true) {
					case $curFilter.is(':checkbox'):
						$tagClone.appendTo($curContainer.find(self.$tagsContainer));
						break;

					case $curFilter.attr(self.attributes.dataType) === 'range-slider':
						$curContainer.find(self.tagsItem).filter(dataSelect).remove();
						var val = $curFilter.val().split(';');
						$(self.tagsItemTpl).clone()
							.find(self.tagTextContainer)
							.html(val[0] + " - " + val[1])
							.end()
							.attr(self.attributes.dataGroup, curAttrGroup)
							.attr(self.attributes.dataName, curAttrName)
							.attr(self.attributes.dataSelect, curAttrSelect)
							.appendTo($curContainer.find(self.$tagsContainer));

						break;

					default:
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
		var self = this;

		var $curFilters = $filter.closest($container).find(self.$filter),
			lengthActivateFilters = 0;

		$.each($curFilters, function () {
			var $thisFilter = $(this);
			self.getFilterState($thisFilter) && lengthActivateFilters++
		});

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

				var priceSliderObj = self.priceSlider,
					key;

				for (key in priceSliderObj) {
					priceSliderObj[key].reset();
				}
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

		var priceSliderObj = this.priceSlider,
			key;

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
 * !Add map on contacts page
 * */
function contactsMap() {

	var mapId = "#contacts-map",
		$mapId = $(mapId);

	/*initial map*/
	if ( $mapId.length ) {

		var myMap,
			myPlacemark,
			contactsMapCoord = contactMapInfo.coord,
			// center = [];
			center = contactsMapCoord;

		// if (window.innerWidth > 768) {
		// 	for (var i = 0; i < contactsMapCoord.length; i++) {
		// 		if (i === 1) {
		// 			center.push(contactsMapCoord[i] + 0.0006);
		// 			continue
		// 		}
		// 		center.push(contactsMapCoord[i] + 0.0002);
		// 	}
		// } else {
		// 	center = contactsMapCoord
		// }

		var init = function(){
			/*create new map object*/
			myMap = new ymaps.Map (mapId.substring(1), {
				center: center,
				zoom: 17,
				// controls: ['fullscreenControl', 'zoomControl']
				controls: ['fullscreenControl']
			});

			myPlacemark = new ymaps.Placemark(contactsMapCoord, {
				balloonContentBody: balloonContent,
				hintContent: contactMapInfo.title
			}, {
				iconLayout: 'default#image',
				iconImageHref: contactsMapBaseImageURL + 'pin-map.png',
				iconImageSize: [38, 38],
				iconImageOffset: [-19, -19]
			});

			/*add zoom control button*/
			var zoomControl = new ymaps.control.ZoomControl({
				options: {
					size: "small",
					position: {right: 10, bottom: 50}
				}
			});
			myMap.controls.add(zoomControl);

			myMap.geoObjects.add(myPlacemark);

			/*behaviors setting map*/
			myMap.behaviors.disable('scrollZoom');
		};

		ymaps.ready(init);

		var balloonContent = '' +
			'<div class="map-popup">' +
			'<div class="map-popup__title">' + contactMapInfo.title + '</div>' +
			'<div class="map-popup__subtitle">' + contactMapInfo.subtitle + '</div>' +
			'<div class="map-popup__list">' +
			'<div class="map-popup__row"><div>' + contactMapInfo.address + '</div></div>' +
			// '<div class="map-popup__row"><i class="depict-time"></i><div>' + contactMapInfo.time + '</div></div>' +
			// '<div class="map-popup__row"><div>' + contactMapInfo.phones + '</div></div>' +
			'</div>';
	}
}

/**
 * !Only number input
 * */
function onlyNumberInput() {
	// link: https://stackoverflow.com/questions/995183/how-to-allow-only-numeric-0-9-in-html-inputbox-using-jquery

	$("[data-only-number]").keydown(function (e) {
		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});
}

/**
 * !Product order calculation
 * */
var orderCalcOptions = {
	row: '.c-tr'
	, getTotalResults: function (e, el, results) {
		$(el).find('.order-calc__total-results-js').toggleClass('show', results.totalCount > 0);
		$(el).find('.order-calc-btn').prop('disabled', !results.totalCount > 0).toggleClass('disabled', !results.totalCount > 0);
	}
};

function orderCalculation() {
	$('.order-calc-js').msOrderCalc(orderCalcOptions);
}

/**
 * !tab switcher
 * */
function tabSwitcher() {
	// external js:
	// 1) TweetMax VERSION: 1.19.0 (widgets.js);

	var $tabWrapper = $('.tabs-js');
	var $container = $('.tab-container-js');

	if (!$container.length) return false;

	if ($tabWrapper.length) {
		var $anchor = $('.tab-anchor-js'),
			$content = $('.tab-content-js'),
			$simpleAccordionHand = $('.tab-link-js'),
			activeClass = 'is-open',
			collapseAllClass = 'collapsed-all-tab',
			idPrefix = 'activeIs',
			animationSpeed = 0.2,
			animationHeightSpeed = 0.08;

		$.each($tabWrapper, function () {
			var $currentContainer = $(this),
				$currentAnchor = $currentContainer.find($anchor),
				$thisContainer = $currentContainer.find($container),
				$currentContent = $currentContainer.find($content);


			if ($currentContainer.find('.' + activeClass).length > 0) {
				var initialTab = $currentContainer.find($anchor).filter('.' + activeClass).attr('href').substring(1);
			}
			if($currentContainer.data('collapsed') === true){
				$currentContainer.addClass(collapseAllClass);
			}
			// var tabInitedFlag = false;
			var valDataAutoHeight = $currentContainer.data('auto-height');
			var thisAutoHeight = valDataAutoHeight !== false;
			var activeTab = false;

			// prepare traffic content
			function prepareTabsContent() {
				$thisContainer.css({
					'display': 'block',
					'position': 'relative',
					'overflow': 'hidden'
				});

				$currentContent.css({
					'position': 'absolute',
					'left': 0,
					'top': 0,
					'width': '100%',
					'z-index': -1
				});

				switchContent();
			}

			prepareTabsContent();

			// toggle content
			$currentAnchor.on('click', function (e) {
				e.preventDefault();

				var $self = $(this),
					selfTab = $self.attr('href').substring(1);

				if ($currentContainer.data('collapsed') === true && activeTab === selfTab) {

					toggleActiveClass();
					toggleContent(false);
					changeHeightContainer(false);

					return;
				}

				if (activeTab === selfTab) return false;

				initialTab = selfTab;

				switchContent();
			});

			// collapse current tab method
			$currentAnchor.eq(0).on('tabSwitcherCollapse', function () {
				var $self = $(this);
				var selfTab = $self.attr('href').substring(1);

				if (activeTab === selfTab) {
					toggleActiveClass();
					toggleContent(false);
					changeHeightContainer(false);
				}
			});

			// switch content
			function switchContent() {
				if (initialTab) {
					toggleContent();
					changeHeightContainer();
					toggleActiveClass();
				}
			}

			// show active content and hide other
			function toggleContent() {

				thisAutoHeight && $thisContainer.css('height', $thisContainer.outerHeight());

				$currentContent.css({
					'position': 'absolute',
					'left': 0,
					'top': 0
				});

				TweenMax.to($currentContent, animationSpeed, {
					autoAlpha: 0
				});

				if (arguments[0] === false) return;

				var $initialContent = $currentContent.filter('[id="' + initialTab + '"]');

				$initialContent.css('z-index', 2);

				TweenMax.to($initialContent, animationSpeed, {
					autoAlpha: 1
					// ,'z-index': 2
				});
			}

			// change container's height
			function changeHeightContainer() {
				var $initialContent = $currentContent.filter('[id="' + initialTab + '"]');

				if (arguments[0] === false) {
					TweenMax.to($thisContainer, animationHeightSpeed, {
						'height': 0
					});

					return;
				}

				if (thisAutoHeight) {
					TweenMax.to($thisContainer, animationHeightSpeed, {
						'height': $initialContent.outerHeight(),
						onComplete: function () {

							thisAutoHeight && $thisContainer.css('height', '');

							$initialContent.css({
								'position': 'relative',
								'left': 'auto',
								'right': 'auto'
							});

							$tabWrapper.trigger('afterChange.tabSwitcher');
						}
					});
				}

				$initialContent.css({
					'position': 'relative',
					'left': 'auto',
					'right': 'auto'
				})
			}

			// toggle class active
			function toggleActiveClass() {
				$currentAnchor.removeClass(activeClass);
				$currentContent.removeClass(activeClass);
				if($currentContainer.data('collapsed') === true){
					$currentContainer.addClass(collapseAllClass);
				}

				if (activeTab) {
					$currentContainer.removeClass(idPrefix + '-' + activeTab);
				}

				if (initialTab !== activeTab) {

					$currentAnchor.filter('[href="#' + initialTab + '"]').addClass(activeClass);
					$currentContent.filter('[id="' + initialTab + '"]').addClass(activeClass);
					$currentContainer.addClass(idPrefix + '-' + initialTab);
					$currentContainer.removeClass(collapseAllClass);

					activeTab = initialTab;

					return false;
				}

				activeTab = false;
			}
		});

		// if transform tabs to accordion
		if ($simpleAccordionHand.length) {
			// var $panel = $simpleAccordionHand.next().children();

			$simpleAccordionHand.on('click', function (e) {
				e.preventDefault();

				var $curHand = $(this),
					$curPanel = $curHand.next().children();

				if($curHand.hasClass(activeClass)){
					$curHand.removeClass(activeClass);
					$curPanel.css({
						'overflow': 'hidden'
					});
					TweenMax.to($curPanel, animationHeightSpeed, {
						autoAlpha: 0,
						height: 0
					});
				} else {
					$curHand.addClass(activeClass);
					TweenMax.to($curPanel, animationHeightSpeed, {
						autoAlpha: 1,
						height: '',
						onComplete: function () {
							$curPanel.css({
								'overflow': '',
								'visibility': '',
								'opacity': ''
							});
						}
					});
				}

			});

			$(window).on('debouncedresizeByWidth', function () {
				$simpleAccordionHand.each(function () {
					var $curHand = $(this),
						$curPanel = $curHand.next().children().show();

					if (!$curHand.hasClass(activeClass)) {
						$curHand.addClass(activeClass);
						$curPanel.css({
							'height': '',
							'overflow': '',
							'visibility': '',
							'opacity': ''
						});
					}
				});
				// redraw yandex map on resize
				$('#shops-map').trigger('yMapRedraw');
			});
		}
	}
}

/**
 * !Init js drop
 * */
function initJsDrops(){
	var jsDropWrappers = '.js-compactor-clone';
	var $jsDropWrapper = $(jsDropWrappers);

	$jsDropWrapper.on('click', '.js-compactor-btn', function (e) {
		e.preventDefault();

		var $currentJsDropWrapper = $(this).closest(jsDropWrappers);
		var currentWasOpened = $currentJsDropWrapper.hasClass('show-drop');

		$jsDropWrapper.removeClass('show-drop');
		if (!currentWasOpened) {
			$currentJsDropWrapper.addClass('show-drop');

			if($currentJsDropWrapper.closest('.header').length){
				$('html').removeClass('position');
			}
		}
		return false;
	});

	$jsDropWrapper.on('click', '.location-filter-drop', function (e) {
		e.stopPropagation();
		// return false;
	});

	$(document).click(function () {
		$jsDropWrapper.removeClass('show-drop');
	});
}
/*init js drop end*/

/**
 * !shops location
 * */
function shopsLocation() {
	if ( !$('.shops').length ) return false;

	var $page = $('html, body'),
		myMap,
		myClusterer,
		myPlacemark = [],
		mapId = "#shops-map",
		$mapId = $(mapId),
		baseImageURL = 'img/',
		$selectCity = $('#selectCity'),
		urlShops = $selectCity.attr('data-path'),
		currentCity = $selectCity.attr('data-current'),
		$shopsContainer = $('.shops'),
		$shopsItem = $('.shops-item'),
		shopsItemActiveClass = 'is-active',
		fullscreenControl,
		duration = 300;

	/*initial map*/
	if ( $mapId.length ) {

		var init = function(){
			/*styling cluster icons*/
			var clusterIcons = [
					{
						href: baseImageURL + 'map-cluster-2x.png',
						size: [46, 46],
						offset: [-23, -23]
					},
					{
						href: baseImageURL + 'map-cluster-2x.png',
						size: [60, 60],
						offset: [-30, -30],
						shape: {
							type: 'Circle',
							coordinates: [0, 0],
							radius: 30
						}
					}],
				clusterNumbers = [20],
				MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
					'<div style="color: #FFFFFF; font-weight: normal; font-family: Arial, sans-serif;">{{ properties.geoObjects.length }}</div>'
				);

			/*create new cluster object*/
			myClusterer = new ymaps.Clusterer({
				clusterIcons: clusterIcons,
				clusterNumbers: clusterNumbers,
				clusterIconContentLayout: MyIconContentLayout,
				maxZoom: 11
			});

			/*create new map object*/
			myMap = new ymaps.Map (mapId.substring(1), {
				center: [51.9071097,27.4923474],
				zoom: 11,
				// controls: ['fullscreenControl']
				controls: []
			});

			/*add zoom control button*/
			var zoomControl = new ymaps.control.ZoomControl({
				options: {
					size: "small",
					position: {right: 10, bottom: 50}
				}
			});
			myMap.controls.add(zoomControl);

			fullscreenControl = new ymaps.control.FullscreenControl();
			myMap.controls.add(fullscreenControl);

			/*add geolocation control button*/
			// var geolocationControl = new ymaps.control.GeolocationControl({
			// 	options: {
			// 		noPlacemark: true
			// 	}
			// });
			//
			// var myLocationPlacemark;
			//
			// geolocationControl.events.add('locationchange', function (event) {
			// 	var position = event.get('position');
			//
			// 	setBoundsMap();
			//
			// 	myMap.geoObjects.remove(myLocationPlacemark);
			//
			// 	myLocationPlacemark = new ymaps.Placemark(
			// 		position
			// 	);
			//
			// 	myMap.geoObjects.add(myLocationPlacemark);
			// });
			// myMap.controls.add(geolocationControl);

			/*behaviors setting map*/
			myMap.behaviors.disable('scrollZoom');

			$mapId.on('yMapRedraw', function () {
				myMap.container.fitToViewport();
			});

			/*select current city*/
			selectCurrentCity();
		};

		ymaps.ready(init);
	} else {
		/*select current city*/
		selectCurrentCity();
	}

	/*select current city*/
	function selectCurrentCity() {
		var $selectShops = $("#selectCity");

		$selectShops.find("option[value='" + currentCity + "']").prop('selected', true).trigger('change');
	}

	/*custom select city*/
	$selectCity.on('change', function(){
		var value = $(this).val();

		selectCity(value);
	});

	/*select city*/
	function selectCity(value) {
		if ( value !== 0 ) {

			/*change current city flag*/
			currentCity = value;

			/*clear filter tags*/
			// clearFilterTags();
			// searchShopsByTag();

			var jsonResult = [];

			$.get(urlShops + "/" + value + ".json", {ajax: '1', action: 'json'}, function (data) {
				addCountLoader();

				jsonResult = data;
				reDrawNewCitiesMarks(jsonResult);

			}, "json").done(function () {
				removeCountLoader();
			});

			var $scrollContainer = $('.shops-aside-holder');
			// hide all
			$('.shops-aside-group').removeClass('is-show');
			$scrollContainer.css('overflow', 'hidden');
			// show active
			$('[data-item-group = ' + value + ']').addClass('is-show');
			$scrollContainer.css('overflow', 'auto');

		}
	}

	var $noItemTemplate = $('<div />', {
		class: 'filter-no-item',
		text: 'Извините, магазинов с выбранными параметрами не найдено'
	});

	/*create and push new placemarks*/
	function reDrawNewCitiesMarks ( jsonResult ) {

		/*remove all placemark*/
		if (myClusterer) {
			myClusterer.removeAll();
		}

		/*hide all item on shops list*/
		$($shopsItem,'.shops-aside-group').hide(0);

		/*toggle "no item" message*/
		$('.filter-no-item').remove();

		if (!jsonResult.length) {
			$('.shops').append($noItemTemplate.clone());

			return false;
		}

		/*create geo objects Array*/
		var myGeoObjects = [];

		$.each( jsonResult, function(i, item) {

			var coordStr = item.coord,
				id = item.id;

			/*toggle item on shops list*/
			$('[data-location-index = ' + id + ']').show(0);

			/*building tags list*/
			var tags = function () {
				if (item.tags.length) {
					var j, tag, result = '';
					for ( j = 0; j < item.tags.length ; j++) {
						var currentTag = item.tags[j];
						tag = '<span style="background-image: url(' + currentTag.tags_url + ');"><i>' + currentTag.tags_title + '</i></span>';
						result += tag;
					}
					return result;
				}
			};

			if ( $mapId.length ) {

				/*create balloon content*/
				var balloonContent = '' +
					'<div class="map-popup">' +
						'<div class="map-popup__title">' + item.address + '</div>' +
						'<div class="map-popup__list">' +
							'<div class="map-popup__row work-time"><i class="depict-time"></i>' + item.time + '</div>' +
							'<div class="map-popup__row"><i class="depict-phone"></i>' + item.phones + '</div>' +
							// '<div class="map-popup__row">' +
							// '<div class="map-popup__shops-tags">' + tags() + '</div>' +
							// '</div>' +
							'<div class="map-popup__row link-more"><a href="#" class="more" data-more-id="' + id + '"><span>Подробнее</span></a></div>' +
						'</div>' +
					'</div>';

				/*add placemarks to the map*/
				if ( coordStr !== null ) {
					var coordArray = coordStr.split(', ');

					myPlacemark[id] = new ymaps.Placemark([coordArray[0], coordArray[1]], {
						balloonContentBody: balloonContent,
						hintContent: item.name
					}, {
						iconLayout: 'default#image',
						iconImageHref: baseImageURL + 'pin-map.png',
						iconImageSize: [38, 38],
						iconImageOffset: [-19, -19],
						hideIconOnBalloonOpen: false,
						balloonOffset: [0, -23],
						balloonPosition: ['center', 'top']
					});

					myGeoObjects[id] = new ymaps.GeoObject({});

					myClusterer.add(myPlacemark[id]);
				}

			}
		});

		if ( $mapId.length ) {
			myMap.geoObjects.add(myClusterer);

			setBoundsMap();
		}

	}

	function setBoundsMap() {
		myMap.setBounds(myClusterer.getBounds(), {checkZoomRange: false}).then(function () {
			if (myMap.getZoom() > 11) myMap.setZoom(11);
		});
	}

	/*show more information*/
	function showMoreInfo() {
		$('body').on('click', 'ymaps .more', function (e) {
			var $curBtn = $(this);
			fullscreenControl.exitFullscreen();

			var $currentItem = $('.shops-aside [data-location-index="' + $(this).data('more-id') + '"]');

			if (window.innerWidth > 1355 && !$currentItem.hasClass(shopsItemActiveClass)) {
				$currentItem.find('.shops-item__title a').trigger('click');
			}

			if (window.innerWidth > 991 && window.innerWidth < 1366) {
				// switch tabs
				$curBtn.closest('.tabs-js').find('[href*="#shopsListView"]').trigger('click');
				$shopsItem.removeClass(shopsItemActiveClass);
				$currentItem.addClass(shopsItemActiveClass);
				if (!$page.is(':animated')) {
					$page.stop().animate({scrollTop: $currentItem.offset().top - $('.header').outerHeight()}, duration);
				}
			}

			e.preventDefault();
		})
	}

	showMoreInfo();

	/*filter tags*/
	$('.location-filter-wrap').on('change', ':checkbox', function () {
		searchShopsByTag();
	});

	function searchShopsByTag() {
		var value = currentCity;
		var dataTagArr = [];
		var newResult = [];

		var $checkbox = $('.location-filter-wrap input:checked');

		$.each($checkbox, function () {
			dataTagArr.push($(this).val());
		});

		$.get(urlShops + "/" + value + ".json", {ajax: '1', action: 'json'}, function (data) {
			addCountLoader();

			var jsonResult = data;

			$.each(jsonResult, function (i, iItem) {

				var countEqual = 0;

				$.each(iItem.tags, function (j, jItem) {

					$.each(dataTagArr, function (l, lItem) {

						if (jItem.tags_label === lItem) {
							countEqual++;
							return false;
						}

					});

				});

				if (countEqual === dataTagArr.length) {
					createNewResult(i);
				}
			});

			function createNewResult(index) {
				newResult.push(jsonResult[index]);
			}

			reDrawNewCitiesMarks(newResult);

		}, "json").done(function () {
			removeCountLoader();
		});
	}

	/*event on click shops list*/
	var moveFlag;

	var $scrollContainer = $( '.shops-aside-holder' ),
		prevPosition = 0;

	$scrollContainer.on('scroll', function () {
		prevPosition = $scrollContainer.scrollTop();
	});

	$('.shops-item__title').on('click', 'a', function (e) {
		var $currentHand = $(this),
		$currentItem = $currentHand.closest($shopsItem);

		if (window.innerWidth > 1365) {

			var currentPosition = $currentItem.position().top + prevPosition;

			if (!$scrollContainer.is(':animated') && currentPosition !== 0) {
				$scrollContainer.stop().animate({scrollTop: currentPosition}, duration, function () {
					prevPosition = currentPosition;
				});
			}
		}

		if (window.innerWidth > 991 && window.innerWidth < 1366) {
			// switch tabs
			$currentHand.closest('.tabs-js').find('[href*="#shopsMapView"]').trigger('click');
			// scroll to top
			if (!$page.is(':animated')) {
				$page.stop().animate({scrollTop: $shopsContainer.offset().top - $('.header').outerHeight()}, duration);
			}
		}

		if (window.innerWidth > 991) {
			$shopsItem.removeClass(shopsItemActiveClass);
			$currentItem.addClass(shopsItemActiveClass);

			var index = $(this).closest($shopsItem).data('location-index');

			if (moveFlag === index) return false;
			moveFlag = index;

			var coord = myPlacemark[index].geometry.getCoordinates();

			myMap.setCenter(coord, 16, {
				duration: 100,
				checkZoomRange: true
			}).then(function () {
				myPlacemark[index].balloon.open();
			});
		}

		e.preventDefault();
	});

	/*add count loader*/
	function addCountLoader() {
		var countLoader = $('<div />', {
			class: 'count-loader'
		});

		$('.shops-aside-frame').append(countLoader.clone());
	}

	/*remove count loader*/
	function removeCountLoader() {
		var $countLoader = $('.count-loader');
		$countLoader.fadeOut(700, function () {
			$countLoader.remove();
		});
	}

	/*events clear filter button*/
	function eventsClearFilterButton() {

		var $filters = $('.location-filter');

		if ($filters.length) {

			$filters.on('change', 'input', function () {
				clearBtnState();
			});

			// clear button event
			$('.btn-clear-form').on('click', function (e) {

				e.preventDefault();

				clearFilterTags();
				searchShopsByTag();

			});

		}
	}

	eventsClearFilterButton();
	/*events clear filter button end*/

	/* clear button state */
	function clearBtnState() {
		setTimeout(function () {
			$('.clear-form').toggleClass('btn-active', !!$('.location-filter').find(':checked').length);
		}, 300);
	}
	/*clear button state end*/

	/*clear filter tags*/
	function clearFilterTags() {
		$('.location-filter-wrap').find(':checked').prop("checked", false);
		clearBtnState();
	}
	/*clear filter tags end*/
}
/*shops map end*/

/**
 * !add shadow tape
 * */
function addShadowTape() {
	$('.shops-aside-holder').scroll(function () {
		$(this).parents().toggleClass('show-shadow', $(this).scrollTop() > 0)
	});
}
/*add shadow tape end*/

/**
 * !toggle view shops
 * */
function toggleViewShops() {
	var $switcherHand = $('.shops-view-switcher_dddd a');

	if ( $switcherHand.length ) {

		var $container = $('.shops');
		var activeHand = 'active';
		var activeContainer = 'view-shops-active';

		$switcherHand.on('click', function (e) {
			e.preventDefault();

			var $this = $(this);

			if ( $this.hasClass(activeHand) ) return false;

			$switcherHand.removeClass(activeHand);
			$container.removeClass(activeContainer);

			$this.addClass(activeHand);

			if ($this.index() === 0) {
				$container.addClass(activeContainer);
			}
		});

		// $('.shops-map').on('click', '.more', function (e) {
		// 	e.preventDefault();
		//
		// 	if ( window.innerWidth < 1280 && window.innerWidth > 979 ) {
		// 		$switcherHand.eq(0).removeClass(activeHand);
		// 		$switcherHand.eq(1).addClass(activeHand);
		//
		// 		$container.removeClass(activeContainer);
		// 	}
		// });

	}
}
/*toggle view shops end*/

/**
 * !Counter
 * */
$(function () {
	var counterOffset = 0,
		currentScrollTop;

	var $counter = $('.count-js'),
		$item = $('.count__item-js'),
		$wrapper = $counter.closest('.about-chain');

	function startCount() {
		currentScrollTop = $(window).scrollTop() + window.innerHeight;

		$.each($item, function () {
			var $curItem = $(this);

			counterOffset = $curItem.offset().top + 100;

			var cond = counterOffset < currentScrollTop;

			if(cond && !$curItem.prop('isCounted')) {
				$curItem.prop('isCounted', true);
				$wrapper.addClass('animation-start');

				var $curCounter = $curItem.closest($counter),
					speed = $curCounter.data('count-speed') || 3000;

				// count initial
				$curItem.prop('counter', 0).animate({
					counter: $curItem.data('count')
				},{
					duration: speed,
					step:function (now) {
						$curItem.addClass('count-start').text(Math.round(now));
					}
				});
			}
		});
	}

	if ($counter.length) {
		$(window).on('load scroll resize', function () {
			startCount();
		});
	}

	/** !Add dots */
	var $dots = $('.dots-js'),
		$dotTpl = $('<div class="dots__dot"></div>'),
		length = $dots.data('length'),
		i;

	for (i = 0; i < length; i++) {
		$dots.append($dotTpl.clone());
	}
});

/**
 * !Tooltip
 * */
function initTooltip() {
	var $elements = $('.user-options__item a');
	$.each($elements, function () {
		var $curElem = $(this);
		$curElem.attr('data-title', $curElem.attr('title')).attr('title','');
	})
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
$(document).ready(function () {
	placeholderInit();
	printShow();
	inputToggleFocusClass();
	inputHasValueClass();
	customSelect($('select.cselect'));
	onlyNumberInput();
	slidersInit();
	selectLang();
	accordionInit();
	filterJob();
	multiAccordionInit();
	toggleShutters();
	equalHeight();
	productLiked();
	formMaskInit();
	formAccept();
	stickyInit();
	multiFiltersInit();
	contactsMap();
	orderCalculation();
	tabSwitcher();
	initJsDrops();
	shopsLocation();
	addShadowTape();
	toggleViewShops();
	// Counter init
	initTooltip();
	objectFitImages('img'); // object-fit-images initial

	// formSuccessExample();
});