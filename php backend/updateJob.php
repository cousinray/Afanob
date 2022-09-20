<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
   $request = json_decode($postdata, true);
   $id = mysqli_real_escape_string($con, trim($request['id']));
   $assignedTo = mysqli_real_escape_string($con, trim($request['assignedTo']));
    // var_dump($assignedTo);
  $status = 'COMPLETED';
// Update
$sql = "update jobs SET status = '$status' WHERE id = '$id'";
$sql2 = "update lawyers SET count = count - 1 WHERE name = '$assignedTo'";
$res = mysqli_query($con, $sql);
$res1 = mysqli_query($con, $sql2);
if($res && $res1) {
  http_response_code(204);
} else {
  return http_response_code(422);
}
}

?>