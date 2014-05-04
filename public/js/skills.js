$(document).ready(function() {

  var skills = ['Automotive', 'Music', 'Technology', 'Design', 'Public Speaking', 'Weaponship',
   'Carpentry', 'Fashion', 'Dancing', 'Drinking'];

  $.each(skills, function(index, value) {

    var checked = '';
    if (user_skills.length !== 0 && user_skills.indexOf(value) !== -1) {
      checked = ' checked="checked" ';
    }

    $('#skills').append('<option ' + checked + ' value="' + value + '" name="skills"> ' + value + '</option>');
  });

});