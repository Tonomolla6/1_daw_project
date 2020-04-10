<?php 
    $path = $_SERVER['DOCUMENT_ROOT'].'/nueva_final/';
    include($path."model/connect.php");

    function select_products($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT id,name,sale_price,img,stock FROM products WHERE id in ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function stock_checking($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT stock FROM products WHERE id like ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function select_cart_user($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT product,units FROM cart WHERE user = ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function insert_cart_php($add) {
        $connection = new Connection();
        $select = $connection->prepare("INSERT INTO cart (user,product,units) VALUES (".$add.")");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function delete_cart_php_user($add) {
        $connection = new Connection();
        $select = $connection->prepare("DELETE FROM cart WHERE user = ".$add);
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function total_cart($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT SUM(p.sale_price*c.units) as total FROM cart c INNER JOIN products p ON c.product = p.id WHERE user = ".$add);
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado[0]["total"];
    }

    function money_checking($add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT salary FROM login WHERE id = ".$add);
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado[0]["salary"];
    }

    function send_sql($add) {
        $connection = new Connection();
        $select = $connection->prepare($add);
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }
?>