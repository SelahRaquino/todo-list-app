<?php
require_once('../database/server.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$sQuery = "SELECT * FROM tbl_todo";
	$oResult = $oConnection->query($sQuery);
	
	if ($oResult->num_rows > 0) {
		while ($oRow = $oResult->fetch_assoc()) {
			$aTodo[] = array('sSequence' => $oRow['id'], 'sTodo' => $oRow['todo'] , 'bStatus' => $oRow['status']);
		}
	}
	echo json_encode($aTodo);
}
