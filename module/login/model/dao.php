<?php 
    $path = $_SERVER['DOCUMENT_ROOT'].'/nueva_final/';
    include($path."model/connect.php");

    function user_test($email) {
        
        $connection = new Connection();
        
        $select = $connection->prepare("SELECT email FROM login WHERE email = '".$email."';");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado[0]['email'];
    }

    function user_test_all($email) {
        $connection = new Connection();
        
        $select = $connection->prepare("SELECT * FROM login WHERE email = '".$email."';");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado[0];
    }

    function insert($received) {
        $connection = new Connection();
        $insert = $connection->prepare("INSERT INTO login (name, email, password, avatar, type) VALUES (?,?,?,?,?)");
        $name = $received['name'];
        $email = $received['email'];
        $password = $received['password'];
        $avatar = $received['avatar'];
        $type = "client";

        $insert->bindParam(1, $name);
        $insert->bindParam(2, $email);
        $insert->bindParam(3, $password);
        $insert->bindParam(4, $avatar);
        $insert->bindParam(5, $type);

        $insert->execute();
        $connection = null;
    }
?>