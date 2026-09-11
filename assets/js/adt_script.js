$(function () {
  // Smooth scrolling
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this).attr('href');
    if (target !== '#' && $(target).length) {
      e.preventDefault();
      $('html, body').animate({scrollTop: $(target).offset().top - 70}, 500);
    }
  });

  // Review carousel
  let index = 0;

  function visibleSlides() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1000) return 2;
    return 3;
  }

  function moveSlider() {
    const count = $('.review').length;
    const visible = visibleSlides();
    const max = Math.max(0, count - visible);
    index = Math.min(index, max);
    const width = $('.review').outerWidth(true);
    $('.review-track').css('transform', 'translateX(-' + (index * width) + 'px)');
  }

  $('.next').on('click', function () {
    if (index < $('.review').length - visibleSlides()) index++;
    moveSlider();
  });

  $('.prev').on('click', function () {
    if (index > 0) index--;
    moveSlider();
  });

  $(window).on('resize', moveSlider);
  moveSlider();

  // Basic form validation
  $('#quoteForm').on('submit', function (e) {
    e.preventDefault();

    let valid = true;
    const form = $(this);

    form.find('input').each(function () {
      $(this).css('border-color', '#d5dce5');
    });

    ['firstName', 'lastName', 'phone', 'email', 'zipcode'].forEach(function (name) {
      const field = form.find('[name="' + name + '"]');
      if (!$.trim(field.val())) {
        field.css('border-color', '#d92d20');
        valid = false;
      }
    });

    const email = form.find('[name="email"]').val();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.find('[name="email"]').css('border-color', '#d92d20');
      valid = false;
    }

    const zip = form.find('[name="zipcode"]').val();
    if (zip && !/^\d{5}$/.test(zip)) {
      form.find('[name="zipcode"]').css('border-color', '#d92d20');
      valid = false;
    }

    if (!valid) {
      $('.form-message').text('Please complete the required fields correctly.').show();
      return;
    }

    $('.form-message').text('Thank you. Your quote request has been submitted.').css({
      display: 'block',
      background: '#ecfdf3',
      color: '#027a48'
    });

    form[0].reset();
  });

  // Phone input formatting
  $('[name="phone"]').on('input', function () {
    let value = $(this).val().replace(/\D/g, '').slice(0, 10);
    if (value.length > 6) {
      value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6);
    } else if (value.length > 3) {
      value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
    }
    $(this).val(value);
  });

  // ZIP code
  $('[name="zipcode"]').on('input', function () {
    $(this).val($(this).val().replace(/\D/g, '').slice(0, 5));
  });
});
