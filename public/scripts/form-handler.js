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

	var outputString = "";
	var date = Date.now();
	var file = $('#name').val();
	file += "_scholarship_";
	file += date.toString();
	file += ".txt";
	//console.log("write input");
	$('input').each(function() {
		console.log("One");
		outputString += $(this).attr('name');
		outputString += ": ";
		outputString += $(this).val();
		outputString += "\n";
	});

	$('select').each(function() {
		console.log("One");
		outputString += $(this).attr('name');
		outputString += ": ";
		outputString += $(this).val();
		outputString += "\n";
	});

	$('textarea').each(function() {
		console.log("One");
		outputString += $(this).attr('name');
		outputString += ": ";
		outputString += $(this).val();
		outputString += "\n";
	});


	$.ajax({
	  url : '/sendScholarshipForm/',
	  type: 'POST',
	  dataType : "json",
	  data: {
	  	message: outputString,
	  	filename: file
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