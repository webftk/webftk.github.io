$(function() {

	$('.header').parallax({imageSrc: 'img/top-bg.jpg'});

	$('.img-svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');

				// Add replaced image's ID to the new SVG
				if(typeof imgID !== 'undefined') {
						$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
						$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				}

				// Replace image with new SVG
				$img.replaceWith($svg);

		}, 'xml');

});

$(".scroll-wrap").mPageScroll2id({ 
	scrollSpeed: 600
	 });

$(".portfolio-item").each(function(i) {
	$(this).find("a").attr("href", "#portfolio-more-" + i);
	$(this).find(".portfolio-item__open").attr("id", "portfolio-more-" + i);
});

$(".modal").magnificPopup({
		
	type: 'inline',

	fixedContentPos: true,
	fixedBgPos: true,

	overflowY: 'scroll',

	closeBtnInside: true,
	preloader: true,
	
	midClick: true,
	removalDelay: 300,
	mainClass: 'mfp-zoom-in'
});

var slick = $('.portfolio-slider').slick({
	infinite: true,
	arrows: true,
	dots: false,
	speed: 700,
	autoplay: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	swipeToSlide: true,
	pauseOnHover: false,
	adaptiveHeight: true,
	fade: true,
	cssEase: 'linear'
});

$('.modal').click(function() {
	slick.slick('refresh');
});

$("img, a, p, h1, h2, h3, li, span, button").on("dragstart", function(event) { event.preventDefault(); });


});
$(window).on('load', function(){
	$('.preloader').delay(2000).fadeOut('slow');
})
