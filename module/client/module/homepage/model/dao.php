<?php 

    $path = $_SERVER['DOCUMENT_ROOT'].'/nueva_final/';
    include($path."model/connect.php");

    function select_id_img($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM background_img WHERE id = ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function count_img() {
        $connection = new Connection();
        $select = $connection->prepare("SELECT count(*) FROM background_img");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function select_slider_products() {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * 
        FROM products 
        ORDER BY clicks DESC
        LIMIT 5");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function select_slider_subcategoria() {
        $connection = new Connection();
        $select = $connection->prepare("SELECT *
        FROM subcategories
        ORDER BY clicks DESC
        LIMIT 5");

        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function update_clicks($table,$id) {
        $connection = new Connection();
        $select = $connection->prepare("UPDATE ".$table."
        SET clicks = (clicks + 1)
        WHERE id = '".$id."'");

        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

?>