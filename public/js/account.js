$(document).ready(function() {

  var skills = ['Automotive', 'Music', 'Technology', 'Design', 'Public Speaking', 'Weaponship',
   'Carpentry', 'Fashion', 'Dancing', 'Drinking'];

  $.each(skills, function(index, value) {

    var checked = '';
    if (user_skills.length !== 0 && user_skills.indexOf(value) !== -1) {
      checked = ' checked="checked" ';
    }

    $('#postSkills').append('<option ' + checked + ' value="' + value + '" name="skills"> ' + value + '</option>');

    if (user_interests.length !== 0 && user_interests.indexOf(value) !== -1) {
      checked = ' checked="checked" ';
    }

    $('#postInterests').append('<option ' + checked + ' value="' + value + '" name="skills"> ' + value + '</option>');
  });

});