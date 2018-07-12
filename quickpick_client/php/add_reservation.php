<?php

	session_start();

	require('connect.php');

	if (isset($_SESSION['username'])) {
		$username = $_SESSION['username'];
		
		echo $username;

		$dashboard_id = $_POST['dashboard_id'];

		$query = 'INSERT INTO reservation (dashboard_id, username) VALUES (?, ?)';
		
		echo $dashboard_id;

		$statement = $conn->prepare($query);

		$statement->bind_param('ss', $dashboard_id, $username);

		$statement->execute();

		if ($statement->affected_rows > 0) {
			Header('Location: ../foods.html');
		} 

		$statement->close();
	}

