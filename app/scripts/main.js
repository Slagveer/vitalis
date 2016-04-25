'use strict';

$.hisrc.speedTest();
(function(){
  $(function() {
    $(function() {
      var $carousel = $('.carousel'),
        $loadmore = $('.js-loadmore'),
        $targetAudienceForm = $('.js-submitform');

      // Disable bounce effect on tablets
      $(document).bind(
        'touchmove',
        function(e) {
          e.preventDefault();
        }
      );

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
      }
      if($loadmore) {
        $loadmore.loadmore();
      }if($targetAudienceForm) {
        $targetAudienceForm.targetaudience();
      }
      $('.hirsc').hisrc({
        useTransparentGif: false,
        speedTestUri: '../bower_components/hisrc/50K.jpg'
      });
    });
  });
}());

