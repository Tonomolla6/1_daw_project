<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/nueva_final/';

    include($path . "module/client/model/dao.php");
    
    switch($_GET['op']){
        case 'menu';
            try{
                $menu = select_categories('');
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$menu){
                echo json_encode("errorw");
                exit;
            }else{
                echo json_encode($menu);
                exit;
            }
            break;
        case 'list_subcategories';
            try{
                $menu = select_subcategories($_GET['category']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$menu){
                echo json_encode("errorw");
                exit;
            }else{
                echo json_encode($menu);
                exit;
            }
            break;
        case 'autocomplete';
            try{
                if ($_GET['subcategoria']){
                    $menu = select_autocomplete('WHERE name like "%'.$_GET['keyup'].'%" and subcategory = '.$_GET['subcategoria']);
                }else if ($_GET['categoria']){
                    $menu = select_autocomplete('WHERE name like "%'.$_GET['keyup'].'%" and category = '.$_GET['categoria']);
                }else
                    $menu = select_autocomplete('WHERE name like "%'.$_GET['keyup'].'%" LIMIT 6');

            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$menu){
                echo json_encode("errorw");
                exit;
            }else{
                echo json_encode($menu);
                exit;
            }
            break;
    }
?>