<?php
require 'database.php';
// Get the posted data.
$name = $_GET['id'];
$jobs = [];

if(isset($name) && !empty($name)){
      //$smsg = "Uploaded Successfully";
      $sql = "SELECT * FROM jobs where assigned_by = '$name' order by id desc";
      $res = mysqli_query($con, $sql);
      if ($result = mysqli_query($con, $sql)) {
        $i = 0;
        while ($row = mysqli_fetch_assoc($result)) {
            $jobs[$i]['id']= $row['id'];
            $jobs[$i]['title'] = $row['title'];
            $jobs[$i]['assigned_to'] = $row['assigned_to'];
            $jobs[$i]['assigned_by'] = $row['assigned_by'];
            $jobs[$i]['dueDate'] = $row['dueDate'];
            $jobs[$i]['date'] = $row['date'];
            $jobs[$i]['status'] = $row['status'];
            $i++;
        }
        echo json_encode($jobs);
    } else {
        echo 'failed';
    }
    }

