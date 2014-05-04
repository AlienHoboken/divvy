$(document).ready(function() {

  var host = "http://54.86.63.60:80";
  var socket = io.connect(host);

  socket.on('postmade', function(post) {
	post = JSON.parse(post);
        $('#posts').prepend('<div class="post">' +
          '<div class="row">' +
            '<div class="col-lg-2">' +
              '<img class="avatar" src="http://placehold.it/100x100" />' +
            '</div>' +
            '<div class="col-lg-6">' +
              '<h1>' + post.title + ' <span class="date">' + post.date + '</span></h1>' +
              '<p class="task">"' + post.task + '"</p>' +
              '<p class="poster">Submitted by: <span>' + post.username + '</span></p>' +
            '</div>' +
            '<div class="col-lg-4 bounty">' +
              '<p>' + post.bounty + '</p>' +
              '<p>Points</p>' +
            '</div><!-- end bounty -->' +
          '</div><!-- end row -->' +
        '</div><!-- end post -->');
  });

  $('#new-post-submit').click(function() {
    var newPost = {};
    newPost.bounty = $("#postPoints").val();
    newPost.task = $("#postTask").val();
    newPost.title = $("#postTitle").val();
    newPost.skills = $("#postSkills").val();
    newPost.username = user.username;
    newPost.city = user.location.city;
    newPost.state = user.location.state;
    newPost.zip = user.location.zip;
    socket.emit('newpost', JSON.stringify(newPost));
    $("#postPoints").val("");
    $("#postTask").val("");
    $("#postTitle").val("");
    $("#postSkills").val("");
    $('#new-post').slideToggle();
  });

  // toggle new post form
  $('#new-post-toggle').click(function() {
    $('#new-post').slideToggle({ duration: 750 });
  });

  // toggle sign up form
  $('#sign-up-toggle').click(function() {
    if ($('#sign-in').is(':visible')) {
      $('#sign-in').hide();
      $('#sign-in-toggle').removeClass('selected');
    }

    $('#sign-up').slideToggle({ duration: 750 });
    $(this).toggleClass('selected');
  });

  // toggle sign in form
  $('#sign-in-toggle').click(function() {
    if ($('#sign-up').is(':visible')) {
      $('#sign-up').hide();
      $('#sign-up-toggle').removeClass('selected');
    }

    $('#sign-in').slideToggle({ duration: 750 });
    $(this).toggleClass('selected');
  });

  // change filter button
  $('.filter-group a').click(function() {
    $('.filter-group a').removeClass('selected');
    $(this).addClass('selected');
  });

});
