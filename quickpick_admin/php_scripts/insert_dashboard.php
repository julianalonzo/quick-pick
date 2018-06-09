<?php
    session_start();

    require('connect.php');

    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $food_selected = $_POST['food_selected'];

        if (!empty($food_selected)) {
            foreach($food_selected as $id) {
                $query = 'INSERT INTO dashboard ()';

                $statement = $conn->prepare($query);

                $statement->bind_param('sssdb', $username, $food_name, $description, $price, $photo);

                if (isset($_FILES['photo'])) {
                    $statement->send_long_data(4, file_get_contents($_FILES['photo']['tmp_name']));
                }

                $statement->execute();

                if ($statement->affected_rows > 0) {
                    Header('Location: ../pages/dashboard.html?foodInserted=true');
                } else {
                    Header('Location: ../pages/dashboard.html?foodInserted=false');
                }
            }
        }
    } else {
        Header('Location: ../index.html');
    }
