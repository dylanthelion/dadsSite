$(document).ready(function(event) {
	console.log('Form working');
	$('#btnSubmit').click(function(event) {
		event.preventDefault();
		var isValid = true;
		// Validation
		if (isValid) {
			writeInput();
		}
	});
});

function writeInput() {

	var Name = $('#Name').val();
	var Players = $('#Players').val();
	var Phone = $('#Phone').val();
	var Email = $('#Email').val();

	$.ajax({
	  url : '/createGolfRegistrant/',
	  type: 'POST',
	  dataType : "json",
	  data: {
	  	name: Name,
	  	teamSize: Players,
	  	email: Email,
	  	phone: Phone
	  },
	  success: function(data) {
         alert('success');
      },
      error: function() {
         alert('error');
      }    
	});
	console.log(outputSting);
}