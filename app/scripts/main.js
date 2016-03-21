console.log('\'Allo \'Allo!');

(function(){
$(document).ready(function() {
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  $( function() {
    var x = $('body').navigation( {
      propertyName: 'a custom value'
    } );
    console.log(x);
  } );
});
}());

