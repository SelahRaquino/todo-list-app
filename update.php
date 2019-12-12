<?php
require_once('server.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$iSequence = $_POST['iSequence'];
	$sNewTodo = $_POST['sNewTodo'];

	$sQuery = "UPDATE t_todolist SET todo = '$sNewTodo' WHERE id = '$iSequence'";

	if($conn->query($sQuery)) {
		$aResult = array('bResult' => true, 'todo' => $sNewTodo);
	} else {
		$aResult = array('bResult' => false, 'sMsg' => 'There was something wrong');
	}
	
	echo json_encode($aResult);
}
