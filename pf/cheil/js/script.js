$(document).ready(function(){
  // header sub_menu sticky
  
  // container_top
  var hd_oH = $('.hd_area').outerHeight();
  $('#container').css('margin-top',hd_oH);
  
  // 메인 bxslider
  var visual_slide = $('.visual').bxSlider({
    auto:true,
    controls:false,
    pager:false
  });
  var visual_txt_slide = $('.visual_txt').bxSlider({
    auto:true,
    controls:false
  })
  
  $('.bx-pager').on('click',function(){
    var vs_txt_idx = visual_txt_slide.getCurrentSlide();
    visual_slide.goToSlide(vs_txt_idx);
  })  
  
  // 메인 visual_cnt height fix
  $(window).on('resize',function(){
    var mv_H = $('.main_intro').height();
    $('.visual_cnt').css('height',mv_H*0.9);
  }).resize();
  
  // 메인 work
  $('.main_work_area li').on({
    mouseenter:function(){
      $(this).addClass('over');
    },
    mouseleave:function(){
      $(this).removeClass('over');
    }
  });
  
  // 메인 global more
  $('.main_global .map').on({
    mouseenter:function(){
      $(this).addClass('over');
    },
    mouseleave:function(){
      $(this).removeClass('over');
    }
  });
//  $('.main_global .main_more').on('mouseenter',function(){
//    $(this).addClass('over');
//  })
//  
//  function mainHover(){
//    
//  }
})