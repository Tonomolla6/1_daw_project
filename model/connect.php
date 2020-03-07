<?php
class Connection extends PDO{
    function __construct(){
		$db = "mysql";
		$host = "localhost";
		$user = "microchip";
		$pass = "1234";
		$database_n = "neteco";

		try{
			parent::__construct($db.":host=".$host.";dbname=".$database_n, $user, $pass);
			//$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch(PDOException $e){
			echo 'ERROR: ' . $e->getMessage();
		}
	}
}
?>