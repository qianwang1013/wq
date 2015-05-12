<?php
    $server = 'localhost';
	$user = 'root';
	$pass = '';
	$dbname = 'event';

	$link = mysql_connect($server, $user,$pass); 
	if (!$link) { 
	    die('Could not connect: ' . mysql_error()); 
	};
?>