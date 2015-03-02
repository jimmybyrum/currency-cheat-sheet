(function() {
  'use strict';
  var $html = $('html');
  var $window = $(window);
  var $header = $('header');
  var $sections = $('section');

  var $navList = $('<ol class="list-unstyled col-sm-3 col-xs-6" />');
  $sections.each(function(idx) {
    var $sectionTitle = $(this).find('.title a');
    var navText = $sectionTitle.attr('data-text');
    var text = $sectionTitle.text();
    var num = ++idx;
    if (text !== 'About Us') {
      $sectionTitle.text(num + '. ' + text);
      var $navItem = $('<li />');
      var $navItemLink = $('<a />');
      $navItemLink.attr({
        target: '_self',
        href: $sectionTitle.attr('href')
      });
      var $navItemNumber = $('<em />');
      $navItemNumber.text(num);
      var $navItemText = $('<span />');
      $navItemText.text(navText || text);

      $navItemNumber.appendTo($navItemLink);
      $navItemText.appendTo($navItemLink);
      $navItemLink.appendTo($navItem);
      $navItem.appendTo($navList);
      if (num % 4 === 0) {
        $navList.appendTo('.nav-list');
        $navList = $('<ol class="list-unstyled col-sm-3 col-xs-6" start="' + (num + 1) + '" />');
      }
      // $('nav ol [href="' + $sectionTitle.attr('href') + '"]').prepend('<em>' + num + '</em>');
    }
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

  $scrollNav.find('.bookmark a').on('click', function(e) {
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
      closeNav();
    }
  }
  $window.on('DOMContentReady load resize scroll', onVisibilityChange);
})();
