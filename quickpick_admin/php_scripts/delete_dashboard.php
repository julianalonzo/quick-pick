<?php
    session_start();

    require('connect.php');

    if (isset($_SESSION['username'])) {
        $dashboard_id = $_POST['dashboard_id'];
        $date = $_POST['date'];

        $query = 'DELETE FROM dashboard WHERE dashboard_id = ?';

        $statement = $conn->prepare($query);

        $statement->bind_param('d', $dashboard_id);

        $statement->execute();

        if ($statement->affected_rows > 0) {
            Header('Location: ../pages/dashboard.html?date=' . $date . ' 00:00:00');
        } else {
            Header('Location: ../pages/dashboard.html?date=' . $date . ' 00:00:00');
        }

        $statement->close();
    } else {
        Header('Location: ../index.html');
    }
