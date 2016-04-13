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
      $teaserboxLocation = $('.js-teaserboxes');

      function getTeasers(page) {
        if($loadmore.data('href')) {
          $.when(delayAsync(4000), $.get($loadmore.data('href')), $.ajax({url: $loadmore.data('href')}))
            .then(function(delayData, jsonData, ajaxJsonData) {
              var source,
                template,
                teaserbox,
                html;

              if(ajaxJsonData){
                for(var i=0,l=ajaxJsonData[0].Data.Items.length;i<l;i++) {
                  teaserbox = ajaxJsonData[0].Data.Items[i];
                  teaserbox.StartDate = moment(teaserbox.StartDate).format('DD MMM YYYY').toUpperCase();
                  teaserbox.EndDate = moment(teaserbox.EndDate).format('DD MMM YYYY').toUpperCase();
                  teaserbox.TeaserType = (teaserbox.TeaserType)? teaserbox.TeaserType.toUpperCase() : '';
                  teaserbox.Jobhours = (teaserbox.Jobhours)? teaserbox.Jobhours.toUpperCase() : '';
                  teaserbox.Location = (teaserbox.Location)? teaserbox.Location.toUpperCase() : '';
                  teaserbox.Country = (teaserbox.Country)? teaserbox.Country.toUpperCase() : '';
                  $teaserboxTemplate = $('#teaserbox-template-' + teaserbox.TemplateName.toLowerCase());
                  source = $teaserboxTemplate.html(),
                  template = Handlebars.compile(source),
                  html = template(teaserbox);
                  $teaserboxLocation.append(html);
                }
              }
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
