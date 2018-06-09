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

        const rawDate = new Date(response.date.split(" ")[0]);
        
        const date = monthNames[rawDate.getMonth()] + ' ' + rawDate.getDate() + ", " + rawDate.getFullYear();

        const dateText = document.createTextNode(date);

        const dateLabel = document.getElementById('date');
        dateLabel.appendChild(dateText);

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

            // Food detail container
            const foodDetail = document.createElement('DIV');
            foodDetail.classList.add('d-flex', 'align-items-center');
            foodDetail.appendChild(image);
            foodDetail.appendChild(foodName);

            // Remove icon
            const icon = document.createElement('I');
            icon.classList.add('far', 'fa-times-circle');

            const removeButton = document.createElement('BUTTON');
            removeButton.setAttribute('type', 'button');
            removeButton.classList.add('btn', 'btn-remove');
            removeButton.appendChild(icon);

            // Food list item
            const foodItem = document.createElement('LI');
            foodItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'justify-content-between');
            foodItem.appendChild(foodDetail);
            foodItem.appendChild(removeButton);

            dashboardList.appendChild(foodItem);
        }
    }
}

const requestUrl = '../php_scripts/get_dashboard.php';

request.open('GET', requestUrl, true);
request.send();
