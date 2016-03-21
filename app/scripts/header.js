;( function( $, window, document, undefined ) {

  "use strict";

  var pluginName = "navigation",
    defaults = {
      propertyName: "value"
    }, $menu, $hamburger, $logo;

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend( Plugin.prototype, {
    init: function() {
      $menu = $(this.element).find('.js-menu');
      $hamburger = $(this.element).find('.js-hamburger');
      $logo = $(this.element).find('.js-logo');
      $menu.on('click', function onClick(evt) {
        $hamburger.toggleClass('glyphicon-remove glyphicon-menu-hamburger');
        $logo.toggleClass('hide-logo');
      });
      this.yourOtherFunction( "jQuery Boilerplate" );
    },
    yourOtherFunction: function( text ) {

      //$( this.element ).text( text );
    }
  } );

  $.fn[ pluginName ] = function( options ) {
    return this.each( function() {
      if ( !$.data( this, "plugin_" + pluginName ) ) {
        $.data( this, "plugin_" +
          pluginName, new Plugin( this, options ) );
      }
    } );
  };

} )( jQuery, window, document );
