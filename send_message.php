<?php

	function sendFCM($action, $token, $message, $id_user, $contact_user, $data) {
	    $url = 'https://fcm.googleapis.com/fcm/send';

	    $fields = array (
	            'to' => $token,
	            'data' => array (
	            		"action" => $action,
	                    "message" => $message,
	                    "id_user" => $id_user,
	                    "contact_user" => $contact_user,
	                    "data" => $data
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

	if (!isset($_POST["contact_user"])){
		exit;
	}

	$contact_user = addslashes($_POST["contact_user"]);
	$id_user = addslashes($_POST["id_user"]);
	$message = addslashes($_POST["message"]);
	
	$data = date("Y-m-d H:i:s");

	$sql_verifica = 'SELECT id_usuario, token_usuario FROM usuarios WHERE id_usuario = "'.$contact_user.'" ';
	$exec_row = $conn->query($sql_verifica);

	if ($exec_row->num_rows > 0){
			$row = $exec_row->fetch_row();
			$token_user = $row[1];

			$sql_insert = 'INSERT INTO mensagens (id_user, contact_user, mensagem, data) ';
			$sql_insert .= ' VALUES (?, ?, ?, ?)';

			$stm = $conn->prepare($sql_insert);
			$stm->bind_param("ssss", $id_user, $contact_user, $message, $data);

			if ($stm->execute()){
				$id_message = $conn->insert_id;
				$retorno = array("retorno" => 'YES', "id_message" => $id_message, "data_message" => $data);
				sendFCM("NEW_MESSAGE", $token_user, $message, $id_user, $contact_user, $data);
				$stm->close();
			} else {
				$retorno = array("retorno" => 'NO');
			}
	} else {
		$retorno = array("retorno" => 'CONTACT_NOT_EXIST');
	}

	echo json_encode($retorno);

	$conn->close();
?>