'use strict';

(function(){
  $(function() {
    $(function() {
      var $carousel = $('.carousel'),
        $loadmore = $('.js-loadmore');

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
      }
    });
  });
}());

