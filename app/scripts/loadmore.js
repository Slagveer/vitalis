;( function( $, window, document, undefined ) {

  'use strict';

  var pluginName = 'loadmore',
    defaults = {
      animation: true
    },
    $loadmore,
    $arrow,
    $teaserboxTemplate,
    $teaserboxLocation;

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend( Plugin.prototype, {
    init: function() {
      $loadmore = $(this.element);
      $loadmore.on('click', function onClick(evt) {
        evt.preventDefault();
        $arrow.addClass('loadmore');
        getTeasers();
      });
      $arrow = $(this.element).find('.js-arrow');
      $teaserboxTemplate = $("#teaserbox-template");
      $teaserboxLocation = $('.js-teaserboxes');

      function getTeasers(page) {
        if($loadmore.data('href')) {
          $.when(delayAsync(4000), $.get($loadmore.data('href')), $.ajax({url: $loadmore.data('href')}))
            .then(function(delayData, jsonData, ajaxJsonData) {
              var source = $teaserboxTemplate.html(),
                template = Handlebars.compile(source),
                html = template(ajaxJsonData[0].data);

              $teaserboxLocation.append(html);
              $arrow.removeClass('loadmore');
            }).fail(function(err) {
              $arrow.removeClass('loadmore');
            });
        }
      }

      function delayAsync(delay) {
        var dfd = $.Deferred();

        if (delay > 0) {
          setTimeout(function() {
            dfd.resolve(delay);
          }, 4000);
          return dfd.promise();
        }

        return delay;
      }
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
