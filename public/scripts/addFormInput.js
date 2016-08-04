var AwardsTotal;
var CollegesTotal;
var ExtracurricularsTotal;
var VolunteersTotal;
var WorkHistoryTotal;
var IncomeTotal;
var PropertyTotal;
var SiblingTotal;
var ExpenseTotal;

$(document).ready(function() {
	$('.add_input_button').on('click', function(event) {
		event.preventDefault();
		addInput($(this).siblings('.variable_input_container'));
		
	});
	$('.add_textArea_button').on('click', function(event) {
		event.preventDefault();
		addTextArea($(this).siblings('.variable_textArea_container'));
		
	});
	AwardsTotal = 3;
	CollegesTotal = 3;
	ExtracurricularsTotal = 3;
	VolunteersTotal = 3;
	WorkHistoryTotal = 1;
	IncomeTotal = 1;
	PropertyTotal = 1;
	SiblingTotal = 1;
	ExpenseTotal = 1;
});

function addInput(Dom_element) {
	var inputToAppend = "<input type='text' class='form-control' ";
	var id_as_string = Dom_element.attr('id');
	var numberToAppend;
	switch(id_as_string) {
		case "Awards" :
			AwardsTotal ++;
			numberToAppend = AwardsTotal;
			
			break;
		case "Colleges":
			CollegesTotal++;
			numberToAppend = CollegesTotal;
			break;
		case "Extracurriculars":
			ExtracurricularsTotal++;
			numberToAppend = ExtracurricularsTotal;
			break;
		case "Volunteers":
			VolunteersTotal++;
			numberToAppend = VolunteersTotal;
			break;
		case "Income":
			IncomeTotal++;
			numberToAppend = IncomeTotal;
			break;
		case "Property":
			PropertyTotal++;
			numberToAppend = PropertyTotal;
			break;
		case "Sibling":
			SiblingTotal++;
			numberToAppend = SiblingTotal;
			break;
		default:
			alert("Something went wrong");

	}
	inputToAppend += "id='";
	inputToAppend += id_as_string;
	inputToAppend += numberToAppend;
	inputToAppend += "' name='";
	inputToAppend += id_as_string;
	inputToAppend += numberToAppend;
	inputToAppend += "' />";
	Dom_element.append(inputToAppend);
}

function addTextArea(Dom_element) {
	var inputToAppend = "<textArea class='form-control' rows='7' ";
	var id_as_string = Dom_element.attr('id');
	var numberToAppend;
	switch(id_as_string) {
		case "WorkHistory" :
			WorkHistoryTotal ++;
			numberToAppend = WorkHistoryTotal;
			break;
		case "Additional_Expense" :
			ExpenseTotal ++;
			numberToAppend = ExpenseTotal;
			break;
		default:
			alert("Something went wrong" + id_as_string);

	}
	inputToAppend += "id='";
	inputToAppend += id_as_string;
	inputToAppend += numberToAppend;
	inputToAppend += "' name='";
	inputToAppend += id_as_string;
	inputToAppend += numberToAppend;
	inputToAppend += "' />";
	Dom_element.append(inputToAppend);
}