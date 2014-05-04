$(document).ready(function() {

  $('#new-post-toggle').click(function() {
    $('#new-post').slideToggle({ duration: 750 });
  });

  $('#sign-up-toggle').click(function() {
    if ($('#sign-in').is(':visible')) {
      $('#sign-in').hide();
      $('#sign-in-toggle').removeClass('selected');
    }

    $('#sign-up').slideToggle({ duration: 750 });
    $(this).toggleClass('selected');
  });

  $('#sign-in-toggle').click(function() {
    if ($('#sign-up').is(':visible')) {
      $('#sign-up').hide();
      $('#sign-up-toggle').removeClass('selected');
    }

    $('#sign-in').slideToggle({ duration: 750 });
    $(this).toggleClass('selected');
  });

  $('.filter-group a').click(function() {
    $('.filter-group a').removeClass('selected');
    $(this).addClass('selected');
  });

});