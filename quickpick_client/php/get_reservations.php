<?php
    session_start();

    require('connect.php');

    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];

        $query =    'SELECT dashboard_id, ' .
                    'food_id, food.username, food_name, price, ' .
                    'reservation_id, reservation.username, display_name ' .
                    'FROM food INNER JOIN dashboard USING(food_id) ' .
                    'INNER JOIN reservation USING(dashboard_id) ' .
                    'INNER JOIN account ON ' .
                    'reservation.username = account.username; ' .
                    'WHERE account.username = ?;';

        $statement = $conn->prepare($query);

        $statement->bind_param('s', $account.username);

        $statement->execute();

        $result = $statement->get_result();

        $foods = array();

        while ($row = $result->fetch_assoc()) {
            $foods[] = $row;
        }

        $statement->close();

        echo json_encode($foods);
    } else {
        Header('Location: ../quickpick_client/reservation.html');
    }
