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
        case 'select_cart_user';
            try{
                $list = select_cart_user($_SESSION["id"]);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$list){
                echo json_encode(false);
                exit;
            }else{
                echo json_encode($list);
                exit;
            }
        break;
        case 'insert_cart_user';
            try{
                delete_cart_php_user($_SESSION["id"]);
                foreach ($_GET["data"] as $valor) {
                    insert_cart_php($_SESSION["id"].",".$valor["id"].",".$valor["und"]);
                }
            }catch (Exception $e){
                echo json_encode("errora");
                exit;
            }
            echo json_encode(true);
        break;
        case 'order';
            try{
                delete_cart_php_user($_SESSION["id"]);
                foreach ($_GET["data"] as $valor) {
                    insert_cart_php($_SESSION["id"].",".$valor["id"].",".$valor["und"]);
                }
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
        case 'stock_checking';
            try{
                $list = stock_checking($_GET['id']);
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
        case 'money_checking';
            try{
                $total = total_cart($_SESSION["id"]);
                $money = money_checking($_SESSION["id"]);
                $cart = select_cart_user($_SESSION["id"]);

                if (intval($money) > intval($total)) {
                    $salary = intval($money)-intval($total);
                    send_sql("UPDATE login SET salary = ".$salary." WHERE id = ".$_SESSION["id"].";");

                    foreach ($cart as $e) {
                        send_sql("UPDATE products SET stock = (stock-".intval($e["units"]).") WHERE id = ".$e["product"].";");
                        send_sql("INSERT INTO orders (user,product,units) VALUES (".$_SESSION["id"].",".$e["product"].",".$e["units"].");");
                    }
                    $stat = true;
                    delete_cart_php_user($_SESSION["id"]);
                }

            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$stat){
                echo json_encode(false);
                exit;
            }else{
                echo json_encode($cart);   
                exit;
            }
        break;
    }
?>