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
        $select = $connection->prepare("SELECT * FROM subcategories ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function insert_categories($received) {
        $connection = new Connection();
        $insert = $connection->prepare("INSERT INTO categories (id, name) VALUES ('',?)");
        $name = $received;
        $insert->bindParam(1, $name);

        $insert->execute();
        
        $connection = null;
    }

    function insert_subcategories($name,$id) {
        $connection = new Connection();
        $insert = $connection->prepare("INSERT INTO subcategories (id,name,category) VALUES ('',?,?)");
        $name2 = $name;
        $id2 = $id;
        $insert->bindParam(1, $name2);
        $insert->bindParam(2, $id2);

        $insert->execute();
        
        $connection = null;
    }

    function delete_category($id) {
        $connection = new Connection();
        $select = $connection->prepare("DELETE FROM categories WHERE id = ".$id.";");
        $select->execute();

        $connection = null;
    }

    function delete_subcategory_help($id) {
        $connection = new Connection();
        $select = $connection->prepare("DELETE FROM subcategories WHERE category = ".$id.";");
        $select->execute();

        $connection = null;
    }

    function delete_subcategory($id) {
        $connection = new Connection();
        $select = $connection->prepare("DELETE FROM subcategories WHERE id = ".$id.";");
        $select->execute();

        $connection = null;
    }
    
?>