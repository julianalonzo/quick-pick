// Gets all food from database within this day or the specified date in GET (see URL)
const foodRequest = new XMLHttpRequest();

foodRequest.onreadystatechange = function() {
    if (foodRequest.readyState == 4 && foodRequest.status == 200) {
        const response = JSON.parse(foodRequest.responseText);

        console.log(response);

        loadUlams(response.canteens);
    }
}

// Gets the date selected based on URL params and adjusts datepicker date
let dateSelected = new Date();

const currentURL = new URL(window.location.href);

if (currentURL.searchParams.get('date')) {
    dateSelected = new Date(currentURL.searchParams.get('date'));
}

let foodRequestURL = './php/get_foods.php?date=' + dateSelected.getFullYear() + '-' +
                        (dateSelected.getMonth() + 1) + '-' +
                        dateSelected.getDate();

foodRequest.open('GET', foodRequestURL, true);
foodRequest.send();

// Change URL when date is changed on datepicker
$('#datepicker').datepicker({
    defaultDate: dateSelected,
    onSelect: function() {
        let date = new Date(this.value);
        date = date.getFullYear() + '-' +
                (date.getMonth() + 1) + '-' +
                date.getDate();

        window.location.href = './index.html?date=' + date + ' 00:00:00';
    }
});

// Generate ulams
function loadUlams(canteens) {
    const menuContainer = document.getElementById('menuContainer');

    for (let i = 0; i < canteens.length; i++) {
        const foodPlace = canteens[i].name;

        // Name of foodplace
        const foodPlaceText = document.createTextNode(foodPlace);

        const menuItem = document.createElement('LI');
        menuItem.appendChild(foodPlaceText);

        // Ulams that will be served
        const foodListContainer = document.createElement('UL');
        for (let j = 0; j < canteens[i].foods.length; j++) {
            const foodNameText = document.createTextNode(canteens[i].foods[j].food_name);
            const foodItem = document.createElement('LI');
            foodItem.appendChild(foodNameText);
            
            foodListContainer.appendChild(foodItem);
        }

        menuContainer.appendChild(menuItem);
        menuContainer.appendChild(foodListContainer);
    }
}
