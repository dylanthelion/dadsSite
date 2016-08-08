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
	alert('checking');
	var check = validate();
	if(!check["valid"]) {
		var errorString = "";
		for(var i = 0; i < check["errors"].length; i++) {
			errorString += check["errors"][i];
			errorString += "\n";
		}
		alert(errorString);
		return;
	}

	var outputString = "";
	var date = Date.now();
	var file = $('#name').val();
	file += "_scholarship_";
	file += date.toString();
	file += ".txt";
	//console.log("write input");
	$('input').each(function() {
		if(! $(this).val() != '') {
			if(! $(this).hasClass('partial_input_after')) {
				outputString += $(this).attr('name');
				outputString += ": ";
			}
			
			outputString += $(this).val();
			if(! $(this).hasClass('partial_input_before')) {
				outputString += "\n";
			}
		}
	});

	$('select').each(function() {
		if(! $(this).val() != '') {
			if(! $(this).hasClass('partial_input_after')) {
				outputString += $(this).attr('name');
				outputString += ": ";
			}
			outputString += $(this).val();
			if(! $(this).hasClass('partial_input_before')) {
				outputString += "\n";
			}
		}
	});

	$('textarea').each(function() {
		if(! $(this).val() != '') {
			if(! $(this).hasClass('partial_input_after')) {
				outputString += $(this).attr('name');
				outputString += ": ";
			}
			outputString += $(this).val();
			if(! $(this).hasClass('partial_input_before')) {
				outputString += "\n";
			}
		}
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
	console.log(outputString);
}

function validate() {
	var isValid = true;
	var validationDictionary = {};
	validationDictionary["errors"] = [];
	var checkPhone = validatePhone();
	var checkEmail = validateEmail();
	if(!checkPhone || !checkEmail) {
		isValid = false;
		validationDictionary["errors"].push("Please include valid phone numbers and emails");
	}

	var checkDoubles = validateDoubles();
	if(!checkDoubles) {
		isValid = false;
		validationDictionary["errors"].push("Please include a valid GPA, ACT scores");
	}

	var checkInts = validateInts();
	if(!checkInts) {
		isValid = false;
		validationDictionary["errors"].push("Please include valid SAT scores and numbers (like sibling in HS)");
	}

	var checkRequired = validateRequired();
	if(!checkRequired) {
		isValid = false;
		validationDictionary["errors"].push("Please fill out all required fields");
	}

	validationDictionary["valid"] = isValid;
	return validationDictionary;
}

function validatePhone() {
	var isValid = true;
	$('.areaCodeInput').each(function() {
		var value = parseInt($(this).val());
		if(isNaN(value) && $(this).val() != '') {
			isValid = false;
		}
		if((value < 100 || value > 999) && $(this).val() != '') {
			isValid = false;
		}
	});

	$('.phoneInput').each(function() {
		var value = parseInt($(this).val());
		if(isNaN(value) && $(this).val() != '') {
			isValid = false;
		}
		if((value < 1000 || value > 9999) && $(this).val() != '') {
			isValid = false;
		}
	});
	return isValid;
}

function validateEmail() {
	var isValid = true;
	$('.email_input').each(function() {
		var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
		if(!email_regex.test($(this).val())  && $(this).val() != '')
		{
			isValid = false;
		}
	});
    return isValid;
}

function validateDoubles() {
	var isValid = true;
	$('.double_input').each(function() {
		var value = parseFloat($(this).val());
		if(isNaN(value) && $(this).val() != '') {
			alert("invalid number");
			isValid = false;
		}
	});
	return isValid;
}

function validateInts() {
	var isValid = true;
	$('.int_input').each(function() {
		var value = parseInt($(this).val());
		if(isNaN(value) && $(this).val() != '') {
			alert("invalid number");
			isValid = false;
		}
	});
	return isValid;
}

function validateRequired() {
	var isValid = true;
	$('.required_input').each(function() {
		if($(this).val() == '') {
			isValid = false;
		}
	});
	return isValid;
}