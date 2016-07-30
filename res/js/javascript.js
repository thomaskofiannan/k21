$(document).ready(function() {
    
   var windowHeight = $(window).height();
   /*Outer height calculates the height of an element. with true, it counts the margins*/
   var navOriginalPos = windowHeight - $('#main-menu').outerHeight(true);
    
   $('#menu').css({'top': navOriginalPos + 'px'});
   
   $(window).scroll(function() {
	/*scrollTop() returns the scroll position of the element*/
       var scrolledVal = $(this).scrollTop();
        if ( scrolledVal > navOriginalPos ) {
			/*I've scrolled more than window - menu*/
            $('#menu').css({'position':'fixed','top' :'0px'});
        } else {
			/*I've scrolled less than window - menu*/
            $('#menu').css({'position':'absolute','top': navOriginalPos +'px'});
        }
    });


});