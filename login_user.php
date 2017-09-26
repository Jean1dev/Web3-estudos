<?php
	
	include "db.php";

	if (!isset($_POST["email_user"])){
		exit;
	}

	$email_user = $_POST["email_user"];
	$senha_user = $_POST["senha_user"];
	$token_user = $_POST["token_user"];

	$sql_verifica = 'SELECT id_usuario, nome_usuario, email_usuario, photo_usuario FROM usuarios WHERE email_usuario = "'.$email_user.'" and senha_usuario = "'.$senha_user.'"';
	$exec_row = $conn->query($sql_verifica);

	if ($exec_row->num_rows > 0){
			$row = $exec_row->fetch_row();
			$retorno = array("retorno" => $row[0], "nome_usuario" => $row[1], "email_usuario" => $row[2], "photo_usuario" => $row[3]);

			// Atualiza Token
			$id_usuario = $row[0];
			$sql_update = 'UPDATE usuarios SET token_usuario = ? WHERE id_usuario = ?';
			$stm = $conn->prepare($sql_update);
			$stm->bind_param("si", $token_user, $id_usuario);
			$stm->execute();
	} else {
			$retorno = array("retorno" => '0');
	}

	echo json_encode($retorno);

	$conn->close();
?>