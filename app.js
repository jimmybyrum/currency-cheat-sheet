$(document).ready(function() {
  'use strict';
  var $html = $('html');
  var $window = $(window);
  var $nav = $('.nav');
  var windowHeight = $window.height();

  var breakPoints = [];
  var setBreakPoints = function() {
    $('.lander').css('min-height', windowHeight);

    $('section').each(function(idx) {
      var thisTop = Math.round($(this).offset().top);
      var height = $(this).innerHeight();
      var thisBottom = Math.round(thisTop + height);

      var $title = $(this).find('h2');
      $title.parents('.row').css('min-height', $title.innerHeight() + 'px');

      breakPoints.push({
        id: idx,
        top: thisTop,
        bottom: thisBottom,
        $element: $(this),
        $title: $title
      });

      // var $breakPoint = $('<div class="break-point"/>');
      // $breakPoint.html(thisTop);
      // $breakPoint.css({
      //   top: thisTop + 'px'
      // });
      // $breakPoint.appendTo('body');

      // var $endPoint = $('<div class="end-point"/>');
      // $endPoint.html(thisBottom);
      // $endPoint.css({
      //   top: thisBottom + 'px'
      // });
      // $endPoint.appendTo('body');
    });
  };
  setTimeout(setBreakPoints, 300);

  var currentSection;
  var onScroll = function() {
    var scrollTop = $window.scrollTop();
    var percent = scrollTop / windowHeight;
    if (percent > .3 && percent < 1) {
      $nav.css('opacity', 1 - percent);
    } else if ($html.hasClass('scrolling')) {
      $nav.css('opacity', 1).removeClass('open');
    }

    breakPoints.forEach(function(section, idx) {
      if (idx === 0) {
        if (section.top < scrollTop) {
          $html.addClass('scrolling');
        } else {
          $html.removeClass('scrolling');
          section.$element.removeClass('active');
          section.$title.removeClass('affix');
          if (!$nav.hasClass('open')) {
            $nav.addClass('open').css('opacity', 0);
          }
        }
      }
      if (section.top < scrollTop) {
        if (currentSection && section.id !== currentSection.id) {
          currentSection.$element.removeClass('active');
          currentSection = section;
        }
        if (!currentSection) {
          currentSection = section;
        }
        currentSection.$element.addClass('active');
      }
    });
  };
  // onScroll = _.throttle(onScroll, 10);

  $window.on('scroll', onScroll);

  $nav.find('a').on('click', function(e) {
    var target = $(this).attr('href');
    if (target && target !== '') {
      var $target = $(target);
      $.scrollTo($target, 300, {easing: 'swing'});
    }
  });
});
