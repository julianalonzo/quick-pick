<?php
	session_start();

	require('connect.php');

	if (isset($_SESSION['username'])) {
		$username = $_SESSION['username'];
		
		$query = 	'SELECT display_name ' .
					'FROM account WHERE username = ?';
		
		$statement = $conn->prepare($query);
		
		$statement->bind_param('s', $username);
		
		$statement->execute();
		
		$result = $statement->get_result();
		
		$users = array();
		
		while ($row = $result->fetch_assoc()) {
			$users[] = $row;
		}
		
		$statement->close();
		
		$response = new stdClass();
        $response->users = $users;

        echo json_encode($response);
	} else {
		Header('Location: ../index.html');
	}