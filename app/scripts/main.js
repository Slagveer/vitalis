'use strict';

(function(){
  $(function() {
    $(function() {
      var $carousel = $('.carousel');
      $('body').navigation({
        animation: true,
        pause: 'hover'
      });
      $carousel.carousel({
        interval: 800000
      });
      $carousel.swiperight(function() {
        $carousel.carousel('prev');
      });
      $carousel.swipeleft(function() {
        $carousel.carousel('next');
      });
    });
  });
}());

