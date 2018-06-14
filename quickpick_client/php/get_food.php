<?php
    // Get foods

    require('connect.php');

    $food_id = $_GET['foodId'];

    $query = 'SELECT food_id, ' . 
            'display_name, ' .  
            'food_name, ' .
            'description, ' . 
            'price, ' . 
            'CONCAT(\'data:image;base64,\', TO_BASE64(photo)) AS photo ' .
            'FROM food JOIN account ON food.username = account.username ' . 
            'WHERE food_id = ?';

    $statement = $conn->prepare($query);

    $statement->bind_param('d', $food_id);

    $statement->execute();

    $result = $statement->get_result();

    $foods = array();

    while ($row = $result->fetch_assoc()) {
        $foods[] = $row;
    }

    $statement->close();

    $response = new stdClass();
    $response->foods = $foods;

    echo json_encode($response);
        