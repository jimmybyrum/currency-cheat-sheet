var ccs = (function() {
  'use strict';
  var $html = $('html');
  var $window = $(window);
  var $nav = $('nav, .other-nav');
  var $title = $('nav h2 a');
  var $sections = $('section');

  $nav.find('a').on('click', function(e) {
    var target = $(this).attr('href');
    if (target && target !== '') {
      var $target = $(target);
      $.scrollTo($target, 300, {easing: 'swing'});
    }
  });

  function onVisibilityChange() {
    var scrollTop = $window.scrollTop();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var scrollBottom = scrollTop + windowHeight;

    if (scrollTop > $('.lander').innerHeight()) {
      $html.addClass('scrolling');
    } else {
      $html.removeClass('scrolling');
    }

    $sections.each(function(idx) {
      var $section = $(this);
      var title = $section.find('h2').text();

      var rect = $section[0].getBoundingClientRect();

      var pastTop = rect.top <= 0;
      var beforeBottom = rect.bottom >= 0 && rect.bottom < scrollBottom;

      var inViewport = pastTop && beforeBottom;

      if (inViewport && title) {
        $title.text(title);
        $section.addClass('active');
      } else {
        $section.removeClass('active');
      }
    });
  }
  $window.on('DOMContentLoaded load resize scroll', onVisibilityChange);
})();
