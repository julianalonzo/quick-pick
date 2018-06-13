<?php
    session_start();

    require('connect.php');

    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $food_selected = $_POST['food_selected'];
        $date = $_POST['date'] . ' ' . $_POST['time'];

        if (!empty($food_selected)) {
            foreach($food_selected as $id) {
                $query = 'INSERT INTO dashboard (food_id, date) VALUES (?, ?)';

                $statement = $conn->prepare($query);

                $statement->bind_param('ss', $id, $date);

                $statement->execute();
            }

            if ($statement->affected_rows > 0) {
                Header('Location: ../pages/dashboard.html?date=' . $date);
            } else {
                Header('Location: ../pages/dashboard.html?foodInserted=false');
            }

            $statement->close();
        }
    } else {
        Header('Location: ../index.html');
    }
