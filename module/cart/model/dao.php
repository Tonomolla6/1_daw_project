<?php 
    $path = $_SERVER['DOCUMENT_ROOT'].'/nueva_final/';
    include($path."model/connect.php");

    function select_products($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT id,name,sale_price,img FROM products WHERE id in ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }
?>