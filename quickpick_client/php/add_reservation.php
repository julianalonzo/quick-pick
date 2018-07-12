<?php

	session_start();

	require('connect.php');

	if (isset($_SESSION['username'])) {
		$username = $_SESSION['username'];

		$dashboard_id = $_POST['dashboard_id'];

		$query = 'INSERT INTO reservation (dashboard_id) VALUES (?)';

		$statement = $conn->prepare($query);

		$statement->bind_param('s', $dashboard_id);

		$statement->execute();

		if ($statement->affected_rows > 0) {
			Header('Location: ../foods.html');
		} 

		$statement->close();
	}

