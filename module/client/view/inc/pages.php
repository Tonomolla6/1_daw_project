<?php
	switch($_GET['page']){
		case "homepage";
			include("module/client/module/homepage/view/homepage.html");
			break;
		case "products";
			include("module/client/module/products/view/products.html");
			break;
		case "contact";
			include("module/client/module/contact/view/contact.html");
			break;
		default;
			header("LOCATION: index.php?page=homepage");
			break;
	}
?>