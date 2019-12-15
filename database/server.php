<?php
$oConnection = new mysqli("localhost","root","","db_todolist");

if ($oConnection -> connect_errno) {
	echo "Failed to connect to MySQL: " . $oConnection -> connect_error;
	exit();
}
