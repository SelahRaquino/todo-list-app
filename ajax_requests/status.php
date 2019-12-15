<?php
require_once('../database/server.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$sStatus = $_POST['bStatus'] === 'true' ? true: false;
	$iStatus = (int)$sStatus;
	$sSequence = $_POST['iSequence'];

	$sQuery = "UPDATE tbl_todo SET status = '$iStatus' WHERE id = '$sSequence'";
	$oResult = $oConnection->query($sQuery);
	
	echo json_encode($oResult);
}
