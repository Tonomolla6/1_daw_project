<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/nueva_final/';
    include($path . "module/cart/model/dao.php");
    session_start();
    if (isset($_SESSION["time"])) {  
        $_SESSION["time"] = time();
    }
    
    switch($_GET['op']){
        case 'list_products';
            try{
                $list = select_products('('.$_GET['ids'].')');
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$list){
                echo json_encode("error");
                exit;
            }else{
                echo json_encode($list);
                exit;
            }
        break;
    }
?>