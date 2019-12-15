<?php 
include './database/server.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>todo-list-app</title>
	<!-- Meta Keywords -->
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
	<!-- CSS Style -->
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<!-- icons -->
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
</head>
<body>
	<!-- main content -->
	<div class="container">
		<div class="card my-3">
			<div class="card-header"><h2 class="title py-2 text-center">To Do lists</h2></div>
			<div class="card-body text-secondary">
				<div id="todo_list" class="container">
					<div class="row">
						<div class="col-12">
							<button id="add_button" type="button" class="btn btn-add btn-secondary float-right my-2 mr-3" data-toggle="modal" data-target="#addTodoModal"><i class="fa fa-plus"></i></button>
						</div>
					</div>
					<div class="display_area row box-todo mx-auto my-2 p-3 w-100" style="display: none">
						<div class="col-2">
							<div class="custom-control custom-checkbox">
								<input class="checkbox_todo" type="checkbox">
							</div>
						</div>
						<div class="col-8">
							<a href="#!" class="todo_display display-text"></a>
						</div>
						<div class="col-2">
							<button class="delete_button btn btn-danger float-right"><i class="fas fa-trash-alt"></i></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal for ADD todo -->
	<div id="addTodoModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="todoModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 id="todoModalLabel" class="modal-title">Add todo</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-group">
							<label for="edit_description_text" class="col-form-label">Description:</label><br>
							<span id="error_msg" class="text-danger"></span>
							<textarea id="description_text" class="form-control"></textarea>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					<button id="save_button" type="button" class="btn btn-primary">Save</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal for EDIT todo -->
	<div id="editTodoModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="todoModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 id="todoModalLabel" class="modal-title">Edit todo</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form>
						<input type="hidden" id="hidden_todo_sequence">
						<div class="form-group">
							<label for="edit_description_text" class="col-form-label">Description:</label><br>
							<span id="edit_error_msg" class="text-danger"></span>
							<textarea id="edit_description_text" class="form-control"></textarea>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					<button id="edit_save_button" type="button" class="btn btn-primary">Save</button>
				</div>
			</div>
		</div>
	</div>

	<!-- JS -->
	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	<script src="js/script.js"></script>
</body>
</html>