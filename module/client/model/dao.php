<?php 
    $path = $_SERVER['DOCUMENT_ROOT'].'/nueva_final/';
    include($path."model/connect.php");

    function select_categories($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM categories ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function select_subcategories($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM subcategories WHERE category = ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }
    

    function select_autocomplete($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM products ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }
  
?>