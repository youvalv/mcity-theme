<!-- Google Translate Plugin -->
function googleTranslateElementInit() {
	new google.translate.TranslateElement({
		pageLanguage: 'en',
		layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
		autoDisplay: false
	}, 'google_translate_element');
}

jQuery.fn.nextOrFirst = function(selector){
    var next = this.next(selector);
    return (next.length) ? next : this.prevAll(selector).last();
}

jQuery.fn.prevOrLast = function(selector){
    var prev = this.prev(selector);
    return (prev.length) ? prev : this.nextAll(selector).last();
}

jQuery(document).ready(function($){

		var realHeight = 500;
		var $window = $(window);

		function adjustSlider() {
			$("#sidebar").trigger("sticky_kit:recalc");
		}


		$(window).resize(function(event) {
			windowHeight = $window.height();

			if ($('#sidebar').length > 0) {
				adjustSlider();
			}
		
			if (windowHeight < 500)
			{
				realHeight = 500;
			}
			else
			{
				realHeight = windowHeight;
			}
			$('.fullscreen').css('height', realHeight + 'px');

			if ($('#sidebar').length > 0)
			{
				$('#content').css('min-height', $('#sidebar').outerHeight(true) + 120);
			}

		}).trigger('resize');
	
setTimeout(function() {

	/******* header *******/

		//google translator styling overwrites
		function initLanguageSelector() {
			setTimeout(function() {
				$("#header .language-selector .goog-te-menu-value span:first-child").text("Translate");
				$("#header .language-selector").show();
			}, 1000);

		}

		initLanguageSelector();

		$('#header .navigation > li > a').not('.external').click(function(e){
			e.preventDefault();
			
			$('#header .navigation > li.active').not($(this).parent()).each(function(){
				$(this).find('a').trigger('click');
			});
			$(this).parent().toggleClass('active');

			if ($(this).parent().hasClass('nav-search'))
			{	
				$('.search-popup').addClass('active');
				$('#search-header').focus();
			}
			
		});

		$('.nav-search-mobile a').click(function(e){
			e.preventDefault();
			$('.nav-search').addClass('active');
			$('.search-popup').addClass('active');
			$('#search-header').focus();
		});

		$('.nav-menu-mobile').click(function(e){
			e.preventDefault();
			$('body').toggleClass('show-mobile-menu');
			$('html').toggleClass('show-mobile-menu');
		});
		
		$('#searchsubmit-header').click(function(e){
			e.preventDefault();
			$('.nav-search').removeClass('active');	
			$('.search-popup').removeClass('active');
		});
		
		
		$('#scrollTop').click(function(e){
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 });
		});
		
		$('.footer-scroll-top').click(function(e){
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 });
		});




		$("body").keydown(function(e) {
			$galleryImage = $('#galleryModal .modal-content.active.loaded');
			if ($galleryImage.css('display') == 'block' && $galleryImage.length > 0) {
				if(e.keyCode == 37) { // left
					$galleryImage.first().find('.navigation .prev').first().trigger('click');
				}
				else if(e.keyCode == 39) { // right
					$galleryImage.first().find('.navigation .next').first().trigger('click');
				}
			}
		});


	

	/******* resize *******/

		var realHeight = 500;;

		$(window).resize(function(event) {
			var height = $(window).height();
			var width = $(window).width();
		
			if (height < 500)
			{
				realHeight = 500;
			}
			else
			{
				realHeight = height;
			}
			$('.fullscreen').css('height', realHeight + 'px');
		
			if ($('#sidebar').length > 0) {
				if (width < 768)
				{
					$("#sidebar").trigger("sticky_kit:detach");
				}
				else
				{
					$("#sidebar").stick_in_parent({
				    	parent: "[data-sticky_parent]",
				    	offset_top: 40
				    });
				}
			}

			if (realHeight < 800 || width < 1024)
			{
				$('body').addClass('mobile-content');

				if ($('body').hasClass('modal-open'))
				{
					$('.modal[aria-hidden="false"]').modal('hide');
				}
			
				$('.show-content').removeClass('active');
			}
			else
			{
				if ($('body').hasClass('mobile-content'))
				{
					$('.show-content').removeClass('active');
				}
				$('body').removeClass('mobile-content');
			}

			$('.slider ul').css('width', $('.slider li').length*($('.slider li').first().width()+20)-20 + 'px');
			$('.slider-navigation li a').first().trigger('click');
			$('.slider').animate({scrollLeft: 0}, 200);

			shrinkTop();

			$galleryImage = $('#galleryModal .modal-content.active.loaded');			
			if ($galleryImage.css('display') == 'block' && $galleryImage.length > 0)
			{
				setImagePosition($galleryImage.first().find('.img-wrapper img'));
			}

		});
	
		$(window).trigger('resize');
		setTimeout(function() {
			$(window).trigger('resize');
		}, 500);

	/******* scroll *******/


		function shrinkTop() {
			var st = $(this).scrollTop();
			var width = $(this).width();

			if (st > 30 || width < 992)
			{
				$('body').addClass('shrinked');
			}
			else
			{
				$('body').removeClass('shrinked');
			}
		}

		$(window).scroll(function(event) {
			shrinkTop();

			//$('#header .navigation > li').removeClass('active');
			if ($window.width() > 991)
			{
				$('#header .navigation > li.active a').trigger('click');
			}

			st = $(this).scrollTop();
			var header = $("#header");
			
			if (st > $(this).height())
			{
				$('#scrollTop').addClass('active');
			}
			else
			{
				$('#scrollTop').removeClass('active');
			}

			/* sidebar */
			if ($('#sidebar').length > 0) {
				adjustSlider();
			}
		}).trigger('scroll');
	
		if($(window).width() < 767){

			$('.toggle-title').addClass('collapsed');
			$('.panel-collapse.collapse').removeClass('in');
			
		}

		if($(window).width() < 767){

			$('.toggle-title').addClass('collapsed');
			$('.panel-collapse.collapse').removeClass('in');
			
		}

	/******* home *******/

		/* home cta */
		$('.cta .close a').click(function(e){
			e.preventDefault();

			$('.cta').fadeOut();
		});

		$('.show-content').click(function(){
			$(this).siblings().removeClass('active');
			$(this).toggleClass('active');
			if ($(this).hasClass('active')) {	
				$('body').addClass('active-content');
			}
			else
			{
				$('body').removeClass('active-content');
			}
		
			$($(this).attr('data-target')).siblings('.tab-modal').removeClass('active');
			$($(this).attr('data-target')).toggleClass('active');
			
			if ($('body').hasClass('mobile-content'))
			{
				$('html,body').animate({scrollTop:$('.fullscreen').height()-80},400,"easeInOutCubic");
				return false;
			}
			else
			{
				$('html,body').animate({scrollTop:0},400,"easeInOutCubic");
			}
		});

		$('.scroll-to-section a').click(function(){
			var top = $($(this).attr('href')).offset().top;
			$('html,body').animate({scrollTop:top-80},400,"easeInOutCubic");
			return false;
		});
	
		$('.tab-modal').on('hide.bs.modal', function () {
			$('.show-content').removeClass('active');
			$('.tab-modal').removeClass('active');
		})
	
		/* news slider */
		var sliderPages = $('.slider li').length / 4 + 1;
	
		$('.slider-navigation ul').append(new Array(sliderPages).join('<li><a href="#"></a></li>'));
		$('.slider-navigation ul li').first().addClass('active')
	
		$('.slider-navigation li a').click(function(e){
			e.preventDefault();
		
			var parent = $(this).parent();
			parent.siblings().removeClass('active');
			parent.addClass('active');
		
			$('.slider ul').css('left', -($('.slider').width()+20)*parent.index() + 'px');
		});
	
	function setImagePosition(img) {
		$current = img.parent().parent().parent();

		$current.css({
			'width': '100%'
		});

		var imageOriginalHeight = imageRealHeight = img.get(0).height;
		var imageOriginalWidth = imageRealWidth = img.get(0).width;
		
		var wrapperWidth = $('#content .container').first().width();
		var wrapperHeight =  $window.height() - 80;

		var windowRatio = wrapperWidth / wrapperHeight;

		var textOriginalHeight = img.parent().next().actual('outerHeight');

		if (imageRealWidth > wrapperWidth)
		{
			var tempRation = wrapperWidth / imageRealWidth;
			imageRealHeight = imageRealHeight * tempRation;
			imageRealWidth = wrapperWidth;
		}

		var originalHeight = imageRealHeight + textOriginalHeight;

		if (wrapperHeight > originalHeight)
		{
			$current.css({
				'top': (wrapperHeight - originalHeight) / 2 + "px",
				'left': 0,
				'width': '100%'
			});
		}
		else
		{
			$current.css({
				'top': 0,
				'left': 0,
				'width': '100%'
			});

			wrapperHeight = wrapperHeight - 20;

			if (wrapperHeight < imageOriginalHeight) {
				var tempRation = wrapperHeight / imageOriginalHeight;
				imageRealWidth = imageOriginalWidth * tempRation;
				imageRealHeight = wrapperHeight;

				$current.css({
					'width': imageRealWidth + "px",
					'left' : (wrapperWidth - imageRealWidth) / 2 + "px"
				});
			}
		}
	}

	/***** gallery image loaded *****/
	$('.gallery-images .modal-body .img-wrapper img').one("load", function() {
		setImagePosition($(this));

		$current = $(this).parent().parent().parent();

		$current.addClass('loaded');
		$('#galleryModal .modal-content.loader').removeClass('visible');
	});
	
	/***** for preloading *****/
	$('.gallery-images .modal-body img').each(function(){
		//$(this).attr('src', $(this).attr('attr-src'));
		//if(this.complete) $(this).load();
	});

	function goToNextImage(next) {		
		next.addClass('active');

		var nextImg = next.find('.modal-body img');
		if (nextImg.attr('attr-src') != "")
		{
			$('#galleryModal .modal-content.loader').addClass('visible');
			nextImg.attr('src', nextImg.attr('attr-src'));
			nextImg.attr('attr-src', '');
			if(nextImg.get(0).complete) {
				nextImg.load();
			}
			else
			{
				setImagePosition(nextImg);
			}
		}
		else
		{
			setImagePosition(nextImg);
		}
	}

	$('.gallery-section a[data-toggle="modal"]').click(function(){
		$('.gallery-images .modal-content').removeClass('active');

		var next = $('.gallery-images .modal-content').eq($(this).parent().index());
		
		goToNextImage(next);
	});

	$('.gallery-section .navigation .prev').click(function(e){
		e.preventDefault();

		var parent = $(this).parent().parent().parent().parent();
		var next = parent.prevOrLast();

		parent.removeClass('active');
		goToNextImage(next)
	});

	$('.gallery-section .navigation .next').click(function(e){
		e.preventDefault();

		var parent = $(this).parent().parent().parent().parent();
		var next = parent.nextOrFirst();

		parent.removeClass('active');
		goToNextImage(next)
	});

}, 1000);

});

