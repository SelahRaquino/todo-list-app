<?php
require_once('../database/server.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$sTodo = $_POST['sTodo'];
	
	$sQuery = "INSERT INTO tbl_todo (todo) VALUES ('$sTodo')";

	if($oConnection->query($sQuery)) {
		$iSequence = $oConnection->insert_id;
		$aResult = array('bResult' => true, 'iSequence' => $iSequence);
	} else {
		$aResult = array('bResult' => false, 'sMsg' => 'There was something wrong');
	}

	echo json_encode($aResult);
}
