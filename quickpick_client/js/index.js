// Gets all food from database within this day or the specified date in GET (see URL)
const foodRequest = new XMLHttpRequest();

foodRequest.onreadystatechange = function() {
    if (foodRequest.readyState == 4 && foodRequest.status == 200) {
        const response = JSON.parse(foodRequest.responseText);

        console.log(response);

        // TODO generate food layout here
    }
}

// Gets the date selected based on URL params and adjusts datepicker date
const currentURL = new URL(window.location.href);
const dateSelected = new Date(currentURL.searchParams.get('date'));

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
