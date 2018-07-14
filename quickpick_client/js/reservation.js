// Gets all food from database
const reservationsRequest = new XMLHttpRequest();

reservationsRequest.onreadystatechange = function() {
    if (reservationsRequest.readyState == 4 && reservationsRequest.status == 200) {
        const response = JSON.parse(reservationsRequest.responseText);

        loadUlams(response.foods);
    }
}

reservationsRequest.open('GET', './php/get_reservations.php', true);
reservationsRequest.send();

// Generate food reservations into DOM
function loadUlams(ulams) {
    const foodList = document.getElementById('foodList');

    for (let i = 0; i < ulams.length; i++) {
        const foodNameText = document.createTextNode(ulams[i].food_name);

        const foodName = document.createElement('H5');
        foodName.classList.add('mb-0');
        foodName.appendChild(foodNameText);

        const foodItem = document.createElement('LI');
        foodItem.classList.add('list-group-item');
        foodItem.appendChild(foodName);

        foodList.appendChild(foodItem);
    }
}
