(function() {
  'use strict';
  var $html = $('html');
  var $window = $(window);
  var $header = $('header');
  var $icons = $('.icons');
  var $title = $('header .title');
  var $nav = $('nav');
  var $sections = $('section');

  var iconHeight = $icons.innerHeight();
  var navHeight = $nav.innerHeight();
  var openHeight = $header.innerHeight();

  $nav.css('height', navHeight);
  $header.css('position', 'fixed');
  $('body').css('padding-top', openHeight + 'px');

  function openNav() {
    $nav.css('height', navHeight);
  }
  function closeNav() {
    $nav.css('height', 0);
  }

  $('.bookmark').on('click', function(e) {
    e.preventDefault();
    if (parseInt($nav.css('height'), 10) === 0) {
      openNav();
    } else {
      closeNav();
    }
  });

  $nav.find('a').on('click', function(e) {
    var target = $(this).attr('href');
    if (target && target !== '') {
      closeNav();
      var $target = $(target);
      var top = $target.offset().top - 60;
      $.scrollTo(top, 300, {easing: 'swing'});
    }
  });

  $sections.each(function(idx) {
    var $sectionTitle = $(this).find('.title a');
    $sectionTitle.text((++idx) + '. ' + $sectionTitle.text());
  });

  function onVisibilityChange() {
    var scrollTop = $window.scrollTop();
    if (scrollTop > 50) {
      $html.addClass('scrolling');
    } else {
      $html.removeClass('scrolling');
    }
    if (scrollTop < navHeight) {
      var newNavHeight = navHeight - scrollTop;
      $nav.css('height', newNavHeight);
      var newIconHeight = iconHeight - scrollTop;
      if (newIconHeight >= 0) {
        $icons.css('height', newIconHeight);
      }
      var fontSize = 80 - (scrollTop / 4);
      if (fontSize >= 25) {
        $title.css('font-size', fontSize + 'px');
        $html.removeClass('mini');
      } else if (fontSize < 20) {
        $html.addClass('mini');
      }
    } else {
      $nav.css('height', 0);
      $icons.css('height', 0);
      $title.css('font-size', '25px');
      $html.addClass('mini');
    }
  }
  $window.on('resize scroll', onVisibilityChange);
})();
