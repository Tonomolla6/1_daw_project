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
        $select = $connection->prepare("SELECT * FROM products LIMIT 5");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function select_slider_subcategoria() {
        $connection = new Connection();
        $select = $connection->prepare("SELECT *
        FROM subcategories
        WHERE id in
        (SELECT s.subcategory
        FROM (SELECT count(*) as total,name FROM products group by subcategory ORDER BY total DESC limit 5) as t
        INNER JOIN products s
        ON s.name = t.name)");

        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

?>