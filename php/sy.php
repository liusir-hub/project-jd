<?php
    header("content-type:text/html;charset=utf-8");

    include './link.php';

    $res  =$conn->query('select *  from jdd');
    $arr  =array();
    for($i=0;$i<$res->num_rows;$i++){
        $arr[$i]=$res->fetch_assoc();
    }
    echo json_encode($arr);
?>