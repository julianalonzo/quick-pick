<? php
	session_start();
	// Get user
	
	require('connect.php');

	if(isset($_SESSION['username'])) {
		$username = $_SESSION['username'];
		
		echo $username;
		
		$query = 'SELECT * FROM account WHERE username = ?';
		
		$statement = $conn->prepare($query);
		
		$statement->bind_param('s', $username);
		
		$statement->execute();
		
		$user = $statement->get_result();
		
		echo json_encode($user);
	} else {
		
	}

	