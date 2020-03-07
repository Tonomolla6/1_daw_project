<?php 

    $path = $_SERVER['DOCUMENT_ROOT'].'/nueva_final/';
    include($path."model/connect.php");

    function insert($received) {
        $connection = new Connection();
        $insert = $connection->prepare("INSERT INTO 
        products (id, name, description, stock ,purchase_price, sale_price ,gain ,provider,category,subcategory,clicks) 
        VALUES ('',?,?,?,?,?,?,?,?,?,'')");
        $name = $received['name'];
        $description = $received['description'];
        $stock = $received['stock'];
        $purchase_price = $received['purchase_price'];
        $sale_price = $received['sale_price'];
        $gain = $received['gain'];
        $provider = $received['provider'];
        $category = $received['category'];
        $subcategory = $received['subcategory'];
        $insert->bindParam(1, $name);
        $insert->bindParam(2, $description);
        $insert->bindParam(3, $stock);
        $insert->bindParam(4, $purchase_price);
        $insert->bindParam(5, $sale_price);
        $insert->bindParam(6, $gain);
        $insert->bindParam(7, $provider);
        $insert->bindParam(8, $category);
        $insert->bindParam(9, $subcategory);

        $insert->execute();
        
        $connection = null;
    }

    function select($fact,$add) {
        $connection = new Connection();
        $select = $connection->prepare("SELECT ".$fact." FROM products ".$add.";");
        $select->execute();

        $resultado = $select->fetchAll();
        $connection = null;

        return $resultado;
    }

    function update($fact,$id) {
        $connection = new Connection();
        $select = $connection->prepare("UPDATE products 
        SET name = '".$fact['name']."', 
        description = '".$fact['description']."', 
        stock = '".$fact['stock']."',
        purchase_price = '".$fact['purchase_price']."',
        sale_price = '".$fact['sale_price']."',
        gain = '".$fact['gain']."',
        provider = '".$fact['provider']."'
        WHERE id = ".$id.";");
        $select->execute();

        $connection = null;
    }

    function delete($id) {
        $connection = new Connection();
        $select = $connection->prepare("DELETE FROM products WHERE id = ".$id.";");
        $select->execute();

        $connection = null;
    }

    function delete_all() {
        $connection = new Connection();
        $select = $connection->prepare("DELETE FROM products;");
        $select->execute();

        $connection = null;
    }

    function select_categories() {
        $connection = new Connection();
        $select = $connection->prepare("SELECT * FROM categories;");
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
?>