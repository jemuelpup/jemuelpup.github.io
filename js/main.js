$(document).ready(function(){
	
	var smallestHeightElementInSlider = 0;
	var sliderSmallestSizeX = 0;
	var sliderSmallestSizeY = 0;
	var containerHeight = 0;
	init();


	$('.header-slider').slick({
		dots: true,
		speed: 800,
		autoplay: false,
		autoplaySpeed: 5000
	});
	$('.cards').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: true
				}
			},
			{
				breakpoint: 880,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: true
				}
			},
			{
				breakpoint: 535,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true
				}
			}
		]
	});

	$(".menu").click(function(){
		$('body>aside').addClass("active");	
	});
	$(".close").click(function(){
		$('body>aside').removeClass("active");	
	});
	

	var colWidth = ($('.grid').width()/6)-(6*4);
	console.log(colWidth," ito yung width")
	$('.grid').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
		percentPosition: true
	});
	$('.header-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$(".slide-caption .description .title").fadeOut( 250 );
		$(".slide-caption .description .desc").fadeOut( 250 );
	});

	$('.header-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
	 setSliderTitleAndDesc();
	});
	function setSliderTitleAndDesc(){
		var activeSlide = $(".header-slider li.slick-current .description");
		var title = activeSlide.children(".title").text();
		var desc = activeSlide.children(".desc").text();
		$(".slide-caption .description .title").text(title).fadeIn( 250 );
		$(".slide-caption .description .desc").text(desc).fadeIn( 250 );
	}
	function init(){
		smallestHeightElementInSlider = getSmallestHeightInImgArray($('.header-slider li img'));
		sliderSmallestSizeX = $(smallestHeightElementInSlider.naturalWidth)[0];
		sliderSmallestSizeY = $(smallestHeightElementInSlider.naturalHeight)[0];
		// slider initialization
		setSliderHeight(smallestHeightElementInSlider);
		var title = $(".header-slider li:first-child .description .title").text();
		var desc = $(".header-slider li:first-child .description .desc").text();
		$(".slide-caption .description .title").text(title).fadeIn( 250 );
		$(".slide-caption .description .desc").text(desc).fadeIn( 250 );
		// parallax initialization
		$('.parallax').parallax();
		// card text initialization
		if($(window).width()>880){
			autoHeight($(".products .card"),3);
		}
		else if($(window).width()>600){
			autoHeight($(".products .card"),2);
		}
	}
	function setSliderHeight(imgElement){
		console.log(sliderSmallestSizeY,sliderSmallestSizeX,$(imgElement).width())
		containerHeight = sliderSmallestSizeY/sliderSmallestSizeX*$(imgElement).width();
		containerHeight = containerHeight > $(window).height() ? $(window).height() : containerHeight;
		// console.log(containerHeight+" win="+$(window).height(),"ito yung height")
		$('.header-slider').height(containerHeight);
	}
	function autoHeight(elementArr,numRows){
		elementArr.height("auto");
		var height = -Infinity;
		var row = [];
		elementArr.each(function( i, e ){
			height = height<$(e).height() ? $(e).height():height;
			if((i+1)%numRows==0){
				console.log("pumasok dito");
				elementArr.slice(i-numRows+1, i+1).height(height);
				height = -Infinity;
			}
			else if(i===elementArr.length-1){
				elementArr.slice(i).height(height);
			}
		});

	}
	$(window).resize(function(){
		setSliderHeight(smallestHeightElementInSlider);
		if($(window).width()>880){
			autoHeight($(".products .card"),3);
		}
		else if($(window).width()>600){
			autoHeight($(".products .card"),2);
		}
	});
	$(document).ready(function(){
		$('.parallax').parallax();
	});

	// this returns the element
	function getSmallestHeightInImgArray(a){
		console.log(a);
		var smallestHeightElement = null;
		var smallestHeight = Infinity;
		a.each(function(){
			if($(this)[0].naturalHeight<smallestHeight){
				smallestHeightElement = this;
			}
		});
		return smallestHeightElement;
	}	
});