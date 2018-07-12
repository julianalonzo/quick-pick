<?php
    // Get foods

    require('connect.php');

    $query = 'SELECT food_id,display_name,food_name,description,price,DATE_FORMAT(date, \'%H:%i\') time,dashboard_id,CONCAT(\'data:image;base64,\', TO_BASE64(photo)) AS photo FROM food INNER JOIN dashboard USING(food_id) INNER JOIN account ON account.username = food.username WHERE CONCAT(EXTRACT(YEAR_MONTH FROM NOW()), EXTRACT(DAY FROM dashboard.date)) = CONCAT(EXTRACT(YEAR_MONTH FROM NOW()), EXTRACT(DAY FROM NOW())) ORDER BY food_name;';

    $result = $conn->query($query);

    $foods = array();

    while ($row = $result->fetch_assoc()) {
        $foods[] = $row;
    }

    $response = new stdClass();
    $response->foods = $foods;

    echo json_encode($response);
        

        