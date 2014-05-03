$(document).ready(function() {

  $('#new-post-toggle').click(function() {
    $('#new-post').toggle({ duration: 750 });
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