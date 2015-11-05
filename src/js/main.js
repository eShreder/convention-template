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

	$('.bg.paralax').each(function(index, el){
		var _e = [$(el).offset().top, $(el)];
		$(window).on('scroll', function(e){
			var scrolled = window.pageYOffset || document.documentElement.scrollTop;
			if(_e[0] <= scrolled){
				_e[1].css({
					'transform':'translate3d(0,' + - (_e[0] - scrolled)/2 + 'px, 0)'
				});
			}
		})
	});
});
