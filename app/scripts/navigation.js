;( function( $, window, document, undefined ) {

  "use strict";

  var pluginName = "navigation",
    defaults = {
      propertyName: "value"
    },
    $menu,
    $search,
    $navigation,
    $logo;

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
      $logo = $(this.element).find('.js-logo');
      $search = $(this.element).find('.js-search');
      $navigation = $(this.element).find('.js-navigation');

      $menu.data('active', false);
      $menu.on('click', function onClick(evt) {
        collapseAllAndOpen();
        $menu.data('active', !$menu.data('active')); console.log($search.data('active'));
        checkLogo();
      });
      $search.data('active', false);
      $search.on('click', function onClick(evt) {
        collapseAllAndOpen();
        $search.data('active', !$search.data('active')); console.log($search.data('active'));
        checkLogo();
        evt.stopPropagation();
      });

      function collapseAllAndOpen() {
        var promises = [];
        // Disable all the buttons in the navigation
        $search.attr('disabled', 'disabled');
        $menu.attr('disabled', 'disabled');
        $('.navigation button[data-toggle="collapse"]').each(function(){
          var objectID = $(this).data('target');
          var deferred  = $.Deferred();

          // Collapse all the open navigation menu's first
          if($(objectID).hasClass('in') === true) {

            $(objectID).on('hidden.bs.collapse', function() {
              $(objectID).off('hidden.bs.collapse');
              deferred.resolve();
              promises.push(deferred);
            });
            $(objectID).collapse('hide');
          }

        });
        if(promises.length === 0) {
          $menu.removeAttr('disabled');
          $search.removeAttr('disabled');
        }
        // Wait till all the menu's are collapsed
        $.when.apply(null, promises)
          .done(function() {
            $search.removeAttr('disabled');
            $menu.removeAttr('disabled');
          });
      }

      function checkLogo() {
        if($menu.data('active') === true || $search.data('active') === true) {
          $logo.addClass('hide-logo');
        } else {
          $logo.removeClass('hide-logo');
        }
      }
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
