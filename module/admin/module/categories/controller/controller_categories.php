<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/nueva_final/';
	include($path . "module/admin/module/categories/model/dao.php");
	switch($_GET['op']){
        case 'list_categories';
            try{
                $list = select_categories('');
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
        case 'insert_category';
            try{
                $list = select_categories('WHERE name = "'.$_GET['name'].'"');
                if (!$list) {
                    insert_categories($_GET['name']);
                    $list = true;
                } else 
                    $list = 'error';
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
        case 'delete_category';
            try{
                $list = delete_category($_GET['id']);
                $list = delete_subcategory_help($_GET['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            echo json_encode($list);
            break;  
        case 'delete_subcategory';
            try{
                $list = delete_subcategory($_GET['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            echo json_encode($list);
            break;  
        case 'list_subcategories';
            try{
                $list = select_subcategories('');
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
        case 'insert_subcategory';
            try{
                $list = select_subcategories('WHERE name = "'.$_GET['name'].'" and category = '.$_GET['id']);
                if (!$list) {
                    $list = insert_subcategories($_GET['name'],$_GET['id']);
                    $list = true;
                } else 
                    $list = 'error';
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
        default;
			include('module/admin/module/categories/view/categories.html');
			break;
	}
?>