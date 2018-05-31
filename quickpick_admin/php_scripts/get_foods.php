<?php
    session_start();

    require('connect.php');

    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];

        $query = 'SELECT ' .
                    'food_id, ' . 
                    'username, ' . 
                    'food_name, ' . 
                    'description, ' . 
                    'price, ' . 
                    'CONCAT(\'data:image;base64,\', TO_BASE64(photo)) AS photo ' . 
                    'FROM food WHERE username = ?';

        $statement = $conn->prepare($query);

        $statement->bind_param('s', $username);

        $statement->execute();

        $result = $statement->get_result();

        while ($row = $result->fetch_assoc()) {
            $foods[] = $row;
        }

        $statement->close();

        echo json_encode($foods);
    } else {
        Header('Location: ../index.html');
    }
