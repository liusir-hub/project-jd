<?php
    header("content-type:text/html;charset=utf-8");
    include './link.php';


    

    if(isset($_GET['sid'])){
        $sid =$_GET['sid'];
    }else{
        $sid =1;
    }

    $res = $conn->query("select * from jdgoods where sid='$sid'");
    $arr[0]=$res->fetch_assoc();
    echo json_encode($arr);
?>