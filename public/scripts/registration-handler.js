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

	var Name = $('#Name').val();
	var Players = $('#Players').val();
	var Phone = $('#areaCode').val() + $('#phoneFirst').val() + $('#phoneSecond').val();
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
}

function validate() {
	var isValid = true;
	var validationDictionary = {};
	validationDictionary["errors"] = [];
	var checkPhone = validatePhone();
	var checkEmail = validateEmail();
	if(!checkPhone && !checkEmail) {
		isValid = false;
		validationDictionary["errors"].push("Please include a valid phone number or email");
	}
	var checkNumberInParty = validateNumberInParty();
	if(!checkNumberInParty) {
		isValid = false;
		validationDictionary["errors"].push("Please include a number between 1 and 9 for your party size");
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
		if(isNaN(value)) {
			isValid = false;
		}
		if(value < 100 || value > 999) {
			isValid = false;
		}
	});

	$('.phoneInput').each(function() {
		var value = parseInt($(this).val());
		if(isNaN(value)) {
			isValid = false;
		}
		if(value < 1000 || value > 9999) {
			isValid = false;
		}
	});
	return isValid;
}

function validateEmail() {
	var isValid = true;
	$('.email_input').each(function() {
		var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
		if(!email_regex.test($(this).val()))
		{
			isValid = false;
		}
	});
    return isValid;
}

function validateNumberInParty() {
	var isValid = true;
	$('.single-digit-input').each(function() {
		var value = parseInt($(this).val());
		if(isNaN(value)) {
			isValid = false;
		}
		if(value < 1 || value > 9) {
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