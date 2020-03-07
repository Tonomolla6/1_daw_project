<?php 
    $path = $_SERVER['DOCUMENT_ROOT'].'/nueva_final/';
    include($path."model/connect.php");

    function select_products($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM products ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function select_product($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM products WHERE id = ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function select_categories() {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM categories;");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function select_subcategories() {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM subcategories;");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function select_products_categories($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM products WHERE ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }
?>