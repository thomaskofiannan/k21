$(document).ready(function() {
    
   /* fix vertical when not overflow
    call fullscreenFix() if .fullscreen content changes */
    function fullscreenFix(){
        var h = $('body').height();
        // set .fullscreen height
        $(".content-b").each(function(i){
            if($(this).innerHeight() <= h){
                $(this).closest(".fullscreen").addClass("not-overflow");
            }
        });
    }
    $(window).resize(fullscreenFix);
    fullscreenFix();
    
    /* resize background images */
    function backgroundResize(){
        var windowH = $(window).height();
        $(".background").each(function(i){
            var path = $(this);
            // variables
            var contW = path.width();
            var contH = path.height();
            var imgW = path.attr("data-img-width");
            var imgH = path.attr("data-img-height");
            var ratio = imgW / imgH;
            // overflowing difference
            var diff = parseFloat(path.attr("data-diff"));
            diff = diff ? diff : 0;
            // remaining height to have fullscreen image only on parallax
            var remainingH = 0;
            if(path.hasClass("parallax")){
                var maxH = contH > windowH ? contH : windowH;
                remainingH = windowH - contH;
            }
            // set img values depending on cont
            imgH = contH + remainingH + diff;
            imgW = imgH * ratio;
            // fix when too large
            if(contW > imgW){
                imgW = contW;
                imgH = imgW / ratio;
            }
            //
            path.data("resized-imgW", imgW);
            path.data("resized-imgH", imgH);
            path.css("background-size", imgW + "px " + imgH + "px");
        });
    }
    $(window).resize(backgroundResize);
    $(window).focus(backgroundResize);
    backgroundResize(); 
	
	var windowHeight = $(window).height();
	/*Outer height calculates the height of an element. with true, it counts the margins*/
	var navOriginalPos = windowHeight - $('#main-menu').outerHeight(true);
		
	$(window).scroll(function() {
	/*scrollTop() returns the scroll position of the element*/
       var scrolledVal = $(this).scrollTop();
        if ( scrolledVal > navOriginalPos ) {
			/*I've scrolled more than window - menu*/
            $('#main-menu').css({'position':'fixed','top' :'0px'});
            $('#main-menu').css({'padding':'5px 0px'});
			$('#main-menu').css({'border-bottom':'2px solid black'});
			$('.navbar-brand').css({'font-size':'22px','padding-left':'25px;'});
			$('.logoHero').css({"visibility":"visible"});
        } else {
			/*I've scrolled less than window - menu*/
            $('#main-menu').css({'position':'absolute','top': navOriginalPos +'px'});
			$('#main-menu').css({'padding':'0px'});
			$('#main-menu').css({'border-bottom':'0px'});
			$('.navbar-brand').css({'font-size':'18px'});   
			$('.logoHero').css({"visibility":"hidden"});
        }
    });
	

	//Smooth scroll
 	$('a[href*=#]:not([data-parent="#menuAccordion"]):not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
			$('html,body').animate({
			  scrollTop: target.offset().top
			}, 900);
			return false;
		  }
		}
		});
	
	/*menu showing*/
	function menuShow(){
		$(".menu")
			.removeClass("menuShow")
			.addClass("menuHide");
			
		$("#"+$(this).attr("name"))
			.addClass("menuShow");
	}
	function menuHide(){
		$(".menu")
			.removeClass("menuShow")
			.addClass("menuHide");
	}
	$(".menuItem").click(menuShow);
	$(".closeButton").click(menuHide);

	/*Customer opinion slideshow*/
	$("#opinionSection .row:gt(0)").hide();

	setInterval(function() { 
	  $('#opinionSection .row:first')
		.fadeOut(1000)
		.next()
		.fadeIn(1000)
		.end()
		.appendTo('#opinionSection .container');
	},  6000);

	/*Dishes slideshow*/
	$("#slideshow > div:gt(0)").hide();

	setInterval(function() { 
	  $('#slideshow > div:first')
		.fadeOut(1000)
		.next()
		.fadeIn(1000)
		.end()
		.appendTo('#slideshow');
	},  4000);
	
	/*Google maps configuration*/
	function initialize() {
		var styles = [
			{
			  featureType: "road",
			  elementType: "geometry.stroke",
			  stylers: [
				{ hue: "#C17E14" }
			  ]		  
			},
			{
			  featureType: "landscape",
			  elementType: "geometry.fill",
			  stylers: [
				{ color: "#fafafa" }
			  ]
			},
			{
			  featureType: "water",
			  elementType: "geometry.fill",
			  stylers: [
				{ hue: "#C17E14" }
			  ]
			},		  
			{ featureType: "transit",
			  elementType: "all",
			  stylers: [
				{ hue: "#C17E14" }
			  ]
			},		  
			{ featureType: "poi",
			  elementType: "all",
			  stylers: [
				{ hue: "#C17E14" }
			  ]
			}
		];

		var myLatLng = new google.maps.LatLng(51.519593, -0.081694);
		
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

		var mapCanvas = document.getElementById('map-canvas');
		var mapOptions = {
		  center: myLatLng,
		  zoom: 14,
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  scrollwheel: false
		}
		var map = new google.maps.Map(mapCanvas, mapOptions)
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
		
		var image = 'img/map.png';

		var beachMarker = new google.maps.Marker({
		  position: myLatLng,
		  map: map,
		  icon: image
		})
	}
	google.maps.event.addDomListener(window, 'load', initialize);
});