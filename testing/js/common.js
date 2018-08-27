$(function() {

	var deviceWidth = {
		winWidth: function() {
				var _return;
				_return = window.innerWidth;
				return _return;
		},
		maxTabletWidth: function() {
				var _return;
				_return = 1025;
				return _return;
		},
		minTabletWidth: function() {
				var _return;
				_return = 1023;
				return _return;
		},
		winCategory: function() {
				var _return;
				if ((this.winWidth() < this.maxTabletWidth()) && (this.winWidth() >= this.minTabletWidth())) {
						_return = "tablet";
				} else if (this.winWidth() < this.minTabletWidth()) {
						_return = "mobile";
				} else {
						_return = "desktop";
				}
				return _return;
		}
	};
	
	var body, actSection, goToSection;
	var animated = false;
	$(function () {
		if (navigator.userAgent.search("Chrome") >= 0) {
				body = $('body');
		} else {
				body = $('html');
		}
	
		var goToIndex;
		$('body').on('click', '.paging span', function(event){
				if($(this).hasClass('active')){
						return false;
				}
				event.preventDefault();
			 
				goToIndex = $(this).index();
				actSection = $('section.active');
	
				movePageTo($('section').eq(goToIndex));
		});
	});
	
	var nativeScroll = true;
	$(window).on('load',function () {
		$('section.active, .paging span.active').removeClass('active');
		TweenMax.set($(window),  { scrollTo: { y: 0 }});
	
		pagination();
	
		scrollEvents();
		resizeEvents();
	});
	
	function pagination(){
		$('section').each(function() {
				$('.paging').append('<span></span>');
		});
	}
	
	var navAct, nowNavAct;
	var scrollTimeout;
	function scrollEvents() 
	{  
		var cur_pos = $(window).scrollTop();
	
		$('section').each(function () {
				var top = $(this).offset().top,
						bottom = top + $(this).outerHeight();
				
				if (cur_pos + $(window).height() < $(document).height()) {
					//gia na min thewrei active to epomeno section kai as fainetai ligo
					if (cur_pos >= top - (window.innerHeight/3) && cur_pos <= bottom- (window.innerHeight/3) ) {
							$('section.active').not($(this)).removeClass('active');
							$(this).addClass('active');
							actSection = $('section.active');
							$('.paging span.active').removeClass('active');
							$('.paging span').eq(actSection.index()).addClass('active');
					}
				}
		});
	
		if (cur_pos + $(window).height() == $(document).height()) {
				$('section.active, .paging span.active').removeClass('active');
				$('section:last-child').not('.active').addClass('active');
				$('.paging span:last-child').addClass('active');
		}
	
		if(nativeScroll == false){
			clearTimeout(scrollTimeout);
			scrollTimeout = 0;
			scrollTimeout = setTimeout(function(){
					if(animated==true)return;
					if(!$("section.active").hasClass("nativeScroll") && (cur_pos + $(window).height() < $(document).height())){
						movePageTo(actSection);
					}
			}, 1000)
		}
	}
	
	function resizeEvents() 
	{
		if (deviceWidth.winCategory() == 'mobile' && nativeScroll == false) {
				nativeScroll = true;
			 $(".scroll-wrapper").unmousewheel(siteScroll);
		}
	
		if (deviceWidth.winCategory() != 'mobile' && nativeScroll == true && $('html').hasClass('no-touch')) {
				nativeScroll = false;
			 $(".scroll-wrapper").mousewheel(siteScroll);
		}
	
		if (deviceWidth.winCategory() != "mobile" && $('.scroll-wrapper').length > 0) {
				actSection = $('section.active');
				movePageTo(actSection);
		}
	}
	
	var lastActive;
	function afterMove(actSection) {
		if($(actSection)[0] == $(lastActive)[0]){
				return;
		}
	
		lastActive = actSection;
		$('.paging span.active').removeClass('active');
		$('.paging span').eq(actSection.index()).addClass('active');
	}
	
	var delta;
	function siteScroll(event) {
		delta = event.deltaY;
		actSection = $('section.active');
	
		if (nativeScroll == true) { return }
		if (animated == true) { return false; }
	
		if (delta > 0) {
				if (actSection.is(':first-child')) { return };
				scrollUp(event);
		} else {
				if (actSection.is(':last-child')) { return };
				scrollDown(event);
		}
	}
	
	function scrollUp(event)
	{
		var cur_pos = $(window).scrollTop();
	
		if (!actSection.hasClass('nativeScroll') || (actSection.hasClass('nativeScroll') && cur_pos <= actSection.offset().top)) {
				event.preventDefault();
				movePageTo(actSection.prev(), "bottom");
		}
	}
	
	var nScroll;
	function scrollDown(event) 
	{
		var cur_pos = $(window).scrollTop();
		if (actSection.hasClass('nativeScroll') && actSection.offset().top + actSection.outerHeight() <= cur_pos + $(window).height()) {
				nScroll = false;
		} else {
				nScroll = true;
		}
	
		if (!actSection.hasClass('nativeScroll') || nScroll == false) {
				if(event)event.preventDefault();
				movePageTo(actSection.next(), "top");
		}
	}
	
	function movePageTo(newSection, pos) {
		var yPos = 0;
		animated = true;
	
		var siteAnim = new TimelineMax({
				onComplete: function () {           
						actSection.removeClass('active');
						newSection.addClass('active');
						actSection = newSection;
						afterMove(newSection);
						animated = false;
				}
		});
	
		if(pos == "bottom"){
			yPos = newSection.offset().top + newSection.outerHeight() - $(window).height();
		}else{
			yPos = newSection.offset().top;
		}
	
		siteAnim.to($(window), 1, { scrollTo: { y: yPos }, ease: Power2.easeOut });
	}

});



