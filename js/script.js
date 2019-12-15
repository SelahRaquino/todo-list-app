$(document).ready(function(){
	displayTodo();

	const EMPTY_ERROR_MSG = 'This field cannot be empty';

	// CREATE TODO FUNCTION
	$('#save_button').on('click', function(e){
		e.preventDefault();
		let sTodo = $('#description_text').val();

		$("#edit_error_msg").addClass('d-none');

		if($.trim(sTodo) !== '') {
			$.ajax({
				url: './ajax_requests/add.php',
				type: 'POST',
				data: {'sTodo': sTodo},
				success: function(oResponse) {
					oResponse = JSON.parse(oResponse);
					const I_SEQUENCE = oResponse['iSequence'];

					if (oResponse['bResult'] === true) {
						let oTodoBox = $('.display_area').first().clone(),
							oCheckbox = oTodoBox.find('.checkbox_todo'),
							oTodoDisplay = oTodoBox.find('.todo_display'),
							oDelBtn = oTodoBox.find('.delete_button');

						oTodoBox.attr('id', 'todo_display_' + I_SEQUENCE);
						oCheckbox.attr('id', I_SEQUENCE);
						oTodoDisplay.attr('id', I_SEQUENCE);
						oDelBtn.attr('id', I_SEQUENCE);
						oTodoDisplay.text(sTodo);
						$('#todo_list').append(oTodoBox);
						oTodoBox.show();

						$('#addTodoModal').modal('hide');
						$('#description_text').val('');
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Something went wrong!',
						})

						$('#addTodoModal').modal('hide');
						$('#description_text').val('');
					}
				}
			});
		} else{
			$('#error_msg').removeClass('d-none');
			$('#error_msg').text(EMPTY_ERROR_MSG);
		}
	});

	// DISPLAY TODO LISTS FUNCTION
	function displayTodo(){
		$.ajax({
			url: './ajax_requests/read.php',
			type: 'POST',
			success: function(oResponse) {
				oResponse = JSON.parse(oResponse);
				for (let i = 0; i < oResponse.length; i++) {
					const S_SEQUENCE = oResponse[i]['sSequence'];
					let	oTodoBox = $('.display_area').first().clone(),
						oCheckbox = oTodoBox.find('.checkbox_todo'),
						oTodoDisplay = oTodoBox.find('.todo_display'),
						oDelBtn = oTodoBox.find('.delete_button');

					oTodoBox.attr('id', 'todo_display_' + S_SEQUENCE);
					oCheckbox.attr('id', S_SEQUENCE);
					oTodoDisplay.attr('id', S_SEQUENCE);

					if(oResponse[i]['bStatus'] === '1') {
						oTodoDisplay.addClass('display-style');
						oCheckbox.prop('checked', true);
					} else {
						oTodoDisplay.removeClass('display-style');
					}

					oDelBtn.attr('id', S_SEQUENCE);	
					oTodoBox.find('.todo_display').text(oResponse[i]['sTodo']);
					$('#todo_list').append(oTodoBox);		
					oTodoBox.show();				
				}
			}
		});
	}

	// MODAL EDIT SHOW FUNCTION
	$(document).on('click', '.todo_display', function(e){
		let oTodoBox = $(e.currentTarget).closest('.display_area'),
		sTodoDisplay = $(oTodoBox).find('.todo_display');

		$('#hidden_todo_sequence').val(sTodoDisplay.attr('id'));
		$('#edit_description_text').val(sTodoDisplay.text());
		$('#editTodoModal').modal('show');
	});

	// EDIT TODO FUNCTION
	$('#edit_save_button').on('click', function(e){
		e.preventDefault();
		let iSequence = $('#hidden_todo_sequence').val(); 
		let sNewTodo = $('#edit_description_text').val();

		$('#edit_error_msg').addClass('d-none');

		if($.trim(sNewTodo) !== '') {
			$.ajax({
				url: './ajax_requests/update.php',
				type: 'POST',
				data: {'iSequence': iSequence,'sNewTodo': sNewTodo},
				success: function(oResponse) {
					oResponse = JSON.parse(oResponse);

					if (oResponse['bResult'] === true) {
						let oTodoBox = $('#todo_display_' + iSequence);
						oTodoBox.find('.todo_display').text(sNewTodo);

						$('#editTodoModal').modal('hide');
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Something went wrong!',
						})

						$('#editTodoModal').modal('hide');
					}
				}
			});
		} else {
			$('#edit_error_msg').removeClass('d-none');
			$('#edit_error_msg').text(EMPTY_ERROR_MSG);
		}
	});

	// DELETE TODO FUNCTION
	$(document).on('click', '.delete_button', function(e){
		let iSequence = e.currentTarget.id;

		$.ajax({
			url: './ajax_requests/delete.php',
			type: 'POST',
			data: {'iSequence': iSequence},
			success: function(oResponse) {
				oResponse = JSON.parse(oResponse);

				if(oResponse['bResult'] === true) {
					let oTodoBox = $('#todo_display_' + iSequence);

					oTodoBox.remove();
				}
			}
		});
	});

	// HIDE ERROR_MESSAGE FUNCTION
	$("#add_button").on('click', function(){
		$('#error_msg').addClass('d-none');
	});

	// CHECKBOX FUNCTION
	$(document).on('change', '.checkbox_todo', function(e){
		let oTodo = e.currentTarget.closest('.display_area'),
		oTodoDisplay = $(oTodo).find('.todo_display'),
		bStatus = $(e.currentTarget).is(":checked"),
		iSequence = e.currentTarget.id;

		$.ajax({
			url: './ajax_requests/status.php',
			type: 'POST',
			data: {'bStatus' : bStatus, 'iSequence' : iSequence},
			success: function(oResponse) {

				if(bStatus === true) {
					oTodoDisplay.addClass('display-style');
				} else {
					oTodoDisplay.removeClass('display-style');
				}
			}
		});

	});
});