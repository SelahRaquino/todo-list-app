<?php
require_once('server.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$sTodo = $_POST['sTodo'];
	
	$sQuery = "INSERT INTO t_todolist (todo) VALUES ('$sTodo')";

	if($conn->query($sQuery)) {
		$iSequence = $conn->insert_id;
		$aResult = array('bResult' => true, 'iSequence' => $iSequence);
	} else {
		$aResult = array('bResult' => false, 'sMsg' => 'There was something wrong');
	}

	echo json_encode($aResult);
}
