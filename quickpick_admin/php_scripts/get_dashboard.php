<?php
    session_start();

    require('connect.php');

    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];

        date_default_timezone_set('Asia/Manila');

        $date = date('Y-m-d');
        $date = $date . ' 00:00:00';
        
        if (isset($_GET['date'])) {
            $date = $_GET['date'];
        }

        $endDate = explode(" ", $date);
        $endDate[1] = "23:59:59";

        $endDate = implode(" ", $endDate);
        $endDate = date($endDate);

        $query = 'SELECT dashboard_id, ' . 
                    'food.food_id, ' . 
                    'username, food_name, ' . 
                    'price, date, ' . 
                    'CONCAT(\'data:image;base64,\', TO_BASE64(photo)) AS photo ' . 
                    'FROM dashboard JOIN food ON dashboard.food_id = food.food_id ' . 
                    'WHERE (date BETWEEN ? AND ?) AND username = ? ' . 
                    'ORDER BY date, food_name';

        $statement = $conn->prepare($query);

        $statement->bind_param('sss', $date, $endDate, $username);

        $statement->execute();

        $result = $statement->get_result();

        $foods = array();

        while ($row = $result->fetch_assoc()) {
            $foods[] = $row;
        }

        $statement->close();

        $response = new stdClass();
        $response->date = $date;
        $response->foods = $foods;

        echo json_encode($response);
    } else {
        Header('Location: ../index.html');
    }
