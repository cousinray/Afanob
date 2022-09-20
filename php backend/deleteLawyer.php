<?php

require 'database.php';
$postdata = file_get_contents("php://input");
// Extract, validate and sanitize the id.

$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

if(!$id)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `lawyers` WHERE `id` ='{$id}'";
$res = mysqli_query($con, $sql);
if($res)
{
  http_response_code(204);
}
else
{
  echo "Delete failed. Please try again";
}

?>