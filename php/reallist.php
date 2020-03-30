<?php
    header("content-type:text/html;charset=utf-8");
    include './link.php';

    $pagesize=10;////单个页面展示的数据条数
    // $res1 = $conn->query("select *from jdgoods");//获取所有的数据
    // $pagenum = ceil($res1->num_rows/$pagesize);////获取页数 

//获取前端的传来的页面，根据页码查询对应的数据，返回给前端。
    if(isset($_GET['page'])){
        $pagevalue=$_GET['page'];
    }else{
        $pagevalue = 1;
    }
    $page = ($pagevalue - 1) * $pagesize;
    //limit
    //limit接收一个或者两个数字参数(整数)
    //参1：数据开始位置的索引(从0开始)，偏移量
    //参2：返回的记录集数目。
    //limit 0,10  从偏移量0开始 取10条
    //limit 10,10  从偏移量5开始 取10条
    //limit 20,10 从偏移量14开始 取10条
    $res = $conn->query("select * from jdgoods limit $page,$pagesize");//php双引号可以添加变量，单引号为字符串。

    
    // $result->num_rows; //记录集的条数
    // $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
    $arr = array();
    for($i=0;$i<$res->num_rows;$i++){
        $arr[$i]=$res->fetch_assoc();
    }
    echo json_encode($arr);
?>