<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/nueva_final/';
    include($path . "module/client/module/products/model/dao.php");
    session_start();
    if (isset($_SESSION["time"])) {  
        $_SESSION["time"] = time();
    }
    
    switch($_GET['op']){
        case 'list_products';
            try{
                if($_GET['subcategory'])
                    $list = select_products('WHERE subcategory = '.$_GET['subcategory'].' LIMIT 20');
                else if ($_GET['category'])
                    $list = select_products('WHERE category = '.$_GET['category'].' LIMIT 20');
                else
                    $list = select_products('');
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
        case 'list_products_add';
            try{
                // if($_GET['keyup'])
                //     $keyup = 'name like "%'.$_GET['keyup'].'%" and ';
                // else
                //     $keyup = "";
                if($_GET['subcategory'])
                    $list = select_products('WHERE '.$keyup.' subcategory = '.$_GET['subcategory'].' LIMIT 20 OFFSET '.$_GET['mostrados']);
                else if ($_GET['category'])
                    $list = select_products('WHERE '.$keyup.' category = '.$_GET['category'].' LIMIT 20 OFFSET '.$_GET['mostrados']);
                else
                    $list = select_products('');
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$list){
                echo json_encode("undefined");
                exit;
            }else{
                echo json_encode($list);
                exit;
            }
        break;
        case 'list_categories';
            try{
                $list = select_categories();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$list){
                echo json_encode("empty");
                exit;
            }else{
                echo json_encode($list);
                exit;
            }
        break;
        case 'list_subcategories';
            try{
                $list = select_subcategories();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$list){
                echo json_encode("empty");
                exit;
            }else{
                echo json_encode($list);
                exit;
            }
        break;
        case 'count_products';
            try{
                if($_GET['subcategory'])
                    $list = select_products('WHERE subcategory = '.$_GET['subcategory']);
                else if ($_GET['category'])
                    $list = select_products('WHERE category = '.$_GET['category']);
                else
                    $list = select_products('');
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$list){
                echo json_encode("empty");
                exit;
            }else{
                echo json_encode($list);
                exit;
            }
        break;
        case 'details';
            try{
                $list = select_product($_GET['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$list){
                echo json_encode("empty");
                exit;
            }else{
                echo json_encode($list);
                exit;
            }
        break;
        case 'products_categories';
            try{
                if($_GET['sub'])
                    $list = select_products_categories("id != ".$_GET['id']." and category = ".$_GET['cat']." and subcategory = ".$_GET['sub']." LIMIT 5");
                else if ($_GET['cat'])
                    $list = select_products_categories("id != ".$_GET['id']." and category = ".$_GET['cat']." LIMIT 5");
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$list){
                echo json_encode("empty");
                exit;
            }else{
                echo json_encode($list);
                exit;
            }
        break;
        case 'list_likes';
            try{
                $likes = list_likes($_SESSION['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$likes){
                echo json_encode("empty");
                exit;
            }else{
                echo json_encode($likes);
                exit;
            }
        break;
        case 'add_like';
            add_like($_SESSION['id'],$_GET['id_product']);
        break;
        case 'remove_like';
            remove_like($_SESSION['id'],$_GET['id_product']);
        break;
    }
?>