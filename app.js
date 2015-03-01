(function() {
  'use strict';
  var $html = $('html');
  var $window = $(window);
  var $header = $('header');
  var $sections = $('section');

  $sections.each(function(idx) {
    var $sectionTitle = $(this).find('.title a');
    var num = ++idx;
    $sectionTitle.text(num + '. ' + $sectionTitle.text());
    $('nav ol [href="' + $sectionTitle.attr('href') + '"]').prepend('<em>' + num + '</em>');
  });

  var headerHeight = $header.innerHeight();

  var $scrollNav = $header.clone();
  $scrollNav.find('.icons').remove();
  $scrollNav.addClass('scroll-nav');
  $header.find('.bookmark').remove();
  $scrollNav.appendTo('body');
  var scrollNavHeight = $scrollNav.innerHeight();

  var closed = false;
  function closeNav() {
    $scrollNav.css({
      top: -(scrollNavHeight) + 'px'
    });
    closed = true;
  }
  function openNav() {
    $scrollNav.css({
      top: 0
    });
    closed = false;
  }
  closeNav();

  $scrollNav.find('.bookmark').on('click', function(e) {
    e.preventDefault();
    if (closed) {
      openNav();
    } else {
      closeNav();
    }
  });

  $('nav a, .scroll-nav nav a').on('click', function(e) {
    var target = $(this).attr('href');
    if (target && target !== '') {
      closeNav();
      var $target = $(target);
      var top = $target.offset().top - 30;
      $.scrollTo(top, 300, {easing: 'swing'});
    }
  });
  $('.title').on('click', function() {
    $.scrollTo(0, 300, {easing: 'swing'});
  });

  function onVisibilityChange() {
    var scrollTop = $window.scrollTop();
    if (scrollTop > headerHeight) {
      $html.addClass('scrolling');
    } else {
      $html.removeClass('scrolling');
    }
  }
  $window.on('DOMContentReady load resize scroll', onVisibilityChange);
})();
