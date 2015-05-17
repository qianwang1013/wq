 <?php 
 	require('link.php');
	$dbname = 'message';
	

    $name = $request->name;
    $message = $request->message;

/*    $headline = 'test';
    $notes = 'test';
    $content = 'test';*/

	if(mysql_select_db($dbname, $link)){
		$res = array('ifExist' => true);
		$query = "INSERT INTO message (name,message) VALUES ('$name','$message')";
		$result = mysql_query($query, $link);
		if($result){
			$res = 'successfully created';
		    echo json_encode($result);		
			mysql_close($link);
		}else{
			die('Error: ' . mysql_error());
			mysql_close($link);			
		}
	}else{
		die('Error: ' . mysql_error());
		mysql_close($link);	
	}


?>

