<?php 
    function product_validator_php() {
        $connection = new Connection();
        $select = $connection->prepare("SELECT name FROM products where '".$_POST['name']."'=name");
        $select->execute();
        $resultado = $select->fetchAll();

        if (!$resultado) {
            return array('result' => true);
        } else {
            return array('error' => "Ya existe ese producto");
        }
        $connection = null;
    }

    function product_validator_php_u($excluido) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT name FROM products where '".$excluido."'!=name and '".$_POST['name']."'=name");
        $select->execute();
        $resultado = $select->fetchAll();

        if (!$resultado) {
            return array('result' => true);
        } else {
            return array('error' => "Ya existe ese producto");
        }
        $connection = null;
    }
?>