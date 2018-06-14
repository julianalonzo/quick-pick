<?php
    // Get foods from a specified date. If date is not specified, the date today is used

    require('connect.php');

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

        $canteensQuery = 'SELECT DISTINCT display_name ' . 
                'FROM dashboard JOIN food ON dashboard.food_id = food.food_id ' . 
                'JOIN account ON food.username = account.username ' . 
                'WHERE (date BETWEEN ? AND ?) ORDER BY 1';

        $canteensStatement = $conn->prepare($canteensQuery);

        $canteensStatement->bind_param('ss', $date, $endDate);

        $canteensStatement->execute();

        $canteensResult = $canteensStatement->get_result();

        $canteens = array();

        while ($row = $canteensResult->fetch_assoc()) {
            $canteen = new stdClass();
            $canteen->name = $row['display_name'];
            $canteen->foods = array();

            array_push($canteens, $canteen);
        }

        $query = 'SELECT dashboard_id, ' . 
                'food.food_id, ' . 
                'display_name, ' . 
                'food_name, ' . 
                'price, ' . 
                'date, ' . 
                'CONCAT(\'data:image;base64,\', TO_BASE64(photo)) AS photo ' .
                'FROM dashboard JOIN food ON dashboard.food_id = food.food_id ' .
                'JOIN account ON food.username = account.username ' .
                'WHERE (date BETWEEN ? AND ?) ' .
                'ORDER BY display_name, date, food_name';

        $statement = $conn->prepare($query);

        $statement->bind_param('ss', $date, $endDate);

        $statement->execute();

        $result = $statement->get_result();

        $foods = array();

        while ($row = $result->fetch_assoc()) {
            $foods[] = $row;
        }

        for ($i = 0; $i < count($canteens); $i++) {
            for ($j = 0; $j < count($foods); $j++) {
                if ($canteens[$i]->name == $foods[$j]['display_name']) {
                    array_push($canteens[$i]->foods, $foods[$j]);
                }
            }
        }

        $statement->close();

        $response = new stdClass();
        $response->date = $date;
        $response->canteens = $canteens;

        echo json_encode($response);
        