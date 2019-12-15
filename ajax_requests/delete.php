<?php
require_once('../database/server.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$sSequence = $_POST['iSequence'];

	$sQuery = "DELETE FROM tbl_todo WHERE id = '$sSequence'";

	if($oConnection->query($sQuery)) {
		$aResult = array('bResult' => true);
	} else {
		$aResult = array('bResult' => false, 'sMsg' => 'There was something wrong');
	}
	
	echo json_encode($aResult);
}