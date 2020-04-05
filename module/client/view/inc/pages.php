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
		case "login";
			include("module/login/view/login.html");
			break;
		case "signin";
			include("module/login/view/signin.html");
			break;
		case "checking";
			include("module/login/view/checking.html");
			break;
		case "cart";
			include("module/cart/view/cart.html");
			break;
		default;
			header("LOCATION: index.php?page=homepage");
			break;
	}
?>