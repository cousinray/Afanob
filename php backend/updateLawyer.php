<?php

require 'database.php';
// Extract, validate and sanitize the id.
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);
if(isset($postdata) && !empty($postdata)) {
// // Sanitize.
$id = mysqli_real_escape_string($con, trim($request['id']));
$name = mysqli_real_escape_string($con, trim($request['name']));
$phone= mysqli_real_escape_string($con, trim($request['phone']));

// // Delete.
$sql = "update lawyers SET name = '$name', phone = '$phone' WHERE id = '$id'";
$res = mysqli_query($con, $sql) or die (mysqli_error($con));
if($res)
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
}
?>