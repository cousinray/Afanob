<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)) {
//   // Extract the data.
   $request = json_decode($postdata, true);
// Sanitize.
$title = mysqli_real_escape_string($con, trim($request['title']));
$assigned_by = mysqli_real_escape_string($con, trim($request['assigned_by']));
$assigned_to = mysqli_real_escape_string($con, trim($request['assigned_to']));
$dueDate = mysqli_real_escape_string($con, trim($request['dueDate']));
$date = mysqli_real_escape_string($con, trim($request['date']));
$status = mysqli_real_escape_string($con, trim($request['status']));

      //$smsg = "Uploaded Successfully";
      $sql = "INSERT INTO `jobs`(`id`,`title`,`assigned_by`,`assigned_to`,`date`,`dueDate`,`status`)
      VALUES (null,'{$title}','{$assigned_by}','{$assigned_to}','{$date}','{$dueDate}','{$status}')";
      
      $sql2 ="update lawyers SET count = count + 1 where name = '$assigned_to'";


      $res = mysqli_query($con, $sql);
      $res1 = mysqli_query($con, $sql2);
      if($res && $res1) {
            $job = [
              'title' => $title,
              'assigned_by' => $assigned_by,
              'assigned_to' => $assigned_to,
              'dueDate' => $dueDate,
              'date' => $date,
              'status' => $status,
              'id'   => mysqli_insert_id($con)
            ];
           echo json_encode($job);
      }
      else {
        echo "Failed to create task, Retry.";
      }
      
} else {
    echo "Failed to create task, Retry";
}
?>
    


