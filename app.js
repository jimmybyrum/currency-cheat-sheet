$(document).ready(function() {
  var $window = $(window);

  $('section h1').each(function(idx) {
    var height = $(this).innerHeight();
    $(this).parents('.row').css('min-height', height + 'px');
  });

  $window.on('scroll', function() {
    var scrollTop = $window.scrollTop();

    $('section').each(function() {
      var thisTop = $(this).offset().top;
      var thisBottom = thisTop + $(this).innerHeight();
      if (thisTop < scrollTop) {
        $(this).addClass('active');
        $(this).find('h1').addClass('affix');
      }
      if (thisTop > scrollTop) {
        $(this).find('h1').removeClass('affix');
      }
      if (thisBottom < scrollTop) {
        $(this).removeClass('active');
      }
    });
  });
});
