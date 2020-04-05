<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/nueva_final/';

	include($path . "module/admin/module/homepage/model/dao.php");

	switch($_GET['module']){
		// List slider
		case 'slider_list';
			try{
				$data = list_background_img();
			}catch (Exception $e){
				echo json_encode("error");
				exit;
			}
			if(!$data){
				echo json_encode("error");
				exit;
			}else{
				echo json_encode($data);
				exit;
			}
		break;
		// Update slider
		case 'slider_update';
			try{
				$data = select_background_img();
			}catch (Exception $e){
				echo json_encode("error");
				exit;
			}
			if(!$data){
				echo json_encode("error");
				exit;
			}else{
				echo json_encode($data);
				exit;
			}
		break;
		// select slider
		case 'slider_select';
			try{
				$data = select_background_img();
			}catch (Exception $e){
				echo json_encode("error");
				exit;
			}
			if(!$data){
				echo json_encode("error");
				exit;
			}else{
				echo json_encode($data);
				exit;
			}
		break;
	}
?>