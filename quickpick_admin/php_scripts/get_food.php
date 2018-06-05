<?php
    session_start();

    require('connect.php');

    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $food_id = $_GET['food_id'];

        $query = 'SELECT ' .
                    'food_id, ' . 
                    'username, ' . 
                    'food_name, ' . 
                    'description, ' . 
                    'price, ' . 
                    'CONCAT(\'data:image;base64,\', TO_BASE64(photo)) AS photo ' . 
                    'FROM food WHERE username = ? AND food_id = ?';

        $statement = $conn->prepare($query);

        $statement->bind_param('sd', $username, $food_id);

        $statement->execute();

        $result = $statement->get_result();

        while ($row = $result->fetch_assoc()) {
            $food[] = $row;
        }

        $statement->close();

        echo json_encode($food);
    } else {
        Header('Location: ../index.html');
    }
