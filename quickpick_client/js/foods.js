// Gets all food from database
const foodRequest = new XMLHttpRequest();

foodRequest.onreadystatechange = function() {
    if (foodRequest.readyState == 4 && foodRequest.status == 200) {
        const response = JSON.parse(foodRequest.responseText);

        loadUlams(response.foods);
    }
}

foodRequest.open('GET', './php/get_foods.php', true);
foodRequest.send();

// Generate food into DOM
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
        foodItem.addEventListener('click', function() {
            viewFood(ulams[i]);
        });

        foodList.appendChild(foodItem);
    }
}

// Modal auto show 
const currentURL = new URL(window.location.href);
const foodId = currentURL.searchParams.get('foodId');

if (foodId) {
    const singleFoodRequest = new XMLHttpRequest();

    singleFoodRequest.onreadystatechange = function() {
        if (singleFoodRequest.readyState == 4 && singleFoodRequest.status == 200) {
            const response = JSON.parse(singleFoodRequest.responseText);

            viewFood(response.foods[0]);
        }
    }

    singleFoodRequest.open('GET', './php/get_food.php?foodId=' + foodId, true);
    singleFoodRequest.send();
}

// Modal functionalities
const modalCloseButton = document.querySelector('#foodModal .close');
modalCloseButton.addEventListener('click', resetFoodModal);

const closeModalButton = document.getElementById('closeModalButton');
closeModalButton.addEventListener('click', resetFoodModal);

function viewFood(ulam) {
    const modalTitleText = document.createTextNode(ulam.food_name);
    const modalTitle = document.querySelector('#foodModal .modal-title');
    modalTitle.appendChild(modalTitleText);

    if (ulam.photo != 'data:image;base64,') {
        const foodImage = document.getElementById('foodImage');
        foodImage.setAttribute('src', ulam.photo);
    } else {
        foodImage.setAttribute('src', './css/img/empty-plate.png');
    }

    const foodNameText = document.createTextNode(ulam.food_name);
    const foodName = document.getElementById('foodName');
    foodName.appendChild(foodNameText);

    const foodPlaceText = document.createTextNode('Dish available @ ' + ulam.display_name);
	const foodTimeText = document.createTextNode('Served @ ' + ulam.time);
    const foodPlace = document.getElementById('foodPlace');
	var space = document.createElement('br');
    foodPlace.appendChild(foodPlaceText);
	foodPlace.appendChild(space);
	foodPlace.appendChild(foodTimeText);
	
	//for hidden inputs
	var input = document.createElement("input");
	input.setAttribute("type", "hidden");
	input.setAttribute("name", "dashboard_id");
	input.setAttribute("value", ulam.dashboard_id);
	
	//append to form element that you want .
	document.getElementById("reservationForm").appendChild(input);

	//
    const foodDescriptionText = document.createTextNode(ulam.description);
    const foodDescription = document.getElementById('foodDescription');
    foodDescription.appendChild(foodDescriptionText);

    const foodPriceText = document.createTextNode('₱' + ulam.price);
    const foodPrice = document.getElementById('foodPrice');
    foodPrice.appendChild(foodPriceText);

    $('#foodModal').modal('show');
}

function resetFoodModal() {
    const modalTitle = document.querySelector('#foodModal .modal-title');
    modalTitle.innerHTML = '';

    const foodName = document.getElementById('foodName');
    foodName.innerHTML = '';

    const foodPlace = document.getElementById('foodPlace');
    foodPlace.innerHTML = '';

    const foodDescription = document.getElementById('foodDescription');
    foodDescription.innerHTML = '';

    const foodPrice = document.getElementById('foodPrice');
    foodPrice.innerHTML = '';

    $('#foodModal').modal('hide');
}
