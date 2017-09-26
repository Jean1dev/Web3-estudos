<?php
	include "db.php";

	if (!isset($_POST["id_user"])){
		exit;
	}

	$id_user = $_POST["id_user"];

	$sql_verifica = 'SELECT id_user, contact_user FROM contatos WHERE id_user = "'.$id_user.'" or contact_user = "'.$id_user.'"';
	$exec_row = $conn->query($sql_verifica);

	$result = array();

	while($info = $exec_row->fetch_assoc()){

		if ($info["id_user"] == $id_user){
				$id_usuario = $info["contact_user"];
		} else {
				$id_usuario = $info["id_user"];
		}

		$sql_get_user = 'SELECT id_usuario, nome_usuario, photo_usuario FROM usuarios WHERE id_usuario = "'.$id_usuario.'"';
		$exec_row_user = $conn->query($sql_get_user);
		$rowUser = $exec_row_user->fetch_assoc();
		$rowUser["photo_usuario"] = "http://192.168.25.16/chat/".$rowUser["photo_usuario"];
		$result[] = $rowUser;
	}

	echo json_encode($result);

	$conn->close();
?>