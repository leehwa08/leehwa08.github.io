$(document).ready(function () {
	$('html').removeClass('no-script');

	// 디바이스 체크
	deviceCheck();
	$(window).resize(function(){
		deviceCheck();
	});

	function deviceCheck(){
		var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

		if(!isMobile) {
			$('body').removeClass('mobile').addClass('pc');
		}else{
			$('body').removeClass('pc').addClass('mobile');
		}
	}	

	// AOS
	AOS.init();
	
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
			}, 500);
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

		$('.floating-box, .con-title').addClass('on');
		
		for (let i = 0; i < txtLeng; i++) {
			let timer = 1500;

			setTimeout(function () {
				//$greetingBox.find('p').removeClass('on');
				$greetingBox.find('p').eq(i).addClass('on');
			}, timer * i);

			if (i === txtLeng - 1) {
				setTimeout(function () {
					$greetingBox.find('p').eq(i).addClass('end');
					$('.floating-box, .con-title').removeClass('on');
				}, timer * i + 1000);
			}
		};

		document.body.addEventListener("mousemove", evt => {
			const mouseX = evt.clientX;
			const mouseY = evt.clientY;
			
			gsap.set(".cursor", {
				x: mouseX,
				y: mouseY
			});
			
			gsap.to(".shape", {
				x: mouseX,
				y: mouseY,
				stagger: -0.1
			});
		});
		
	}

	// WORKS
	if ($('#wrap').has('#work').length > 0) {
		// 리스트의 첫번째 요소, 마지막 요소 클래스 부여
		$('.list-anchor').parents('li').each(function () {
			if ($(this).is(':first-of-type')) {
				$(this).find('.popup-box').addClass('first');
			} else if ($(this).is(':last-of-type')) {
				$(this).find('.popup-box').addClass('last');
			}
		});

		// 리스트 클릭 시 팝업 열기
		$('.list-anchor').on('click', function (e) {
				var $popupBox = $(this).next('.popup-box');
				var mediaBoolean;

				if ($('body').hasClass('pc')) {
					mediaBoolean = true;
				} else if($('body').hasClass('mobile')) {
					// 디바이스에서는 클릭시 text박스 먼저 출력하기 위해 클래스 부여

					if($(this).hasClass('mo-click')) {
						$(this).removeClass('mo-click');
						mediaBoolean = true;
					} else {
						$(this).addClass('mo-click');
						mediaBoolean = false;
					}
				}

				e.preventDefault();

				if (mediaBoolean == true) {
					$('body').addClass('over-hidden');
					$('.popup-box').hide();
					$popupBox.addClass('open').fadeIn(200);
					setTimeout(function(){
						mockupScrolling($popupBox);
					}, 500);
				}
		});

		// 팝업 닫기 버튼 클릭 시 팝업 닫기
		$('.popup-box').find('.btn-popup-close').on('click', function () {
			var $popupBox = $(this).parents('.popup-box');

			$popupBox.removeClass('open').fadeOut(200);
			$('body').removeClass('over-hidden');
		});

		// 팝업박스 내 이전, 다음 버튼 클릭 시 팝업 이동
		$('.popup-box').find('.navi-box button').on('click', function (e) {
			var $parentsLi = $(this).parents('li');
			var $popupBox = $(this).parents('.popup-box');
			var $clickBox;

			$(this).parents('ul').addClass('navigator');

			if ($(this).hasClass('btn-popup-prev')) {
				$clickBox = $(this).parents('li').prev().find('.popup-box');
				if ($popupBox.hasClass('first')) {
					e.preventDefault();
				} else {
					$popupBox.find('.btn-popup-close').trigger('click');
					$parentsLi.prev('li').find('.popup-box').addClass('open').show();
				}
			} else {
				$clickBox = $(this).parents('li').next().find('.popup-box');
				if ($popupBox.hasClass('last')) {
					e.preventDefault();
				} else {
					$popupBox.find('.btn-popup-close').trigger('click');
					$parentsLi.next('li').find('.popup-box').addClass('open').show();
				}
			}
			$clickBox.find('.pop-con-box').scrollTop(0);
			setTimeout(function(){
				mockupScrolling($clickBox);
			}, 500);
		});

		function mockupScrolling(param) {
			var $box = param;
			var moImgHeight = $box.find('.pop-img-box .mo img').height();
			var calcMoHeight = Math.ceil(moImgHeight / 100) * 100;
			//var timer = 2000;
			var timer = parseInt(calcMoHeight * 2.25);

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
	if ($('#wrap').has('#contact').length > 0) {
		$('.env-box').addClass('alarm');

		$('.open-env').on('click', function () {
			var counter = parseInt($('.env-outer').data('emails'));
			counter = counter > 0 ? counter - 1 : counter;

			$('.env-outer').attr('data-emails', counter);
			$('.env-box').removeClass('alarm').addClass('open');
			$('.contact-popup-outer').delay(1000).fadeIn(300);
			setTimeout(function () {
				$('.contact-info').addClass('on');
			}, 1300);
		});

		$('.btn-popup-close').on('click', function () {
			$('.contact-popup-outer').fadeOut(200);
			$('.env-box').removeClass('open');
			$('.contact-info').removeClass('on');
		});
	}

	// ESC키로 팝업 닫기
	$(document).keydown(function (e) {
		if (e.keyCode == 27 || e.which == 27) {
			$('.btn-popup-close').trigger('click');
		}
	});

});