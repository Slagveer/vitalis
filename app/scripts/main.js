'use strict';

(function(){
  $(function() {
    $(function() {
      var $carousel = $('.js-carousel'),
        $loadmore = $('.js-loadmore'),
        $targetAudienceForm = $('.js-submitform');

      $('body').navigation({
        animation: true,
        pause: 'hover'
      });
      if($carousel) {
        $carousel.carousel({
          interval: 8000
        });
        $carousel.swiperight(function () {
          $carousel.carousel('prev');
        });
        $carousel.swipeleft(function () {
          $carousel.carousel('next');
        });
        $carousel.on('slid.bs.carousel', function slideIt(e){
          var slide = $('.item.active').data('slide-number');

          $('.js-thumbnail-item').removeClass('active');
          $($('.js-thumbnail-item')[slide]).addClass('active');
        });

      }
      if($loadmore) {
        $loadmore.loadmore();
      }if($targetAudienceForm) {
        $targetAudienceForm.targetaudience();
      }
      $('.hirsc').hisrc({
        useTransparentGif: false,
        speedTestUri: './bower_components/hisrc/50K.jpg'
      });
    });
  });
}());

