<?php
	switch($_GET['page']){
		case "homepage";
			$route = "<a href='index.php?page=homepage' data-tr='Homepage'></a>";
			include("module/admin/module/homepage/view/homepage.html");
			break;
		case "products";
			$route = "<a href='index.php?page=products' data-tr='Products'></a>";
			include("module/admin/module/products/controller/controller_product.php");
			break;
		case "users";
			$route = "<a href='index.php?page=users' data-tr='Users'></a>";
			include("module/admin/module/products/controller/controller_product.php");
			break;
		case "categories";
			$route = "<a href='index.php?page=categories' data-tr='Categories'></a>";
			include("module/admin/module/categories/controller/controller_categories.php");
			break;
		case "discounts";
			$route = "<a href='index.php?page=discounts' data-tr='Discounts'></a>";
			include("module/admin/module/products/controller/controller_product.php");
			break;
		case "orders";
			$route = "<a href='index.php?page=orders' data-tr='Orders'></a>";
			include("module/admin/module/products/controller/controller_product.php");
			break;
		case "settings";
			$route = "<a href='index.php?page=settings' data-tr='Settings'></a>";
			include("module/admin/module/settings/settings.php");
			break;
		case "404";
			$route = "<a href='index.php?page=homepage' data-tr='Homepage'></a>";
			include("module/admin/view/inc/error".$_GET['page'].".php");
			break;
		case "503";
			$route = "<a href='index.php?page=homepage' data-tr='Homepage'></a>";
			include("module/admin/view/inc/error".$_GET['page'].".php");
			break;
		case "";
			$route = "<a href='index.php?page=homepage' data-tr='Homepage'></a>";
			header("LOCATION: index.php?page=homepage");
			break;
		default;
			$route = "<a href='index.php?page=homepage' data-tr='Homepage'></a>";
			include("module/admin/view/inc/error404.php");
			break;
	}
?>