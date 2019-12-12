<?php
require_once('server.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$sSequence = $_POST['iSequence'];

	$sQuery = "DELETE FROM t_todolist WHERE id = '$sSequence'";

	if($conn->query($sQuery)) {
		$aResult = array('bResult' => true);
	} else {
		$aResult = array('bResult' => false, 'sMsg' => 'There was something wrong');
	}
	
	echo json_encode($aResult);
}