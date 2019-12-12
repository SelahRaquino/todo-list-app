<?php
require_once('server.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$sQuery = "SELECT * FROM t_todolist";
	$oResult = $conn->query($sQuery);
	
	if ($oResult->num_rows > 0) {
		while ($oRow = $oResult->fetch_assoc()) {
			$aTodo[] = array('sSequence' => $oRow['id'], 'sTodo' => $oRow['todo']);
		}
	}
	echo json_encode($aTodo);
}
