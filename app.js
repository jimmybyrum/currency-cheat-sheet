(function() {
  'use strict';
  var $html = $('html');
  var $window = $(window);
  var $header = $('header');
  var $sections = $('section');

  var navTemplate = _.template([
    '<ol class="list-unstyled col-sm-<%= colsSmall || 3 %> col-xs-<%= colsXSmall || 12 %>">',
    '<% for (var i = 0; i < sections.length; i++) { link = sections[i]; %>',
    '<li>',
    '<a target="_self" href="<%= link.href %>"><em><%= link.num %></em><span><%= link.text %></span></a>',
    '<%= link.sources %>',
    '</li>',
    '<% } %>',
    '</ol>'
  ].join(''));

  var sourceTemplate = _.template([
    '<span><ul class="list-unstyled">',
    '<% for (var i = 0; i < links.length; i++) { link = links[i]; %>',
    '<li><a href="<%= link.href %>"><span><%= link.text %></span></a></li>',
    '<% } %>',
    '</ul></span>'
  ].join(''));

  var sections = [];
  var sources = [];
  $sections.each(function(idx) {
    var num = ++idx;
    var $sectionTitle = $(this).find('.title a');
    var sectionHref = $sectionTitle.attr('href');
    var navText = $sectionTitle.attr('data-text');
    var text = $sectionTitle.text();

    $sectionTitle.text(num + '. ' + text);

    var links = [];
    $(this).find('.col-sm-4 a').each(function() {
      var sourceHref = $(this).attr('href');
      var sourceHrefParts = sourceHref.replace(/https?:\/\//, '');
      sourceHrefParts = sourceHrefParts.replace('www.', '');
      var linkText = sourceHrefParts;
      var sourceHrefParts = sourceHrefParts.split('/');
      if (sourceHref.match(/wikipedia/)) {
        linkText = 'Wikipedia: ' + sourceHrefParts[sourceHrefParts.length - 1];
      }
      links.push({
        href: sourceHref,
        text: linkText
      });
    });

    var sectionData = {
      href: sectionHref,
      num: num,
      text: navText || text
    };
    sections.push(sectionData);

    var sourceHtml = $(sourceTemplate({
      links: links
    }));
    sources.push(_.extend({}, sectionData, {
      sources: sourceHtml.html()
    }));

    if (num % 4 === 0) {
      var $navList = $(navTemplate({
        colsSmall: 3,
        colsXSmall: 6,
        sections: sections
      }));
      $navList.appendTo('.nav-list');
      sections = [];
    }

    if (num % 8 === 0) {
      var $sourceList = $(navTemplate({
        colsSmall: 6,
        colsXSmall: 12,
        sections: sources
      }));
      $sourceList.appendTo('.sources .content');
      sources = [];
    }
  });

  var $sources = $('.sources');
  $sources.find('.content').css('height', $('.sources .content').innerHeight());
  $sources.find('.toggle').on('click', function() {
    $sources.toggleClass('hiding');
  });
  $sources.addClass('hiding');

  var headerHeight = $header.innerHeight();

  var $scrollNav = $header.clone();
  $scrollNav.find('.icons').remove();
  $scrollNav.addClass('scroll-nav');
  $header.find('.bookmark').remove();
  $scrollNav.appendTo('body');
  var scrollNavHeight = $scrollNav.innerHeight();

  function closeNav() {
    $scrollNav.css({
      top: -(scrollNavHeight) + 'px'
    });
    $html.removeClass('open');
  }
  function openNav() {
    $scrollNav.css({
      top: 0
    });
    $html.addClass('open');
  }
  closeNav();

  $scrollNav.find('.bookmark a').on('click', function(e) {
    e.preventDefault();
    if (!$html.hasClass('open')) {
      openNav();
    } else {
      closeNav();
    }
  });

  function setLocation(url) {
    try {
      history.pushState({}, document.title, url);
    } catch(e) {
      console.warn(e);
    }
  }

  $('.social a').on('click', function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    var title = $(this).attr('title');
    var config = {
      width: 550,
      height: 400,
      top: 100,
      left: 100
    };
    try {
      config.left = (screen.availWidth / 2) - (config.width / 2);
      config.top = (screen.availHeight / 2) - (config.height / 2);
    } catch(e) {}
    var conf = [];
    _.each(config, function(value, key) {
      conf.push(key + '=' + value);
    });
    window.open(href, title, conf.join(','));
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
  $('.top .title').on('click', function() {
    $.scrollTo(0, 300, {easing: 'swing'});
    setLocation('/');
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
