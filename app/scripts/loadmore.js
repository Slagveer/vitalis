;( function( $, window, document, undefined ) {

  'use strict';

  var pluginName = 'loadmore',
    defaults = {
      animation: true
    },
    $loadmore;

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend( Plugin.prototype, {
    init: function() {
      $loadmore = $(this.element).find('.js-loadmore');

      $loadmore.on('click', function onClick(evt) {

      });
    }
  } );

  $.fn[ pluginName ] = function( options ) {
    return this.each( function() {
      if ( !$.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' +
          pluginName, new Plugin( this, options ) );
      }
    } );
  };

} )( jQuery, window, document );
