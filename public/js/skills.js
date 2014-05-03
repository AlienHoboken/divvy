$(document).ready(function() {

  var skills = ['Automotive', 'Music', 'Technology', 'Design', 'Public Speaking', 'Weaponship',
   'Carpentry', 'Fashion', 'Dancing', 'Drinking'];

  $.each(skills, function(index, value) {

    $('#skills').append('<div class="checkbox"><input type="checkbox" value="' + value + '" name="skills" /> ' + value + '</div>');

  });

});