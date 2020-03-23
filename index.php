<?php 
//Iniciamos la session
session_start();

//Comprobamos la session
if ( !isset($_SESSION["type"]) || $_SESSION["type"] == "client" )
    include('module/client/index.php');
else if ($_SESSION["type"] == "admin")
    include('module/admin/index.php');

?>