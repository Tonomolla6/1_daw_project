<?php 

    $path = $_SERVER['DOCUMENT_ROOT'].'/nueva_final/';
    include($path."model/connect.php");

    function list_background_img() {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM background_img;");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function select_background_img($fact) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM background_img WHERE id = ".$fact.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }
?>