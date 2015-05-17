 <?php 
 	require('link.php');
	$dbname = 'event';
	

    $headline = $request->headline;
    $notes = $request->notes;
    $content = $request->content;
    $path = $request->path;
/*    $headline = 'test';
    $notes = 'test';
    $content = 'test';*/
    if($request){
	 	if(mysql_select_db($dbname, $link)){
			$query = "INSERT INTO event (headline,notes,content,path) VALUES ('$headline','$notes','$content', '$path')";
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
    }
    else{
    	echo json_encode('No json object input');
    }



?>

