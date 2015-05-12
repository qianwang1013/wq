 <?php 
    $server = 'localhost';
	$user = 'root';
	$pass = '';
	$dbname = 'event';

	$link = mysql_connect($server, $user,$pass); 
	if (!$link) { 
	    die('Could not connect: ' . mysql_error()); 
	} 
	
/*    $password = 'mfarjan1';
    $username = 'admin';*/

	if(mysql_select_db($dbname, $link)){
    	$res = array();
		$query = "SELECT * FROM event";
		$result = mysql_query($query, $link);
		if(mysql_num_rows($result) > 0){
			while($row = mysql_fetch_assoc($result)){
				array_push($res,array('headline' => $row["headline"],'notes' => $row["notes"], 'content' => $row["content"], 'time' => $row["time"]) );
			}
		    echo json_encode($res);
			mysql_close($link);			
		}else{
			mysql_close($link);	
		}
	}else{
		mysql_close($link);	
	}


?>
