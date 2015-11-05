;$(function(){
	var FADEIN_SPEED = 400;
	var preload_image = $('img[src*="preload"]');
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

	var bgsParalax = $('.bg.paralax').map(function(index, el){
		return [[$(el).offset().top, $(el)]];
	});

	$(document).on('scroll', function(e){
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		for(var i = 0; i < bgsParalax.length; i++){
			if(bgsParalax[i][0] <= scrolled){
				bgsParalax[i][1].css({
					'margin-top':  - (bgsParalax[i][0] - scrolled)/2 + 'px'
				});
			}
		}
	})
});
