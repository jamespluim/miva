// ---- Home Page Hero Slider ---- //
		$.ajax({
			cache: true,
			crossDomain: true,
			dataType: 'script',
			url: '../js/jquery.slick.min.js'
		}).done(function () {
			$('#sfnt-slider').slick({
				lazyLoad: 'ondemand',
				draggable: false,
				slide: 'a',
				slidesToScroll: 1,
				slidesToShow: 1,
				dots: true,
				arrows: true,
				fade: true,
				autoplay: true,
				autoplaySpeed: 5000
			});
		});