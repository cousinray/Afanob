<?php
require 'database.php';
// Get the posted data.

$lawyers = [];

      //$smsg = "Uploaded Successfully";
      $sql = "SELECT * FROM lawyers order by count desc";
      $res = mysqli_query($con, $sql);
      if ($result = mysqli_query($con, $sql)) {
        $i = 0;
        while ($row = mysqli_fetch_assoc($result)) {
            $lawyers[$i]['id']= $row['id'];
            $lawyers[$i]['name'] = $row['name'];
            $lawyers[$i]['phone'] = $row['phone'];
            $lawyers[$i]['count'] = $row['count'];
            $i++;
        }
        echo json_encode(['data' => $lawyers]);
    } else {
        echo 'failed to get lawyers';
    }
    

