<?php
	function sendFCM($action, $token,  $id_user, $contact_user, $nome_user, $photo_user) {
	    $url = 'https://fcm.googleapis.com/fcm/send';

	    $fields = array (
	            'to' => $token,
	            'data' => array (
	            		"action" => $action,
	                    "photo_user" => $photo_user,
	                    "id_user" => $id_user,
	                    "nome_user" => $nome_user,
	                    "contact_user" => $contact_user
	            )
	    );

	    $fields = json_encode ( $fields );

	    $headers = array (
	            'Authorization: key=' . "AIzaSyCYANpmkw8gCjQdxbrcyk7GArosc6CQKJ4",
	            'Content-Type: application/json'
	    );

	    $ch = curl_init ();
	    curl_setopt ( $ch, CURLOPT_URL, $url );
	    curl_setopt ( $ch, CURLOPT_POST, true );
	    curl_setopt ( $ch, CURLOPT_HTTPHEADER, $headers );
	    curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
	    curl_setopt ( $ch, CURLOPT_POSTFIELDS, $fields );
	    curl_setopt  ($ch, CURLOPT_SSL_VERIFYPEER, false);

	    $result = curl_exec ( $ch );
	    curl_close ( $ch );
	}

	include "db.php";

	if (!isset($_POST["email_user"])){
		exit;
	}

	$email_user = $_POST["email_user"];
	$id_user = $_POST["id_user"];
	
	$data = date("Y-m-d H:i:s");

	$sql_verifica = 'SELECT id_usuario, nome_usuario, photo_usuario, token_usuario FROM usuarios WHERE email_usuario = "'.$email_user.'" ';
	$exec_row = $conn->query($sql_verifica);

	// Get Name User
	$sql_name_user = 'SELECT nome_usuario FROM usuarios WHERE id_usuario = "'.$id_user.'" ';
	$exec_name_user_row = $conn->query($sql_name_user);
	$name_user_row = $exec_name_user_row->fetch_row();
	$name_user_other = $name_user_row[0];

	if ($exec_row->num_rows > 0){
		$row = $exec_row->fetch_row();
		$contact_user = $row[0];
		$nome_usuario = $row[1];
		$foto_usuario = "http://192.168.25.16/chat/".$row[2];
		$token_user = $row[3];

		$sql_check = 'SELECT id FROM contatos WHERE (id_user = "'.$id_user.'" and contact_user = "'.$contact_user.'") or (id_user = "'.$contact_user.'" and contact_user = "'.$id_user.'")';

		$exec_row = $conn->query($sql_check);

		if ($exec_row->num_rows == 0){

			$sql_insert = 'INSERT INTO contatos (id_user, contact_user) ';
			$sql_insert .= ' VALUES (?, ?)';

			$stm = $conn->prepare($sql_insert);
			$stm->bind_param("ss", $id_user, $contact_user);

			if ($stm->execute()){
				//$idUser = $conn->insert_id;
				$retorno = array("retorno" => 'YES', "contact_user" => $contact_user, "nome_user" => $nome_usuario, "photo_user" => $foto_usuario);
				$stm->close();
				sendFCM("NEW_CONTACT", $token_user,  $id_user, $contact_user, $name_user_other, $foto_usuario);
			} else {
				$retorno = array("retorno" => 'NO');
			}
		} else {
			$retorno = array("retorno" => 'CONTACT_EXIST');
		}
	} else {
		$retorno = array("retorno" => 'EMAIL_ERROR');
	}

	echo json_encode($retorno);

	$conn->close();
?>