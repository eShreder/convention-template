;$(function(){
	var FADEIN_SPEED = 400;
	var preload_image = $('img[src*="preload"]');
	var viewPort = $(window).height();
	preload_image.each(function(i, obj){
		var $obj = $(obj),
			img = $('<img>').attr('src', obj.src.replace('/preload','')),
			parent = $obj.parent();
		img.hide();
		img.load(function(){
			parent.append(img);
			img.fadeIn(FADEIN_SPEED, function(){
				$obj.remove();
			});
		})
	})

	var bP = $('.bg.paralax').map(function(index, el){
		return [[$(el).offset().top, $(el)]];
	});
	var bF = $('.bg .fade.active').map(function(index, el){
		return [[$(el).offset().top, $(el)]];
	});
	$(window).on('resize', function(e){
		viewPort = $(window).height();
	});
	$(window).on('scroll', function(e){
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		for(var i = 0; i < bP.length; i++) {
			if(bP[i][0] <= scrolled){
				bP[i][1].css({
					'transform':'translate3d(0,' + - (bP[i][0] - scrolled)/2 + 'px, 0)'
				});
			}
		}
		for(var i = 0; i < bF.length; i++) {
			if(bF[i][0] <= scrolled + viewPort){
				bF[i][1].css({
					'opacity': Math.min(0.83, 1 - (bF[i][0] - scrolled)/viewPort)
				});
			}
		}
	});
});
