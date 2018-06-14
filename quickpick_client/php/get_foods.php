<?php
    // Get foods

    require('connect.php');

    $query = 'SELECT food_id, ' . 
            'display_name, ' .  
            'food_name, ' .
            'description, ' . 
            'price, ' . 
            'CONCAT(\'data:image;base64,\', TO_BASE64(photo)) AS photo ' .
            'FROM food JOIN account ON food.username = account.username ' . 
            'ORDER BY food_name';

    $result = $conn->query($query);

    $foods = array();

    while ($row = $result->fetch_assoc()) {
        $foods[] = $row;
    }

    $response = new stdClass();
    $response->foods = $foods;

    echo json_encode($response);
        