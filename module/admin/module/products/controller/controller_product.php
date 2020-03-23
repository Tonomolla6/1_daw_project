<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/nueva_final/';

	include($path . "module/admin/module/products/model/validator.php");
	include($path . "module/admin/module/products/model/dao.php");

	switch($_GET['op']){
		// Create product
		case 'create_product';
			if ($_POST) {
				$result = product_validator_php();
				if ($result['result']) {
					$insert_end = array(
						'name' => strtoupper($_POST['name']),
						'description' => $_POST['description'],
						'stock' => $_POST['stock'],
						'purchase_price' => $_POST['purchase_price'],
						'sale_price' => $_POST['sale_price'],
						'gain' => $_POST['sale_price'] - $_POST['purchase_price'],
						'provider' => $_POST['provider'],
						'category' => $_POST['category'],
						'subcategory' => $_POST['subcategory']
					);
					insert($insert_end);
					header("LOCATION: index.php?page=products");
					break;
				}else{
					$error = "* ".$result['error'];
				}
			}
			include("module/admin/module/products/view/create_product.php");
			break;

		case 'read_product';
			try{
            	$list = select("*","where id = ".$_GET['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$list){
    			echo json_encode("error");
                exit;
    		}else{
                echo json_encode($list);
                exit;
			}
			break;

		// Update product
		case 'update_product';
			if ($_GET['id']) {
				$select_u = select("*","where id = ".$_GET['id']);
				if ($_POST) {
					if ($select_u[0]['name'] != $_POST['name']
					|| $select_u[0]['purchase_price'] != $_POST['purchase_price'] 
					|| $select_u[0]['description'] != $_POST['description']
					|| $select_u[0]['purchase_price'] != $_POST['purchase_price'] 
					|| $select_u[0]['sale_price'] != $_POST['sale_price'] 
					|| $select_u[0]['stock'] != $_POST['stock'] 
					|| $select_u[0]['description'] != $_POST['description']
					|| $select_u[0]['provider'] != $_POST['provider']
					|| $select_u[0]['category'] != $_POST['category']
					|| $select_u[0]['subcategory'] != $_POST['subcategory']) {
						$result = product_validator_php_u($select_u[0]['name']);
						if ($result['result']) {
							$insert_end = array(
								'name' => strtoupper($_POST['name']),
								'description' => $_POST['description'],
								'stock' => $_POST['stock'],
								'purchase_price' => $_POST['purchase_price'],
								'sale_price' => $_POST['sale_price'],
								'gain' => $_POST['sale_price'] - $_POST['purchase_price'],
								'provider' => $_POST['provider'],
								'category' => $_POST['category'],
								'subcategory' => $_POST['subcategory']
							);
							update($insert_end,$_GET['id']);
							$mensaje = "Your product was updated successfully.";
						} else {
							$error = "* ".$result['error'];
						}
					} else {
						$error = "* No se ha modificado";
					}
				} else {
					$_POST = array(
						'name' => $select_u[0]['name'],
						'purchase_price' => $select_u[0]['purchase_price'],
						'sale_price' => $select_u[0]['sale_price'],
						'stock' => $select_u[0]['stock'],
						'description' => $select_u[0]['description'],
						'provider' => $select_u[0]['provider'],
					);
				}
				include("module/admin/module/products/view/update_product.php");
				break;
			} else 
				header("LOCATION: index.php?page=404");
		case 'delete_product';
			delete($_GET['id']);
			header("LOCATION: index.php?page=products");
			break;
		case 'delete_products_all';
			delete_all();
			include 'module/admin/module/products/view/list_products.php';
			break;
		case 'products_dummies';
		
			$categories = select_categories();
			include('module/admin/module/products/view/dummies_products.php');
			header("LOCATION: index.php?page=products");
			break;
		case 'list_categories';
			try{
				$list = select_categories();
			}catch (Exception $e){
				echo json_encode("error");
				exit;
			}
			if(!$list){
				echo json_encode("error");
				exit;
			}else{
				echo json_encode($list);
				exit;
			}
			break;
		break;

		case 'list_subcategories';
		try{
			$list = select_subcategories($_GET['id']);
			}catch (Exception $e){
				echo json_encode("error");
				exit;
			}
			if(!$list){
				echo json_encode("errorw");
				exit;
			}else{
				echo json_encode($list);
				exit;
			}
			break;

		default;
			$list = select("*","");
			include('module/admin/module/products/view/list_products.php');
			break;
	}
?>