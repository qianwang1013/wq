<?php
/*    $server = 'wqian001com.ipagemysql.com';
	$user = 'wqian';
	$pass = 'mfarjan1';*/
   $server = 'localhost';
	$user = 'root';
	$pass = '';
	
	$link = mysql_connect($server, $user,$pass); 
	if (!$link) { 
	    die('Could not connect: ' . mysql_error()); 
	};

	$postdata = file_get_contents('php://input');
	$request = json_decode($postdata);
?>