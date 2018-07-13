<?php
	session_start();

	require('connect.php');

	if (isset($_POST['username']) and isset($_POST["password"])) {
		$username = $_POST['username'];
        $password = $_POST['password'];

        $query = 'SELECT display_name FROM account WHERE username = ? AND password = ?';
    
        $statement = $conn->prepare($query);

        $statement->bind_param('ss', $username, $password);

        $statement->execute();

        $statement->bind_result($result);

        $statement->fetch();

        $is_found = $result;
		
		if ($is_found) {
            $_SESSION['username'] = $username;
            Header('Location: ../index.html?user=' . $result);
        } else {
            Header('Location: ../index.html?isLoggedIn=false');
        }

        $statement->close();
    } else {
        Header('Location: ../index.html?isLoggedIn=false');
	}