$(document).ready(function () {
	var speed = 600;

	// header
	var pageName = $('body').data('page-name');

	$('.gnb-box ul').find('a').each(function () {
		if ($(this).find('span').text() == pageName) {
			$(this).addClass('active');
		}
	});


	$('.btn-menu').on('click', function () {
		if (!$('header').hasClass('on')) {
			$('header').addClass('on');
			setTimeout(function () {
				$('header').addClass('menu-show');
			}, 300);
			$('.gnb-box').fadeIn();
		} else {
			$('header').removeClass('menu-show');
			setTimeout(function () {
				$('header').removeClass('on');
			}, 500);
		}
	});

	// main
	if ($('body').hasClass('main')) {
		var $greetingBox = $('.greeting-box');
		var txtLeng = $greetingBox.find('p').length;

		for (let i = 0; i < txtLeng; i++) {
			let timer = 1500;

			setTimeout(function () {
				$greetingBox.find('p').removeClass('on');
				$greetingBox.find('p').eq(i).addClass('on');
			}, timer * i);

			if (i === txtLeng - 1) {
				setTimeout(function () {
					$greetingBox.find('p').eq(i).addClass('end');
					$('.floating-box, .con-title').addClass('on');
				}, timer * i + 1000);
			}
		};
	}
});