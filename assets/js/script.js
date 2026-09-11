/* =========================================================
   HomeSafeAlarm — interactions (jQuery)
   Sections:
     1. Mobile menu toggle
     2. Dropdown menus (desktop hover / mobile tap)
     3. Smooth scroll + close mobile menu on nav click
     4. FAQ accordion
     5. Sticky header shadow + back-to-top button
   ========================================================= */
$(function () {

  /* ---------- 1. Mobile menu toggle ---------- */
  var $menuToggle = $('#menuToggle');
  var $mainNav    = $('#mainNav');
  var $html = $('html')

  $menuToggle.on('click', function () {
    var isOpen = $mainNav.toggleClass('open').hasClass('open');
    isOpen ? $html.addClass('overflowYhidden'):$html.removeClass('overflowYhidden');
    $(this).attr('aria-expanded', isOpen);
  });

  /* ---------- 2. Dropdown menus ---------- */
  var isMobile = function () { return window.innerWidth <= 820; };

  $('.dropdown-toggle').on('click', function (e) {
    e.preventDefault();
    var $item = $(this).closest('.has-dropdown');
    var willOpen = !$item.hasClass('open');

    // close any sibling dropdowns first
    $('.has-dropdown').not($item).removeClass('open')
      .find('.dropdown-toggle').attr('aria-expanded', false);

    $item.toggleClass('open', willOpen);
    $(this).attr('aria-expanded', willOpen);
  });

  // desktop: open dropdown on hover too
  $('.has-dropdown').on('mouseenter', function () {
    if (!isMobile()) {
      $(this).addClass('open').find('.dropdown-toggle').attr('aria-expanded', true);
    }
  }).on('mouseleave', function () {
    if (!isMobile()) {
      $(this).removeClass('open').find('.dropdown-toggle').attr('aria-expanded', false);
    }
  });

  // close dropdowns when clicking outside
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.has-dropdown').length) {
      $('.has-dropdown').removeClass('open').find('.dropdown-toggle').attr('aria-expanded', false);
    }
  });

  /* ---------- 3. Smooth scroll + close mobile menu ---------- */
  $('a[href^="#"]').on('click', function (e) {
    var targetId = $(this).attr('href');
    if (targetId.length > 1 && $(targetId).length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $(targetId).offset().top - 70 // offset for sticky header
      }, 450);
    }
    // close mobile nav + any open dropdown after navigating
    $mainNav.removeClass('open');
    $menuToggle.attr('aria-expanded', false);
    $('.has-dropdown').removeClass('open').find('.dropdown-toggle').attr('aria-expanded', false);
  });

  /* ---------- 4. FAQ accordion ---------- */
  $('.accordion-trigger').on('click', function () {
    var $trigger = $(this);
    var $panel   = $trigger.next('.accordion-panel');
    var isOpen   = $trigger.attr('aria-expanded') === 'true';

    // close other open items (single-open accordion)
    $('.accordion-trigger').not($trigger).attr('aria-expanded', false)
      .next('.accordion-panel').css('max-height', 0);

    if (isOpen) {
      $trigger.attr('aria-expanded', false);
      $panel.css('max-height', 0);
    } else {
      $trigger.attr('aria-expanded', true);
      $panel.css('max-height', $panel[0].scrollHeight + 'px');
    }
  });

  /* ---------- 5. Sticky header shadow + back-to-top ---------- */
  var $header = $('#siteHeader');
  var $backToTop = $('#backToTop');

  $(window).on('scroll', function () {
    var scrolled = $(window).scrollTop() > 10;
    $header.toggleClass('scrolled', scrolled);
    $backToTop.toggleClass('visible', $(window).scrollTop() > 500);
  });

  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 450);
  });

  /* ---------- 6. Quote form (provider landing pages) ---------- */
  // No backend is wired up here — this only validates and shows a
  // confirmation message inline. Replace with a real submit handler
  // (e.g. $.ajax / fetch to your lead endpoint) when ready to go live.
  $('#quoteForm').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $note = $form.find('.form-note');

    var valid = this.checkValidity ? this.checkValidity() : true;
    if (!valid) {
      this.reportValidity && this.reportValidity();
      return;
    }

    $note
      .removeClass()
      .addClass('form-note success')
      .text('Thanks! A security advisor will call you shortly, or call (844) 781-3344 now.');

    $form[0].reset();
  });

});
