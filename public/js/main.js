$(document).ready(function() {

  $('#new-post-toggle').click(function() {
    $('#new-post').slideToggle({ duration: 750 });
  });

  $('#sign-up-toggle').click(function() {
    if ($('#sign-in').is(':visible')) {
      $('#sign-in').hide();
    }
    $('#sign-up').slideToggle({ duration: 750 });
  });

  $('#sign-in-toggle').click(function() {
    if ($('#sign-up').is(':visible')) {
      $('#sign-up').hide();
    }
    $('#sign-in').slideToggle({ duration: 750 });
  });

  $.get('/account', { user: 1 }, function(data) {
    console.log(data);
  });

  $.get('/tranding-user', { user: 1 }, function(data) {
    console.log(data);
  });

  $.get('/trending-local', { user: 1 }, function(data) {
    console.log(data);
  });

  $.get('/trending-snippet', { user: 1 }, function(data) {
    console.log(data);
  });

});