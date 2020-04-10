<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/nueva_final/';
	include($path . "module/login/model/dao.php");
	session_start();

	switch($_GET['op']){
		// Create user
		case 'signin';
			if ($_POST) {
                $result = user_test(strtolower($_POST['email']));
				if (!$result) {
                    $var = $_POST['password'];
					insert(array(
						'name' => $_POST['name'],
						'email' => strtolower($_POST['email']),
						'password' => password_hash($var, PASSWORD_DEFAULT),
						'avatar' => "http://i.pravatar.cc/300?u=".$_POST['hash']
					));
                    echo "true";
                    break;
				}else{
					echo "Este email ya esta registrado";
				}
            }
        break;
        case 'login';
			if ($_POST) {
                $var = $_POST['password'];
				$result = user_test_all(strtolower($_POST['email']));
				if (password_verify($var, $result['password'])) {
					$_SESSION["id"] = $result['id'];
					$_SESSION["name"] = $result['name'];
					$_SESSION["email"] = $result['email'];
					$_SESSION["password"] = $result['password'];
					$_SESSION["avatar"] = $result['avatar'];
					$_SESSION["type"] = $result['type'];
					$_SESSION["salary"] = $result['salary'];
					$_SESSION["time"] = time();
					if ($_SESSION["cart"] == true) {
						$_SESSION["cart"] = false;
						echo false;
					} else
                    	echo true;
				} else
					echo "La direccion de correo o contraseña no son correctos";
            }
		break;
		case 'checking';
			if ($_POST['stat'] == 'cart') {
				$_SESSION["cart"] = true;
			}
			if ($_SESSION["type"] == "admin" || $_SESSION["type"] == "client") {
				$result = user_test_all(strtolower($_SESSION["email"]));
				if ($result['password'] == $_SESSION["password"]) {
					$data = array($_SESSION["name"], $_SESSION["avatar"]);
					echo json_encode($data);
					exit;
				} else {
					session_destroy();
					session_unset();
					echo "false";
				}
			} else {
				echo "true";
			}
		break;
		case 'time':
			if (!isset($_SESSION["time"])){
				echo "true";
			}	
			else {  
				if((time() - $_SESSION["time"]) >= 900) {
					session_destroy();
					session_unset();
	    	  		echo "false"; 
				} else {
					session_regenerate_id();
					echo "true";
				}
			}
		break;
		case 'logout';
			session_destroy();
			session_unset();
			echo "true";
		break;
	}
?>
