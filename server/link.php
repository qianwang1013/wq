<?php
    $server = 'localhost';
	$user = 'root';
	$pass = '';

	$link = mysql_connect($server, $user,$pass); 
	if (!$link) { 
	    die('Could not connect: ' . mysql_error()); 
	};
?>