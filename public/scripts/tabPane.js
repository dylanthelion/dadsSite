$(document).ready(function() {
	$('.tabSelector').click(function(event) {
		event.preventDefault();
		$('.tabSelector').removeClass('active');
		$('.tab-pane').removeClass('active');
		$(this).addClass('active');
		var name = $(this).attr('data-selector-name');
		var selected = $('div[data-selector-name="' + name + '"]');
		selected.addClass('active');
	});
});	