<?php
    session_start();

    require('connect.php');

    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];

        $food_id = $_POST['foodId'];

        $query = 'DELETE FROM food WHERE food_id = ? AND username = ?';

        $statement = $conn->prepare($query);

        $statement->bind_param('ds', $food_id, $username);

        $statement->execute();

        if ($statement->affected_rows > 0) {
            Header('Location: ../pages/foods.html?foodDeleted=true');
        } else {
            Header('Location: ../pages/foods.html?foodDeleted=false');
        }
    } else {
        Header('Location: ../index.html');
    }
