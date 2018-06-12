const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'    
];

// Get foods from database
let request = new XMLHttpRequest();

request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
        let response = JSON.parse(request.responseText);

        // Content
        const foods = response.foods;

        const dashboardList = document.getElementById('dashboardList');

        for (let i = 0; i < foods.length; i++) {
            // Food image
            const image = document.createElement('IMG');
            image.setAttribute('src', '../assets/logo.png');

            if (foods[i].photo) {
                image.setAttribute('src', foods[i].photo);                
            }

            image.setAttribute('alt', foods[i].food_name);
            image.classList.add('food-img', 'mr-3');
            
            // Food name
            const foodNameText = document.createTextNode(foods[i].food_name);

            const foodName = document.createElement('H5');
            foodName.classList.add('mb-0');
            foodName.appendChild(foodNameText);

            // Food time
            let time = new Date(foods[i].date).getHours();

            if (time > 12) {
                time = (time - 12) + ' PM';
            } else {
                time = time + ' AM';
            }

            const foodTimeText = document.createTextNode(time);

            const foodTime = document.createElement('H6');
            foodTime.classList.add('mb-0');
            foodTime.appendChild(foodTimeText);

            // Food info container
            const foodInfo = document.createElement('DIV');
            foodInfo.appendChild(foodName);
            foodInfo.appendChild(foodTime);

            // Food detail container
            const foodDetail = document.createElement('DIV');
            foodDetail.classList.add('d-flex', 'align-items-center');
            foodDetail.appendChild(image);
            foodDetail.appendChild(foodInfo);

            // Remove icon
            const icon = document.createElement('I');
            icon.classList.add('far', 'fa-times-circle');

            const removeButton = document.createElement('BUTTON');
            removeButton.setAttribute('type', 'button');
            removeButton.classList.add('btn', 'btn-remove');
            removeButton.appendChild(icon);
            removeButton.addEventListener('click', function() {
                removeFromDashboard(foods[i].dashboard_id);
            });

            // Food list item
            const foodItem = document.createElement('LI');
            foodItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'justify-content-between');
            foodItem.appendChild(foodDetail);
            foodItem.appendChild(removeButton);

            dashboardList.appendChild(foodItem);
        }
    }
}

let rawDate = new Date();

let requestUrl = '../php_scripts/get_dashboard.php';

const url = new URL(window.location.href);

const dateParam = url.searchParams.get('date');

if (dateParam) {
    requestUrl += '?' + 'date=' + dateParam;
    rawDate = new Date(dateParam);
}
        
const date = monthNames[rawDate.getMonth()] + ' ' + rawDate.getDate() + ", " + rawDate.getFullYear();

const dateText = document.createTextNode(date);

const dateLabel = document.getElementById('date');
dateLabel.appendChild(dateText);

const rawTomorrow = new Date(rawDate);
rawTomorrow.setDate(rawDate.getDate() + 1);

const tomorrow = rawTomorrow.getFullYear() + '-' + 
                    (rawTomorrow.getMonth() + 1) + '-' + 
                    rawTomorrow.getDate() + ' ' +
                    '00:00:00';

const tomorrowLink = document.getElementById('tomorrow');
tomorrowLink.setAttribute('href', './dashboard.html?date=' + tomorrow);

const rawYesterday = new Date(rawDate);
rawYesterday.setDate(rawDate.getDate() - 1);

const yesterday = rawYesterday.getFullYear() + '-' + 
                    (rawYesterday.getMonth() + 1) + '-' + 
                    rawYesterday.getDate() + ' ' +
                    '00:00:00';

const yesterdayLink = document.getElementById('yesterday');
yesterdayLink.setAttribute('href', './dashboard.html?date=' + yesterday);

request.open('GET', requestUrl, true);
request.send();

// Add food to dashboard
const dateRequest = rawDate.getFullYear() + '-' +
                    (rawDate.getMonth() + 1) + '-' +
                    rawDate.getDate();
const dateInput = document.getElementById('dateInput');
dateInput.setAttribute('value', dateRequest);

const dateLabelForm = document.getElementById('dateLabel');
const dateTextForm = document.createTextNode('Date: ' + date);
dateLabelForm.appendChild(dateTextForm);

const addButton = document.getElementById('addDashboardButton');
addButton.addEventListener('click', showAddModal);

function showAddModal() {
    const foodList = document.getElementById('foodList');
    foodList.innerHTML = '';

    const availableFoodRequest = new XMLHttpRequest();

    availableFoodRequest.onreadystatechange = () => {
        if (availableFoodRequest.readyState == 4 && availableFoodRequest.status == 200) {
            let response = JSON.parse(availableFoodRequest.responseText);

            const foods = response.foods;

            for (let i = 0; i < foods.length; i++) {
                // Image
                const image = document.createElement('IMG');
                image.setAttribute('src', '../assets/logo.png');
                image.setAttribute('alt', 'Quickpick');
                image.classList.add('food-img', 'mr-3');

                if (foods[i].photo) {
                    image.setAttribute('src', foods[i].photo);
                }

                // Food name
                const foodNameText = document.createTextNode(foods[i].food_name);

                const foodName = document.createElement('H5');
                foodName.classList.add('mb-0');
                foodName.appendChild(foodNameText);

                // Label
                const label = document.createElement('LABEL');
                label.setAttribute('for', foods[i].food_id);
                label.classList.add('d-flex', 'align-items-center', 'mb-0');
                label.appendChild(image);
                label.appendChild(foodName);

                // Checkbox
                const checkbox = document.createElement('INPUT');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('value', foods[i].food_id);
                checkbox.setAttribute('id', foods[i].food_id);
                checkbox.setAttribute('name', 'food_selected[]');

                // List item
                const listItem = document.createElement('LI');
                listItem.classList.add('list-group-item', 'd-block', 'align-items-center');
                listItem.appendChild(checkbox);
                listItem.appendChild(label);

                foodList.appendChild(listItem);
            }
        }

        $('#addDashboardModal').modal('show');
    }

    let addDashboardRequestUrl = '../php_scripts/get_food_dashboard.php';

    if (dateParam) {
        addDashboardRequestUrl += '?' + 'date=' + dateParam;
    }

    availableFoodRequest.open('GET', addDashboardRequestUrl, true);
    availableFoodRequest.send();
}

// Remove from dashboard
function removeFromDashboard(dashboardId) {
    if (window.confirm('Are you sure you want to delete this from the dashboard?')) {
        const deleteFoodIdInput = document.getElementById('deleteFoodId');
        deleteFoodIdInput.setAttribute('value', dashboardId);

        const deleteDashboardForm = document.getElementById('deleteDashboardForm');
        deleteDashboardForm.submit();
    }
}
