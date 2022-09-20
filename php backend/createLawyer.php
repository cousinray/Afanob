<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
//   // Extract the data.
  $request = json_decode($postdata, true);
// Sanitize.
$name = mysqli_real_escape_string($con, trim($request['name']));
$phone= mysqli_real_escape_string($con, trim($request['phone']));
$count= 0;


      //$smsg = "Uploaded Successfully";
      $sql = "INSERT INTO `lawyers`(`id`,`name`,`phone`,`count`) VALUES (null,'{$name}','{$phone}','{$count}')";
      $res = mysqli_query($con, $sql);
      if($res) {
            $lawyer = [
              'name' => $name,
              'phone' => $phone,
              'count' => $count,
              'id'    => mysqli_insert_id($con)
            ];
          echo json_encode($lawyer);
        // / echo "Product Created";
      }else{
        echo "Failed to add lawyer";
      }
    
}

