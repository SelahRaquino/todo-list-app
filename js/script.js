$(document).ready(function(){
	displayTodo();

	const EMPTY_ERROR_MSG = 'This field cannot be empty';

	// DISPLAY TODO LISTS FUNCTION
	function displayTodo(){
		$.ajax({
			url: 'read.php',
			type: 'POST',
			success: function(oResponse) {
				oResponse = JSON.parse(oResponse);

				for (let i = 0; i < oResponse.length; i++) {
					let oTodoBox = $('.display_area').first().clone();

					oTodoBox.find('.todo_display').text(oResponse[i]['sTodo']);
					$('#todo_list').append(oTodoBox);		
					oTodoBox.show();				
				}
			}, 
			error: function(oResponse) {
				console.log(oResponse);
			}
		});
	}

	// HIDE ERROR_MESSAGE FUNCTION
	$("#add_button").on('click', function(){
		$('#error_msg').addClass('d-none');
	});

	// IN MODAL ADD SAVE BUTTON FUNCTION
	$('#save_button').on('click', function(e){
		e.preventDefault();
		let sTodo = $('#description_text').val();

		$("#edit_error_msg").addClass('d-none');

		if($.trim(sTodo) !== '') {
			$.ajax({
				url: 'add.php',
				type: 'POST',
				data: {'sTodo': sTodo},
				success: function(oResponse) {
					oResponse = JSON.parse(oResponse);
					const S_SEQUENCE = oResponse['iSequence'];

					if (oResponse['bResult'] === true) {
						let oTodoBox = $('.display_area').first().clone();
						let oTodoDisplay = oTodoBox.find('.todo_display');
						let oDelBtn = oTodoBox.find('.delete_button');

						oTodoBox.attr('id', 'todo_display_' + S_SEQUENCE);
						oTodoDisplay.attr('id', S_SEQUENCE);
						oDelBtn.attr('id', S_SEQUENCE);
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
				},
				error: function(oResponse){
					console.log(oResponse);
				}
			});
		} else{
			$('#error_msg').removeClass('d-none');
			$('#error_msg').text(EMPTY_ERROR_MSG);
		}
	});

	// CHECKBOX FUNCTION
	$(document).on('change', '#checkbox_todo', function(e){
		let oTodo = e.currentTarget.closest('.display_area'),
		sTodoDisplay = $(oTodo).find('.todo_display');

		if($(e.currentTarget).is(":checked") === true) {
			sTodoDisplay.addClass('display-style');
		} else {
			sTodoDisplay.removeClass('display-style');
		}
	});

	// DELETE BUTTON FUNCTION
	$(document).on('click', '.delete_button', function(e){
		let iSequence = e.currentTarget.id;

		$.ajax({
			url: 'delete.php',
			type: 'POST',
			data: {'iSequence': iSequence},
			success: function(oResponse) {
				oResponse = JSON.parse(oResponse);

				if(oResponse['bResult'] === true) {
					let oTodoBox = $('#todo_display_' + iSequence);

					oTodoBox.remove();
				} else {
					// 
				}
			},
			error: function(oResponse) {
				console.log(oResponse);
			}
		});
	});

	// MODAL EDIT SHOW FUNCTION
	$(document).on('click', '.todo_display', function(e){
		let oTodoBox = $(e.currentTarget).closest('.display_area'),
		sTodoDisplay = $(oTodoBox).find('.todo_display');

		$('#hidden_todo_sequence').val(sTodoDisplay.attr('id'));
		$('#edit_description_text').val(sTodoDisplay.text());
		$('#editTodoModal').modal('show');
	});

	// IN MODAL EDIT SAVE BUTTON FUNCTION
	$('#edit_save_button').on('click', function(e){
		e.preventDefault();
		let iSequence = $('#hidden_todo_sequence').val(); 
		let sNewTodo = $('#edit_description_text').val();

		$('#edit_error_msg').addClass('d-none');

		if($.trim(sNewTodo) !== '') {
			$.ajax({
				url: 'update.php',
				type: 'POST',
				data: {'iSequence': iSequence,'sNewTodo': sNewTodo},
				success: function(oResponse) {
					oResponse = JSON.parse(oResponse);

					if (oResponse['bResult'] === true) {
						let oTodoBox = $('#todo_display_' + iSequence);
						console.log(oTodoBox);
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
				},
				error: function(oResponse){
					console.log(oResponse);
				}
			});
		} else {
			$('#edit_error_msg').removeClass('d-none');
			$('#edit_error_msg').text(EMPTY_ERROR_MSG);
		}
	});

});