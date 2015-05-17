 <?php 
	require('link.php');
	$dbname = 'message';

/*    $password = 'mfarjan1';
    $username = 'admin';*/

	if(mysql_select_db($dbname, $link)){
    	$res = array();
		$query = "SELECT * FROM message";
		$result = mysql_query($query, $link);
		if(mysql_num_rows($result) > 0){
			while($row = mysql_fetch_assoc($result)){
				array_push($res,array('name' => $row["name"],'message' => $row["message"], 'time' => $row["time"] ));
			};
		    echo json_encode($res);
			mysql_close($link);			
		}else{
			mysql_close($link);	
		}
	}else{
		mysql_close($link);	
	}


?>
