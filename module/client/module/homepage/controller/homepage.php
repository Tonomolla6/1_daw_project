<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/nueva_final/';

    include($path . "module/client/module/homepage/model/dao.php");
    
    switch($_GET['op']){
        case 'slider_img_count';
            try{
                $count = count_img();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$count){
                echo json_encode("errorw");
                exit;
            }else{
                echo json_encode($count);
                exit;
            }
            break;
        case 'slider_img_change';
            try{
                $img = select_id_img($_GET['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$img){
                echo json_encode("errorw");
                exit;
            }else{
                echo json_encode($img);
                exit;
            }
            break;
        case 'slider_subcategoria';
            try{
                $img = select_slider_subcategoria();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$img){
                echo json_encode("errorw");
                exit;
            }else{
                echo json_encode($img);
                exit;
            }
            break;
        case 'slider_products';
            try{
                $img = select_slider_products();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$img){
                echo json_encode("errorw");
                exit;
            }else{
                echo json_encode($img);
                exit;
            }
            break;
        case 'update_clicks';
            try{
                $img = update_clicks($_GET['table'],$_GET['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$img){
                echo json_encode("errorw");
                exit;
            }else{
                echo json_encode($img);
                exit;
            }
            break;
    }
?>