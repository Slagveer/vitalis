;( function( $, window, document, undefined ) {

  'use strict';

  var pluginName = 'googlemaps',
    defaults = {
      animation: true
    },
    $map,
    $countrySelectorTemplate,
    $country,
    marker,
    countries,
    countriesUnique,
    countriesJSON,
    selectedCountry,
    map;

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend( Plugin.prototype, {
    init: function() {
      $map = $(this.element);
      $country = $('.js-country-selector');
      GoogleMapsLoader.KEY = 'AIzaSyA9i6uziMYIQk9ZyHd4sG0Vw-gRIVP39C4	';
      GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
      GoogleMapsLoader.load(function googleLoaded(google) {
        map = new google.maps.Map($map[0],{
          center: {lat: -34.397, lng: 150.644},
          scrollwheel: true,
          zoom: 8
        });
        countries = $country.data('offices');
        countriesJSON = JSON.parse(countries);
        countriesUnique = _.uniq(_.pluck(countriesJSON.countries, 'Land')); console.log(countriesUnique);
        _.each(countriesJSON.countries, function readCountries(country) {
          var source,
            template,
            html;

          $countrySelectorTemplate = $('#googlemaps-selector-template');
          source = $countrySelectorTemplate.html(),
          template = Handlebars.compile(source),
          html = template(country);
          //$country.append(html);
        });
        countries = $country.data('countries');
        countries = JSON.parse(countries);
        $country.on('change', function onChange(evt) {
          evt.preventDefault();
          selectedCountry = evt.target.value;
          console.info(countries[selectedCountry]);
          map.setCenter(new google.maps.LatLng(countries[selectedCountry][0],countries[selectedCountry][1]));
        });

        marker = new google.maps.Marker({
          position: {lat: -34.397, lng: 150.644},
          map: map,
          title: 'Hello World!'
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
