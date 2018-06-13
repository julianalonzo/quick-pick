<?php
    session_start();

    require('connect.php');

    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $food_id = $_POST['food_id'];
        $food_name = $_POST['food_name'];
        $price = $_POST['price'];
        $description = $_POST['description'];

        if ($_FILES['photo']['name'] != "") {
            $query = 'UPDATE food SET food_name = ?, ' . 
                        'description = ?, ' .
                        'price = ?, ' . 
                        'photo = ? WHERE food_id = ? AND username = ?';

            $statement = $conn->prepare($query);

            $statement->bind_param('ssdbds', $food_name, $description, $price, $photo, $food_id, $username);

            $statement->send_long_data(3, file_get_contents($_FILES['photo']['tmp_name']));
        } else {
            $query = 'UPDATE food SET food_name = ?, ' . 
                        'description = ?, ' . 
                        'price = ? ' . 
                        'WHERE food_id = ? AND username = ?';

            $statement = $conn->prepare($query);

            $statement->bind_param('ssdds', $food_name, $description, $price, $food_id, $username);
        }

        $statement->execute();

        if ($statement->affected_rows > 0) {
            Header('Location: ../pages/foods.html?foodUpdated=true');
        } else {
            Header('Location: ../pages/foods.html?foodUpdated=false');
        }

        $statement->close();
    } else {
        Header('Location: ../index.html');
    }
