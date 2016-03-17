var ENZA = ENZA || {};

(function(jQ, enza) {

  'use strict';

  jQ('body').css('display','block');
  enza.namespace('utilities.array');
  enza.utilities.array = (function () {
    // private properties
    var array_string = '[object Array]';
    var log = function() {
      console.log(array_string)
    };
    // end var
    // revealing public API
    return {
      log: log
    };
  }());
}($, ENZA));

$(document).ready(function() {
  ENZA.utilities.array.log();
});




