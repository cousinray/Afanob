<?php

require 'database.php';
$postdata = file_get_contents("php://input");
 if(isset($postdata) && !empty($postdata)) {
   $request = json_decode($postdata, true);
   $id = mysqli_real_escape_string($con, trim($request['id']));
   $assignedTo = mysqli_real_escape_string($con, trim($request['assignedTo']));

// Delete.
$sql = "DELETE FROM `jobs` WHERE `id` ='{$id}'";
$sql2 = "update lawyers SET count = count - 1 WHERE name = '$assignedTo'";

$res = mysqli_query($con, $sql);
$res1 = mysqli_query($con, $sql2);
if($res && $res1)
{
  echo "Deleted successfully";
}
else
{
  echo "Delete failed. Please try again";
}
}
?>