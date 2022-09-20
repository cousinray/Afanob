<?php

require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");
$password = mysqli_real_escape_string($con, trim($postdata));
$response = array();

if ($postdata) {
      //$smsg = "Uploaded Successfully";
	  $sql = "SELECT * FROM partners WHERE password = '$password'";
      $result = mysqli_query($con,$sql);
      $count = mysqli_num_rows($result);	
      if($count > 0) {
        $find = mysqli_fetch_object($result);
            $response = array(
                'password' => $find->password,
                'name' => $find->name,
                'id' => $find->id
            );
                echo json_encode($response);

    } else {
       echo  "${password} is not a Partner";
    
    }
    
} else {
    echo "Network error";
}
    

?>
    

