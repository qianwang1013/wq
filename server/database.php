 <?php 

	
	//Function uses
		require('link.php');
		$dbname = 'user';

		$username = $request->username;
	    $password = $request->password;
	/*    $password = 'mfarjan1';
	    $username = 'admin';*/

		if(mysql_select_db($dbname, $link)){
			$res = array('ifExist' => false);
			$query = "SELECT password FROM user WHERE username = '$username'";
			$result = mysql_query($query, $link);
				if(mysql_num_rows($result) == 1){
					$row = mysql_fetch_assoc($result);
					if($row["password"] === $password){
						$res = array('ifExist' => true);
					};	
				}else{
					die('must only have one entry');
				}

		    echo json_encode($res);
			mysql_close($link);
		}else{
			mysql_close($link);	
		}
 


?>
