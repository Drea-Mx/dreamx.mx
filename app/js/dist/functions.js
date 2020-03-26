jQuery(function($){

$('.ham').on('click', function(){
  $('.ham').toggleClass('clicked');
  $('#menu').toggleClass('height');
});

});
