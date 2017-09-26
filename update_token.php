<?php
	include "db.php";

	if (!isset($_POST["id_user"])){
		exit;
	}

	$id_user = $_POST["id_user"];
	$token_user = $_POST["token_user"];
	
	$sql_update = 'UPDATE usuarios SET token_usuario = ? WHERE id_usuario = ?';

	$stm = $conn->prepare($sql_update);
	$stm->bind_param("si", $token_user, $id_user);

	if ($stm->execute()){
		$retorno = array("retorno" => 'YES');
	} else {
		$retorno = array("retorno" => 'NO');
	}
	
	echo json_encode($retorno);

	$stm->close();
	$conn->close();
?>