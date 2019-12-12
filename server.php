<?php
$conn = new mysqli("localhost","root","","todolist_crud");

if ($conn -> connect_errno) {
	echo "Failed to connect to MySQL: " . $conn -> connect_error;
	exit();
}
