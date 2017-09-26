<?php

	include "db.php";

	if (!isset($_POST["nome_user"])){
		exit;
	}

	$nome_user = $_POST["nome_user"];
	$email_user = $_POST["email_user"];
	$senha_user = $_POST["senha_user"];
	
	$photo_user_origem = $_FILES["photo_user"]["tmp_name"];
	$photo_user_destino = "photos/".md5(time()).".png";

	$data = date("Y-m-d H:i:s");

	$sql_verifica = 'SELECT email_usuario FROM usuarios WHERE email_usuario = "'.$email_user.'" ';
	$exec_row = $conn->query($sql_verifica);

	if ($exec_row->num_rows == 0){
		$sql_insert = 'INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, data_usuario) ';
		$sql_insert .= ' VALUES (?, ?, ?, ?)';

		$stm = $conn->prepare($sql_insert);
		$stm->bind_param("ssss", $nome_user, $email_user, $senha_user, $data);

		if ($stm->execute()){
			$idUser = $conn->insert_id;

			$stm->close();

			if (move_uploaded_file($photo_user_origem, $photo_user_destino)){
				$sql_update_photo = 'UPDATE usuarios SET photo_usuario = ? WHERE id_usuario = ?';
				$stm = $conn->prepare($sql_update_photo);
				$stm->bind_param("si", $photo_user_destino, $idUser);
				$stm->execute();
			}

			$retorno = array("retorno" => 'YES');

		} else {
			$retorno = array("retorno" => 'NO');
		}
	} else {
		$retorno = array("retorno" => 'EMAIL_ERROR');
	}

	echo json_encode($retorno);

	$stm->close();
	$conn->close();
?>