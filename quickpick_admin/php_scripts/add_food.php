<?php
    session_start();

    require('connect.php');

    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];

        $food_name = $_POST['foodName'];
        $description = $_POST['description'];
        $price = $_POST['price'];

        $photo = NULL;

        $query = 'INSERT INTO food (username, food_name, description, price, photo) ' . 
                    'VALUES (?, ?, ?, ?, ?)';

        $statement = $conn->prepare($query);

        $statement->bind_param('sssdb', $username, $food_name, $description, $price, $photo);

        if (isset($_FILES['photo'])) {
            $statement->send_long_data(4, file_get_contents($_FILES['photo']['tmp_name']));
        }

        $statement->execute();

        if ($statement->affected_rows > 0) {
            Header('Location: ../pages/foods.html?foodInserted=true');
        } else {
            Header('Location: ../pages/foods.html?foodInserted=false');
        }

        $statement->close();
    } else {
        Header('Location: ../index.html');
    }
