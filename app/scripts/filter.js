;( function( $, window, document, undefined ) {

  'use strict';

  var pluginName = 'filter',
    defaults = {
      animation: true
    },
    $filter,
    $checkboxes,
    $filterGroups;

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend( Plugin.prototype, {
    init: function() {
      $filter = $(this.element);
      $filterGroups = $filter.find('.js-filter-group');

      _.each($filterGroups, function renderGroups(group) {
        var $filterButton;

        $filterButton = $(group).find('.js-filter-btn');
        $checkboxes = $(group).find('.js-filter-checkbox');
        $($filterButton).data('checkboxes', $checkboxes);
        $($filterButton).on('click', function onClick(evt) {
          evt.preventDefault();
          $checkboxes = $filterButton.data('checkboxes');
          $checkboxes.show();
        });
        _.each($checkboxes, function(checkbox, index) {
          if(index < 5) {
            $(checkbox).show();
          }
        });
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
