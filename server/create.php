 <?php 
 	require_once('link.php');
	$dbname = 'event';
	
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
    $headline = $request->headline;
    $notes = $request->notes;
    $content = $request->content;
/*    $headline = 'test';
    $notes = 'test';
    $content = 'test';*/

	if(mysql_select_db($dbname, $link)){
		$res = array('ifExist' => true);
		$query = "INSERT INTO event (headline,notes,content) VALUES ('$headline','$notes','$content')";
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

