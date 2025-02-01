$(document).ready(function () {
	var speed = 600;

	// HEADER
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

	// MAIN
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

	// WORKS
	if($('#wrap').has('#work').length > 0) {
		// 리스트의 첫번째 요소, 마지막 요소 클래스 부여
		$('.list-anchor').parents('li').each(function(){
			if($(this).is(':first-of-type')){
				$(this).find('.popup-box').addClass('first');
			}else if($(this).is(':last-of-type')){
				$(this).find('.popup-box').addClass('last');
			}
		});

		// 리스트 클릭 시 팝업 열기
		$('.list-anchor').on('click', function (e) {
			var $popupBox = $(this).next('.popup-box');

			e.preventDefault();
			$('.popup-box').hide();
			$popupBox.addClass('open').fadeIn(200);
			mockupScrolling($popupBox);
		});

		// 팝업 닫기 버튼 클릭 시 팝업 닫기
		$('.popup-box').find('.btn-popup-close').on('click', function () {
			var $popupBox = $(this).parents('.popup-box');

			$popupBox.removeClass('open').fadeOut(200);
			mockupScrolling($popupBox);
		});

		// 팝업박스 내 이전, 다음 버튼 클릭 시 팝업 이동
		$('.popup-box').find('.navi-box button').on('click', function(e){
			var $parentsLi = $(this).parents('li');
			var $popupBox = $(this).parents('.popup-box');

			if($(this).hasClass('btn-popup-prev')){
				if($popupBox.hasClass('first')){
					e.preventDefault();
				}else{
					$popupBox.find('.btn-popup-close').trigger('click');
					$parentsLi.prev('li').find('.list-anchor').trigger('click');
				}
			} else{
				if($popupBox.hasClass('last')){
					e.preventDefault();
				}else{
					$popupBox.find('.btn-popup-close').trigger('click');
					$parentsLi.next('li').find('.list-anchor').trigger('click');
				}
			}
		});

		function mockupScrolling(param) {
			var $box = param;
			var timer = 2000;

			$box.find('.pop-img-box > div').each(function () {
				var boxHeight = $(this).height();
				var imgHeight = $(this).find('img').height();
				var scrollHeight = imgHeight - boxHeight;

				if (!$box.hasClass('open')) {
					$(this).children('div').finish();
					$(this).children('div').scrollTop(0);
				} else {
					$(this).children('div').stop().animate({
						scrollTop: scrollHeight
					}, timer, 'linear', function () {
						$(this).stop().animate({
							scrollTop: 0
						}, timer, 'linear');
					});
				}
			});
		};
	}

	// CONTACT
	if($('#wrap').has('#contact').length > 0) {
		$('.env-box').addClass('alarm');

		$('.open-env').on('click', function(){
			var counter = parseInt($('.env-outer').data('emails'));
			counter = counter > 0 ? counter - 1 : counter;

			$('.env-outer').attr('data-emails', counter);
			$('.env-box').removeClass('alarm').addClass('open');
			$('.contact-popup-outer').delay(1000).fadeIn(300);
			setTimeout(function(){
				$('.contact-info').addClass('on');
			}, 1300);
		});

		$('.btn-popup-close').on('click', function(){
			$('.contact-popup-outer').fadeOut(200);
			$('.env-box').removeClass('open');
			$('.contact-info').removeClass('on');
		});
	}

	// ESC키로 팝업 닫기
	$(document).keydown(function(e) {
    if ( e.keyCode == 27 || e.which == 27 ) {
        $('.btn-popup-close').trigger('click');
    }
	});

});